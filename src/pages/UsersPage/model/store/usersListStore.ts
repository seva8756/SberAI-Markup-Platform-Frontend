import { defineStore } from 'pinia'
import type { UsersListState } from '../types/usersListState'

export const useUsersListStore = defineStore('usersList', {
  state: (): UsersListState => ({
    users: [
      {
        ID: 3,
        firstName: 'test',
        lastName: 'lasr',
        isAdmin: false
      },
      {
        ID: 5,
        firstName: 'test2',
        lastName: 'lasr',
        isAdmin: false
      },
      {
        ID: 6,
        firstName: 'test3',
        lastName: 'lasr',
        isAdmin: false
      },
      {
        ID: 7,
        firstName: 'test44',
        lastName: 'lasr',
        isAdmin: false
      }
    ],
    searchQuery: ''
  })
})
