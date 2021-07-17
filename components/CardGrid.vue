<template>
  <div ref="thisGrid" class="card-grid">
    <transition-group name="card">
      <div
        v-for="card of cards"
        :key="'card-' + card.name"
        class="card"
        :class="{
          'card-rectangle': shape === 'rectangle',
          'card-circle': shape === 'circle',
        }"
        @click="$goTo(`/solutions/${card.id}`)"
      >
        <div
          ref="thisCardImg"
          class="img"
          :style="{ 'background-image': `url(${card.image})` }"
        ></div>
        <h3>{{ card.name }}</h3>
        <p>{{ card.intro }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    cards: { type: Array, default: () => [] },
    shape: { type: String, default: 'rectangle' },
  },
  mounted() {
    // if (this.shape === 'circle') {
    //   const grid = this.$refs.thisGrid
    //   grid.style.gridTemplateColumns = 'repeat(3, calc(100% / 3))'
    //   grid.style.gridGap = '0'
    // }
    // if (this.shape === 'rectangle') {
    //   this.$refs.thisCard.classList.add('card-rectangle')
    // } else if (this.shape === 'circle') {
    //   this.$refs.thisCard.classList.add('card-circle')
    // }
  },
}
</script>

<style scoped>
/* CARD GRID */
.card-grid {
  /* display: grid;
  grid-template-columns: repeat(4, calc(100% / 4));
  grid-gap: 10px; */
}
.card-grid > span {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
/* SINGLE CARD */
.card,
.card .img {
  overflow: hidden;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.card {
  background: white;
  color: #222;
  /* padding: 20px 10px; */
  cursor: pointer;
  margin: 5px;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
}
.card:hover {
  transform: scale(1.03);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.card:hover .img,
.card:hover h3 {
  margin-bottom: 0;
}
/* ::after (read more) */
.card::after {
  content: '➕';
  position: absolute;
  opacity: 0;
  transform: translate(-12px, 15px) rotate(90deg);
  transition: 0.2s;
}
.card:hover::after {
  opacity: 1;
  transform: translate(-12px, 0px);
}
/* card rectangle */
.card.card-rectangle {
  padding: 10px 10px;
}
.card.card-rectangle .img {
  height: 150px;
}
.dark .card.card-rectangle {
  background: transparent;
  color: white;
}
/* card circle */
.card.card-circle {
  border-radius: 150px;
  /* width: 200px;
  height: 200px; */
  /* flex: 0 0 calc(30% - 20px); */
}
.card.card-circle .img {
  height: 120px;
}
/* card wrapping */
@media screen and (min-width: 768px) {
  .card.card-rectangle {
    width: 22%;
  }
  .card.card-circle,
  .selector-items .card {
    width: 30%;
  }
}
@media screen and (max-width: 767px) {
  .card.card-rectangle,
  .card.card-circle {
    width: 30%;
  }
}
@media screen and (max-width: 600px) {
  .card.card-rectangle,
  .card.card-circle {
    width: 45%;
  }
}

/* <transitions> */
.card-enter {
  transform: scale(0.5) translateY(-80px);
  opacity: 0;
}
.card-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.card-leave-active {
  position: absolute;
  z-index: -1;
}
.card-leave-active,
.card-enter-active {
  transition: 0.35s;
}

/* misc */
h3 {
  margin-bottom: 10px;
}
.img {
  width: 100%;
  max-width: 600px;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 10px;
}
</style>
