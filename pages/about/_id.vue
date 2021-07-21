<template>
  <div class="container">
    <div class="backlink">
      <i class="fa fa-arrow-left"></i>
      <a href="javascript:history.back()">Go Back</a>
    </div>

    <!-- instead of areacolor there should be area.color -->
    <div
      class="personDescription"
      :style="
        'background-image: linear-gradient(to right, lightgray,' +
        +areaColor +
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
        <h4>Area: <nuxt-link :to="'/areas/' + areaId">Analytics</nuxt-link></h4>
        <!-- this and the following link doesn't work, look at problem line 71-->
        <br />
        <h4>
          Referent of
          <nuxt-link :to="'/solutions/' + productId">product name</nuxt-link>
        </h4>
        <p>NOTE: this should be here only if person.referentOf != null</p>
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
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    const { id } = route.params
    const { person, productId, areaId } = await $axios
      .get(`${process.env.BASE_URL}/api/person/${id}`)
      .then((res) => {
        const person = res.data
        const productId = res.referentOf
        const areaId = res.areaId
        return { person, productId, areaId }
      })

    // i don't know but i can not get the forenkey values ( area_id, referent_of, manager_of)
    // all the commented part are because this problem
    // const area = await $axios.get(`${process.env.BASE_URL}/api/area/${areaId}`)

    return {
      person,
      productId,
      areaId,
      // area,
    }
  },

  data() {
    return {
      areaColor: '#4CAF50',
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

/* the backgroud of the person ha a gradient */
#grad1 {
  background-image: linear-gradient(to right, lightgray, red);
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

/*styling the back link */
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
