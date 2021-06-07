<template>
  <section class="item-intro">
    <div class="intro-left">
      <h1>{{ items[itemId].name }}</h1>
      <p>{{ items[itemId].introShort }}</p>
    </div>
    <div class="intro-right">
      <circle-svg
        svgid="svg-intro"
        :vbox="vbox"
        :items="items"
        :main-cx="mainCx"
        :main-cy="mainCy"
        :main-r="mainR"
        :activate-item="itemId"
        :text="['Area', 'switcher']"
        spacing="left"
        :display="[1, 0, 0]"
        :centerInfo="true"
        @itemClicked="onClickChild"
      ></circle-svg>
    </div>
  </section>
</template>

<script>
// import { Linear } from 'gsap'

export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    itemId: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      mainCx: 450,
      mainCy: 250,
      mainR: 150,
      vbox: '240 0 400 500',
    }
  },
  mounted() {
    // COLOR
    const chroma = this.$chromajs
    // set bg color based on current area: (also highlight current area in circle)
    const color0 = chroma(this.items[this.itemId].color).set('hsl.l', 0.2).hex()
    const color2 = chroma(this.items[this.itemId].color)
      // .set('hsl.h', 0)
      .set('hsl.s', 0.8)
      .set('hsl.l', 0.1)
      .hex()
    document.querySelector(
      '.item-intro'
    ).style.background = `linear-gradient(130deg, ${color0} 50%, ${color2} 50.05%)`
    // ).style.background = `linear-gradient(130deg, #ff7a18,#af002d 41%, #319197 75%)` // original

    // // PARALLAX SCROLL
    // require('animation.gsap')
    // require('debug.addIndicators')
    // const controller = new this.$scrollmagic.Controller({
    //   globalSceneOptions: { triggerHook: 'onEnter', duration: '120%' },
    // })
    // new this.$scrollmagic.Scene({
    //   duration: 30, // the scene should last for a scroll distance of 100px
    //   // offset: 0, // start this scene after scrolling for 50px
    // })
    //   // .setPin('.item-intro') // pins the element for the the scene's duration
    //   .setTween('.item-intro', { y: '80%', ease: Linear.easeInOut })
    //   .addIndicators() // DEBUG
    //   .addTo(controller) // assign the scene to the controller
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
.item-intro {
  width: 100%;
  height: 300px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  /* box-shadow: inset 0 0 5em -2em #000; */
}
/* .item-intro::before {
  content: '';
  position: absolute;
  height: 70%;
  width: 100%;
  z-index: -1;
  background: linear-gradient(
    130deg,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 50.05%
  );
} */
.item-intro::after {
  content: '';
  position: absolute;
  height: 500%;
  width: 100%;
  z-index: -9999;
  background: linear-gradient(
    130deg,
    rgb(112, 112, 112) 50%,
    transparent 50.05%
  );
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
