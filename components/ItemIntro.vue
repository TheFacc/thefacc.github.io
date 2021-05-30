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
        @itemClicked="onClickChild"
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
          path: '/areas/1',
          color: '#F44336',
          icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
        },
        {
          name: 'Analytics',
          path: '/areas/2',
          color: '#4CAF50',
          icon: require('~/assets/icons/area-analytics-2.svg?raw'),
        },
        {
          name: 'Machine learning',
          path: '/areas/3',
          color: '#FFC107',
          icon: require('~/assets/icons/area-machine-learning.svg?raw'),
        },
        {
          name: 'Blockchain',
          path: '/areas/4',
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
  mounted() {
    // this.$nuxt.$emit('item', this.item) // pass retrieved item to item-layout
    // set bg color based on current area: (also highlight current area in circle)
    // document.querySelector('.item-intro').style.background = 'linear-gradient(130deg,#ff7a18,#af002d 41.07%,#319197 76.05%)'
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
  fill: #ddd;
}
@media screen and (max-width: 768px) {
  .intro-right svg {
    display: none;
  }
}
</style>
