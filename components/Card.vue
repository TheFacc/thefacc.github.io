<template>
  <div ref="thisCard" class="card">
    <div
      ref="thisCardImg"
      class="img"
      :style="{ 'background-image': `url(${image})` }"
    ></div>
    <h3>{{ title }}</h3>
    <p>{{ summary }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    image: { type: String, default: () => '' },
    summary: { type: String, default: () => '' },
    shape: { type: String, default: () => '' },
    indent: { type: Boolean, default: () => false },
  },
  mounted() {
    // style based on shape
    // const card = this.$refs.thisCard
    // const cardImg = this.$refs.thisCardImg
    // if (this.shape === 'rectangle') {
    //   card.style.padding = '10px 10px'
    //   cardImg.style.height = '150px'
    // } else if (this.shape === 'circle') {
    //   card.style.borderRadius = '150px'
    //   card.style.width = '200px'
    //   card.style.height = '200px'
    //   card.style.flex = '0 0 calc(30% - 20px)'
    //   cardImg.style.height = '120px'
    //   // offset second row of circles for aesthetic purpose
    //   // cons: this only works well for 3-item rows and for 1,2,3 or 5 elements
    //   if (this.indent) {
    //     // card.style.marginLeft = '50%'
    //     card.style.marginTop = '-20px'
    //   }
    // }
    if (this.shape === 'rectangle') {
      this.$refs.thisCard.classList.add('card-rectangle')
    } else if (this.shape === 'circle') {
      this.$refs.thisCard.classList.add('card-circle')
    }
  },
}
</script>

<style scoped>
.card,
.card .img {
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  transform: translateY(15px) rotate(90deg);
  transition: 0.2s;
}
.card:hover::after {
  opacity: 1;
  transform: translateY(0px);
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
@media screen and (max-width: 768px) {
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
