<template>
  <main>
    <!-- top banner -->
    <item-intro
      :item="product"
      :items="areas"
      :item-id="areaId - 1"
    ></item-intro>

    <!-- page anchors -->
    <page-anchors
      :item-color="areas[areaId - 1].color"
      :sections="sections"
    ></page-anchors>

    <!-- history.back button -->
    <back-button v-if="showBackButton" :text="prevName"></back-button>

    <!-- page -->
    <div class="container" role="main">
      <!-- intro -->
      <section id="intro" ref="intro" class="overview raised">
        <div class="intro-img">
          <img
            :src="product.image"
            :alt="`${product.name} - product introduction`"
          />
        </div>
        <div class="intro-text">
          <p>
            {{ product.intro }}
          </p>
        </div>
      </section>

      <!-- usecases -->
      <section
        v-if="usecases.length"
        id="usecases"
        ref="usecases"
        role="list"
        class="usecases"
      >
        <h1>Use cases</h1>
        <carousel :slides="usecases" theme="light"></carousel>
      </section>

      <!-- contact referent -->
      <section id="contact" ref="referent" class="referent fancy">
        <div class="ref-left">
          <h1>Get in touch!</h1>
          <p>
            <nuxt-link :to="'/contact'">Contact MouBE</nuxt-link>
            or directly the
            <nuxt-link :to="`/about/people/${referent.id}`">referent</nuxt-link>
            for this product.
          </p>
          <button
            role="button"
            aria-command-name="Open contact page"
            class="material-button raised ripple"
            :style="{
              color: '#222222',
              background: areas[areaId - 1].color,
            }"
            @click="$goTo('/contact')"
          >
            Contact MouBE
          </button>
        </div>
        <div class="ref-right">
          <card-grid
            :cards="[referent]"
            shape="rectangle"
            path="/about/people"
            :tooltip="['Contact me!']"
            flow="right"
          ></card-grid>
          <p>{{ product.name }}<br />Product Referent</p>
        </div>
      </section>

      <!-- related prods -->
      <section class="items">
        <h2>Related products</h2>
        <card-grid
          :cards="products"
          shape="rectangle"
          path="/solutions"
        ></card-grid>
      </section>
    </div>
  </main>
</template>

<script>
// import { Linear } from 'gsap' // [plugin:scrollmagic]
import ItemIntro from '~/components/ItemIntro.vue'
import CardGrid from '~/components/CardGrid.vue'
import PageAnchors from '~/components/PageAnchors.vue'
import Carousel from '~/components/Carousel.vue'
import BackButton from '~/components/BackButton.vue'

export default {
  components: { ItemIntro, PageAnchors, CardGrid, Carousel, BackButton },
  async asyncData({ $axios, route }) {
    const { id } = route.params
    // about all areas
    const areas = await $axios.$get(`${process.env.BASE_URL}/api/area`)
    areas.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    // current product
    const { product, areaId, referent } = await $axios
      .get(`${process.env.BASE_URL}/api/product/${id}`)
      .then((res) => {
        // PRODUCT
        const product = res.data
        const areaId = product.areaId
        // PERSON
        // get referent
        const referent = res.data.person
        // here we DONT rename 'role' to 'intro' (to make it work in the card component)
        // because the person is 1 and the role is already stated in the page
        // referent.intro = referent.role
        // delete referent.role
        return { product, areaId, referent }
      })
    // all products from current area (~related)
    const products = await $axios
      .get(`${process.env.BASE_URL}/api/area/${areaId}`)
      .then((res) => {
        // remove current product
        const products = res.data.products.filter(function (prod) {
          return prod.id !== parseInt(id)
        })
        // rename 'introShort' to 'description' so it works in the card component
        products.forEach((card) => {
          card.description = card.introShort
          delete card.introShort
        })
        return products
      })
    // use cases of current product
    const usecases = await $axios.$get(
      `${process.env.BASE_URL}/api/usecases/${id}`
    )
    return {
      id,
      areaId,
      areas,
      products,
      product,
      referent,
      usecases,
    }
  },
  data() {
    return {
      // define page sections for the anchors nav
      sections: [
        {
          name: 'Description',
          sectionId: 'intro',
          anchorId: 'intro-anchor',
        },
        {
          name: 'Use cases',
          sectionId: 'usecases',
          anchorId: 'usecases-anchor',
        },
        {
          name: 'Referent',
          sectionId: 'contact',
          anchorId: 'contact-anchor',
        },
      ],
      showBackButton: false,
      prevName: '',
    }
  },
  mounted() {
    // compute title, shrink if too long
    let areaName = this.areas[this.areaId - 1].name
    if (areaName.length > 10) {
      // just take initials
      const areaInitials = []
      areaName.split(' ').forEach((word) => {
        areaInitials.push(word.charAt(0))
      })
      areaName = areaInitials.join('')
    }
    // set vars
    this.$store.commit('setTheme', this.areas[this.areaId - 1].color)
    this.$store.commit('setTitle', areaName + ': ' + this.product.name)
    this.$store.commit('updateRoute', {
      title: 'Solution: ' + this.product.name,
      url: window.location.href,
    })
    if (this.$store.state.pagePrevious.url) {
      this.showBackButton = this.$store.state.pagePrevious.url.includes('about')
      if (this.showBackButton) {
        this.prevName = this.$store.state.pagePrevious.title
      }
    }

    // if (this.shape === 'circle') {
    //   document.querySelector('.card-grid').style.gridTemplateColumns =
    //     'repeat(3, calc(100% / 3))'
    // }

    /* [plugin:scrollmagic]
    // PARALLAX SCROLL
    require('animation.gsap')
    require('debug.addIndicators')
    const controller = new this.$scrollmagic.Controller({
      globalSceneOptions: { triggerHook: 0.3, reverse: true, },
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
      // .addIndicators() // DEBUG
      .addTo(controller) // assign the scene to the controller
      [/plugin:scrollmagic] */
  },
}
</script>

<style>
/* fix single card on right */
#contact.referent .ref-right .card.card-rectangle {
  width: 100%;
}
/* fix no-description card 'more' sign */
#contact.referent .ref-right .card.card-rectangle:hover {
  padding: 10px 10px 20px;
}
#contact.referent .card {
  height: 205px;
}
</style>

<style scoped>
#contact.referent {
  color: white;
  margin: 100px auto;
}
#contact.referent:before {
  content: '';
  width: 100vw;
  position: absolute;
  z-index: -1;
  /* background: linear-gradient(270deg, #a7e2a8, #00ff06, #deff00, #00ffb7); */
  background: linear-gradient(270deg, #abdbe4, #3f51b5, #3f86b5, #066366);
  background-size: 800%;
  filter: saturate(0.5);
  animation: wavedient 10s ease infinite;
  animation-direction: alternate;
}
#contact.referent .ref-right,
#contact.referent .ref-left {
  text-align: center;
}
@media screen and (min-width: 768px) {
  #contact.referent {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: left;
  }
  #contact.referent .ref-left {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  #contact.referent:before {
    height: 40%;
  }
}
@media screen and (max-width: 767px) {
  #contact.referent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: left;
  }
  #contact.referent:before {
    height: 85%;
  }
  #contact.referent .ref-left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #contact.referent .ref-left button {
    margin: 20px;
  }
}
</style>
