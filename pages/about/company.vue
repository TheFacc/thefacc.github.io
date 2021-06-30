<template>
  <main>
    <static-intro
      :title="'Discover MouBE'"
      :introShort="'MOUving forward to make the world a BEtter place'"
    ></static-intro>
    <page-anchors :sections="sections"></page-anchors>
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
        <h1>Roadmap</h1>
        <p>short text about this part</p>
        <div class="road_graph">
          <img
            src="~/static/roadmap.png"
            width="100%"
            height="100%"
            alt="roadmap image"
          />
        </div>
      </section>
      <section id="partners" class="anchored">
        <h1>Partners</h1>

        <p>short text about this part</p>
        <div class="partner-div">
          <div class="logo">
            <img
              src="~/static/partners/akamas.png"
              width="100%"
              height="100%"
              alt="akamas"
            />
          </div>
          <div class="logo">
            <img
              src="~/static/partners/amazon.png"
              width="100%"
              height="100%"
              alt="amazon"
            />
          </div>
          <div class="logo">
            <img
              src="~/static/partners/arduino.png"
              width="100%"
              height="100%"
              alt="arduino"
            />
          </div>
          <div class="logo">
            <img
              src="~/static/partners/cleafy.png"
              width="100%"
              height="100%"
              alt="cleafy"
            />
          </div>
          <div class="logo">
            <img
              src="~/static/partners/contentwise.png"
              width="100%"
              height="100%"
              alt="contentwise"
            />
          </div>
          <div class="logo">
            <img
              src="~/static/partners/dynatrace.png"
              width="100%"
              height="100%"
              alt="dynatrace"
            />
          </div>
          <div class="logo">
            <img
              src="~/static/partners/moviri.png"
              width="100%"
              height="100%"
              alt="moviri"
            />
          </div>
        </div>
      </section>
      <section class="contact-us">
        <div class="left">
          <h1>See us</h1>
          <h1>Know us</h1>
          <h1>Join us</h1>
        </div>
        <div class="right">
          <h4>We are amazing! what are you waiting?</h4>
          <button @click="goTo(`/contact`)">Contact us</button>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import PageAnchors from '~/components/PageAnchors.vue'
import StaticIntro from '~/components/staticIntro.vue'
export default {
  components: { StaticIntro, PageAnchors },
  data() {
    return {
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
    }
  },
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
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

.partner-div {
  text-align: center;
  width: 100%;
  padding: 30px;
}

.logo {
  display: inline-block;
  width: 22%;
  margin: 10px 1%;
}

.contact-us {
  width: 100%;
  height: 300px;
  padding: 30px;
  background: #222;
  color: lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.right {
  position: relative;
  display: block;
}
.right h4 {
  padding: 20px;
}
button {
  background-color: transparent;
  color: lightgray;
  border: 2px solid lightgray;
}

.left {
  width: 25%;
}
</style>
