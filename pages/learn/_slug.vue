<template>
  <div>
    <nuxt-content :document="article" tag="article" />
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
    let tit = this.article.title
    this.$store.commit('setTheme', 'default')
    this.$store.commit('setTitle', tit)
    this.$store.commit('updateRoute', {
      title: tit,
      url: window.location.href,
    })
  },
}
</script>
