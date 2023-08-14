import { defineStore } from 'pinia'
import type { AnswerTaskState } from '../types/answerTaskState'
import type { Task } from '@/entities/Task'

export const useAnswerTaskStore = defineStore('answerTaskStore', {
  state: (): AnswerTaskState => ({
    isAutoFill: true,
    answer: '',
    extendedAnswer: ''
  }),
  actions: {
    fillTextAnswer(currentTask: Task | null) {
      if (currentTask && currentTask.placeholder) {
        this.answer = currentTask.placeholder
      }
    },
    setAnswer(value?: string) {
      this.answer = value
    },
    setExtendedAnswer(value?: string) {
      this.extendedAnswer = value
    },
    setIsAutoFill(value: boolean) {
      this.isAutoFill = value
    },
    setFileName(value?: string) {
      this.fileName = value
    }
  }
})
