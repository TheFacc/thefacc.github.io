<template>
  <div ref="thisGrid" class="card-grid" role="list">
    <transition-group name="card">
      <div
        v-for="card of cards"
        :key="'card' + card.name"
        role="listitem"
        class="card"
        :class="{
          'card-rectangle': shape === 'rectangle',
          'card-circle': shape === 'circle',
          bounce: animating >= 0 ? card.id === animating : false,
        }"
        :style="
          tooltipData.length
            ? {
                border:
                  '4px double ' +
                  tooltipData[parseInt(card['areaId']) - 1].color,
              }
            : ''
        "
        :tooltip="
          tooltipData.length && tooltipData[parseInt(card[field]) - 1]
            ? tooltipPrefix + tooltipData[parseInt(card[field]) - 1].name
            : ''
        "
        flow="in"
        @click="
          animating = card.id
          $goTo(`${path}/${card.id}`)
        "
        @animationend="animating = -1"
      >
        <div class="card-aft">
          <div
            ref="thisCardImg"
            class="img"
            :style="{ 'background-image': `url(${card.image})` }"
          ></div>
          <h3>{{ card.name }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    cards: { type: Array, default: () => [] },
    shape: { type: String, default: 'rectangle' },
    path: { type: String, default: '/' },
    tooltipData: { type: Array, default: () => [] }, // if additional info is needed (areas or products)
    field: { type: String, default: 'areaId' }, // field of data to get (areaid or prodid)
    tooltipPrefix: { type: String, default: '' },
  },
  data() {
    return {
      animating: -1, // clicked card.id to bounce-animate it
    }
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
  /* overflow: hidden; */
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
.card:hover h3,
.card:hover p {
  margin-bottom: 0;
}
/* ::before (area icon if needed) */
/* ::after (read more) */
.card-aft::after {
  content: '➕';
  position: absolute;
  opacity: 0;
  transform: translate(-12px, 15px) rotate(90deg);
  background: white;
  border-radius: 100%;
  transition: 0.2s;
}
.dark .card-aft::after {
  background: transparent;
}
.card:hover .card-aft::after {
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
.dark .card.card-rectangle:hover {
  background: rgba(255, 255, 255, 0.1);
}
/* card circle */
.card.card-circle {
  /* border-radius: 80px; */
  border-radius: 100%;
  /* width: 200px;
  height: 200px; */
  /* flex: 0 0 calc(30% - 20px); */
  overflow: hidden;
}
.card.card-circle .img {
  height: 120px;
}
.card.card-circle p {
  margin-bottom: 40px;
}
.card.card-circle:hover p {
  margin-bottom: 20px;
}
/* card wrapping */
@media screen and (min-width: 960px) {
  .card.card-rectangle {
    width: 22%;
  }
  .card.card-circle,
  .selector-items .card {
    width: 30%;
  }
}
@media screen and (max-width: 959px) {
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
