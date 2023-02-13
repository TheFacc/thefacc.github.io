<template>
  <div
    :class="{ 'mx-auto': !acroVisible }"
    class="acronyms ml-4 ml-md-12 mr-md-n8"
  >
    <div class="d-flex flex-row">
      <p class="uppercase text-black font-h3 ma-auto tracking-wider">
        Acronyms
      </p>
      <v-btn icon class="ma-2" @click="acroVisible = !acroVisible"
        ><v-icon>{{ acroVisible ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon></v-btn
      >
    </div>
    <div>
      <v-list-item
        v-for="(item, idx) in acronyms"
        :key="idx"
        class="pt-0 pb-0"
        style="min-height: 24px"
        ><v-list-item-subtitle>
          <v-tooltip left v-if="!acroVisible">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                <bold>{{ item[0] }}</bold>
              </span>
            </template>
            {{ item[1] }}
          </v-tooltip>
          <bold v-else>{{ item[0] }}</bold>
          <Transition name="shrink">
            <span v-if="acroVisible">: {{ item[1] }}</span>
          </Transition>
        </v-list-item-subtitle>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { acroVisible: true }
  },
  props: {
    acronyms: { type: Array, default: [] },
  },
  // computed: {
  //   mobile() {
  //     return this.$vuetify.breakpoint.sm
  //   },
  // },
}
</script>

<style scoped>
.acronyms bold {
  padding: 0px 5px;
  margin: 2px;
  background: #e8f3d6;
  border-radius: 5px;
}
@media screen and (min-width: 960px) {
  .acronyms {
    position: sticky;
    top: 8em;
    align-self: flex-start;
    /* width: 290px; */
  }
}

/* TRANSITION: fade in from left */
.shrink-enter-active {
  transition: all 0.5s ease-out;
}
.shrink-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.shrink-enter,
.shrink-leave-to {
  font-size: 0px;
  opacity: 0;
}
</style>
