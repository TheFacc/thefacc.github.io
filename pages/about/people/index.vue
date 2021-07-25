<template>
  <main>
    <item-intro :item="discover" :items="areas"></item-intro>
    <div class="container">
      <!-- leaderboard -->
      <section class="items raised dark">
        <h2>MouBE Leaderboard</h2>
        <card-grid
          :cards="teamLeaders"
          shape="circle"
          path="/about/people"
        ></card-grid>
      </section>

      <div class="selector">
        <!-- FILTERS: circles -->
        <div class="selector-filter">
          <circle-svg
            svgid="svg-areas"
            :vbox="vbox"
            :items="areas"
            :main-cx="mainCx"
            :main-cy="mainCy"
            :main-r="mainR"
            :text="['Filter workers', 'by area']"
            :active-text="true"
            spacing="right"
            :display="[1, 1, 0]"
            @itemClicked="filterbyArea"
          ></circle-svg>
          <circle-svg
            svgid="svg-roles"
            :vbox="vbox"
            :items="roles"
            :main-cx="mainCx"
            :main-cy="mainCy"
            :main-r="mainR"
            :items-r="15"
            :text="['Filter workers', 'by role']"
            :active-text="true"
            spacing="right"
            :display="[1, 1, 0]"
            @itemClicked="filterbyRole"
          ></circle-svg>
        </div>

        <!-- FILTERED: cards -->
        <div class="selector-items">
          <card-grid
            :cards="filteredList"
            shape="rectangle"
            path="/about/people"
            :tooltip-data="tooltipData"
            :field="filterby === 'Product Referent' ? 'referentOf' : 'areaId'"
          ></card-grid>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ItemIntro from '~/components/ItemIntro.vue'
import CircleSvg from '~/components/CircleSvg.vue'
export default {
  components: { ItemIntro, CircleSvg },
  async asyncData({ $axios }) {
    // about all areas
    const areas = await $axios.$get(`${process.env.BASE_URL}/api/area`)
    areas.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    // about all people
    const people = await $axios.$get(`${process.env.BASE_URL}/api/person`)
    people.sort((a, b) => (a.role > b.role ? 1 : b.role > a.role ? -1 : 0))
    // rename 'role' to 'description' so it works in the card component
    people.forEach((obj) => {
      obj.description = obj.role
      delete obj.role
    })
    // get products (to pass their name if filtering by prod.ref)
    const products = await $axios.$get(`${process.env.BASE_URL}/api/product`)

    // filter TEAM LEADER
    const teamLeaders = people.filter(
      (person) =>
        person.description === 'Chief Executive Officer' ||
        person.description === 'General Manager' ||
        person.description === 'Chief Financial Officer' ||
        person.description === 'Human Resources' ||
        person.description === 'Chief Marketing Officer'
    )

    // other roles
    const cards = people.filter(
      (person) =>
        person.description !== 'Chief Executive Officer' &&
        person.description !== 'General Manager' &&
        person.description !== 'Chief Financial Officer' &&
        person.description !== 'Human Resources' &&
        person.description !== 'Chief Marketing Officer'
    )

    return {
      areas,
      products,
      teamLeaders,
      cards,
    }
  },

  data() {
    return {
      // 'fake' item for the intro section
      discover: {
        name: 'Meet our team',
        introShort:
          'What do we value most? Our people, our technology, and changing the world — and we’re just getting started. We support each other and work together to create shared success that will benefit everyone.',
      },

      roles: [
        // try to define roles as a list
        // not the leadership roles, for me they are usefull
        {
          id: '1',
          name: 'Area manager',
          color: '#35bced',
          icon: 'circle.svg',
        },

        {
          id: '2',
          name: 'Chief Research Officer',
          color: '#3591ed',
          icon: 'circle.svg',
        },
        {
          id: '3',
          name: 'Product Referent',
          color: '#3f51b5',
          icon: 'circle.svg',
        },
      ],

      // circle svg params
      mainCx: 450,
      mainCy: 250,
      mainR: 115,
      vbox: '330 70 625 350',
      // for filtering
      filtermode: 0, // 'Area' or 'Role'
      filterby: 0, // active filtering (area name or role name) (0 = inactive, show all)
    }
  },
  head() {
    return {
      title: 'Our team - MouBE',
    }
  },
  computed: {
    filteredList() {
      if (this.filtermode === 'Area') {
        return this.cards.filter((card) => {
          return this.filterby === card.areaId
        })
      } else if (this.filtermode === 'Role') {
        return this.cards.filter((card) => {
          return this.filterby === card.description
        })
      } else {
        return this.cards
      }
    },
    tooltipData() {
      if (this.filterby === 'Product Referent') {
        // show to which product their referent of (they're*)
        return this.products
      } else {
        // show to which area they generally belong
        return this.areas
      }
    },
  },
  mounted() {
    this.$store.commit('setTheme', 'default')
    this.$store.commit('setTitle', 'Our team')
    this.$store.commit('updateRoute', {
      title: 'Our team',
      url: window.location.href,
    })
  },
  methods: {
    filterbyArea(item) {
      if (this.filtermode === 'Area' && this.filterby === item.id) {
        // same filter was already active: reset everything
        this.filtermode = 0
        this.filterby = 0
      } else {
        // activate filter
        this.filtermode = 'Area'
        if (this.filterby !== item.id) {
          this.filterby = item.id
        } else {
          this.filterby = 0
        }
      }
    },
    filterbyRole(item) {
      if (this.filtermode === 'Role' && this.filterby === item.name) {
        // same filter was already active: reset everything
        this.filtermode = 0
        this.filterby = 0
      } else {
        // activate filter
        this.filtermode = 'Role'
        if (this.filterby !== item.name) {
          this.filterby = item.name
        } else {
          this.filterby = 0
        }
      }
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  /* .selector-filter svg {
    margin: -15px 0 -30px;
  } */
  .selector-filter {
    top: auto;
  }
}
</style>
