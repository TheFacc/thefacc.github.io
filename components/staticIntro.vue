<template>
  <section class="static-intro">
    <div class="intro-left">
      <h1>{{ title }}</h1>
      <p>{{ introShort }}</p>
    </div>
    <div class="intro-right">
      <img src="~/static/moubeCircle.png" width="100%" height="100%" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    introShort: String,
  },
}
</script>

<style scoped>
.static-intro {
  width: 100%;
  height: 300px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.intro-left,
.intro-right {
  position: relative;
  height: 250px;
  width: 250px;
}

.intro-left {
  width: 25%;
}
.static-intro svg {
  height: 300px;
  fill: #ddd;
}
</style>
