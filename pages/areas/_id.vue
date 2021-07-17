<template>
  <main>
    <item-intro
      :item="areas[id - 1]"
      :items="areas"
      :item-id="id - 1"
    ></item-intro>
    <page-anchors
      :item-color="areas[id - 1].color"
      :sections="sections"
    ></page-anchors>
    <div class="container">
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
      <section id="products" ref="products" class="items anchored">
        <h1>Solutions</h1>
        <h4>Products &amp; Services</h4>
        <card-grid :cards="products" shape="rectangle"></card-grid>
      </section>
      <section id="people" ref="people" class="people raised dark anchored">
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

export default {
  components: { ItemIntro, PageAnchors, CardGrid },
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
    }
  },
  mounted() {
    this.$store.commit('setTheme', this.areas[this.id - 1].color)
    this.$store.commit('setTitle', this.areas[this.id - 1].name)

    // if (this.shape === 'circle') {
    //   document.querySelector('.card-grid').style.gridTemplateColumns =
    //     'repeat(3, calc(100% / 3))'
    // }
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

<style scoped>
.overview {
  overflow: hidden;
}
.overview .intro-img {
  transform: scale(1.05);
}
@media screen and (min-width: 768px) {
  .overview {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: left;
  }
  .overview > div {
    width: 50%;
  }
  .overview .intro-text {
    padding: 30px;
  }
}
@media screen and (max-width: 768px) {
  .overview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: left;
  }
  .overview .intro-text {
    padding: 20px;
  }
}
</style>
