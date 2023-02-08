<template>
  <div>
    <!-- <p style="text-align: center">💆‍♂️</p> -->
    <p class="uppercase text-black font-h2 text-lg lg:mt-16 tracking-wider">
      Table of contents
    </p>
    <nav class="v-navigation-drawer d-flex flex-row">
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
      <v-list dense shaped class="ml-0">
        <v-list-item
          v-for="(item, idx) in article.toc"
          :key="item.id"
          class="toc-item pt-0 pb-0"
          :elno="idx"
          active-class="ml-10"
          :href="`#${item.id}`"
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
      article: null,
      currentlyActiveTocs: [], // array of all the active TOC elements ('tocs')
      highestActiveToc: 0,
      sliderHeight: 100,
      sliderTop: 100,
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0.5, // 0 = one visible pixel triggers the observer
      },
    }
  },
  async fetch() {
    const { $content, route } = this.$nuxt.context
    const { params } = route
    this.article = await $content('learn', params.slug).only(['toc']).fetch()
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        const triggerEl = document.querySelector(`[href="#${id}"]`) // find activated TOC element
        const triggerElNo = triggerEl.getAttribute('elno')
        if (entry.isIntersecting) {
          // into scope -> add ID if not already present
          if (this.currentlyActiveTocs.indexOf(triggerElNo) === -1)
            this.currentlyActiveTocs.push(triggerElNo)
          //   // style the indicator //TODO I'll keep this complex conditional styling just for a push... will clean after
          //   if (triggerElNo > this.highestActiveToc) {
          //     // activated an element below: Top unchanged, Height +1
          //     this.sliderHeight += triggerEl.offsetHeight
          //   } else {
          //     // activated an element above: Top update, Height +2
          //     this.sliderTop = triggerEl.offsetTop
          //     this.sliderHeight += 2 * triggerEl.offsetHeight
          //   }
          //   //   this.sliderTop = triggerEl.offsetTop
          //   //   this.sliderHeight = triggerEl.offsetHeight //* this.currentlyActiveTocs.length
        } else {
          // out of scope -> remove ID if present
          // ...BUT NOT if it's the only one! nope ok it breaks everything, leave it, ciao, nvm
          //   if (this.currentlyActiveTocs.length !== 1)
          this.currentlyActiveTocs = this.currentlyActiveTocs.filter(
            (e) => e !== triggerElNo
          )
          //   // style the indicator
          //   if (triggerElNo > this.highestActiveToc) {
          //     // deactivated an element below: Top unchanged, Height -1
          //     this.sliderHeight -= triggerEl.offsetHeight
          //   } else {
          //     // deactivated an element above: Top update, Height -2
          //     this.sliderTop += triggerEl.offsetHeight
          //     this.sliderHeight -= 2 * triggerEl.offsetHeight
          //   }
        }
        // update vars
        this.highestActiveToc = this.currentlyActiveTocs.sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true })
        )[0]
        // style the indicator globally
        this.sliderHeight =
          triggerEl.offsetHeight * this.currentlyActiveTocs.length
        this.sliderTop = document.querySelector(
          `[elno="${this.highestActiveToc}"]`
        ).offsetTop
        // console.log('ACTIVETOCS:', this.currentlyActiveTocs)
        // console.log('highestActiveToc:', this.highestActiveToc)
      })
    }, this.observerOptions)

    // Track all sections that have an `id` applied
    document
      .querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]')
      .forEach((section) => {
        this.observer.observe(section)
      })
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
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
}
</style>
