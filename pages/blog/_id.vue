<template>
  <div>
    <!-- article header -->
    <div class="article-img">
      <div ref="imgbg" class="img"></div>
      <img :src="article.image" />
    </div>
    <back-button text="All articles" path="/blog"></back-button>

    <!-- article -->
    <article class="container">
      <span>{{ article.updatedAt.slice(0, 10) }}</span>
      <h1>{{ article.title }}</h1>
      <h4>{{ article.summary }}</h4>
      <div v-html="article.content"></div>
    </article>

    <section class="container">
      <!-- comments -->
      <div class="comments">
        <h3>Comments</h3>
        <h4 v-if="article.comments.length === 0">There are no comments</h4>
        <div
          v-for="(comment, commentIndex) of article.comments"
          :key="'comments-' + commentIndex"
          class="comment"
        >
          <div>
            <span class="author"> {{ comment.author }}</span
            ><span class="date">
              - posted on {{ new Date(comment.createdAt).getDate() }}/{{
                new Date(comment.createdAt).getMonth()
              }}/{{ new Date(comment.createdAt).getFullYear() }}</span
            >
          </div>
          <div class="content">{{ comment.content }}</div>
        </div>
      </div>
      <!-- recent articles -->
      <div class="recents">
        <h1>Recent articles</h1>
        <div class="article-grid">
          <div
            v-for="(article, articleIndex) of recents"
            :key="'art-' + articleIndex"
            class="article"
            @click="$goTo(`/blog/${article.id}`)"
          >
            <article-mini
              :date="article.updatedAt.slice(0, 10)"
              :title="article.title"
              :summary="article.summary"
              :image="article.image"
              format="col"
            ></article-mini>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ArticleMini from '~/components/ArticleMini.vue'
import BackButton from '~/components/BackButton.vue'

export default {
  components: { ArticleMini, BackButton },
  async asyncData({ $axios, route }) {
    const article = await $axios.$get(
      `${process.env.BASE_URL}/api/article/${route.params.id}`
    )
    const recents = await $axios
      .get(`${process.env.BASE_URL}/api/article`)
      .then((res) => {
        return (
          res.data
            .filter(function (art) {
              // remove current article
              return art.id !== parseInt(route.params.id)
            })
            // reverse sort
            .sort((a, b) => (a.id > b.id ? -1 : b.id > a.id ? 1 : 0))
            // get latest 3
            .slice(0, 3)
        )
      })
    return {
      article,
      recents,
    }
  },
  mounted() {
    this.$store.commit('setTheme', 'dark')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'Previous article',
      url: window.location.href,
    })
    this.$refs.imgbg.style.backgroundImage = `url(${this.article.image})`
  },
}
</script>

<style scoped>
/* ARTICLE HEADER */
.article-img {
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 67px;
  z-index: -1;
}
.article-img .img {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 300px;
  filter: blur(20px);
}
img {
  max-width: 600px;
}

/* ARTICLE */
article {
  text-align: justify;
  padding: 50px 10%;
  margin: 0 auto;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(20px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
article p {
  font-size: 1em;
}
article h1 {
  text-align: left;
}
article p,
article h1,
article h2,
article h3,
article h4,
article h5,
article h6 {
  margin: 20px 0;
}
article h4 {
  margin: 40px 0;
}

/* COMMENTS */
section.container {
  margin-top: -10px;
  background: #222;
}
.comments {
  text-align: left;
  margin: auto;
  padding: 60px 5%;
  max-width: 700px;
}
.comment {
  padding: 20px;
  margin: 10px;
  color: black;
  background: #dadada;
  border: 1px solid darkgray;
  border-radius: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.comment .date {
  color: darkgray;
  font-size: 14px;
}
.comment .author {
  color: #3f51b5;
  font-weight: 800;
}

/* RECENTS */
.article-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-evenly;
  margin-top: 20px;
}
.article-grid .article {
  cursor: pointer;
  margin-bottom: 20px;
}
@media screen and (min-width: 768px) {
  .article-grid .article {
    width: 30%;
  }
}
@media screen and (max-width: 767px) {
  .article-grid .article {
    width: 100%;
  }
}
</style>
