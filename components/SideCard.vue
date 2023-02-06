<template>
  <div class="sidecard ma-4 ma-md-12 d-flex flex-row flex-md-column">
    <Transition name="slideup-fade">
      <v-card v-show="mode == 'card'" class="elevation-6">
        <div class="sidecard-img">
          <v-img
            src="https://icon-library.com/images/free-profile-icon/free-profile-icon-25.jpg"
          ></v-img>
        </div>

        <div>
          <v-card-title>Alessio Facincani</v-card-title>
          <v-card-text>
            <div>
              Mathematical Engineering M.Sc. student at Polytechnic University
              of Milan
            </div>
          </v-card-text>

          <!-- location -->
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-text="'mdi-pin'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Milano, Italy'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- email desktop -->
          <v-btn
            color="primary"
            class="d-none d-md-flex my-auto mx-12"
            :href="'mailto:' + mymail"
          >
            <v-icon left dark>mdi-email</v-icon>
            Email
          </v-btn>

          <v-divider class="ma-4 d-none d-md-block"></v-divider>

          <!-- links desktop -->
          <v-list nav dense class="d-none d-md-flex flex-column">
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :href="item.link"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <!-- email+links mobile -->
          <div class="d-flex d-md-none flex-row justify-center">
            <v-btn color="primary" :href="'mailto:' + mymail" class="ma-2">
              <v-icon left dark>mdi-email</v-icon>
              Email
            </v-btn>
            <v-menu transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  class="d-md-none ma-2"
                >
                  <v-icon left dark>mdi-menu-down</v-icon>
                  Links
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-card>
    </Transition>
    <Transition name="slideup-fade">
      <div v-show="mode == 'learn'">
        <p style="text-align: center">💆‍♂️</p>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: {
    mode: { type: String, default: 'card' }, // 'card' profile card, 'learn' for concentration
  },
  data: () => ({
    mymail: 'alessio.facincani@mail.polimi.it',
    items: [
      {
        text: 'LinkedIn',
        icon: 'mdi-linkedin',
        link: 'https://www.linkedin.com/in/alessio-facincani-2282a6114',
      },
      {
        text: 'GitHub',
        icon: 'mdi-github',
        link: 'https://github.com/TheFacc',
      },
      {
        text: 'Twitter',
        icon: 'mdi-twitter',
        link: 'https://twitter.com/imthefacc',
      },
      // { text: 'Instagram', icon: 'mdi-instagram' },
      {
        text: 'Local Guide',
        icon: 'mdi-google-maps',
        link: 'https://www.google.com/maps/contrib/102346090487341838120/',
      },
    ],
  }),
}
</script>

<style scoped>
@media screen and (min-width: 960px) {
  .sidecard {
    position: sticky;
    top: 8em;
    align-self: flex-start;
    width: 300px;
  }
}
@media screen and (max-width: 959px) {
  .sidecard-img {
    width: 30%;
  }
}

/* TRANSITIONS */
/* slide up + fade */
.slideup-fade-enter-active {
  transition: all 0.3s ease-in;
}
.slideup-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slideup-fade-enter-from,
.slideup-fade-leave-to {
  transform: translateY(-60px) scale(0.9);
  opacity: 0;
}
</style>
