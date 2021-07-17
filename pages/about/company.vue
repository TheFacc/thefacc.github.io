<template>
  <main>
    <item-intro :item="discover" :items="areas"></item-intro>
    <page-anchors item-color="#dddddd" :sections="sections"></page-anchors>
    <div class="container">
      <section id="purpose" class="overview raised anchored">
        <div>
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          />
        </div>
        <div>
          <h2>Our purpose</h2>
          <h4>Some nice ispirational text</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h5>"some quote"</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>
      <section id="research" class="overview raised anchored">
        <div>
          <h1>Research</h1>
          <h4>Some nice ispirational text</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          />
        </div>
      </section>
      <section id="technology" class="overview raised anchored">
        <div>
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          />
        </div>
        <div>
          <h1>Technology</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>
      <section id="roadmap" class="anchored">
        <div class="roadmap">
          <h1>Roadmap</h1>
          <p>short text about this part</p>
          <div>
            <img src="~/assets/roadmap.png" alt="MouBE Roadmap" />
          </div>
        </div>
      </section>
      <section id="partners" class="anchored">
        <h1>Partners</h1>
        <p>short text about this part</p>
        <div class="partner-div">
          <div
            v-for="(partner, index) in partners"
            :key="'partner-' + index"
            class="partner-logo"
          >
            <a
              :href="partner.url"
              target="_blank"
              :alt="'Go to ' + partner.name + ' website'"
              :title="'Go to ' + partner.name + ' website'"
            >
              <img :src="partner.img" :alt="partner.name" />
            </a>
          </div>
        </div>
      </section>
      <section id="contact">
        <div class="contact">
          <div class="left">
            <p>See us.<br />Know us.<br />Join us.</p>
          </div>
          <div class="right">
            <p>What are you waiting for? Get in touch now.</p>
            <button
              class="material-button raised dark ripple"
              @click="$goTo(`/contact`)"
            >
              Contact us
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import PageAnchors from '~/components/PageAnchors.vue'

export default {
  components: { PageAnchors },
  async asyncData({ $axios, route }) {
    // get all areas for the intro section
    const areas = await $axios.$get(`${process.env.BASE_URL}/api/area`)
    areas.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    return { areas }
  },
  data() {
    return {
      // 'fake' item for the intro section
      discover: {
        name: 'Discover MouBE',
        introShort: 'MOUving forward to make the world a BEtter place',
      },

      // define page sections for the anchors nav
      sections: [
        {
          name: 'Purpose',
          sectionId: 'purpose',
          anchorId: 'purpose-anchor',
        },
        {
          name: 'Research',
          sectionId: 'research',
          anchorId: 'research-anchor',
        },
        {
          name: 'Technology',
          sectionId: 'technology',
          anchorId: 'technology-anchor',
        },
        {
          name: 'RoadMap',
          sectionId: 'roadmap',
          anchorId: 'roadmap-anchor',
        },
        {
          name: 'Partners',
          sectionId: 'partners',
          anchorId: 'partners-anchor',
        },
      ],

      // partners
      partners: [
        {
          name: 'Akamas',
          url: 'https://www.akamas.io/',
          img: require('~/assets/partners/akamas.png'),
        },
        {
          name: 'Amazon',
          url: 'https://www.amazon.com/',
          img: require('~/assets/partners/amazon.png'),
        },
        {
          name: 'Arduino',
          url: 'https://www.arduino.cc/',
          img: require('~/assets/partners/arduino.png'),
        },
        {
          name: 'Cleafy',
          url: 'https://www.cleafy.com/',
          img: require('~/assets/partners/cleafy.png'),
        },
        {
          name: 'ContentWise',
          url: 'https://www.contentwise.com/',
          img: require('~/assets/partners/contentwise.png'),
        },
        {
          name: 'Dynatrace',
          url: 'https://www.dynatrace.it/',
          img: require('~/assets/partners/dynatrace.png'),
        },
        {
          name: 'Moviri',
          url: 'https://www.moviri.com/',
          img: require('~/assets/partners/moviri.png'),
        },
      ],
    }
  },
}
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .overview {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: left;
  }
  .overview > div {
    width: 50%;
    padding: 20px;
  }
}

/* 4. ROADMAP */
#roadmap:before {
  content: '';
  position: absolute;
  width: 100vw;
  height: 60%;
  z-index: -1;
  background: linear-gradient(
    270deg,
    #999999 30%,
    #c0c0c0,
    #88b9cc,
    #999999 70%
  );
  background-size: 1000%;
  animation: wavedient 5s ease infinite;
}

/* 5. PARTNERS */
.partner-div {
  text-align: center;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.partner-logo {
  display: inline-block;
  width: 22%;
  margin: 10px 1%;
}

/* 6. CONTACT */
.contact {
  width: 100%;
  height: 300px;
  padding: 30px;
  color: lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
#roadmap,
#contact {
  display: flex;
  align-items: center;
  justify-content: center;
}
#contact:before {
  content: '';
  position: absolute;
  width: 100vw;
  height: 40%;
  background: #222;
  z-index: -1;
}
#contact .right {
  position: relative;
  display: block;
}
#contact .right p {
  font-size: 18px;
  padding: 20px;
}
#contact .left {
  width: 25%;
}
#contact .left p {
  font-size: 32px;
  text-align: left;
}
</style>
