import Vue from 'vue'

export const state = () => {
  return {
    theme: '#d2d2d2', // header theme
    title: '', // text to inject in header
    article: {},
    // messages: [], // chatbot
    // path history for dynamic 'back' button where needed (only 1 level, could be extended to infinite...)
    pageCurrent: {},
    pagePrevious: {},
  }
}

export const mutations = {
  setTitle(state, value) {
    state.title = value
  },
  // setTheme(state, value) {
  //   if (value === 'default' || value === '') {
  //     state.theme = '#d2d2d2'
  //     document.body.classList.remove('darkbody')
  //   } else if (value === 'dark') {
  //     state.theme = '#ffffff'
  //     document.body.classList.add('darkbody')
  //   } else {
  //     state.theme = value
  //     document.body.classList.remove('darkbody')
  //   }
  // },
  setArticle(state, value) {
    state.article = value
    if (state.article.acronyms) state.article.acronyms.sort()
  },
  updateRoute(state, value) {
    state.pagePrevious = state.pageCurrent
    state.pageCurrent = value
  },
}
