<template>
  <main class="container selector">
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
      <!-- filtering tests -->
      <div class="search">
        <input
          v-model="search"
          type="text"
          placeholder="works only alone for now"
        />
      </div>
      <!-- end tests -->
    </div>
    <div class="selector-items">
      <card-grid :cards="filteredListArea" shape="rectangle"></card-grid>
    </div>
  </main>
</template>

<script>
import CircleSvg from '~/components/CircleSvg.vue'

export default {
  components: { CircleSvg },
  async asyncData({ $axios }) {
    // about all areas
    const areas = await $axios.$get(`${process.env.BASE_URL}/api/area`)
    // about all products
    const cards = await $axios.$get(`${process.env.BASE_URL}/api/product`)
    return {
      areas,
      cards,
    }
  },
  data() {
    return {
      // areas: [
      //   {
      //     name: 'Cloud computing',
      //     path: '#',
      //     color: '#F44336',
      //     icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
      //     active: false,
      //   },
      //   {
      //     name: 'Analytics',
      //     path: '#',
      //     color: '#4CAF50',
      //     icon: require('~/assets/icons/area-analytics-2.svg?raw'),
      //     active: false,
      //   },
      //   {
      //     name: 'Machine Learning',
      //     path: '#',
      //     color: '#FFC107',
      //     icon: require('~/assets/icons/area-machine-learning.svg?raw'),
      //     active: false,
      //   },
      //   {
      //     name: 'Blockchain',
      //     path: '#',
      //     color: '#00BCD4',
      //     icon: require('~/assets/icons/area-blockchain.svg?raw'),
      //     active: false,
      //   },
      // ],
      // cards: [
      //   {
      //     title: 'Product ML',
      //     summary: 'Some area description',
      //     area: 'Machine Learning',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product CC',
      //     summary: 'Some area description',
      //     area: 'Cloud computing',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product CC',
      //     summary: 'Some area description',
      //     area: 'Cloud computing',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product A',
      //     summary: 'Some area description',
      //     area: 'Analytics',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product A',
      //     summary: 'Some area description',
      //     area: 'Analytics',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product A',
      //     summary: 'Some area description',
      //     area: 'Analytics',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product B',
      //     summary: 'Some area description',
      //     area: 'Blockchain',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product B',
      //     summary: 'Some area description',
      //     area: 'Blockchain',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product B',
      //     summary: 'Some area description',
      //     area: 'Blockchain',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product B',
      //     summary: 'Some area description',
      //     area: 'Blockchain',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product B',
      //     summary: 'Some area description',
      //     area: 'Blockchain',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product B',
      //     summary: 'Some area description',
      //     area: 'Blockchain',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      //   {
      //     title: 'Product B',
      //     summary: 'Some area description',
      //     area: 'Blockchain',
      //     image:
      //       'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
      //   },
      // ],
      // circle svg params
      mainCx: 450,
      mainCy: 250,
      mainR: 115,
      vbox: '330 70 625 350',
      text: ['Select area to', 'filter its products'],
      // for filtering
      filteredData: [],
      search: '',
      filterby: 0, // 0 = All
    }
  },
  head() {
    return {
      title: 'Solutions',
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
