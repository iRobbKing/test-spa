import {createStore} from 'vuex'

export default createStore({
  state() {
    return {
      editedNote: null
    }
  },

  getters: {},

  mutations: {
    setEditedNote(state, note) {
      state.editedNote = note
    }
  },

  actions: {},

  modules: {},
})
