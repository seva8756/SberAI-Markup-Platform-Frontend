interface ImageComponentData {
  images: string[]
}

interface TextComponentData {
  placeholder?: string
}

export type ComponentTaskData = ImageComponentData | TextComponentData

export interface Task {
  index: number
  answer?: Record<string, string>
  components: Record<string, ComponentTaskData>
  question?: string
}
