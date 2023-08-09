import { defineStore } from 'pinia'
import type { CurrentTaskState } from '../types/currentTaskState'
import $api from '@/shared/api/api'
import type { Task } from '@/entities/Task'
import { AxiosError } from 'axios'
import { NotificationType, useNotificationStore } from '@/entities/Notification'

export const useCurrentTaskStore = defineStore('currentTaskStore', {
  state: (): CurrentTaskState => ({
    currentTask: null,
    answer: undefined,
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchCurrentTask(projectId: number) {
      try {
        this.isLoading = true
        await this.sendUserAnswer(projectId)
        const res = await $api.get<Task>(`/projects/task-selection/${projectId}`)

        this.currentTask = res.data
        this.error = null
      } catch (e) {
        if (e instanceof AxiosError) {
          this.currentTask = null
          const axiosError = JSON.parse(e.response?.data?.error)
          this.error = axiosError.name
        }
      } finally {
        this.answer = undefined
        this.isLoading = false
      }
    },
    async sendUserAnswer(projectId: number) {
      if (this.currentTask && this.answer) {
        try {
          await $api.post('/projects/task-answer', {
            project_id: projectId,
            task_id: this.currentTask.index,
            answer: this.answer
          })
        } catch (e) {
          console.log(e)
        } finally {
          this.answer = undefined
        }
      }
    },
    async goToNextTask(projectId: number) {
      const notificationStore = useNotificationStore()

      if (!this.answer) {
        notificationStore.addNotification({
          message: 'Заполните ответ',
          notificationType: NotificationType.ERROR
        })
      } else {
        await this.fetchCurrentTask(projectId)
      }
    },
    fillTextAnswer() {
      if (this.currentTask && this.currentTask.placeholder) {
        this.answer = this.currentTask.placeholder
      }
    },
    setAnswer(value: string) {
      this.answer = value
    },
    resetAnswer() {
      this.answer = undefined
    }
  }
})
