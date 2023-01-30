<template>
  <div>
    <nuxt-content :document="article" />
    <coming-soon></coming-soon>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const article = await $content('learn', slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Markdown file not found' })
      })
    return { article }
  },
  head() {
    return {
      title: 'Solutions',
    }
  },
  mounted() {
    this.$store.commit('setTheme', 'default')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'Solutions',
      url: window.location.href,
    })
  },
}
</script>
