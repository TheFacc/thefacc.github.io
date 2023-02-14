<template>
  <v-img :src="src" :width="width"><slot /></v-img>
</template>
<script>
export default {
  props: {
    src: { type: String, default: undefined },
    width: { type: String, default: undefined },
  },
}
</script>
