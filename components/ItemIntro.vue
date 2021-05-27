<template>
  <section class="item-intro">
    <div class="intro-left">
      <h1>{{ item.title }}</h1>
      <p>{{ item.intro }}</p>
    </div>
    <div class="intro-right">
      <circle-svg
        svgid="intro"
        :vbox="vbox"
        :items="areas"
        :main-cx="mainCx"
        :main-cy="mainCy"
        :main-r="mainR"
        spacing="left"
      ></circle-svg>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      areas: [
        {
          name: 'Cloud computing',
          path: '#',
          color: '#F44336',
          icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
        },
        {
          name: 'Analytics',
          path: '#',
          color: '#4CAF50',
          icon: require('~/assets/icons/area-analytics.svg?raw'),
        },
        {
          name: 'Machine learning',
          path: '#',
          color: '#FFC107',
          icon: require('~/assets/icons/area-machine-learning.svg?raw'),
        },
        {
          name: 'Blockchain',
          path: '#',
          color: '#00BCD4',
          icon: require('~/assets/icons/area-blockchain.svg?raw'),
        },
      ],
      mainCx: 450,
      mainCy: 250,
      mainR: 150,
      vbox: '-50 0 680 500',
      // item: { title: 'tit', intro: 'dxx' }, // to be later retrieved from db
    }
  },
  // mounted() {
  //   this.$nuxt.$emit('item', this.item) // pass retrieved item to item-layout
  // },
}
</script>

<style scoped>
.item-intro {
  width: 100%;
  height: 300px;
  padding: 20px;
  background: #222;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.intro-left,
.intro-right {
  position: relative;
}
.item-intro svg {
  height: 300px;
}
.item-intro svg {
  fill: #ddd;
}
</style>
