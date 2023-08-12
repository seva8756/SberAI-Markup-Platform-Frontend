export interface Task {
  images: string[]
  index: number
  placeholder?: string
  answer?: string
}

// export interface ChoiceTask extends Task {
//   answer_type: AnswerType.CHOICE
//   variants: Record<string, number>
// }
//
// export interface TextTask extends Task {
//   answer_type: AnswerType.TEXT
//   placeholder: string
// }
