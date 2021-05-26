// deprecated: no need. using the itemintro component directly in pages
<template>
  <div>
    <the-header></the-header>
    <!-- <item-intro></item-intro> -->
    <item-intro :item-to-pass="item"></item-intro>
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
  // data() {
  //   return { itemToPass: { name: 'myitemname', intro: 'myitemintro' } }
  // },
  created() {
    this.$nuxt.$on('item', (item) => {
      // console.log('(item-layout) item retrieved from ItemIntro $emit:')
      // console.log(item)
    })
  },
}
</script>

<style></style>
