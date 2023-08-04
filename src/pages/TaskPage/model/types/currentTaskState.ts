import type { Task } from '@/entities/Task'

export interface CurrentTaskState {
  currentTask: Task | null
  answer?: string
  isLoading: boolean
  error: null
}
