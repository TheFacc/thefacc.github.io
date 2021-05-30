<template>
  <main class="container">
    <circle-svg
      svgid="areas"
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
import CircleSvg from '~/components/CircleSvg.vue'

export default {
  components: { CircleSvg },
  data() {
    return {
      areas: [
        {
          name: 'Cloud computing',
          desc: 'Some area description',
          path: '/areas/1',
          color: '#F44336',
          icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
        },
        {
          name: 'Analytics',
          desc: 'Some area description',
          path: '/areas/2',
          color: '#4CAF50',
          icon: require('~/assets/icons/area-analytics-2.svg?raw'),
        },
        {
          name: 'Machine learning',
          desc: 'Some area description',
          path: '/areas/3',
          color: '#FFC107',
          icon: require('~/assets/icons/area-machine-learning.svg?raw'),
        },
        {
          name: 'Blockchain',
          desc: 'Some area description',
          path: '/areas/4',
          color: '#00BCD4',
          icon: require('~/assets/icons/area-blockchain.svg?raw'),
        },
      ],
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
      this.goTo(item.path)
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
}
</style>
