<template>
  <main class="container">
    <item-intro :item="discover" :items="areas"></item-intro>
    <div class="container">
      <section id="people" ref="people" class="people raised dark">
        <!-- leaderboard -->
        <h2>Leaderboard</h2>
        <card-grid :cards="teamLeaders" shape="circle"></card-grid>
      </section>
    </div>
    <div class="container selector">
      <!--selector div -->
      <div class="selector-filter">
        <circle-svg
          svgid="areas"
          :vbox="vbox"
          :items="areas"
          :main-cx="mainCx"
          :main-cy="mainCy"
          :main-r="mainR"
          :text="text"
          :active-text="true"
          spacing="right"
          :display="[1, 1, 0]"
          @itemClicked="onClickChild"
        ></circle-svg>

        <!-- <circle-svg
          svgid="roles"
          :vbox="vbox"
          :items="roles"
          :main-cx="mainCx"
          :main-cy="mainCy"
          :main-r="mainR"
          :text="text"
          :active-text="true"
          spacing="right"
          :display="[1, 1, 0]"
          @itemClicked="onClickChild"
        ></circle-svg> -->
      </div>

      <!-- selected items div-->
      <div class="selector-items">
        <card-grid :cards="filteredListArea" shape="rectangle"></card-grid>
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
    // areas.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    // about all people
    const people = await $axios.$get(`${process.env.BASE_URL}/api/person`)
    // rename 'role' to 'description' so it works in the card component
    people.forEach((obj) => {
      obj.description = obj.role
      delete obj.role
    })

    // filter TEAM LEADER
    const teamLeaders = people.filter(
      (person) =>
        person.description === 'General Manager' ||
        person.description === 'Chief Research Officer' ||
        person.description === 'Chief Executive Officer'
    )

    // other roles
    const cards = people.filter(
      (person) =>
        person.description !== 'General Manager' &&
        person.description !== 'Chief Research Officer' &&
        person.description !== 'Chief Executive Officer'
    )

    return {
      areas,
      teamLeaders,
      cards,
    }
  },

  data() {
    return {
      // 'fake' item for the intro section
      discover: {
        name: 'Meet our team',
        introShort: 'some nice description about us <3',
      },

      roles: [
        // try to define roles as a list
        // not the leadership roles, for me they are usefull
        {
          name: 'Area manager',
          path: '#',
          color: '#F44336',
          icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
          active: false,
        },

        {
          name: 'Referent',
          path: '#',
          color: '#F44336',
          icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
          active: false,
        },

        {
          name: 'Engineer',
          path: '#',
          color: '#F44336',
          icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
          active: false,
        },
      ],

      // circle svg params
      mainCx: 450,
      mainCy: 250,
      mainR: 115,
      vbox: '330 70 625 350',
      text: ['Select area to', 'filter its workers'],
      // for filtering
      filteredData: [],
      search: '',
      filterby: 0, // 0 = All
    }
  },
  head() {
    return {
      title: 'MouBE - People',
    }
  },
  computed: {
    filteredListSearch() {
      return this.cards.filter((card) => {
        return card.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredListArea() {
      if (this.filterby === 0) {
        return this.cards
      } else {
        return this.cards.filter((card) => {
          // return !card.area.indexOf(this.filterby)
          return card.areaId === this.filterby
        })
      }
    },
  },
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
    onClickChild(item) {
      if (this.filterby !== item.id) {
        this.filterby = item.id
      } else {
        this.filterby = 0
      }
    },
  },
}
</script>

<style></style>
