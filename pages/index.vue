<template>
  <main>
    <!-- 1. TOP CAROUSEL -->
    <section
      v-if="slides.length"
      id="home-slides"
      ref="home-slides"
      class="home-slides"
    >
      <carousel :slides="slides" theme="dark"></carousel>
    </section>

    <!-- 2. HOME AREAS -->
    <section id="home-areas">
      <div class="container fancy">
        <h3>Our areas of specialization</h3>
        <p>
          MouBE provides simple and secure solutions in many fields. We're
          currently specializing in these {{ areas.length }} areas:
        </p>
        <span
          v-for="(area, index) in areas"
          :key="'arealist-' + index"
          class="fancy"
        >
          <a
            :href="`/areas/${area.id}`"
            class="fancyul"
            :style="{
              'text-decoration': 'underline 2px ' + area.color,
              background: area.color + 'aa',
            }"
          >
            {{ area.name }}</a
          ><span v-if="index < areas.length - 1">, </span
          ><span v-else>.</span> </span
        ><br />
        <p>Each area provides a great variety of solutions for any need.</p>
        <p>
          Explore the <a href="/areas">areas</a>, browse the
          <a href="/solutions">solutions</a>, read our <a href="/blog">blog</a>,
          meet our <a href="/about/people">team</a>, get to
          <a href="/about/company">know us</a>. We're waiting for you!
        </p>
      </div>
      <div
        v-for="(area, index) in areas"
        :key="'area-' + index"
        class="area"
        :style="{
          background: `linear-gradient(${
            index % 2 ? 'to right' : 'to left'
          },transparent,${area.color + '55'})`,
          'outline-color': `${area.color + 'cc'}`,
        }"
      >
        <div class="area-left">
          <h2>{{ area.name }}</h2>
          <h4>{{ area.subtitle }}</h4>
          <p>{{ area.introShort }}</p>
          <button
            class="material-button raised ripple"
            :style="{
              'background-color': area.color + 'aa',
              color: 'black',
            }"
            @click="$goTo('/areas/' + area.id)"
          >
            Explore {{ area.name }} area
          </button>
        </div>
        <div class="area-right">
          <div
            class="area-right-wrapper"
            :style="{ background: area.color + '55' }"
          >
            <svg
              class="area-svg"
              :style="{ fill: changeColorBrightness(area.color, -20) }"
              v-html="require('~/assets/icons/' + area.icon + '?raw')"
            ></svg>
          </div>
        </div>
      </div>
    </section>
    <!-- 3. ARTICLES -->
    <section id="home-articles" class="dark recents">
      <h2>Recent articles</h2>
      <p>
        Discover in our Blog the latest news regarding our company and the world
        that surrounds us.
      </p>
      <div class="article-grid">
        <div
          v-for="(article, articleIndex) of articles"
          :key="'art-' + articleIndex"
          class="article"
          @click="$goTo(`/blog/${article.id}`)"
        >
          <article-mini
            :date="article.updatedAt.slice(0, 10)"
            :title="article.title"
            :summary="article.summary"
            :image="article.image"
            format="col"
          ></article-mini>
        </div>
      </div>
    </section>

    <!-- 4. CONTACT FORM -->
    <contact-form></contact-form>
  </main>
</template>

<script>
import ContactForm from '~/components/ContactForm.vue'
import ArticleMini from '~/components/ArticleMini.vue'

