<template>
  <footer role="footer">
    <div>
      <div class="footerContainer">
        <div class="footerLeft">
          <!-- 1. main logo -->
          <div class="Logo" @click="goToHome">
            <div v-html="require('~/assets/moube.svg?raw')" />
          </div>
          <div class="footerInfo">
            <p>
              <i class="fa fa-map-marker" style="font-size: 24px"></i> via Non
              So,3<br />Milano,MI
            </p>
          </div>
          <div class="footerInfo">
            <p>
              <i class="fa fa-envelope" style="font-size: 24px"></i>
              moube@libero.it
            </p>
          </div>
          <div class="footerInfo">
            <p>
              <i class="fa fa-phone" style="font-size: 24px"></i> 33356729873
            </p>
          </div>
        </div>
        <div class="footerRight">
          <div>
            <nuxt-link to="/areas"> Areas </nuxt-link>
          </div>
          <div class="line">
            <div v-for="area in areas" :key="area.id">
              <a
                :href="'/areas/' + area.id"
                class="areaLink"
                :style="'color:' + area.color"
                >{{ area.name }}</a
              >
            </div>
          </div>
          <div class="line">
            <nuxt-link to="/solutions"> Solutions </nuxt-link>
            <nuxt-link to="/blog"> Articles </nuxt-link>
          </div>
          <div>
            <nuxt-link to="/about/company"> Our company </nuxt-link>
            <nuxt-link to="/about/people"> Our teaml </nuxt-link>
          </div>
        </div>
      </div>
      <div class="final">
        <p><i class="fa fa-copyright"></i>Copyright Alessio and Co.</p>
        <div>
          <a href="https://www.instagram.com/" target="blank"
            ><i class="fa fa-instagram quare"></i
          ></a>
          <a href="https://it-it.facebook.com/" target="blank"
            ><i class="fa fa-facebook quare"></i
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    areas: {
      type: Array,
      default() {
        return []
      },
    },
  },
  // data() {
  //   return {
  //     areas: [
  //       {
  //         id: 1,
  //         name: 'Cloud computing',
  //         path: '#',
  //         color: '#F44336',
  //         icon: require('~/assets/icons/area-cloud-computing.svg?raw'),
  //         active: false,
  //       },
  //       {
  //         id: 2,
  //         name: 'Analytics',
  //         path: '#',
  //         color: '#4CAF50',
  //         icon: require('~/assets/icons/area-analytics-2.svg?raw'),
  //         active: false,
  //       },
  //       {
  //         id: 3,
  //         name: 'Machine Learning',
  //         path: '#',
  //         color: '#FFC107',
  //         icon: require('~/assets/icons/area-machine-learning.svg?raw'),
  //         active: false,
  //       },
  //       {
  //         id: 4,
  //         name: 'Blockchain',
  //         path: '#',
  //         color: '#00BCD4',
  //         icon: require('~/assets/icons/area-blockchain.svg?raw'),
  //         active: false,
  //       },
  //     ],
  //   }
  // },

  methods: {
    goToHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style>
footer {
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  height: 250px;
  color: white;
  background: #222;
  text-align: center;
}
.footerContainer {
  display: flex;
  flex-flow: row;
  padding: 50px;
  align-content: center;
}
.footerLeft {
  display: flex;
  flex-flow: column;
  padding: 10px;
  margin-left: 30px;
}

.logo {
  display: flex;
  justify-content: flex-start;
  font-size: 1.3rem;
  float: left;
  padding: 0 20px;
}
.logo:hover {
  cursor: pointer;
}
.logo > div {
  width: 165px;
}
.footerInfo {
  padding: 0 10px;
}
.footerRight {
  display: flex;
  padding: 10px;
}

.footerRight div {
  display: flex;
  flex-flow: column;
  padding: 5px;
  justify-content: space-evenly;
  align-content: stretch;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
}
.line {
  border-right-color: white;
  border-right-style: inset;
}

a {
  color: white;
}
a:hover {
  color: rgb(80, 165, 168);
}
.areaLink:not(:hover) {
  color: white;
}
.final {
  background-color: dimgray;
  align-content: space-between;
  display: flex;
  justify-content: space-around;
}
</style>
