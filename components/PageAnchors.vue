<template>
  <div ref="pageAnchors" class="page-anchors">
    <div v-for="(section, index) in sections" :key="'scene-' + index">
      <nuxt-link
        :id="section.anchorId"
        :key="'anchor-' + index"
        :to="'#' + section.sectionId"
        >{{ section.name }}</nuxt-link
      >
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import { TweenMax, Cubic } from 'gsap'
// import 'imports-loader?define=>true!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'

// https://github.com/janpaepke/ScrollMagic/issues/665
// import * as ScrollMagic from 'scrollmagic'
// import { TweenMax, TimelineMax } from 'gsap/all'
// import DrawSVGPlugin from "../../vendor/gsap/DrawSVGPlugin";
// import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap'
// ScrollMagicPluginGsap(ScrollMagic, TweenMax)
// import 'animation.gsap'
// import 'debug.addIndicators'

// https://github.com/janpaepke/ScrollMagic/issues/665#issuecomment-558239420
// import '~/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
// import '~/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

// check if process is on server or client
// if (process.client) {
//   gsap.registerPlugin(TweenMax)
// }

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    sections: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return { scenes: {}, sceneDurations: [] }
  },
  // watch: {
  //   sceneDurations() {
  //     Object.entries(this.scenes).forEach((scene) => {
  //       scene[1].refresh()
  //     })
  //   },
  // },
  mounted() {
    // Require ScrollMagic
    // if (!process.isClient) return
    // const ScrollMagic = require('ScrollMagic')
    require('animation.gsap')
    require('debug.addIndicators')

    // COLOR
    const chroma = this.$chromajs
    const color0 = chroma(this.item.color).set('hsl.l', 0.2).hex()
    document.querySelector('.page-anchors').style.background = `rgba(${chroma(
      color0
    ).rgb()},0.8)`

    // PARALLAX
    this.$nextTick(() => {
      // init
      const controller = new this.$scrollmagic.Controller({
        globalSceneOptions: {
          triggerHook: 0.3,
          reverse: true,
          // immediateRender: false,
        },
      })
      // calculate durations (= scene heights) - different for different content from db... especially if more/less products
      const durs = []
      Object.keys(this.$parent.$refs).forEach((ref) => {
        durs.push(this.$parent.$refs[ref].clientHeight)
      })
      this.sceneDurations = durs // save locally to be able to watch: it
      // console.log('calculated heights:', durs)
      // Create and set each scene (fill this.scenes variable)
      this.sections.forEach((section, index) => {
        // skip loop if the property is from prototype
        // if (!Object.prototype.hasOwnProperty.call(this.sections, key)) continue
        // if (!Object.prototype.hasOwnProperty.call(this.sections, section.name)) return
        // const obj = this.sections[key]
        // for (const prop in obj) {
        // skip loop if the property is from prototype
        // if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue
        // if (!Object.prototype.hasOwnProperty.call(section, section.anchorId)) return
        const s = new this.$scrollmagic.Scene({
          triggerElement: '#' + section.sectionId,
        })
          .duration(this.sceneDurations[index])
          .setClassToggle('#' + section.anchorId, 'active')
          // .addIndicators() // DEBUG
          .addTo(controller)
        this.scenes[section.sectionId] = s
        // }
      })
      // Change behaviour of controller
      // to animate scroll instead of jump
      controller.scrollTo(function (target) {
        // this.$scrollmagic.handleScrollTo = function (target) {
        TweenMax.to(window, 1.5, {
          scrollTo: {
            y: target - 200,
            autoKill: true, // Allow scroll position to change outside itself
          },
          ease: Cubic.easeInOut,
        })
      })
      //  Bind scroll to anchor links
      this.$refs.pageAnchors.addEventListener('click', function (e) {
        const id = e.target.getAttribute('href') // gives invalud argument in scrollTo()
        // console.log('id:', id, 'e:', e)
        if (id !== null && id.length > 0) {
          e.preventDefault()
          controller.scrollTo(id)
          // If supported by the browser we can also update the URL
          // if (window.history && window.history.pushState) {
          //   history.pushState('', document.title, id)
          // }
        }
      })
    })
    // try to observe height change
    //   const vm = this
    //   function observeHeight(el) {
    //     const resizeObserver = new ResizeObserver(function () {
    //       console.log('Size changed')
    //       vm.scenes.products.refresh()
    //     })
    //     resizeObserver.observe(el)
    //   }
    //   observeHeight(vm.$parent.$refs.products)
  },
}
</script>

<style>
.page-anchors {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  height: 50px;
  position: sticky;
  top: 65px;
  backdrop-filter: blur(5px);
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  z-index: 9999;
}
.page-anchors a {
  text-decoration: none;
  color: white;
  font-weight: 200;
  transition: 0.2s ease-out;
}
.page-anchors a:hover,
.page-anchors a:focus {
  font-weight: 500;
}
/* @media screen and (min-width: 768px) { */
.page-anchors a.active {
  font-weight: 600;
  padding: 10px 50px;
  background: rgba(0, 0, 0, 0.3);
}
.page-anchors a.active:hover {
  padding: 10px 60px;
  background: rgba(0, 0, 0, 0.4);
}
/* } */
</style>
