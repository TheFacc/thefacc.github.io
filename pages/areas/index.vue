<template>
  <main class="container">
    <circle-even
      :vbox="vbox"
      :items="areas"
      :main-cx="mainCx"
      :main-cy="mainCy"
      :main-r="mainR"
      spacing="even"
    ></circle-even>
  </main>
</template>

<script>
import CircleEven from '~/components/CircleEven.vue'

export default {
  components: { CircleEven },
  data() {
    return {
      areas: [
        {
          name: 'Cloud computing',
          desc: 'Some area description',
          path: '#',
          color: '#F44336',
        },
        {
          name: 'Analytics',
          desc: 'Some area description',
          path: '#',
          color: '#4CAF50',
        },
        {
          name: 'Machine learning',
          desc: 'Some area description',
          path: '#',
          color: '#FFC107',
        },
        {
          name: 'Blockchain',
          desc: 'Some area description',
          path: '#',
          color: '#00BCD4',
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
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
}
</style>
