<template>
  <main class="container">
    <section class="article-grid">
      <div
        v-for="(article, articleIndex) of articles"
        :key="'art-' + articleIndex"
        class="article"
        @click="$goTo(`/blog/${article.id}`)"
      >
        <article-mini
          :date="article.updatedAt.slice(0, 10)"
          :title="article.title"
          :summary="article.summary"
          :image="article.image"
        ></article-mini>
      </div>
    </section>
  </main>
</template>

<script>
// import axios from 'axios'
import ArticleMini from '~/components/ArticleMini.vue'
export default {
  components: {
    ArticleMini,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/article`)
    const articles = data
    return {
      articles,
    }
  },
  // data() {
  //   return {
  //     adUrl: '',
  //   }
  // },
  mounted() {
    //   setTimeout(async () => {
    //     const { data } = await axios.get('/api/ad')
    //     this.adUrl = data.url
    //   }, 1000)
    this.$store.commit('setTheme', 'dark')
    this.$store.commit('setTitle', '')
  },
}
</script>

<style scoped>
.article-grid {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 40px;
}
.article {
  cursor: pointer;
  margin-bottom: 20px;
}
@media screen and (min-width: 768px) {
  .article-grid {
    width: 70%;
  }
}
</style>
