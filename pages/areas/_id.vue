<template>
  <main>
    <item-intro :item="item"></item-intro>
    <section class="container">
      <p>this is area {{ $route.params.id }}</p>
    </section>
  </main>
</template>

<script>
import ItemIntro from '~/components/ItemIntro.vue'

export default {
  components: { ItemIntro },
  asyncData({ $axios, route }) {
    // const { id } = route.params
    // const { data } = await $axios.get(
    //   `${process.env.BASE_URL}/api/article/${id}`
    // )
    // const article = data
    // return {
    //   article,
    // }
  },
  data() {
    return { item: { title: 'itit', intro: 'itintro' } } // to be retrieved from db based on type(area,product) and route.params.id
  },
}
</script>

<style></style>
