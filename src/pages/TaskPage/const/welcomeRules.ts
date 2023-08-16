import { AnswerType } from '@/entities/Task'

export const welcomeRules: Record<AnswerType, { title: string; desc: string }> = {
  [AnswerType.TEXT]: {
    title: 'Опишите изображение',
    desc: 'Вам необходимо описать в текстовом формате, что вы видите на изображении, перечислить объекты, их расположение и цвета'
  },
  [AnswerType.CHOICE]: {
    title: 'Выберите верные пункты',
    desc: 'Вам необходимо выбрать верные пункты ответов к каждому вопросу представленному к изображению'
  },
  [AnswerType.IMAGE]: {
    title: 'Загрузите изображение',
    desc: 'Вам необходимо загрузить изображение соответствующее вопросу, и описать его'
  }
}
