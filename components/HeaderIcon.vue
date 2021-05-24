<template>
  <!-- <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 651.9"
    style="enable-background: new 0 0 512 651.9"
    xml:space="preserve"
    :v-html="iconfile"
  >
    <text transform="matrix(1 0 0 1 0 621)" class="header-icon">
      {{ icontext }}
    </text>
  </svg> -->
  <!-- <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 651.9"
    style="enable-background: new 0 0 512 651.9"
    xml:space="preserve"
  >
    <g v-html="icongfile" />
    <text transform="matrix(1 0 0 1 0 621)" class="header-icon-text">
      {{ icontext }}
    </text>
  </svg> -->
  <div v-html="iconfile" />
</template>

<script>
export default {
  name: 'header-icon',
  // props: {
  //   icongfile: { type: String, required: true },
  //   icontext: { type: String, required: true },
  // },
  props: ['iconfile', 'icontext'],
  // mounted() {
  //   // extract <g> graphics tag from loaded svg file and insert into svg (failed :c)
  //   console.log(this.$props.icontext, ' -> opening file... - ')
  //   const svgfile = open('../assets/icons/areas.svg') // open(this.$props.iconfile)
  //   console.log('file opened: ')
  //   console.log(svgfile)
  //   const allGs = svgfile.read().getElementsByTagName('g')
  //   document.getElementsByTagName('svg').prepend(allGs)
  // },
  mounted() {},
}
</script>

<style></style>
