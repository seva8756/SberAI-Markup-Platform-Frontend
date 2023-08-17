import { defineStore } from 'pinia'
import type { CurrentTaskState } from '../types/currentTaskState'
import $api from '@/shared/api/api'
import type { Task } from '@/entities/Task'
import { AxiosError } from 'axios'
import { type Project, useProjectsListStore } from '@/entities/Project'
import { useAnswerTaskStore } from '@/features/AnswerTaskForm'
import { taskErrorsMapper, TaskServerErrors } from '../../const/serverErrors'
import TaskService from '../services/TaskService'
import { NotificationType, useNotificationStore } from '@/entities/Notification'

export const useCurrentTaskStore = defineStore('currentTaskStore', {
  state: (): CurrentTaskState => ({
    currentTask: null,
    currentProject: undefined,
    noTasksAvailable: false,
    cachedTasks: [],
    paginationIds: [],
    currentPaginationIndex: 0,
    isLoading: false,
    error: null
  }),
  getters: {
    lastPaginationIndex: (state) => state.paginationIds.length - 1,
    taskIndexById: (state) => (taskId: number) =>
      state.cachedTasks.findIndex((task) => task.index === taskId),
    isLastTask: (state) => state.currentPaginationIndex === 0,
    getTaskIdByIndex: (state) => [...state.paginationIds].reverse()[state.currentPaginationIndex],
    reversedPaginationIds: (state) => [...state.paginationIds].reverse(),
    projectId: (state) => state.currentProject?.ID
  },
  actions: {
    async fetchCurrentTask(projectId: number) {
      const answerTaskStore = useAnswerTaskStore()
      const { addNotification } = useNotificationStore()
      try {
        this.isLoading = true
        if (answerTaskStore.answer) {
          await this.sendUserAnswer({
            answer: answerTaskStore.answer,
            answer_extended: answerTaskStore.extendedAnswer
          })
        }
        answerTaskStore.setAnswer('')
        answerTaskStore.setExtendedAnswer('')
        const res = await TaskService.fetchNewTask(projectId)
        this.currentTask = res.data
        this.cachedTasks.push(this.currentTask)
        this.paginationIds.push(this.currentTask.index)
        this.setPaginationIndex(0)
        if (answerTaskStore.isAutoFill && this.currentTask.placeholder) {
          answerTaskStore.setAnswer(this.currentTask.placeholder)
        }
        this.error = null
      } catch (e) {
        if (e instanceof AxiosError) {
          this.currentTask = null
          const axiosError = JSON.parse(e.response?.data?.error)
          this.error = axiosError.name
          switch (this.error) {
            case TaskServerErrors.NO_TASK_AVAILABLE:
              this.noTasksAvailable = true
              await this.setCurrentTask({
                projectId: projectId,
                taskIndex: this.paginationIds[this.lastPaginationIndex]
              })
              break
            default:
              addNotification({
                message: taskErrorsMapper[this.error as TaskServerErrors],
                notificationType: NotificationType.ERROR
              })
          }
        } else {
          addNotification({
            message: 'Произошла ошибка',
            notificationType: NotificationType.ERROR
          })
        }
      } finally {
        this.isLoading = false
      }
    },
    setCurrentProject(project: Project) {
      this.currentProject = project
    },
    async fetchTaskById({ projectId, taskIndex }: { projectId: string; taskIndex: number }) {
      const res = await $api.get<Task>(`/projects/${projectId}/task/${taskIndex}`)
      return res.data
    },
    async sendUserAnswer({
      answer,
      answer_extended
    }: {
      answer: string
      answer_extended?: string
    }) {
      const { addNotification } = useNotificationStore()
      if (this.currentTask) {
        try {
          await TaskService.sendAnswer(
            this.projectId!,
            this.currentTask.index,
            answer,
            answer_extended
          )

          const task = this.cachedTasks.find((task) => task.index === this.currentTask?.index)
          if (task) {
            task.answer = answer
            task.answer_extended = answer_extended
          }
        } catch (e) {
          this.paginationIds.pop()
          if (e instanceof AxiosError) {
            const axiosError = JSON.parse(e.response?.data?.error)
            this.error = axiosError.name
            if (this.error === TaskServerErrors.ANSWER_OPTION_DOES_NOT_EXISTS) {
              addNotification({
                message: taskErrorsMapper[this.error],
                notificationType: NotificationType.ERROR
              })
            }
          } else {
            addNotification({
              message: 'Произошла ошибка',
              notificationType: NotificationType.ERROR
            })
          }
          console.log(e)
        }
      }
    },
    async goToNextTask(projectId: number) {
      if (!this.isLastTask) {
        this.currentPaginationIndex--
        await this.setCurrentTask({
          projectId: projectId,
          taskIndex: this.getTaskIdByIndex
        })
      } else {
        await this.fetchCurrentTask(projectId)
      }
    },
    async goToPreviousTask(projectId: number) {
      if (this.currentPaginationIndex + 1 < this.paginationIds.length) {
        this.currentPaginationIndex++
        await this.setCurrentTask({
          projectId: projectId,
          taskIndex: this.getTaskIdByIndex
        })
      }
    },
    initPaginationIds(projectId: number) {
      const projectListStore = useProjectsListStore()
      const currentProject = projectListStore.getProjectById(projectId.toString())
      if (currentProject) {
        this.paginationIds = [...currentProject.completed_tasks]
      }
    },
    async saveCurrentTask(value: { answer: string; answer_extended?: string }) {
      await this.sendUserAnswer({ ...value })
    },
    clearCurrentTask() {
      this.currentTask = null
      this.error = null
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
    async setCurrentTask({ projectId, taskIndex }: { projectId: number; taskIndex: number }) {
      const { setAnswer, setExtendedAnswer } = useAnswerTaskStore()
      const currentTask = this.cachedTasks.find((task) => task.index === taskIndex)
      if (currentTask) {
        this.currentTask = currentTask
      } else {
        const res = await TaskService.fetchTaskById(projectId, taskIndex)
        this.currentTask = res.data
        this.cachedTasks.unshift(res.data)
      }
      setAnswer(this.currentTask?.answer)
      setExtendedAnswer(this.currentTask?.answer_extended)
    }
  }
})
