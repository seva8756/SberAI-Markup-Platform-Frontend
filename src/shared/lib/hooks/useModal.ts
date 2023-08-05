import { type Ref, ref, type UnwrapRef } from 'vue'

interface useModalBind<T> {
  closeModal: () => void
  openModal: (extra: T) => void
  extra: T | null
}

export function useModal<T>(): [
  Ref<UnwrapRef<boolean>>,
  {
    extra: Ref<T | null>
    openModal: (extraValue?: T | null) => void
    closeModal: () => void
  }
] {
  const isVisible = ref(false)
  const extra = ref<T | null>(null) as Ref<T | null>

  const closeModal = () => {
    isVisible.value = false
    extra.value = null
  }

  const openModal = (extraValue: T | null = null) => {
    isVisible.value = true

    if (extraValue) {
      extra.value = extraValue
    }
  }
  return [isVisible, { closeModal, openModal, extra: extra }]
}
