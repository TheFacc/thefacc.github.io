<template>
  <main>
    <h1>Headquarters</h1>
    <section class="locations">
      <div class="place raised">
        <div class="info">Some place</div>
        <div id="map1" class="map"></div>
      </div>
      <div class="place raised">
        <div class="info">Some place</div>
        <div id="map2" class="map"></div>
      </div>
      <div class="place raised">
        <div class="info">Some place</div>
        <div id="map3" class="map"></div>
      </div>
    </section>
    <contact-form></contact-form>
  </main>
</template>

<script>
import ContactForm from '~/components/ContactForm.vue'
// const apiKey = process.env.GOOGLE_MAPS_API_KEY
// const apiKey = 'AIzaSyBQORu47i9VKWe0j6oTVikeqdZi7HSQ-pE'

export default {
  component: { ContactForm },
  // data() {
  //   return {
  //     initMap: maps.initMap,
  //   }
  // },
  head() {
    return {
      // script: [
      //   {
      //     type: 'text/javascript',
      //     src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=&v=weekly`,
      //   },
      // ],
    }
  },
  mounted() {
    // // if (!process.server) {
    // if (typeof google === 'undefined') {
    //   const script = document.createElement('script')
    //   script.onload = this.onScriptLoaded
    //   script.type = 'text/javascript'
    //   // script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=&v=weekly`
    //   script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=&v=weekly`
    //   document.head.appendChild(script)
    // } else {
    //   this.onScriptLoaded()
    // }
    // // }

    this.$store.commit('setTheme', '')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'Contact page',
      url: window.location.href,
    })
  },
  methods: {
    onScriptLoaded(event = null) {
      // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
      if (event) {
        console.log('Was added')
      } else {
        console.log('Already existed')
      }
      console.log(window.google)
      // DO
      // function initMap() {
      // Set coordinates
      const loc1 = { lat: -25.344, lng: 131.036 }
      const loc2 = { lat: -26.344, lng: 131.036 }
      const loc3 = { lat: -27.344, lng: 131.036 }
      // Inject map
      const map1 = window.google.maps.Map(document.getElementById('map1'), {
        zoom: 4,
        center: loc1,
      })
      const map2 = window.google.maps.Map(document.getElementById('map2'), {
        zoom: 4,
        center: loc2,
      })
      const map3 = window.google.maps.Map(document.getElementById('map3'), {
        zoom: 4,
        center: loc3,
      })
      // Add markers on map
      window.google.maps.Marker({ position: loc1, map: map1 })
      window.google.maps.Marker({ position: loc2, map: map2 })
      window.google.maps.Marker({ position: loc3, map: map3 })
      // }
    },
    set() {
      console.log('im INDEED a function!!1')
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.locations {
  margin: 60px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: nowrap;
}
.place {
  height: 400px;
  width: 25%;
}
.place .info {
  padding: 20px 8%;
}
.place .map {
  height: 200px;
  width: 100%;
}
</style>
