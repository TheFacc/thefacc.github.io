<template>
  <div>
    <the-header></the-header>
    <item-intro></item-intro>
    <Nuxt />
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import ItemIntro from '~/components/ItemIntro.vue'
import TheFooter from '~/components/TheFooter.vue'
export default {
  components: {
    TheHeader,
    ItemIntro,
    TheFooter,
  },
}
</script>

<style></style>
