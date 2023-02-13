<template>
  <v-btn
    :to="to"
    :outlined="outlined"
    :elevation="elevation"
    :height="height"
    :width="width"
    :href="href"
    :icon="icon"
    :rounded="rounded"
    :nuxt="nuxt"
    ><slot
  /></v-btn>
</template>
<script>
export default {
  props: {
    to: { type: String, default: undefined },
    href: { type: String, default: undefined },
    elevation: { type: String, default: undefined },
    height: { type: String, default: undefined },
    width: { type: String, default: undefined },
    rounded: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
    nuxt: { type: Boolean, default: false },
    outlined: { type: Boolean, default: false },
  },
}
</script>
