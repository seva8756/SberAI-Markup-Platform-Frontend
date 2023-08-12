import { defineStore } from 'pinia'
import type { CurrentTaskState } from '../types/currentTaskState'
import $api from '@/shared/api/api'
import type { Task } from '@/entities/Task'
import { AxiosError } from 'axios'
import { NotificationType, useNotificationStore } from '@/entities/Notification'
import { useProjectsListStore } from '@/entities/Project'

export const useCurrentTaskStore = defineStore('currentTaskStore', {
  state: (): CurrentTaskState => ({
    currentTask: null,
    cachedTasks: [],
    paginationIds: [],
    currentPaginationIndex: 0,
    answer: '',
    isLoading: false,
    isAutoFill: true,
    error: null
  }),
  getters: {
    lastPaginationIndex: (state) => state.paginationIds.length - 1,
    taskIndexById: (state) => (taskId: number) =>
      state.cachedTasks.findIndex((task) => task.index === taskId),
    isLastTask: (state) => state.currentPaginationIndex === state.paginationIds.length - 1,
    getTaskIdByIndex: (state) => state.paginationIds[state.currentPaginationIndex]
  },
  actions: {
    async fetchCurrentTask(projectId: number) {
      try {
        this.isLoading = true
        await this.sendUserAnswer(projectId)
        const res = await $api.get<Task>(`/projects/task-selection/${projectId}`)
        this.answer = ''

        this.currentTask = res.data
        this.cachedTasks.push(this.currentTask)
        this.paginationIds.push(this.currentTask.index)
        this.setPaginationIndex(this.lastPaginationIndex)
        if (this.isAutoFill && this.currentTask.placeholder) {
          this.answer = this.currentTask.placeholder
        }
        this.error = null
      } catch (e) {
        if (e instanceof AxiosError) {
          this.currentTask = null
          const axiosError = JSON.parse(e.response?.data?.error)
          this.error = axiosError.name
        }
      } finally {
        this.isLoading = false
      }
    },
    async fetchTaskById({ projectId, taskIndex }: { projectId: string; taskIndex: number }) {
      const res = await $api.get<Task>(`/projects/${projectId}/task/${taskIndex}`)
      return res.data
    },
    async sendUserAnswer(projectId: number) {
      if (this.currentTask && this.answer) {
        try {
          await $api.post('/projects/task-answer', {
            project_id: projectId,
            task_id: this.currentTask.index,
            answer: this.answer
          })
          const task = this.cachedTasks.find((task) => task.index === this.currentTask?.index)
          if (task) {
            task.answer = this.answer
          }
        } catch (e) {
          this.paginationIds.pop()
          console.log(e)
        }
      }
    },
    async goToNextTask(projectId: number) {
      const notificationStore = useNotificationStore()

      if (!this.isLastTask) {
        this.increasePaginationIndex()
        await this.setCurrentTask({
          projectId: projectId.toString(),
          taskIndex: this.getTaskIdByIndex
        })
      } else {
        if (!this.answer) {
          notificationStore.addNotification({
            message: 'Заполните ответ',
            notificationType: NotificationType.ERROR
          })
        } else {
          await this.fetchCurrentTask(projectId)
        }
      }
    },
    async goToPreviousTask(projectId: number) {
      this.decreasePaginationIndex()
      await this.setCurrentTask({
        projectId: projectId.toString(),
        taskIndex: this.getTaskIdByIndex
      })
    },
    fillTextAnswer() {
      if (this.currentTask && this.currentTask.placeholder) {
        this.answer = this.currentTask.placeholder
      }
    },
    setAnswer(value: string) {
      if (this.currentTask) this.answer = value
    },
    initPaginationIds(projectId: number) {
      const projectListStore = useProjectsListStore()
      const currentProject = projectListStore.getProjectById(projectId.toString())
      if (currentProject) {
        this.paginationIds = [...currentProject.completed_tasks]
      }
    },
    clearCurrentTask() {
      this.currentTask = null
    },
    setPaginationIndex(index: number) {
      this.currentPaginationIndex = index
    },
    increasePaginationIndex() {
      if (this.currentPaginationIndex < this.paginationIds.length) this.currentPaginationIndex++
    },
    decreasePaginationIndex() {
      if (this.currentPaginationIndex > 0) this.currentPaginationIndex--
    },
    async setCurrentTask(payload: { projectId: string; taskIndex: number }) {
      const currentTask = this.cachedTasks.find((task) => task.index === payload.taskIndex)
      if (currentTask) {
        this.currentTask = currentTask
      } else {
        this.currentTask = await this.fetchTaskById(payload)
        this.cachedTasks.unshift(this.currentTask)
      }
      this.answer = this.currentTask?.answer
    }
  }
})
