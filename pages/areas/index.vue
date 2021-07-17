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
      mainCx: 450,
      mainCy: 250,
      mainR: 150,
      vbox: '0 0 900 450',
    }
  },
  head() {
    return {
      title: 'Areas',
    }
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
  margin: 0 auto;
}
</style>
