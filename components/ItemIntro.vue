<template>
  <section ref="itemIntro" class="item-intro">
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
          itemId > -1
            ? items[itemId] === item
              ? ['Switch', 'area']
              : [items[itemId].name, 'product']
            : ['Go to', 'area']
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
      default: -1,
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

    // replace chromajs functionality with a custom built function
    if (this.itemId > -1) {
      // a theme color was given: set as bg (with some color changes)
      this.$refs.itemIntro.style.background = `linear-gradient(130deg, 
      ${this.$changeColorBrightness(this.items[this.itemId].color, -50)}
       50%,
      ${this.$changeColorBrightness(this.items[this.itemId].color, -70)} 
      50.05%)`
    } else {
      // no theme was given: cycle all available areas colors, but be discreet!
      const colors = []
      this.items.forEach((item) => {
        let c = item.color
        c = this.$changeColorBrightness(item.color, -40)
        c = this.$hex2rgb(c)
        colors.push(`rgba(${c},0.5)`)
      })
      this.$refs.itemIntro.style.background = `linear-gradient(130deg, ${colors})`
      this.$refs.itemIntro.style.animation = 'wavedient 20s linear infinite'
      this.$refs.itemIntro.style.animationDirection = 'alternate'
      this.$refs.itemIntro.style.backgroundSize = '8000%'
    }

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
    onClickChild(item) {
      this.$goTo('/areas/' + item.id)
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
  height: 2000px;
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
.intro-right {
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-intro svg {
  height: 300px;
  fill: #ddd;
}
@media screen and (min-width: 768px) {
  .intro-left {
    width: 40%;
  }
  .intro-right:after {
    content: '';
    background: rgba(0, 0, 0, 0.4);
    border-radius: 100%;
    height: 180px;
    width: 180px;
    z-index: -1;
    position: absolute;
    transform: translateX(6px);
  }
}
@media screen and (max-width: 768px) {
  .intro-right svg {
    display: none;
  }
}
</style>
