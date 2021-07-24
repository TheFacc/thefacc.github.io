<template>
  <main>
    <section
      v-if="slides.length"
      id="home-slides"
      ref="home-slides"
      class="home-slides"
    >
      <carousel :slides="slides" theme="dark"></carousel>
    </section>
    <section>
      <h1>This is a WebSite</h1>
      <h4>And it's made with Nuxt.</h4>
      <img src="~/static/owen.png" alt="Bot ADS" />
    </section>
  </main>
</template>

<script>
export default {
  components: {},
  async asyncData({ $axios }) {
    const areas = await $axios.$get(`${process.env.BASE_URL}/api/area`)
    const areasNo = Math.max(...Object.values(areas.map((a) => a.id)))
    // get a random product from each area
    const products = []
    for (let i = 1; i <= areasNo; i++) {
      // get all prods
      const prods = (await $axios.$get(`${process.env.BASE_URL}/api/area/${i}`))
        .products
      // extract random
      const randId = Math.floor(Math.random() * Math.floor(prods.length) + 1)
      products.push(prods[randId - 1])
    }
    return {
      areas,
      products,
    }
  },
  data() {
    return {
      slides: [
        {
          name: 'MouBE',
          description: 'thats us',
          image:
            'https://ik.imagekit.io/hypermoube/o_iyNVNfNlW.svg?updatedAt=1627079567077',
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setTheme', '')
    this.$store.commit('setTitle', 'Home')
    this.$store.commit('updateRoute', {
      title: 'Homepage',
      url: window.location.href,
    })
    // push obtained products to carousel slideshow
    this.products.forEach((p) => {
      this.slides.push({
        name: p.name,
        description: p.introShort,
        image: p.image,
        url: '/solutions/' + p.id,
      })
    })
  },
}
</script>

<style scoped></style>
<style>
#home-slides .slide {
  width: 100%;
}
#home-slides .slide-left {
  padding: 30px 15%;
}
</style>
