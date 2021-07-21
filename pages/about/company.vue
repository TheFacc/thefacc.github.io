<template>
  <main>
    <item-intro :item="discover" :items="areas"></item-intro>
    <page-anchors :item-color="areaColors" :sections="sections"></page-anchors>
    <div class="container">
      <section id="ourname">
        <div class="left" v-html="require('~/assets/moube.svg?raw')"></div>
        <div class="right">
          <p>
            <span>MOU</span>ving forward to make the world a <span>BE</span>tter
            place
          </p>
        </div>
      </section>
      <section id="purpose" class="overview raised anchored">
        <div class="intro-img">
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          />
        </div>
        <div class="intro-text">
          <h1>Our purpose</h1>
          <h4>
            A company built for a sustainable future, to help people work better
            together, trust one another, and build global solutions to global
            problems
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <p>
            <span class="quote"
              >“There’s no shortage of remarkable ideas, what’s missing is the
              will to execute them.”</span
            ><br />
            – Seth Godin
          </p>
        </div>
      </section>
      <section id="research" class="overview raised anchored reverse">
        <div class="intro-img">
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          />
        </div>
        <div class="intro-text">
          <h1>Research</h1>
          <h4>Pioneering tech begins with groundbreaking research</h4>
          <p>
            MouBE began with and has grown through research. Before any
            technology we integrate is developed, it is specified. And before it
            is specified, it is researched. That research is peer-reviewed - a
            unique achievement for a unique platform - so that our ideas may be
            challenged before they are validated.
          </p>
          <p class="quote">
            To build a lasting future, we’ve ensured the durability and
            stability of every building block
          </p>
        </div>
      </section>
      <section id="technology" class="overview raised anchored">
        <div class="intro-img">
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          />
        </div>
        <div class="intro-text">
          <h1>Technology</h1>
          <h4>Technology realized through evidence-based science</h4>
          <p>
            MouBE brings a new standard in technology - open and inclusive – to
            challenge the old and activate a new age of sustainable,
            globally-distributed innovation.
          </p>
          <p>
            Our technology is underpinned by research. We have redefined what it
            means to create a global software platform through scientific
            methods. We have not compromised on our belief, or in our approach.
            To build a better future - secure, sustainable, and governable by
            the many - we have taken the road less traveled.
          </p>
        </div>
      </section>
      <section id="roadmap" class="anchored">
        <div class="roadmap">
          <h1>Roadmap</h1>
          <p>
            Here you will find an overview of our goals for each era of
            development, and where we're headed in the future.
          </p>
          <div>
            <img src="~/assets/roadmap.png" alt="MouBE Roadmap" />
          </div>
        </div>
      </section>
      <section id="partners" class="anchored">
        <h1>Partners</h1>
        <p>
          Reimagining value for our Business Partners with tracks focused on
          what matters most to you.
        </p>
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
        introShort:
          'MouBErs believe in progress — that the application of intelligence, reason and science can improve business, society and the human condition',
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
          name: 'Roadmap',
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
  computed: {
    areaColors() {
      // get area colors to send to pageanchors component
      const colors = []
      this.areas.forEach((area) => {
        colors.push(`${area.color}cc`)
      })
      return colors.join(',')
    },
  },
  mounted() {
    this.$store.commit('setTheme', '#d2d2d2')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'About MouBE',
      url: window.location.href,
    })
  },
}
</script>

<style scoped>
/* 0. OURNAME */
#ourname {
  display: flex;
  flex-direction: column;
}
#ourname .left {
  padding: 20px;
}
#ourname .right {
  font-size: 30px;
  font-weight: 300;
}
#ourname .right span {
  font-weight: 800;
}

/* 4. ROADMAP */
#roadmap:after {
  content: '';
  position: absolute;
  width: 100vw;
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
@media screen and (min-width: 768px) {
  #roadmap:after {
    height: 480px;
  }
}
@media screen and (max-width: 768px) {
  #roadmap:after {
    height: 300px;
  }
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
  color: lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
@media screen and (min-width: 768px) {
  .contact {
    padding: 30px;
  }
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
#contact .left p {
  padding: 0 12%;
  font-size: 32px;
  text-align: left;
}
@media screen and (min-width: 768px) {
  #contact .right,
  #contact .left {
    width: 50%;
  }
}
@media screen and (max-width: 768px) {
  #contact .left {
    width: 100%;
  }
}
</style>
