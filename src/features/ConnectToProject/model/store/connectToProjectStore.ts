import { defineStore } from 'pinia'
import type { ConnectToProjectState } from '../types/connectToProjectState'
import $api from '@/shared/api/api'
import type { Project } from '@/entities/Project'
import { useProjectsListStore } from '@/entities/Project'

export const useConnectToProjectStore = defineStore('connectToProject', {
  state: (): ConnectToProjectState => ({
    code: '',
    password: '',
    isLoading: false,
    error: ''
  }),
  actions: {
    async connectToProject() {
      try {
        const projectsListStore = useProjectsListStore()
        this.isLoading = true
        const response = await $api.post<Project>('/projects/join', {
          code: this.code,
          password: this.password
        })

        projectsListStore.addNewProject(response.data)
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
})
