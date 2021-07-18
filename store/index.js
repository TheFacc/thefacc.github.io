export const state = () => ({
  title: '',
  theme: '#d2d2d2',
})
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
}
