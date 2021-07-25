<template>
  <main class="container" role="main">
    <div class="intro" role="banner">
      <h2></h2>
      <p>
        We at MouBE provide solutions in many fields. We're currently
        specializing in <strong>{{ areas.length }} areas</strong>, here
        represented in a circle.
      </p>
      <img src="~/assets/o.svg" alt="MouBE circle" width="32px" height="32px" />
      <p>
        The <strong>circle</strong> is really at the center of our view. It
        represents unity, commitment, love and community - that's what we seek.
        That's what we are. Our areas of specialization are not to be seen
        divided and and indipendent, but as a whole: a complex machine,
        <strong>mou</strong>ving harmonically towards a <strong>be</strong>tter
        world.
      </p>
    </div>
    <circle-svg
      svgid="svg-areas"
      :vbox="vbox"
      :items="areas"
      :main-cx="mainCx"
      :main-cy="mainCy"
      :main-r="mainR"
      :spacing="'even'"
      @itemClicked="onClickChild"
    ></circle-svg>
  </main>
</template>

<script>
import CircleSvg from '~/components/CircleSvg.vue'

export default {
  components: { CircleSvg },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.BASE_URL}/api/area`)
    const areas = data
    areas.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    return {
      areas,
    }
  },
  data() {
    return {
      mainCx: 475,
      mainCy: 250,
      mainR: 150,
      vbox: '0 0 950 450',
    }
  },
  head() {
    return {
      title: 'Areas',
    }
  },
  mounted() {
    this.$store.commit('setTheme', 'default')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'All Areas',
      url: window.location.href,
    })
  },
  methods: {
    onClickChild(item) {
      this.$goTo('/areas/' + item.id)
    },
  },
}
</script>

<style scoped>
.container {
  margin: 10px auto;
}
.intro {
  margin: 20px 3%;
}
</style>
