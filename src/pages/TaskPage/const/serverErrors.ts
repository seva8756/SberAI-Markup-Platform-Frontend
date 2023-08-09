export enum TaskServerErrors {
  NO_TASK_AVAILABLE = 'errNoTasksAvailable'
}

export const taskErrorsMapper: Record<TaskServerErrors, string> = {
  [TaskServerErrors.NO_TASK_AVAILABLE]: 'Вы выполнили все задания в этом проекте!'
}
