import { defineStore } from 'pinia'
import type { ConnectToProjectState } from '../types/connectToProjectState'
import $api from '@/shared/api/api'
import type { Project } from '@/entities/Project'
import { useProjectsListStore } from '@/entities/Project'
import { NotificationType, useNotificationStore } from '@/entities/Notification'
import { connectionErrMapper, type ConnectionToProjectErrors } from '../const/errors'
import { AxiosError } from 'axios'

export const useConnectToProjectStore = defineStore('connectToProject', {
  state: (): ConnectToProjectState => ({
    code: '',
    password: '',
    isLoading: false,
    error: ''
  }),
  actions: {
    async connectToProject() {
      const { addNotification } = useNotificationStore()
      try {
        const projectsListStore = useProjectsListStore()
        this.isLoading = true
        const response = await $api.post<Project>('/projects/join', {
          code: this.code,
          password: this.password
        })

        projectsListStore.addNewProject(response.data)
      } catch (e) {
        if (e instanceof AxiosError) {
          const axiosError = JSON.parse(e.response?.data?.error)
          this.error = axiosError.name
          addNotification({
            message: connectionErrMapper[this.error as ConnectionToProjectErrors],
            notificationType: NotificationType.ERROR
          })
        }
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
