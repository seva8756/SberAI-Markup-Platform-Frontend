import { defineStore } from 'pinia'
import type { CurrentTaskState } from '../types/currentTaskState'
import $api from '@/shared/api/api'
import type { Task } from '@/entities/Task'
import { AxiosError } from 'axios'
import { type Project, useProjectsListStore } from '@/entities/Project'
import { useAnswerTaskStore } from '@/features/AnswerTaskForm'
import { TaskServerErrors } from '../../const/serverErrors'

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
    projectId: (state) => state.currentProject?.ID.toString() ?? ''
  },
  actions: {
    async fetchCurrentTask(projectId?: number) {
      const answerTaskStore = useAnswerTaskStore()

      try {
        this.isLoading = true
        await this.sendUserAnswer()
        answerTaskStore.setAnswer('')
        answerTaskStore.setExtendedAnswer('')
        const res = await $api.get<Task>(`/projects/task-selection/${this.projectId}`)
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
          if (this.error === TaskServerErrors.NO_TASK_AVAILABLE) {
            this.noTasksAvailable = true
            await this.setCurrentTask({
              projectId: this.projectId,
              taskIndex:
                this.currentProject?.completed_tasks[
                  this.currentProject?.completed_tasks.length - 1
                ] ?? 1
            })
          }
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
    async sendUserAnswer(projectId?: number) {
      const answerTaskStore = useAnswerTaskStore()

      if (this.currentTask) {
        try {
          await $api.post('/projects/task-answer', {
            project_id: this.projectId,
            task_id: this.currentTask.index,
            answer: answerTaskStore.answer,
            answer_extended: answerTaskStore.extendedAnswer
          })
          const task = this.cachedTasks.find((task) => task.index === this.currentTask?.index)
          if (task) {
            task.answer = answerTaskStore.answer
            task.answer_extended = answerTaskStore.extendedAnswer
          }
        } catch (e) {
          this.paginationIds.pop()
          console.log(e)
        }
      }
    },
    async goToNextTask(projectId?: number) {
      if (!this.isLastTask) {
        this.currentPaginationIndex--
        await this.setCurrentTask({
          projectId: this.currentProject?.ID.toString() ?? '',
          taskIndex: this.getTaskIdByIndex
        })
      } else {
        await this.fetchCurrentTask()
      }
    },
    async goToPreviousTask(projectId?: number) {
      if (this.currentPaginationIndex + 1 < this.paginationIds.length) {
        this.currentPaginationIndex++
        await this.setCurrentTask({
          projectId: this.currentProject?.ID.toString() ?? '',
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
    async setCurrentTask(payload: { projectId: string; taskIndex: number }) {
      const { setAnswer, setExtendedAnswer } = useAnswerTaskStore()
      const currentTask = this.cachedTasks.find((task) => task.index === payload.taskIndex)
      if (currentTask) {
        this.currentTask = currentTask
      } else {
        this.currentTask = await this.fetchTaskById(payload)
        this.cachedTasks.unshift(this.currentTask)
      }
      setAnswer(this.currentTask?.answer)
      setExtendedAnswer(this.currentTask?.answer_extended)
    }
  }
})
