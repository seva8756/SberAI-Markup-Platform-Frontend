import $api from '@/shared/api/api'
import type { Task } from '@/entities/Task'

export default class TaskService {
  static async fetchNewTask(projectId: number) {
    return $api.get<Task>(`/projects/task-selection/${projectId}`)
  }
  static async fetchTaskById(projectId: number, taskId: number) {
    return $api.get<Task>(`/projects/${projectId}/task/${taskId}`)
  }

  static async sendAnswer(
    projectId: number,
    taskId: number,
    answer: string,
    answer_extended?: string
  ) {
    return $api.post('/projects/task-answer', {
      project_id: projectId,
      task_id: taskId,
      answer: answer,
      answer_extended: answer_extended ? answer_extended : undefined
    })
  }
}
