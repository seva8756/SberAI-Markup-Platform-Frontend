import type { FlexAlign, FlexGap, FlexJustify } from '@/shared/types/flex'
import {
  alignClasses,
  directionClasses,
  gapClasses,
  justifyClasses
} from '@/shared/const/flexMappers'

export const getVStack = (
  justify: FlexJustify = 'start',
  gap?: FlexGap,
  max: boolean = false,
  align: FlexAlign = 'center'
) => {
  return [
    directionClasses['column'],
    justifyClasses[justify],
    alignClasses[align],
    gap && gapClasses[gap]
  ].join(' ')
}
