<template>
  <footer role="contentinfo">
    <div>
      <div class="footer-container">
        <div class="left">
          <!-- 1. main logo -->
          <div class="footer-logo" @click="$goToHome">
            <!-- <div v-html="require('~/assets/moube.svg?raw')" /> -->
            AF
          </div>
          <!-- <div class="info" role="list">
            <i class="fa fa-map-marker fgrid-pin"></i>
            <span class="fgrid-road" role="listitem"
              ><nuxt-link to="/contact" target="_blank"
                >Web Street, 1<br />Milano (MI), Italy</nuxt-link
              ></span
            >
            <i class="fa fa-envelope fgrid-mail"></i>
            <span class="fgrid-contact" role="listitem"
              ><a href="email:contact@mou.be">contact@mou.be</a></span
            >
            <i class="fa fa-phone fgrid-phone"></i>
            <span class="fgrid-call" role="listitem"
              ><a href="tel:+390256729873">+39 0256729873</a></span
            >
          </div> -->
        </div>
        <div class="right">
          <div class="right-grid fancy" role="grid">
            <div class="right-col" role="row">
              <div role="cell">
                <nuxt-link to="/areas"> Learn </nuxt-link>
              </div>
            </div>
            <div class="right-col" role="row">
              <div
                v-for="area in areas"
                :key="'footer-area-' + area.slug"
                role="cell"
              >
                <nuxt-link
                  :to="'/learn/' + area.slug"
                  class="area-link"
                  :style="{ color: area.color }"
                  >{{ area.title }}</nuxt-link
                >
              </div>
            </div>
            <div class="right-col" role="row">
              <div role="cell">
                <nuxt-link to="/photography"> Photography </nuxt-link>
              </div>
              <div role="cell">
                <nuxt-link to="/videomaking"> Videomaking </nuxt-link>
              </div>
              <div role="cell">
                <nuxt-link to="/lifehacks"> Life hacks </nuxt-link>
              </div>
            </div>
            <div class="right-col" role="row">
              <div role="cell">
                <nuxt-link to="/contact"> CV </nuxt-link>
              </div>
            </div>
          </div>
          <!--<div class="copyright">
             <div><i class="fa fa-copyright"></i> MouBE 2021</div> 
            <div>
              <a
                href="https://www.instagram.com/"
                target="blank"
                alt="instagram"
                title="instagram"
                ><i class="fa fa-instagram quare"></i
              ></a>
              <a
                href="https://it-it.facebook.com/"
                target="blank"
                alt="facebook"
                title="facebook"
                ><i class="fa fa-facebook quare"></i
              ></a>
              <a
                href="https://www.linkedin.com/"
                target="blank"
                alt="linkedin"
                title="linkedin"
                ><i class="fa fa-linkedin quare"></i
              ></a>
              <a
                href="https://www.youtube.com/"
                target="blank"
                alt="youtube"
                title="youtube"
                ><i class="fa fa-youtube quare"></i
              ></a>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      areas: [],
    }
  },
  async fetch() {
    this.areas = await this.$content('learn')
      .where({ slug: { $regex: '^(?!.*[0-9])(?!.*index).*$' } }) // ignore index and numbered files
      .only(['title', 'slug'])
      .fetch()
  },
}
</script>

<style scoped>
/* GENERAL */
a {
  color: white !important;
}
footer {
  /* position: absolute; */
  bottom: 0;
  /* height: 250px; */
  width: 100%;
}
.footer-container {
  text-align: center;
  padding: 20px 5%;
  color: white;
  background: #222;
}
@media screen and (min-width: 960px) {
  .footer-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}

/* LEFT */
footer .fleft {
  /* width: 40%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 4%;
  z-index: 1;
}
/* logo */
.footer-logo {
  width: 100%;
  height: 100px;
  padding: 20px 0;
}
@media screen and (min-width: 960px) {
  .footer-logo {
    margin-left: 10px;
  }
}
@media screen and (max-width: 959px) {
  .footer-logo {
    margin-bottom: 20px;
  }
}
.footer-logo:hover {
  cursor: pointer;
}
/* info */
footer .info {
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px 20px;
  grid-template-areas:
    'pin road'
    'mail contact'
    'phone call';
  align-items: center;
  padding: 0 20px;
}
footer .info a {
  text-decoration: none;
}
@media screen and (max-width: 959px) {
  footer .info {
    padding: 0 60px;
  }
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
footer .info div {
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
footer .info i {
  font-size: 24px;
  width: 52px;
}

/* RIGHT */
@media screen and (min-width: 960px) {
  footer .right {
    margin: 50px 10px;
  }
}
@media screen and (max-width: 959px) {
  footer .right {
    margin: 20px 10px;
  }
}
footer .right {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* hack to colorize grid gaps */
  background: linear-gradient(to right, transparent 30%, white 33%);
}
footer .right-grid {
  display: grid;
  color: white;
  text-align: center;
  grid-template-columns: repeat(4, minmax(auto, auto));
  grid-column-gap: 3px;
}
footer .right-col {
  background-color: #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
footer .right-col div {
  padding: 5px 0;
}
@media screen and (min-width: 960px) {
  footer .right-col {
    padding: 0 20px;
  }
}
@media screen and (max-width: 959px) {
  footer .right-col {
    padding: 0 7px;
  }
}
.copyright {
  color: rgba(255, 255, 255, 0.5);
  background-color: #222222;
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 50px;
}
@media screen and (min-width: 960px) {
  .copyright {
    margin-bottom: -50px;
  }
}
@media screen and (max-width: 959px) {
  .copyright {
    margin-bottom: -10px;
  }
}
.copyright a {
  padding: 5px;
  transition: 0.4s;
}
.copyright a:hover {
  color: white;
  transition: 0s;
}
footer .right-grid,
.copyright {
  transform: scale(1.05); /*prevent microborders*/
}

/* LINKS */
.right-grid.fancy a {
  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(129, 80, 80, 0)
    ),
    linear-gradient(
      to right,
      rgba(255, 0, 0, 1),
      rgba(255, 0, 180, 1),
      rgba(0, 100, 200, 1)
    );
  background-size: 100% 0.1em, 0 0.1em;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  opacity: 0.7;
  transition: 0.4s;
}
.right-grid.fancy a:hover,
.right-grid.fancy a:focus,
.right-grid.fancy a.nuxt-link-active {
  opacity: 1;
  background-size: 0 0.1em, 100% 0.1em;
  transition: opacity 0s, background-size 0.1s;
}
</style>
<style>
.footer-logo svg {
  filter: invert(1);
}
.footer-logo svg circle {
  filter: invert(1);
}
</style>
