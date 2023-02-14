<template>
  <v-icon :dense="dense"><slot /></v-icon>
</template>
<script>
export default {
  props: {
    dense: { type: Boolean, default: false },
  },
}
</script>
