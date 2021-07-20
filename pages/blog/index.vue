<template>
  <main class="container">
    <div class="search">
      <input v-model="search" type="text" placeholder="Search articles..." />
      <div>
        <input
          v-model="searchContent"
          type="checkbox"
          value="searchContent"
        /><label for="searchContent"> Search article content</label>
      </div>
    </div>
    <section class="article-grid">
      <h4 v-if="filteredListSearch.length === 0">No articles found.</h4>
      <transition-group name="article">
        <div
          v-for="(article, articleIndex) of filteredListSearch"
          :key="'art-' + articleIndex"
          class="article"
          @click="$goTo(`/blog/${article.id}`)"
        >
          <article-mini
            :date="article.updatedAt.slice(0, 10)"
            :title="article.title"
            :summary="article.summary"
            :image="article.image"
            format="row"
          ></article-mini>
        </div>
      </transition-group>
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
    const articles = await $axios
      .get(`${process.env.BASE_URL}/api/article`)
      .then((res) => {
        // reverse sort
        return res.data.sort((a, b) => (a.id > b.id ? -1 : b.id > a.id ? 1 : 0))
      })
    return {
      articles,
    }
  },
  data() {
    return {
      search: '', // search query
      searchContent: false, // option to also search inside article
      onlyInContent: false, // warns if the content is found only inside the article
    }
  },
  computed: {
    filteredListSearch() {
      return this.articles.filter((art) => {
        let txt = art.title + art.summary
        if (this.searchContent) {
          txt += art.content
        }
        return txt.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
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
  margin: 40px auto;
}
.article {
  cursor: pointer;
}
@media screen and (min-width: 768px) {
  .article-grid {
    width: 70%;
  }
}

/* search */
.search {
  position: sticky;
  top: 67px;
  padding: 30px 0;
  background: rgba(34, 34, 34, 0.8);
  backdrop-filter: blur(7px);
  transform: scale(1.05);
  z-index: 1;
}
.search input {
  transform: scale(1.5);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-bottom: 2px solid white;
  transition: 0.1s;
}
.search input:focus {
  outline: none;
  transform: scale(1.6);
  background: transparent;
}
.search div {
  margin-top: 20px;
  margin-bottom: -20px;
}

/* <transitions> */
.article,
.article-mini {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.article-enter {
  transform: scale(0.5) translateY(-80px);
  opacity: 0;
}
.article-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.article-leave-active {
  /* position: absolute; */
  z-index: -1;
}
.article-leave-active,
.article-enter-active {
  transition: all 0.35s;
}
</style>
