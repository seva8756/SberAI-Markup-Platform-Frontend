import { defineStore } from 'pinia'
import type { CurrentTaskState } from '../types/currentTaskState'
import $api from '@/shared/api/api'
import type { Task } from '@/entities/Task'
import { AxiosError } from 'axios'
import { type Project, useProjectsListStore } from '@/entities/Project'
import { taskErrorsMapper, TaskServerErrors } from '../../const/serverErrors'
import TaskService from '../services/TaskService'
import { NotificationType, useNotificationStore } from '@/entities/Notification'

export const useCurrentTaskStore = defineStore('currentTaskStore', {
  state: (): CurrentTaskState => ({
    currentTask: null,
    currentProject: undefined,
    noTasksAvailable: false,
    cachedTasks: [],
    currentPaginationIndex: 0,
    isLoading: false,
    error: null,
    answer: {}
  }),
  getters: {
    lastCompletedTaskIndex() {
      return () => this.completedTasks[this.completedTasks.length - 1]
    },
    taskIndexById: (state) => (taskId: number) =>
      state.cachedTasks.findIndex((task) => task.index === taskId),
    isLastTask: (state) => state.currentPaginationIndex === 0,
    completedTasks: (state) => state.currentProject?.completed_tasks ?? [],
    projectId: (state) => state.currentProject?.ID,
    getTaskIdByIndex() {
      return () => this.completedTasks[this.currentPaginationIndex]
    }
  },
  actions: {
    async fetchCurrentTask(projectId: number) {
      const { addCompletedTask } = useProjectsListStore()
      const { addNotification } = useNotificationStore()
      try {
        this.isLoading = true
        if (this.answer) {
          await this.sendUserAnswer(this.answer)
        }
        this.answer = {}
        const res = await TaskService.fetchNewTask(projectId)
        this.currentTask = res.data
        this.cachedTasks.push(this.currentTask)
        addCompletedTask({ projectId, taskId: this.currentTask.index })
        this.setPaginationIndex(0)
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
                taskIndex: this.lastCompletedTaskIndex()
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
    async sendUserAnswer(answer: Record<string, string>) {
      const { addNotification } = useNotificationStore()
      const { removeUncompletedTask } = useProjectsListStore()

      if (this.currentTask) {
        try {
          await TaskService.sendAnswer(this.projectId!, this.currentTask.index, answer)

          const task = this.cachedTasks.find((task) => task.index === this.currentTask?.index)
          if (task) {
            task.answer = answer
          }
        } catch (e) {
          if (this.projectId) removeUncompletedTask(this.projectId)
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
      const { addNotification } = useNotificationStore()

      if (!this.isLastTask) {
        this.currentPaginationIndex--
        await this.setCurrentTask({
          projectId: projectId,
          taskIndex: this.getTaskIdByIndex()
        })
      } else {
        if (
          this.currentProject &&
          Object.entries(this.currentProject.components).every(([name, component]) =>
            component.require ? this.answer[name] : true
          )
        ) {
          await this.fetchCurrentTask(projectId)
        } else {
          addNotification({
            message: 'Заполните ответ',
            notificationType: NotificationType.ERROR
          })
        }
      }
    },
    async goToPreviousTask(projectId: number) {
      if (this.currentPaginationIndex + 1 < this.completedTasks.length) {
        this.currentPaginationIndex++
        await this.setCurrentTask({
          projectId: projectId,
          taskIndex: this.getTaskIdByIndex()
        })
      }
    },
    async saveCurrentTask(answer: Record<string, string>) {
      await this.sendUserAnswer(answer)
    },
    clearCurrentTask() {
      this.currentTask = null
      this.error = null
    },
    setPaginationIndex(index: number) {
      this.currentPaginationIndex = index
    },
    async setCurrentTask({ projectId, taskIndex }: { projectId: number; taskIndex: number }) {
      const { addNotification } = useNotificationStore()
      const currentTask = this.cachedTasks.find((task) => task.index === taskIndex)
      if (currentTask) {
        this.currentTask = currentTask
      } else {
        try {
          this.isLoading = true
          const res = await TaskService.fetchTaskById(projectId, taskIndex)
          this.currentTask = res.data
          this.cachedTasks.unshift(res.data)
        } catch (e) {
          if (e instanceof AxiosError) {
            const axiosError = JSON.parse(e.response?.data?.error)
            this.error = axiosError.name
          } else {
            this.error = e as string
          }
          addNotification({
            message:
              e instanceof AxiosError
                ? taskErrorsMapper[this.error as TaskServerErrors]
                : 'Произошла ошибка',
            notificationType: NotificationType.ERROR
          })
          console.log(e)
        } finally {
          this.isLoading = false
        }
      }
      this.answer = this.currentTask?.answer ?? {}
    },
    setAnswer(name: string, answer: string) {
      this.answer = {
        ...this.answer,
        [name]: answer
      }
    }
  }
})
