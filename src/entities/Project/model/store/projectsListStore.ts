import type { Project } from '../..'
import { $api } from '@/shared/api/api'
import { defineStore } from 'pinia'
import type { ProjectsListState } from '../types/projectListTypes'
import { ProjectsFilterCategory } from '../../const/projectsListConsts'

export const useProjectsListStore = defineStore('projectsListStore', {
  state: (): ProjectsListState => ({
    projects: [],
    category: ProjectsFilterCategory.ALL,
    isLoading: false
  }),
  getters: {
    getProjectById: (state) => {
      return (projectId: string) => state.projects.find((project) => project.ID === +projectId)
    }
  },
  actions: {
    async fetchProjects() {
      try {
        this.isLoading = true
        const response = await $api.get<Project[]>('/projects/all')
        this.projects = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    addNewProject(project: Project) {
      this.projects.push(project)
    },
    changeCategory(category: ProjectsFilterCategory) {
      this.category = category
    }
  }
})
