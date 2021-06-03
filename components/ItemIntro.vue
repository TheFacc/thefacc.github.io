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
        :activate-item="$route.params.id - 1"
        :text="['Area', 'switcher']"
        spacing="left"
        @itemClicked="onClickChild"
      ></circle-svg>
    </div>
  </section>
</template>

<script>
const chroma = require('chroma-js')

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
          // name: 'Cloud computing',
          path: '/areas/1',
          color: '#F44336',
          icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
        },
        {
          // name: 'Analytics',
          path: '/areas/2',
          color: '#4CAF50',
          icon: require('~/assets/icons/area-analytics-2.svg?raw'),
        },
        {
          // name: 'Machine learning',
          path: '/areas/3',
          color: '#FFC107',
          icon: require('~/assets/icons/area-machine-learning.svg?raw'),
        },
        {
          // name: 'Blockchain',
          path: '/areas/4',
          color: '#00BCD4',
          icon: require('~/assets/icons/area-blockchain.svg?raw'),
        },
      ],
      mainCx: 450,
      mainCy: 250,
      mainR: 150,
      vbox: '240 0 400 500',
      // item: { title: 'tit', intro: 'dxx' }, // to be later retrieved from db
    }
  },
  mounted() {
    // this.$nuxt.$emit('item', this.item) // pass retrieved item to item-layout
    // set bg color based on current area: (also highlight current area in circle)
    const color0 = chroma(this.item.color).set('hsl.l', 0.2).hex()
    // const color1 = chroma(this.item.color)
    //   .set('hsl.h', 20)
    //   .set('hsl.s', 0.5)
    //   .set('hsl.l', 0.3)
    //   .hex()
    const color2 = chroma(this.item.color)
      // .set('hsl.h', 0)
      .set('hsl.s', 0.8)
      .set('hsl.l', 0.1)
      .hex()
    document.querySelector(
      '.item-intro'
    ).style.background = `linear-gradient(130deg, ${color0} 50%, ${color2} 50.05%)`
    // ).style.background = `linear-gradient(130deg, #ff7a18,#af002d 41%, #319197 75%)` // original
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
  justify-content: space-evenly;
  align-items: center;
  /* box-shadow: inset 0 0 5em -2em #000; */
}
.intro-left,
.intro-right {
  position: relative;
}
.intro-left {
  width: 25%;
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
