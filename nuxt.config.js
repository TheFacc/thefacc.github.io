const webpack = require('webpack')
var path = require('path')

export default {
  ssr: true,
  target: 'server',
  env: {
    BASE_URL: 'https://moube.herokuapp.com', // Production URL - TODO set to https for final delivery!
    // BASE_URL: '', // Development URL
    configurationId: '457c738e-c55a-4293-8faf-53b627e4ce27', // chatbot access
  },
  serverMiddleware: [
    {
      path: '/api',
      handler: '~/server/rest/api.js',
    },
  ],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MouBE',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      // {
      //   href:
      //     'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap',
      //   rel: 'stylesheet',
      // },

      //link to a set of icon (used for linkedin  and arrow icon in about)
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css',
      },

      // {
      //   rel: 'stylesheet',
      //   type: 'text/css',
      //   href:
      //     'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      // },
    ],
    // script: [
    //   //   // jQuery
    //   //   {
    //   //     // src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
    //   //     src: 'https://code.jquery.com/jquery-3.6.0.min.js',
    //   //     type: 'text/javascript',
    //   //   },
    //   //   // gsap
    //   //   {
    //   //     src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js',
    //   //     type: 'text/javascript',
    //   //   },
    //   {
    //     src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBQORu47i9VKWe0j6oTVikeqdZi7HSQ-pE&libraries=&v=weekly`,
    //     type: 'text/javascript',
    //   },
    // ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css/normalize.css', '~assets/styles/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/ScrollMagic.js', mode: 'client' },
    // { src: '~/plugins/Chroma.js', mode: 'client' },
    { src: '~/plugins/functions.js', mode: 'client' }, // global $functions
    { src: '~/plugins/mmcc.js', mode: 'client' }, // chatbot connection
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module', // https://go.nuxtjs.dev/eslint
    '@nuxtjs/svg', // import svg as raw files (to support css animations) //npm install --save-dev @nuxtjs/svg
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', // https://go.nuxtjs.dev/axios
  ],
  // alias: {
  // TweenLite: path.resolve(
  //   'node_modules',
  //   'gsap/src/uncompressed/TweenLite.js'
  // ),
  // TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
  // TimelineLite: path.resolve(
  //   'node_modules',
  //   'gsap/src/uncompressed/TimelineLite.js'
  // ),
  // TimelineMax: path.resolve(
  //   'node_modules',
  //   'gsap/src/uncompressed/TimelineMax.js'
  // ),
  // ScrollMagic: path.resolve(
  //   'node_modules',
  //   'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
  // ),
  // 'animation.gsap': path.resolve(
  //   'node_modules',
  //   'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
  // ),
  // 'debug.addIndicators': path.resolve(
  //   'node_modules',
  //   'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
  // ),
  // },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //   }),
    // ],
    // transpile: ['gsap'], // https://greensock.com/forums/topic/26104-nuxt-gsapdraggable-cannot-use-import-statement-outside-a-module/
  },
}
