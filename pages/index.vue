<template>
  <div>
    <nuxt-content :document="page" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Home',
    }
  },
  mounted() {
    this.$store.commit('setTheme', 'default')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'Home',
      url: window.location.href,
    })
  },
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    const page = await $content(slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Markdown file not found' })
      })

    return {
      page,
    }
  },
}
</script>
