<template>
  <main role="main">
    <section class="container fancy" role="banner">
      <h1>Headquarters</h1>
      <p>Our company is situated in multiple locations.</p>
      <p>
        We're currently mostly working in Italy, with the main legal an
        operational location in <strong>Milan</strong>. We're also present in
        <strong>Peschiera del Garda</strong>, near Verona, in a special location
        near the beautiful Garda lake. Our latest opening is the
        <strong>Jordan</strong>
        location, in an amazing and unique landscape that will let us expand our
        ideas and our view of the world.
      </p>
      <p>
        You can <strong>contact</strong> or <strong>call</strong> each location
        specifically, or use the general
        <a href="#contact"><strong>Contact Form</strong></a> present at the
        bottom of this page.
      </p>
    </section>
    <section class="locations">
      <div
        v-for="(place, index) in locations"
        :key="'place-' + index"
        class="place raised"
      >
        <h2>{{ place.name }}</h2>
        <div class="info">
          <i class="fa fa-map-marker fgrid-pin"></i>
          <span class="fgrid-road">
            <a :href="place.url" target="_blank" rel="noopener noreferrer">{{
              place.address
            }}</a>
          </span>
          <i class="fa fa-envelope fgrid-mail"></i>
          <span class="fgrid-contact">
            <a :href="`email:${place.email}`">{{ place.email }}</a>
          </span>
          <i class="fa fa-phone fgrid-phone"></i>
          <span class="fgrid-call">
            <a :href="`tel:${place.phone}`">{{ place.phone }}</a>
          </span>
        </div>
        <div class="pic">
          <img
            :src="require(`~/assets/img/${place.pic}`)"
            :alt="`MouBE ${place.name}`"
          />
        </div>
        <div :id="`map${index + 1}`" class="map"></div>
      </div>
    </section>
    <contact-form></contact-form>
  </main>
</template>

<script>
import ContactForm from '~/components/ContactForm.vue'
const apiKey = process.env.GOOGLE_MAPS_API_KEY

export default {
  component: { ContactForm },
  data() {
    return {
      locations: [
        {
          name: 'Milan',
          address: 'Via Edoardo Bonardi 9, Milano (MI), Italy',
          url: 'https://goo.gl/maps/GoRnkxro2ipLVmRQ6',
          email: 'milan@mou.be',
          phone: '+39 0256729873',
          pic: 'loc1.jpg',
        },
        {
          name: 'Verona',
          address: 'Piazza S. Marco 9, Peschiera del Garda (VR), Italy',
          url: 'https://goo.gl/maps/tDjEGG83jw4SWQ8Y9',
          email: 'verona@mou.be',
          phone: '+39 0256729873',
          pic: 'loc2.jpg',
        },
        {
          name: 'Jordan',
          address: 'Queen Rania St 285, Amman, Jordan',
          url: 'https://goo.gl/maps/5R65ofUXiyAYYp2v6',
          email: 'jordan@mou.be',
          phone: '+39 0256729873',
          pic: 'loc3.jpg',
        },
      ],
    }
  },
  head() {
    return {
      script: [
        {
          type: 'text/javascript',
          src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=&v=weekly`,
        },
      ],
    }
  },
  mounted() {
    // if (!process.server) {
    if (typeof google === 'undefined') {
      const script = document.createElement('script')
      script.onload = this.initMap
      script.type = 'text/javascript'
      // script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=&v=weekly`
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=&v=weekly`
      document.head.appendChild(script)
    } else {
      this.initMap()
    }
    // }

    this.$store.commit('setTheme', '')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'Contact page',
      url: window.location.href,
    })
  },
  methods: {
    initMap(event = null) {
      // YOU NOW HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
      // if (event) {
      //   console.log('Was added')
      // } else {
      //   console.log('Already existed')
      // }
      // console.log(window.google)

      // DO
      // function initMap() {
      // Set coordinates
      const loc1 = { lat: 45.4796614, lng: 9.2291043 }
      const loc2 = { lat: 45.4387173, lng: 10.693738 }
      const loc3 = { lat: 32.0179069, lng: 35.8691006 }
      // Inject map
      const map1 = new window.google.maps.Map(document.getElementById('map1'), {
        zoom: 10,
        center: loc1,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
      })
      const map2 = new window.google.maps.Map(document.getElementById('map2'), {
        zoom: 10,
        center: loc2,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
      })
      const map3 = new window.google.maps.Map(document.getElementById('map3'), {
        zoom: 10,
        center: loc3,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
      })
      // Add markers on map
      new window.google.maps.Marker({ position: loc1, map: map1 })
      new window.google.maps.Marker({ position: loc2, map: map2 })
      new window.google.maps.Marker({ position: loc3, map: map3 })
      // }
    },
  },
}
</script>

<style scoped>
/* head */
h1 {
  text-align: center;
}

/* places */
.locations {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: nowrap;
}
@media screen and (min-width: 768px) {
  .locations {
    margin: 60px 10%;
  }
}
@media screen and (max-width: 767px) {
  .locations {
    margin: 60px 3%;
  }
}
.place {
  height: 600px;
  width: 30%;
  text-align: center;
  overflow: hidden;
}
@media screen and (max-width: 767px) {
  .locations {
    flex-direction: column;
  }
  .place {
    width: 90%;
  }
}

.place .info {
  padding: 20px 12%;
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  grid-template-areas:
    'pin road'
    'mail contact'
    'phone call';
  align-items: center;
  height: 160px;
}
.place .info a {
  text-decoration: none;
}
.fgrid-pin {
  grid-area: pin;
}
.fgrid-road {
  grid-area: road;
}
.fgrid-mail {
  grid-area: mail;
}
.fgrid-contact {
  grid-area: contact;
}
.fgrid-phone {
  grid-area: phone;
}
.fgrid-call {
  grid-area: call;
}
.place .pic,
.place img,
.place .map {
  height: 200px;
}
.place img {
  width: 100%;
  object-fit: cover;
}
.place .map {
  width: 100%;
}
</style>
