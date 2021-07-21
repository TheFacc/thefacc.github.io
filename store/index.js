import Vue from 'vue'

export const state = () => {
  return {
    title: '', // text to inject in header
    theme: '#d2d2d2', // header theme
    messages: [], // chatbot
    // path history for dynamic 'back' button where needed
    pageCurrent: {},
    pagePrevious: {},
  }
}

export const mutations = {
  setTitle(state, value) {
    state.title = value
  },
  setTheme(state, value) {
    if (value === 'default' || value === '') {
      state.theme = '#d2d2d2'
      document.body.classList.remove('darkbody')
    } else if (value === 'dark') {
      state.theme = '#ffffff'
      document.body.classList.add('darkbody')
    } else {
      state.theme = value
      document.body.classList.remove('darkbody')
    }
  },
  updateRoute(state, value) {
    state.pagePrevious = state.pageCurrent
    state.pageCurrent = value
  },
  addMessage(state, message) {
    const messages = state.messages
    messages.push(message)
    Vue.set(state, 'messages', messages)
  },
}
