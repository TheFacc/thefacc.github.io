<template>
  <div
    class="d-flex flex-column flex-md-row ma-4 ma-md-12 justify-space-around"
  >
    <nuxt-content
      :document="article"
      tag="article"
      ref="nuxtContent"
      class="fancy"
    />
    <acronyms
      v-if="article && article.acronyms"
      :acronyms="article.acronyms"
    ></acronyms>
  </div>
</template>

<script>
// note: the page does not directly use the article stored in $store,
//       cos in that case the article content would update instantly,
//       before changing page - and animating... ;)
import Acronyms from '~/components/Acronyms.vue'
export default {
  components: { Acronyms },
  async asyncData({ $content, params, store, error }) {
    const slug = params.slug || 'index'
    const article = await $content('learn', slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Markdown file not found' })
      })
    store.commit('setArticle', article)
    return { article } // also return it
  },
  head() {
    return {
      title: this.$store.state.article.title,
    }
  },
  mounted() {
    let tit = this.$store.state.article.title
    // this.$store.commit('setTheme', 'default')
    this.$store.commit('setTitle', tit)
    this.$store.commit('updateRoute', {
      title: tit,
      url: window.location.href,
    })
  },
}
</script>
