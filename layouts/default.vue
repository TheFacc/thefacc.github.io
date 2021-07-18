<template>
  <div>
    <the-header></the-header>
    <Nuxt />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter,
  },
  // transition: {
  //   name: 'pagefar',
  //   mode: '', // simultaneous? nope =(
  // },
  // transition(to, from) {
  //   if (!from) {
  //     return 'pagefar'
  //   }
  //   return +to.path.split('/').length < +from.path.split('/').length ? 'pagenear' : 'pagefar'
  // },
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
.pagenear-enter-active,
.pagenear-leave-active {
  transition: 1s ease;
}
.pagenear-enter,
.pagenear-leave-to {
  opacity: 0.8;
  filter: blur(50px);
}
</style>
