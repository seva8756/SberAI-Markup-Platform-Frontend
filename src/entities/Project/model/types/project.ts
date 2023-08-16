import { AnswerType } from '@/entities/Task'

export interface ProjectBase {
  ID: number
  description: string
  title: string
  code: string
  completed_tasks: number[]
  answer_type: AnswerType
  question_title: string
}

export interface ProjectChoice extends ProjectBase {
  answer_type: AnswerType.CHOICE
  answer_choice: Record<string, string>
}

export interface ProjectText extends ProjectBase {
  answer_type: AnswerType.TEXT
}

export type Project = ProjectChoice | ProjectText
