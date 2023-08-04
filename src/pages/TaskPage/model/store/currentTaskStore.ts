import { defineStore } from 'pinia'
import type { CurrentTaskState } from '../types/currentTaskState'
import TestImg from '@/shared/assets/testSlider.png'
import $api from '@/shared/api/api'
import type { Task } from '@/entities/Task'

export const useCurrentTaskStore = defineStore('currentTaskStore', {
  state: (): CurrentTaskState => ({
    currentTask: {
      placeholder: 'Hello',
      images: [TestImg, TestImg, TestImg],
      index: 2
    },
    answer: undefined,
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchCurrentTask() {
      try {
        this.isLoading = true
        const res = await $api.get<Task>('/project/task')
        if (this.answer) {
          await this.sendUserAnswer()
        }
        this.currentTask = res.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async sendUserAnswer() {
      try {
        const res = await $api.post('/project/answer', this.answer)
      } catch (e) {
        console.log(e)
      }
    },
    setAnswer(value: string) {
      this.answer = value
    }
  }
})
