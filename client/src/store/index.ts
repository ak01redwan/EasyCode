import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    showUsersWithType: '',
    userInUserDetailsPage: null,
    courseInCourseDatailsPage: null,
    stageInLessonPage: null,
    stageInExamPage: null,
    stageInShowAskedProjectPage: null
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    login({ commit }, user) {
      // Perform login logic here
      commit('setUser', user)
    },
    logout({ commit }) {
      // Perform logout logic here
      commit('setUser', null)
    }
  }
})
