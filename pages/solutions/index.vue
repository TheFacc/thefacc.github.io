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
        spacing="right"
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
      <div class="radio-filter">
        radio just for debugging:
        <label><input v-model="filterby" type="radio" value="All" /> All</label>
        <label
          ><input v-model="filterby" type="radio" value="Analytics" />
          Analytics</label
        >
        <label
          ><input v-model="filterby" type="radio" value="Cloud computing" />
          Cloud computing</label
        >
        <label
          ><input v-model="filterby" type="radio" value="Machine learning" />
          Machine learning</label
        >
        <label
          ><input v-model="filterby" type="radio" value="Blockchain" />
          Blockchain</label
        >
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
  data() {
    return {
      areas: [
        {
          name: 'Cloud computing',
          path: '#',
          color: '#F44336',
          icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
          active: false,
        },
        {
          name: 'Analytics',
          path: '#',
          color: '#4CAF50',
          icon: require('~/assets/icons/area-analytics-2.svg?raw'),
          active: false,
        },
        {
          name: 'Machine learning',
          path: '#',
          color: '#FFC107',
          icon: require('~/assets/icons/area-machine-learning.svg?raw'),
          active: false,
        },
        {
          name: 'Blockchain',
          path: '#',
          color: '#00BCD4',
          icon: require('~/assets/icons/area-blockchain.svg?raw'),
          active: false,
        },
      ],
      cards: [
        {
          title: 'Product ML',
          summary: 'Some area description',
          area: 'Machine Learning',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product CC',
          summary: 'Some area description',
          area: 'Cloud computing',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product CC',
          summary: 'Some area description',
          area: 'Cloud computing',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product A',
          summary: 'Some area description',
          area: 'Analytics',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product A',
          summary: 'Some area description',
          area: 'Analytics',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product A',
          summary: 'Some area description',
          area: 'Analytics',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product B',
          summary: 'Some area description',
          area: 'Blockchain',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
      ],
      // circle svg params
      mainCx: 450,
      mainCy: 250,
      mainR: 115,
      vbox: '330 70 625 350',
      // for filtering
      filteredData: [],
      search: '',
      filterby: 'All',
    }
  },
  head() {
    return {
      title: 'Areas',
    }
  },
  computed: {
    filteredListSearch() {
      return this.cards.filter((card) => {
        return card.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredListArea() {
      if (this.filterby === 'All') {
        return this.cards
      } else {
        return this.cards.filter((card) => {
          return !card.area.indexOf(this.filterby)
        })
      }
    },
  },
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
    onClickChild(item) {
      if (this.filterby !== item.name) {
        this.filterby = item.name
      } else {
        this.filterby = 'All'
      }
    },
  },
}
</script>

<style></style>
