import { defineStore } from 'pinia'
import type { CurrentTaskState } from '../types/currentTaskState'
import TestImg from '@/shared/assets/testSlider.png'
import $api from '@/shared/api/api'
import type { Task } from '@/entities/Task'
import { AxiosError } from 'axios'

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
        if (this.answer) {
          await this.sendUserAnswer(projectId)
        }
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
      if (this.currentTask) {
        try {
          const res = await $api.post('/projects/task-answer', {
            project_id: projectId,
            task_id: this.currentTask.index,
            answer: this.answer
          })
        } catch (e) {
          console.log(e)
        }
      }
    },
    setAnswer(value: string) {
      this.answer = value
    }
  }
})
