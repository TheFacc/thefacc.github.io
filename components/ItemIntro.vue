<template>
  <section class="item-intro">
    <div class="intro-left">
      <h1>{{ item.name }}</h1>
      <p>{{ item.introShort }}</p>
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
        :text="
          items[itemId] === item
            ? ['Area', 'switcher']
            : [items[itemId].name, 'product']
        "
        spacing="left"
        :display="[1, 0, 0]"
        :center-info="true"
        @itemClicked="onClickChild"
      ></circle-svg>
    </div>
  </section>
</template>

<script>
// import { Linear } from 'gsap'

export default {
  props: {
    // item of the page
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    // items in the circle
    items: {
      type: Array,
      default() {
        return []
      },
    },
    // item to activate in the circle
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
    /* [/plugin:chromajs]
    // COLOR
    const chroma = this.$chromajs
    // set bg color based on current area: (also highlight current area in circle)
    const color0 = chroma(this.items[this.itemId].color).set('hsl.l', 0.2).hex()
    const color2 = chroma(this.items[this.itemId].color).set('hsl.h', 0).set('hsl.s', 0.8).set('hsl.l', 0.1).hex()
    document.querySelector('.item-intro').style.background = `linear-gradient(130deg, ${color0} 50%, ${color2} 50.05%)`
    // ).style.background = `linear-gradient(130deg, #ff7a18,#af002d 41%, #319197 75%)` // original
    [/plugin:chromajs] */

    // replace chromajs functionality with a function
    document.querySelector(
      '.item-intro'
    ).style.background = `linear-gradient(130deg, 
      ${this.changeColorBrightness(this.items[this.itemId].color, -50)}
       50%,
      ${this.changeColorBrightness(this.items[this.itemId].color, -70)} 
      50.05%)`

    /* [plugin:scrollmagic]
    // PARALLAX SCROLL
    require('animation.gsap')
    require('debug.addIndicators')
    const controller = new this.$scrollmagic.Controller({
      globalSceneOptions: { triggerHook: 'onEnter', duration: '120%' },
    })
    new this.$scrollmagic.Scene({
      duration: 30, // the scene should last for a scroll distance of 100px
      // offset: 0, // start this scene after scrolling for 50px
    })
      // .setPin('.item-intro') // pins the element for the the scene's duration
      .setTween('.item-intro', { y: '80%', ease: Linear.easeInOut })
      .addIndicators() // DEBUG
      .addTo(controller) // assign the scene to the controller
      [/plugin:scrollmagic] */
  },
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
    onClickChild(item) {
      this.goTo('/areas/' + item.id)
    },
    changeColorBrightness(color, offset) {
      // INPUT: color:   hex (with or without #)
      //        offset:  % (from -100 to 100)
      let needHash = false
      if (color[0] === '#') {
        color = color.slice(1)
        needHash = true
      }
      const hex = parseInt(color, 16)
      let r = hex >> 16
      r += (r * offset) / 100
      if (r > 255) r = 255
      else if (r < 0) r = 0

      let g = (hex >> 8) & 0x00ff
      g += (g * offset) / 100
      if (g > 255) g = 255
      else if (g < 0) g = 0

      let b = hex & 0x0000ff
      b += (b * offset) / 100
      if (b > 255) b = 255
      else if (b < 0) b = 0

      return (needHash ? '#' : '') + (b | (g << 8) | (r << 16)).toString(16)
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
