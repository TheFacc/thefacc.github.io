<template>
  <section class="item-intro">
    <div class="intro-left">
      <h1>{{ title }}</h1>
      <p>{{ intro }}</p>
    </div>
    <div class="intro-right">
      <circle-even
        :vbox="vbox"
        :items="areas"
        :main-cx="mainCx"
        :main-cy="mainCy"
        :main-r="mainR"
        spacing="left"
      ></circle-even>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'sometitle',
      intro: 'someintro',
      areas: [
        {
          name: 'Cloud computing',
          path: '#',
          color: '#F44336',
        },
        {
          name: 'Analytics',
          path: '#',
          color: '#4CAF50',
        },
        {
          name: 'Machine learning',
          path: '#',
          color: '#FFC107',
        },
        {
          name: 'Blockchain',
          path: '#',
          color: '#00BCD4',
        },
      ],
      mainCx: 450,
      mainCy: 250,
      mainR: 150,
      vbox: '-50 0 700 500',
    }
  },
}
</script>

<style scoped>
.item-intro {
  width: 100%;
  height: 300px;
  padding: 20px;
  background: #222;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.intro-left,
.intro-right {
  position: relative;
}
.item-intro svg {
  height: 300px;
}
.item-intro svg {
  fill: #ddd;
}
</style>
