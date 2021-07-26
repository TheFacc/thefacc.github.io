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
/* [plugin:scrollmagic]
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
[/plugin:scrollmagic] */

export default {
  props: {
    itemColor: {
      type: String,
      default: '#dddddd',
    },
    sections: {
      type: Array,
      default() {
        return []
      },
    },
  },
  // data() {
  // return { scenes: {}, sceneDurations: [] } // [plugin:scrollmagic]
  // },
  mounted() {
    /* [plugin:chromajs]
    // COLOR
    const chroma = this.$chromajs
    const color0 = chroma(this.itemColor).set('hsl.l', 0.2).hex()
    document.querySelector('.page-anchors').style.background = `rgba(${chroma(
      color0
    ).rgb()},0.8)`
    [/plugin:chromajs] */

    // ok just use plain color as bg
    if (this.itemColor.length < 8) {
      // only 1 color(hex): just set it
      this.$refs.pageAnchors.style.background = `rgba(${this.$hex2rgb(
        this.itemColor
      )},0.8)`
    } else {
      // more than one color(already joined string): enable cycling all available colors
      this.$refs.pageAnchors.style.background = `linear-gradient(130deg, ${this.itemColor})`
      this.$refs.pageAnchors.style.animation = 'wavedient 20s linear infinite'
      this.$refs.pageAnchors.style.animationDirection = 'alternate'
      this.$refs.pageAnchors.style.backgroundSize = '8000%'
    }
    // }

    /* [plugin:scrollmagic]
    // ANCHORS highlight on scroll
    // if (!process.isClient) return
    require('animation.gsap')
    require('debug.addIndicators')
    this.$nextTick(() => {
      // init
      const controller = new this.$scrollmagic.Controller({
        globalSceneOptions: {
          triggerHook: 0.5,
          reverse: true,
          // immediateRender: false,
        },
      })
      // calculate durations (= scene heights) - different for different content from db... especially if more/less products
      const durs = []
      Object.keys(this.$parent.$refs).forEach((ref) => {
        durs.push(this.$parent.$refs[ref].clientHeight)
      })
      // console.log('calculated heights:', durs)
      this.sceneDurations = durs // save locally to be able to watch: it

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
        this.scenes[section.sectionId] = s // fill variable
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
    [/plugin:scrollmagic] */
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
  top: 67px;
  backdrop-filter: blur(5px);
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  z-index: 1;
}
.page-anchors div {
  transition: 0.2s;
  min-width: 50px;
}
.page-anchors div:hover {
  transform: scale(1.1);
}
.page-anchors a {
  text-decoration: none;
  color: #222222;
  font-weight: 400;
  transition: 0.2s ease-out;
  /* adding style to overcome scrollmagic plugin missing */
}
.page-anchors a:hover {
  font-weight: 500;
  /* adding style to overcome scrollmagic plugin missing */
  background: rgba(255, 255, 255, 0.3);
}
.page-anchors a.active {
  font-weight: 800;
  padding: 10px 50px;
  background: rgba(0, 0, 0, 0.3);
}
.page-anchors a.active:hover {
  padding: 10px 100px;
  background: rgba(0, 0, 0, 0.4);
}
@media screen and (min-width: 768px) {
  .page-anchors a {
    padding: 10px 50px;
  }
  .page-anchors a:hover {
    padding: 13px 50px;
  }
}
@media screen and (max-width: 767px) {
  .page-anchors a {
    padding: 10px;
  }
}
</style>
