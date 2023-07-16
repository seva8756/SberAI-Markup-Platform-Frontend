export enum QuestionType {
  CHOICE,
  DESCRIPTION,
  FIRST
}

export type Task = {
    taskType?: QuestionType,
    imageUrl?: string,
    questions?: string[],
    answers?: string[][],
    description?: string
}