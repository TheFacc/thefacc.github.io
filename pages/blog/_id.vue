<template>
  <section>
    <div class="article-img">
      <!-- <div
        class="img"
        :style="{
          'background-image': `url(${article.image});`,
        }"
      ></div> -->
      <img :src="article.image" />
    </div>
    <div
      class="goback"
      :class="{ bounce: animated }"
      @click="
        animated = true
        $goTo('/blog')
      "
      @animationend="animated = false"
    >
      <p>&lt;</p>
    </div>
    <article class="container">
      <span>{{ article.updatedAt.slice(0, 10) }}</span>
      <h1>{{ article.title }}</h1>
      <h4>{{ article.summary }}</h4>
      <div v-html="article.content"></div>
    </article>
    <section class="comments">
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
    </section>
  </section>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(
      `${process.env.BASE_URL}/api/article/${route.params.id}`
    )
    const article = data
    return {
      article,
    }
  },
  data() {
    return {
      animated: false,
    }
  },
  mounted() {
    this.$store.commit('setTheme', 'dark')
    this.$store.commit('setTitle', '')
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
.goback {
  position: absolute;
  padding: 20px;
  width: 60px;
  height: 60px;
  top: 77px;
  left: 10px;
  font-size: 32px;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  /* transform: scale(0.7); */
  transition: 0.2s;
}
.goback:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.goback p {
  transform: translateY(-50%);
}

/* ARTICLE */
article {
  text-align: justify;
  padding: 50px 10%;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(20px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
article p {
  font-size: 1em;
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
  margin: 30px 0;
}

/* COMMENTS */
.comments {
  text-align: left;
  margin: 60px auto;
  max-width: 700px;
}
.comment {
  padding: 20px;
  margin: 10px;
  color: black;
  background: #f7f7f7;
  border: 1px solid darkgray;
  border-radius: 15px;
}
.comment .date {
  color: darkgray;
  font-size: 14px;
}
.comment .author {
  color: #3f51b5;
  font-weight: 800;
}
</style>
