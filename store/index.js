import Vue from 'vue'

export const state = () => {
  return {
    title: '',
    theme: '#d2d2d2',
    messages: [],
  }
}

export const mutations = {
  setTitle(state, value) {
    state.title = value
  },
  setTheme(state, value) {
    if (value === 'default') {
      state.theme = '#d2d2d2'
    } else {
      state.theme = value
    }
  },
  addMessage(state, message) {
    const messages = state.messages
    messages.push(message)
    Vue.set(state, 'messages', messages)
  },
}