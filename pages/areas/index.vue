<template>
  <main class="container">
    <circle-svg
      svgid="svg-areas"
      :vbox="vbox"
      :items="areas"
      :main-cx="mainCx"
      :main-cy="mainCy"
      :main-r="mainR"
      :spacing="'even'"
      @itemClicked="onClickChild"
    ></circle-svg>
  </main>
</template>

<script>
import CircleSvg from '~/components/CircleSvg.vue'

export default {
  components: { CircleSvg },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/area`)
    const areas = data
    areas.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    return {
      areas,
    }
  },
  data() {
    return {
      mainCx: 475,
      mainCy: 250,
      mainR: 150,
      vbox: '0 0 950 450',
    }
  },
  head() {
    return {
      title: 'Areas',
    }
  },
  mounted() {
    this.$store.commit('setTheme', 'default')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'All Areas',
      url: window.location.href,
    })
  },
  methods: {
    onClickChild(item) {
      this.$goTo('/areas/' + item.id)
    },
  },
}
</script>

<style scoped>
.container {
  margin: 10px auto;
}
</style>