export default {
  components: { ContactForm, ArticleMini },
  async asyncData({ $axios }) {
    // AREAS: all
    const areas = await $axios.$get(`${process.env.BASE_URL}/api/area`)
    const areasNo = Math.max(...Object.values(areas.map((a) => a.id)))
    // PRODUCT: get 1 random product from each area
    const products = []
    for (let i = 1; i <= areasNo; i++) {
      // get all prods
      const prods = (await $axios.$get(`${process.env.BASE_URL}/api/area/${i}`))
        .products
      // extract random
      const randId = Math.floor(Math.random() * Math.floor(prods.length) + 1)
      products.push(prods[randId - 1])
    }
    // ARTICLES: latest 3
    const articles = await $axios
      .get(`${process.env.BASE_URL}/api/article`)
      .then((res) => {
        return (
          res.data
            // reverse sort
            .sort((a, b) => (a.id > b.id ? -1 : b.id > a.id ? 1 : 0))
            // get latest 3
            .slice(0, 3)
        )
      })
    return {
      areas,
      products,
      articles,
    }
  },
  data() {
    return {
      slides: [
        {
          name: 'MouBE',
          description: 'thats us',
          image:
            'https://ik.imagekit.io/hypermoube/o_iyNVNfNlW.svg?updatedAt=1627079567077',
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('setTheme', '')
    this.$store.commit('setTitle', 'Home')
    this.$store.commit('updateRoute', {
      title: 'Homepage',
      url: window.location.href,
    })
    // push obtained products to carousel slideshow (with some additional fields only for homepage)
    this.products.forEach((p) => {
      this.slides.push({
        name: p.name,
        description: p.introShort,
        image: p.image,
        area: this.areas[p.areaId - 1].name + ' solution:',
        color: this.areas[p.areaId - 1].color,
        url: '/solutions/' + p.id,
      })
    })
  },
  methods: {
    // redefine same method as in functions.js, sometimes somehow it breaks and cant find the $function,
    // maybe due to the carousel component also using it inside itself?
    changeColorBrightness(color, offset) {
      // INPUT: color:   hex (with or without #)
      //        offset:  % (from -100 to 100)
      let needHash = false
      if (color[0] === '#') {
        color = color.slice(1)
        needHash = true
      }
      const hex = parseInt(color, 16)
      let r = hex >> 16
      r += (r * offset) / 100
      if (r > 255) r = 255
      else if (r < 0) r = 0

      let g = (hex >> 8) & 0x00ff
      g += (g * offset) / 100
      if (g > 255) g = 255
      else if (g < 0) g = 0

      let b = hex & 0x0000ff
      b += (b * offset) / 100
      if (b > 255) b = 255
      else if (b < 0) b = 0

      return (needHash ? '#' : '') + (b | (g << 8) | (r << 16)).toString(16)
    },
  },
}
</script>

<style>
/* 1. CAROUSEL */
/* custom carousel styling for the homepage (global to inject it...) */
#home-slides .slide {
  width: 100%;
}
#home-slides .slide-left {
  padding: 30px 10%;
}
#home-slides .slide-right div {
  filter: drop-shadow(0px 0px 2px rgba(255, 255, 255, 01))
    drop-shadow(0px 0px 7px rgba(255, 255, 255, 1))
    drop-shadow(0px 0px 40px rgba(255, 255, 255, 0.5));
}
#home-slides .slide-left span {
  font-size: 20px;
  font-variant: small-caps;
  color: rgba(255, 255, 255, 0.5);
}
</style>
<style scoped>
/* texts */
@media screen and (min-width: 768px) {
  span.fancy a {
    padding: 5px;
  }
  span.fancy a:hover {
    padding: 5px 7px;
    opacity: 0.8;
    transition: 0s;
  }
}
@media screen and (max-width: 767px) {
  span.fancy a {
    padding: 2px 10px;
  }
}
span.fancy a {
  transition: 0.7s;
}

/* 2. AREAS blocks */
.area {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: left;
  margin: auto;
  outline-style: solid;
  outline-width: 0px;
  outline-offset: -1px;
  transition: 0.3s;
}
@media screen and (min-width: 768px) {
  .area {
    padding: 30px 10%;
  }
}
@media screen and (max-width: 767px) {
  .area {
    padding: 15px 3%;
  }
}
.area:hover {
  outline-offset: -15px;
  outline-width: 5px;
}
.area .area-svg {
  transition: 2s;
}
.area:hover .area-svg {
  transform: scale(1.2);
}
.area-left {
  padding: 30px 5%;
}
.area-right {
  text-align: center;
}
.area-right-wrapper {
  height: 350px;
  width: 350px;
  border-radius: 100%;
  transition: 2s;
}
.area:hover .area-right-wrapper {
  transform: scale(0.93);
}
@media screen and (min-width: 768px) {
  .area {
    flex-direction: row;
    height: 400px;
  }
  .area:nth-child(2n) {
    flex-direction: row-reverse;
  }
  .area-left,
  .area-right {
    width: 50%;
  }
  .area-right,
  .area-right-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .area-svg {
    height: 200px;
  }
}
@media screen and (max-width: 767px) {
  .area {
    flex-direction: column-reverse;
    /* height: 600px; */
  }
  .area-right {
    /* height: 400px; */
    width: 100%;
  }
  .area-right-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.area-button {
  margin: 10px 0;
}

/* 3. ARTICLES */
#home-articles {
  padding: 50px 10%;
  text-align: center;
}
</style>
