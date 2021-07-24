<template>
  <main class="container">
    <!-- global back button (show if not just refreshed) -->
    <back-button
      v-if="$store.state.pagePrevious.title"
      :text="$store.state.pagePrevious.title"
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
      class="personDescription"
      :style="
        'background-image: linear-gradient(to right, transparent,' +
        area.color +
        ')'
      "
    >
      <div class="personImage">
        <div class="img"></div>
        <img :src="person.image_src" alt="" />
      </div>
      <div class="box1">
        <h2>{{ person.name }}</h2>
        <h4>{{ person.role }}</h4>
        <br />
        <p>
          <cite>
            Design is not just what it looks like and feels like. Design is how
            it works -Steve Jobs
          </cite>
        </p>
        <br />
        <br />
        <h4 v-if="area">
          Area:
          <nuxt-link :to="'/areas/' + areaId"> {{ area.name }}</nuxt-link>
        </h4>
        <br />

        <h4 v-if="product">
          Referent of
          <nuxt-link :to="'/solutions/' + productId">{{
            product.name
          }}</nuxt-link>
        </h4>
        <!-- add the link to linkedin in the icon-->
        <a :href="person.in_link" target="blank">
          <i class="fa fa-linkedin-square" style="font-size: 24px"></i>
        </a>

        <button
          class="material-button raised dark ripple"
          @click="$goTo(`/contact`)"
        >
          Contact us
        </button>
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
      title: 'Team:' + this.person.name,
      url: window.location.href,
    })
  },
}
</script>

<style>
@media screen and (min-width: 768px) {
  .overview {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: left;
  }
  /* .overview > div {
    width: 50%;
    padding: 20px;
  } */
}
</style>

<style scoped>
/* style for the links */
a:link {
  color: blue;
}
a:hover {
  color: white;
  background-color: blue;
}
/*style for the whole person div*/
.personDescription {
  display: flex;
  flex-flow: row;
  text-align: center;
  align-items: center;
}
/* customize the view for different size of the page */
@media screen and (max-width: 450px) {
  .personDescription {
    flex-flow: column;
  }
}

/* style for the image on the left*/
.personImage {
  height: 500px;
  width: 400px;
  display: flex;
  align-items: center;
}

img {
  size: 100%;
}

/*styling the back button */
.backlink {
  display: flex;
  flex-direction: row;
  align-items: center;
}

/*style for the description on the right */
.box1 {
  display: block;
  text-align: left;
  align-items: center;
  padding: 50px;
  background-color: rgb(240, 233, 233);
}

button {
  color: gray;
  border: 2px solid gray;
}

/* icons style*/
.fa {
  display: block;
  padding: 10px;
  color: #0077b5;
}

.fa-arrow-left {
  color: black;
}
</style>
