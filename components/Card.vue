<template>
  <div class="card">
    <div class="img" :style="{ 'background-image': `url(${image})` }"></div>
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
  },
  mounted() {
    const cards = document.querySelectorAll('.card-grid .card')
    const cardImgs = document.querySelectorAll('.card-grid .card .img')
    if (this.shape === 'rectangle') {
      cards.forEach((card) => {
        card.style.padding = '20px 10px'
      })
      cardImgs.forEach((img) => {
        img.style.height = '150px'
      })
    } else if (this.shape === 'circle') {
      cards.forEach((card) => {
        card.style.borderRadius = '150px'
        card.style.height = '200px'
        card.style.width = '200px'
      })
      cardImgs.forEach((img) => {
        img.style.height = '120px'
      })
      const grid = document.querySelector('.card-grid')
      grid.style.gridTemplateColumns = 'repeat(3, calc(100% / 3))'
      grid.style.gridGap = '0'
      const lowCircles = document.querySelectorAll(
        '.card-grid :nth-child(n+4) .card'
      ) // requires displaying 3 items per row (always with circles)
      lowCircles.forEach((lowCircle) => {
        lowCircle.style.marginLeft = '50%'
        lowCircle.style.marginTop = '-20px'
      })
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
  background: #eeeeee;
  /* padding: 20px 10px; */
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.card:hover {
  transform: scale(1.03);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.card:hover .img {
  /* transform: scale(1.12); */
}
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
