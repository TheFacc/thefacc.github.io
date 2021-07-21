export default {
  ssr: true,
  target: 'server',
  env: {
    BASE_URL: '', // Production URL
    //configurationId: 'YOUR CONFIG ID',
    // BASE_URL: '', // Development URL
    configurationId: '457c738e-c55a-4293-8faf-53b627e4ce27',
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
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        href:
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap',
        rel: 'stylesheet',
      },
      // {
      //   rel: 'stylesheet',
      //   type: 'text/css',
      //   href:
      //     'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['normalize.css/normalize.css', '~assets/styles/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/mmcc.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg', // import svg as raw files (to support css animations) //npm install --save-dev @nuxtjs/svg
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
