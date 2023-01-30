<template>
  <div>
    <!-- Intro -->
    <nuxt-content :document="page" />

    <!-- Search -->
    <div class="search ma-auto" role="search">
      <v-input class="v-input mx-4 mx-md-12">
        <v-text-field
          v-model="search"
          label="Search..."
          hide-details="auto"
          :error="filteredListSearch.length === 0"
          rounded
          class="grey lighten-3 rounded-xl px-6 py-4"
        >
          <v-icon slot="prepend" color="grey"> mdi-magnify </v-icon>
        </v-text-field>
      </v-input>
      <!-- <div>
        <input
          v-model="searchContent"
          type="checkbox"
          role="checkbox"
          value="searchContent"
        /><label for="searchContent"> Also search inside articles</label>
      </div> -->
    </div>

    <!-- List -->
    <section role="feed">
      <h4 v-if="filteredListSearch.length === 0">No articles found.</h4>
      <transition-group
        name="article"
        class="d-flex justify-space-around flex-column flex-sm-row"
      >
        <v-card
          v-for="article of filteredListSearch"
          :key="'art-' + article.title"
          role="article"
          class="card ma-4 align-self-start"
          :class="{
            bounce: animating >= 0 ? article.id === animating : false,
          }"
          @click="
            animating = article.id
            $goTo(`/learn/${article.slug}`)
          "
          @animationend="animating = -1"
        >
          <v-img
            :src="require(`~/assets/images/learn/${article.slug}.jpg`)"
            height="200"
            class="align-end"
            gradient="to top, black 0, transparent 50%"
          >
            <v-card-title class="white--text py-0">
              <h4 class="ml-3">{{ article.title }}</h4>
            </v-card-title>
          </v-img>
          <v-card-text>
            <div class="font-weight-bold ml-1 mb-2">Topics</div>
            <v-timeline align-top dense class="ml-n6 pt-0">
              <v-timeline-item
                v-for="topic in article.topics"
                :key="topic"
                :color="article.color"
                small
                class="pb-2"
              >
                {{ topic }}
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </transition-group>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const page = await $content('learn', 'index')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Markdown file not found' })
      })
    const articles = await $content('learn', params.slug)
      .where({ slug: { $regex: '^(?!.*[0-9])(?!.*index).*$' } }) // ignore index and numbered files
      .sortBy('createdAt', 'asc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Markdown file not found' })
      })
    return { page, articles }
  },
  data() {
    return {
      // for filtering
      // filterby: 0, // 0 = All
      search: '', // search query
      // searchContent: false, // option to also search inside article // can't get full-text search in $content. https://github.com/nuxt/content/issues/1507
      animating: -1, // clicked article.id to bounce-animate it
    }
  },
  head() {
    return {
      title: 'Learn',
    }
  },
  computed: {
    filteredListSearch() {
      return this.articles.filter((art) => {
        let txt = art.title + ' ' + art.description
        for (let i = 0; i < art.topics.length; i++) {
          txt += ' ' + art.topics[i]
        }
        // if (this.searchContent) {
        //   txt += art.content
        // }
        return txt.toLowerCase().includes(this.search.toLowerCase())
      })
    },
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

<style scoped>
.search {
  max-width: 600px;
}

/* cards hover */
.card,
.card .img {
  /* overflow: hidden; */
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.card {
  background: white;
  color: #222;
  /* padding: 20px 10px; */
  cursor: pointer;
  margin: 5px;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
  max-width: 300px;
}
.card:hover {
  transform: scale(1.02);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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
  position: absolute;
  z-index: -1;
}
.article-leave-active,
.article-enter-active {
  transition: all 0.35s;
}
</style>
