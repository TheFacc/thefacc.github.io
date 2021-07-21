<template>
  <main class="container">
    <div class="backlink">
      <i class="fa fa-arrow-left"></i>
      <a href="javascript:history.back()">Go Back</a>
    </div>

    <div
      tooltip=""
      class="personDescription"
      :style="
        'background-image: linear-gradient(to right, lightgray,' +
        area.data.color +
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
          <nuxt-link :to="'/areas/' + areaId"> {{ area.data.name }}</nuxt-link>
        </h4>
        <br />

        <h4 v-if="product">
          Referent of
          <nuxt-link :to="'/solutions/' + productId">{{
            product.data.name
          }}</nuxt-link>
        </h4>
        <!-- add the link to linkedin in the icon-->
        <a :href="person.in_link" target="blank">
          <i class="fa fa-linkedin-square" style="font-size: 24px"></i>
        </a>

        <button
          class="material-button raised dark ripple"
          @click="goTo(`/contact`)"
        >
          Contact us
        </button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
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

    // select the name of the area only if the persons is an area manager
    let area
    let areaName
    if (areaId !== null && areaId !== undefined) {
      area = await $axios.get(`${process.env.BASE_URL}/api/area/${areaId}`)
      areaName = area.data.name
    } else {
      area = false
    }

    // select the productName only if the person is a referent
    let product
    if (productId !== null && productId !== undefined) {
      product = await $axios.get(
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

  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
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
