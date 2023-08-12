import type { Task } from '@/entities/Task'

export interface CurrentTaskState {
  currentTask: Task | null
  cachedTasks: Task[]
  paginationIds: number[]
  currentPaginationIndex: number
  answer?: string
  isLoading: boolean
  isAutoFill: boolean
  error: null
}
