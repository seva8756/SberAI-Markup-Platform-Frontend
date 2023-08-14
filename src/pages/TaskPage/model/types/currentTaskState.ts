import type { Task } from '@/entities/Task'
import type { Project } from '@/entities/Project'

export interface CurrentTaskState {
  currentTask: Task | null
  cachedTasks: Task[]
  currentProject?: Project
  noTasksAvailable: boolean
  paginationIds: number[]
  currentPaginationIndex: number
  isLoading: boolean
  error: null
}
