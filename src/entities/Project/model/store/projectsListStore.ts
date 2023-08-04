import type { Project } from '../..'
import { $api } from '@/shared/api/api'
import { defineStore } from 'pinia'
import type { ProjectsListState } from '../types/projectListTypes'
import { ProjectsFilterCategory } from '../../const/projectsListConsts'
import { AnswerType } from '@/entities/Task'

export const useProjectsListStore = defineStore('projectsListStore', {
  state: (): ProjectsListState => ({
    projects: [
      {
        ID: 1,
        description: 'Desc of project',
        title: 'Cool project',
        answer_type: AnswerType.TEXT
      }
    ],
    category: ProjectsFilterCategory.ALL
  }),
  getters: {
    getProjectById: (state) => {
      return (projectId: string) => state.projects.find((project) => project.ID === +projectId)
    }
  },
  actions: {
    async fetchProjects() {
      try {
        const response = await $api.get<Project[]>('/projects')
      } catch (e) {
        console.log(e)
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
