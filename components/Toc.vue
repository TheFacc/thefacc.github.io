<template>
  <div>
    <!-- <p style="text-align: center">💆‍♂️</p> -->
    <p class="uppercase text-black font-h2 text-lg lg:mt-16 tracking-wider">
      Table of contents &nbsp;&nbsp;
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">
            <v-icon>mdi-timeline-question</v-icon>
          </span>
        </template>
        If it gets stuck, refresh the page. Sorry the observer is tricky with
        dynamic website, will try to fix
      </v-tooltip>
    </p>
    <nav v-if="$store.state.article" class="v-navigation-drawer">
      <!-- items indicator -->
      <div class="toc-indicator">
        <div
          :style="{
            height: `${sliderHeight}px`,
            top: `${sliderTop}px`,
          }"
        ></div>
      </div>
      <!-- actual items -->
      <v-list dense shaped class="ml-0 transparent">
        <v-list-item
          v-for="(item, idx) in $store.state.article.toc"
          :key="item.id"
          class="toc-item pt-0 pb-0"
          :elno="idx"
          :href="`${$nuxt.$route.path}#${item.id}`"
          link
          dense
          replace
        >
          <v-list-item-title
            :class="{
              'ml-2 indigo--text font-weight-bold':
                currentlyActiveTocs.includes(`${idx}`),
            }"
            >{{ item.text }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </nav>
  </div>
</template>

<script>
// credits:
// https://davidparks.dev/blog/nuxt-table-of-contents-with-active-states/
// https://mokkapps.de/blog/create-a-table-of-contents-with-active-states-in-nuxt-3/

export default {
  data() {
    return {
      // article: {},
      currentlyActiveTocs: [], // array of all the active TOC elements ('tocs')
      highestActiveToc: 0, // first visible element from top (to correctly set sliderTop)
      sliderHeight: 550,
      sliderTop: 53,
      noneObserving: false, // used to prevent slider from disappearing when no headers are visible
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0.5, // 0 = one visible pixel triggers the observer
      },
    }
  },
  // async fetch() {
  //   const { $content, route } = this.$nuxt.context
  //   const { params } = route
  //   this.article = await $content('learn', params.slug).only(['toc']).fetch()
  // },
  methods: {
    startObserving() {
      // animate slider while the content loads and the observer is initialized
      // let sliderInit = setInterval(() => {
      //   this.sliderTop = this.sliderTop - 5
      //   this.sliderHeight = this.sliderHeight - 1
      //   if (this.sliderTop < 100) clearInterval(sliderInit)
      // }, 5)
      // wait a second for stuff to fetch before initializing the observer
      // setTimeout(() => {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id')
          const triggerEl = document.querySelector(
            `[href="${$nuxt.$route.path}#${id}"]`
          ) // find activated TOC element
          if (triggerEl) {
            const triggerElNo = triggerEl.getAttribute('elno')
            if (entry.isIntersecting) {
              // into scope -> add ID if not already present
              if (this.currentlyActiveTocs.indexOf(triggerElNo) === -1) {
                if (this.noneObserving) {
                  this.noneObserving = false
                  this.currentlyActiveTocs = []
                }
                this.currentlyActiveTocs.push(triggerElNo)
              }
            } else {
              // out of scope -> remove ID if present
              if (this.currentlyActiveTocs.length > 1) {
                this.currentlyActiveTocs = this.currentlyActiveTocs.filter(
                  (e) => e !== triggerElNo
                )
              } else {
                // ...BUT NOT if it's the only one! but keep track of this state or it messes up everything
                this.noneObserving = true
              }
            }
            // get first active element (to properly set Top)
            this.highestActiveToc = this.currentlyActiveTocs.sort((a, b) =>
              a.localeCompare(b, undefined, { numeric: true })
            )[0]
            // style the indicator globally
            this.sliderHeight =
              triggerEl.offsetHeight * this.currentlyActiveTocs.length
            const highestEl = document.querySelector(
              `[elno="${this.highestActiveToc}"]`
            )
            if (highestEl) this.sliderTop = highestEl.offsetTop
            // console.log('ACTIVETOCS:', this.currentlyActiveTocs)
            // console.log('highestActiveToc:', this.highestActiveToc)
          }
        })
      }, this.observerOptions)

      // Track all sections that have an `id` applied
      document
        .querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]')
        .forEach((section) => {
          this.observer.observe(section)
        })
      // }, 1000)
    },
  },
  mounted() {
    this.startObserving()
  },
  updated() {
    this.observer.disconnect()
    this.startObserving()
  },
  // beforeDestroy() { // seems like it already gets distroyed? i got 'cannot read prop disconnect of null'
  //   this.observer.disconnect()
  // },
}
</script>

<style scoped>
/* indicator */
.toc-indicator {
  /* position: relative; */
  width: 5px;
  overflow: hidden;
  background-color: #c4c4c4;
}
@media screen and (max-width: 959px) {
  .toc-indicator {
    position: fixed;
    overflow: visible;
    top: 65px;
    left: 0;
  }
}
.toc-indicator div {
  position: absolute;
  width: 5px;
  left: 0;
  transition-duration: 0.2s;
  background-color: #3f51b5;
}

/* list */
.toc-item * {
  transition: 0.2s;
  min-width: 150px;
}
</style>
