<template>
  <main>
    <item-intro
      :item="product"
      :items="areas"
      :item-id="areaId - 1"
    ></item-intro>
    <page-anchors
      :item-color="areas[areaId - 1].color"
      :sections="sections"
    ></page-anchors>
    <div class="container">
      <section id="intro" ref="intro" class="overview raised">
        <div class="intro-img">
          <img :src="product.image" />
        </div>
        <div class="intro-text">
          <h2>
            This is product {{ id }} from A{{ areaId }} ({{
              areas[areaId - 1].name
            }})
          </h2>
          <p>
            {{ product.intro }}
          </p>
        </div>
      </section>
      <section id="usecases" ref="usecases" class="usecases">
        <h1>Use cases</h1>
        <carousel :slides="usecases"></carousel>
      </section>
      <section id="referent" ref="referent" class="referent">
        <div class="ref-left">
          <h1>Get in touch!</h1>
          <button
            class="material-button raised ripple"
            @click="$goTo('/contact')"
          >
            Contact
          </button>
        </div>
        <div class="ref-right">
          <card-grid :cards="[referent]" shape="rectangle"></card-grid>
          <h4>Referent for {{ product.name }}</h4>
        </div>
      </section>
      <section class="items">
        <h2>Related products</h2>
        <card-grid :cards="products" shape="rectangle"></card-grid>
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

export default {
  components: { ItemIntro, PageAnchors, CardGrid, Carousel },
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
          sectionId: 'referent',
          anchorId: 'referent-anchor',
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setTheme', this.areas[this.areaId - 1].color)
    this.$store.commit(
      'setTitle',
      this.areas[this.areaId - 1].name + ': ' + this.product.name
    )

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
#referent .ref-right .card.card-rectangle {
  width: 100%;
}
/* fix no-description card 'more' sign */
#referent .ref-right .card.card-rectangle:hover {
  padding: 10px 10px 20px;
}
#referent .card {
  height: 205px;
}
</style>

<style scoped>
#referent {
  margin: 100px auto;
}
#referent:before {
  content: '';
  width: 100vw;
  height: 40%;
  position: absolute;
  z-index: -1;
  background: linear-gradient(270deg, #a7e2a8, #00ff06, #deff00, #00ffb7);
  background-size: 800%;
  filter: saturate(0.5);
  animation: wavedient 10s ease infinite;
  animation-direction: alternate;
}
#referent .ref-right {
  text-align: center;
}
@media screen and (min-width: 768px) {
  #referent {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: left;
  }
  #referent .ref-left {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}
@media screen and (max-width: 768px) {
  #referent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: left;
  }
  #referent .ref-left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  #referent .ref-left button {
    margin: 0 20px;
  }
}
</style>
