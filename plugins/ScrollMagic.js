import Vue from 'vue'
import * as ScrollMagic from 'scrollmagic'
Object.defineProperty(Vue.prototype, '$scrollmagic', { value: ScrollMagic })

// import {
//   TweenMax,
//   //   TweenLite,
//   TimelineMax,
//   //   CSSPlugin,
//   //   ScrollToPlugin,
//   //   Draggable,
// } from 'gsap/all'
// // import DrawSVGPlugin from "../../vendor/gsap/DrawSVGPlugin";
// import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap'
// ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax)

// // https://github.com/pirony/ks-vue-scrollmagic/issues/13
// import Vue from 'vue'
// import { TweenMax } from 'gsap'
// import ScrollMagic from 'scrollmagic'
// // import SplitText from '../static/SplitText' // any extra plugins
// // import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
// // import 'imports-loader?define=>true!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

// const GSAPScrollMagic = {
//   install(Vue, options) {
//     // GSAP
//     Vue.prototype.$GSAP = {
//       TweenMax,
//       TimelineMax,
//       Linear,
//       Power1,
//       Power2,
//       Power3,
//       Back,
//       //   SplitText,
//     }
//     // ScrollMagic
//     Vue.prototype.$ScrollMagic = {
//       Controller: new ScrollMagic.Controller(),
//       Scene: ScrollMagic.Scene,
//     }
//   },
// }

// Vue.use(GSAPScrollMagic)
