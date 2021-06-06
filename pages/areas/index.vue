<template>
  <main class="container">
    <circle-svg
      svgid="svg-areas"
      :vbox="vbox"
      :items="areas"
      :main-cx="mainCx"
      :main-cy="mainCy"
      :main-r="mainR"
      spacing="even"
      @itemClicked="onClickChild"
    ></circle-svg>
  </main>
</template>

<script>
// import axios from 'axios'
import CircleSvg from '~/components/CircleSvg.vue'

export default {
  components: { CircleSvg },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/area`)
    const areas = data
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
    goTo(path) {
      this.$router.push({ path })
    },
    onClickChild(item) {
      this.goTo('/areas/' + item.id)
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
}
</style>
