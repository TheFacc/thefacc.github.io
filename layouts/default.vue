<template>
  <v-app light>
    <the-header></the-header>
    <v-main>
      <side-card></side-card>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <the-footer></the-footer>
  </v-app>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    TheFooter,
  },
}
</script>

<style>
/* PAGE TRANSITIONS */
/* between different pages ('bigger mind jump') */
.page-enter-active,
.page-leave-active {
  transition: 0.2s ease;
}
.page-enter {
  opacity: 0;
  transform: translateX(20px);
  transform-origin: top;
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
  transform-origin: top;
}
/* between similar pages (between areas, between related products) */
/* .pagenear-enter-active,
.pagenear-leave-active {
  transition: 1s ease;
}
.pagenear-enter,
.pagenear-leave-to {
  opacity: 0.8;
  filter: blur(50px);
} */
</style>
