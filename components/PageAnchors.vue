<template>
  <div class="page-anchors" :style="`background:${item.color}AA`">
    anchors here
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style>
.page-anchors {
  text-align: center;
  height: 50px;
  position: sticky;
  top: 65px;
  backdrop-filter: blur(5px);
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  z-index: 9999;
}
</style>
