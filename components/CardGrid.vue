<template>
  <div ref="thisGrid" class="card-grid">
    <card
      v-for="(card, cardIndex) of cards"
      :key="'card-' + cardIndex"
      :title="card.name"
      :summary="card.description"
      :image="card.image_src"
      :shape="shape"
      :indent="cardIndex > 2"
      @click="goTo(`/blog/${article.id}`)"
    ></card>
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
  },
}
</script>

<style scoped>
.card-grid {
  /* display: grid;
  grid-template-columns: repeat(4, calc(100% / 4));
  grid-gap: 10px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
/* .card-grid > div {
  display: flex;
  justify-content: center;
} */
/* @media screen and (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(3, calc(100% / 3));
  }
}
@media screen and (max-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, calc(100% / 2));
  }
} */
</style>
