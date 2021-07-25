<template>
  <main class="container">
    <!-- global back button (show if not just refreshed) -->
    <back-button
      v-if="$store.state.pagePrevious.title"
      :text="$store.state.pagePrevious.title"
      :path="$store.state.pagePrevious.href"
    ></back-button>
    <!-- team back button (if back doesn't do the same)(move down if the other button is present) -->
    <back-button
      v-if="$store.state.pagePrevious.title !== 'Our team'"
      text="Our team"
      path="/about/people"
      icon="people.svg"
      :style="{ top: $store.state.pagePrevious.title ? '150px' : '' }"
    ></back-button>

    <div
      class="person-description"
      role="main"
      :style="`background-image: linear-gradient(to right, transparent, ${area.color})`"
    >
      <div class="person-image">
        <div class="img"></div>
        <img :src="person.image" :alt="person.name + ' profile photo'" />
      </div>
      <div class="box1">
        <h2>{{ person.name }}</h2>
        <!-- some citation -->
        <div>
          <cite>
            Design is not just what it looks like and feels like.<br />
            Design is how it works.
          </cite>
          <p style="text-align: right">-Steve Jobs</p>
        </div>

        <!-- conditional role -->
        <div class="role fancy">
          <h4 v-if="person.role === 'Area manager'">
            Area Manager of
            <nuxt-link
              :to="`/areas/${areaId}`"
              :style="{ 'background-color': area.color }"
              tooltip="Go to area"
              flow="right"
              >{{ area.name }}</nuxt-link
            >
          </h4>
          <h4 v-else-if="product">
            Product referent of
            <nuxt-link
              :to="`/solutions/${productId}`"
              :style="{ 'background-color': area.color }"
              tooltip="Go to product"
              flow="right"
              >{{ product.name }}</nuxt-link
            >
          </h4>
          <h4 v-else>{{ person.role }}</h4>

          <!-- area -->
          <h4 v-if="area && person.role !== 'Area manager'">
            Area:
            <nuxt-link
              :to="`/areas/${areaId}`"
              :style="{ 'background-color': area.color }"
              tooltip="Go to area"
              flow="right"
            >
              {{ area.name }}
            </nuxt-link>
          </h4>
        </div>

        <!-- contacts -->
        <div class="contacts">
          <div v-if="product && person.in_link">
            <a :href="person.in_link" target="_blank">
              <button
                role="button"
                :aria-command-name="`Contact product referent of ${product.name}`"
                class="material-button raised ripple ref-button"
                :style="{
                  background: area
                    ? changeColorBrightness(area.color, -30)
                    : '',
                  color: 'white',
                }"
              >
                <i class="fa fa-linkedin-square"></i> Contact {{ person.name }}
              </button>
            </a>
          </div>
          <div>
            <button
              role="button"
              aria-command-name="Open contact page"
              class="material-button raised ripple"
              :style="{
                background: area ? changeColorBrightness(area.color, -70) : '',
                color: 'white',
              }"
              @click="$goTo(`/contact`)"
            >
              Contact MouBE
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BackButton from '~/components/BackButton.vue'
export default {
  components: { BackButton },
  async asyncData({ $axios, route }) {
    // select the specific person with the id
    const { id } = route.params
    const { person, productId, areaId } = await $axios
      .get(`${process.env.BASE_URL}/api/person/${id}`)
      .then((res) => {
        const person = res.data
        const productId = person.referentOf
        const areaId = person.areaId
        return { person, productId, areaId }
      })

    // select the name of the area only if the person is an area manager
    let area
    let areaName
    if (areaId !== null && areaId !== undefined) {
      area = await $axios.$get(`${process.env.BASE_URL}/api/area/${areaId}`)
      areaName = area.name
    } else {
      area = false
    }

    // select the productName only if the person is a referent
    let product
    if (productId !== null && productId !== undefined) {
      product = await $axios.$get(
        `${process.env.BASE_URL}/api/product/${productId}`
      )
    } else {
      product = false
    }

    return {
      person,
      productId,
      areaId,
      area,
      areaName,
      product,
    }
  },
  mounted() {
    this.$store.commit('setTheme', this.area.color)
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'Team: ' + this.person.name,
      url: window.location.href,
    })
  },
  methods: {
    // redefine same method as in functions.js, sometimes somehow it breaks and cant find the $function
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

<style scoped>
/* style for the links */
.box1 a {
  text-decoration: none;
}
.box1 .role a {
  padding: 5px;
  transition: 0.7s;
}
.box1 .role a:hover {
  padding: 5px 10px;
}

/*style for the whole person div*/
.person-description {
  display: flex;
  flex-flow: row;
  text-align: center;
  align-items: center;
  outline: 5px solid rgba(255, 255, 255, 0.5);
  outline-offset: -10px;
  overflow: hidden;
  background: linear-gradient(130deg, #abdbe4, #3f51b5, #3f86b5, #066366);
  background-size: 400%;
  animation: wavedient 20s ease infinite;
  animation-direction: alternate;
}
/* customize the view for different size of the page */
@media screen and (max-width: 767px) {
  .person-description {
    flex-flow: column;
  }
}

/* style for the image on the left*/
.person-image {
  height: 500px;
  width: 400px;
  display: flex;
  align-items: center;
}
img {
  size: 100%;
}
@media screen and (max-width: 767px) {
  .person-image {
    height: 350px;
  }
}

/*style for the description on the right */
.box1 {
  display: block;
  text-align: left;
  align-items: center;
  background-color: rgb(240, 233, 233);
}
@media screen and (min-width: 768px) {
  .box1 {
    padding: 50px;
  }
  .box1 .contacts {
    margin-top: 20px;
  }
}
@media screen and (max-width: 767px) {
  .box1 {
    padding: 20px 35px;
  }
}
.box1 > div {
  margin: 10px 0;
}
.box1 h4 {
  padding: 10px 0;
}
.box1 .contacts {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.box1 .contacts button {
  margin: 15px 5px;
  width: 98%;
  font-size: 13px;
}

/* icons style*/
.fa {
  display: block;
  padding-right: 8px;
  color: white;
  /* color: #0077b5; */
}
.ref-button {
  display: flex;
  align-items: center;
  flex-direction: row;
}
</style>
