<template>
  <main>
    <!-- top banner -->
    <item-intro
      :item="areas[id - 1]"
      :items="areas"
      :item-id="id - 1"
    ></item-intro>

    <!-- page anchors -->
    <page-anchors
      :item-color="areas[id - 1].color"
      :sections="sections"
    ></page-anchors>

    <!-- history.back button -->
    <back-button v-if="fromPerson" :text="prevName"></back-button>

    <!-- page -->
    <div class="container">
      <!-- intro -->
      <section id="intro" ref="intro" class="overview raised anchored">
        <div class="intro-img">
          <img :src="areas[$route.params.id - 1].image" />
        </div>
        <div class="intro-text">
          <h2>This is area {{ $route.params.id }}</h2>
          <p>
            {{ areas[$route.params.id - 1].intro }}
          </p>
        </div>
      </section>

      <!-- solutions -->
      <section id="products" ref="products" class="items anchored">
        <h1>Solutions</h1>
        <h4>Products &amp; Services</h4>
        <card-grid :cards="products" shape="rectangle"></card-grid>
      </section>

      <!-- people -->
      <section id="people" ref="people" class="items raised dark anchored">
        <h1>People</h1>
        <!-- leaderboard -->
        <h4>Leaderboard</h4>
        <card-grid :cards="teamLeaders" shape="circle"></card-grid>
        <!-- team -->
        <h4>Team</h4>
        <card-grid :cards="team" shape="rectangle"></card-grid>
      </section>
    </div>
  </main>
</template>

<script>
// import { Linear } from 'gsap' // [plugin:scrollmagic]
import ItemIntro from '~/components/ItemIntro.vue'
import CardGrid from '~/components/CardGrid.vue'
import PageAnchors from '~/components/PageAnchors.vue'
import BackButton from '~/components/BackButton.vue'

export default {
  components: { ItemIntro, PageAnchors, CardGrid, BackButton },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    // about all areas
    const areas = await $axios.$get(`${process.env.BASE_URL}/api/area`)
    areas.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    // about current area
    const { products, teamLeaders, team } = await $axios
      .get(`${process.env.BASE_URL}/api/area/${id}`)
      .then((res) => {
        // PRODUCTS
        const products = res.data.products
        // PEOPLE
        // rename 'role' to 'description' so it works in the card component
        res.data.people.forEach((obj) => {
          obj.description = obj.role
          delete obj.role
        })
        // filter leader roles
        const teamLeaders = res.data.people.filter(
          (person) =>
            person.description === 'Area manager' ||
            person.description === 'Chief Research Officer'
        )
        // filter other team members
        const team = res.data.people.filter(
          (person) =>
            person.description !== 'Area manager' &&
            person.description !== 'Chief Research Officer'
        )
        return { products, teamLeaders, team }
      })
    return {
      id,
      areas,
      products,
      teamLeaders,
      team,
    }
  },
  data() {
    return {
      // define page sections for the anchors nav
      sections: [
        {
          name: 'Introduction',
          sectionId: 'intro',
          anchorId: 'intro-anchor',
        },
        {
          name: 'Solutions',
          sectionId: 'products',
          anchorId: 'products-anchor',
        },
        {
          name: 'People',
          sectionId: 'people',
          anchorId: 'people-anchor',
        },
      ],
      //
      fromPerson: false,
      prevName: '',
    }
  },
  mounted() {
    this.$store.commit('setTheme', this.areas[this.id - 1].color)
    this.$store.commit('setTitle', this.areas[this.id - 1].name)
    this.$store.commit('updateRoute', {
      title: this.areas[this.id - 1].name,
      url: window.location.href,
    })
    // condition to show back button (only if coming from 'far' page, i.e. person)
    if (this.$store.state.pagePrevious.url) {
      this.fromPerson = this.$store.state.pagePrevious.url.includes('about')
    }

    /* [plugin:scrollmagic]
    // PARALLAX SCROLL
    require('animation.gsap')
    require('debug.addIndicators')
    const controller = new this.$scrollmagic.Controller({
      globalSceneOptions: {
        triggerHook: 0.3,
        reverse: true,
      },
    })
    new this.$scrollmagic.Scene({ duration: '50%' })
      .setTween('.page-anchors', {
        y: '-150%',
        ease: Linear.easeInOut,
        top: 75 + 67, // 75=50*150% (where 50 is own height), 67 is the header height (final top)
      })
      // .addIndicators() // DEBUG
      .addTo(controller) // assign the scene to the controller
    new this.$scrollmagic.Scene({
      duration: '100%',
      // offset: 0, // start this scene after scrolling for 50px
    })
      // .setPin('.item-intro') // pins the element for the scene's duration
      .setTween('.container', {
        y: '-20%',
        top: -200,
        marginBottom: -200,
        ease: Linear.easeInOut,
      })
      .addIndicators() // DEBUG
      .addTo(controller) // assign the scene to the controller
      [/plugin:scrollmagic] */
  },
}
</script>
