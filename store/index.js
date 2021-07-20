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
  addMessage(state, message) {
    const messages = state.messages
    messages.push(message)
    Vue.set(state, 'messages', messages)
  },
}
