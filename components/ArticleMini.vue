<template>
  <div class="article-mini">
    <div ref="card" class="card">
      <div class="img" :style="{ 'background-image': `url(${image})` }"></div>
      <div class="text">
        <span>{{ date }}</span>
        <h3>{{ title }}</h3>
        <p>{{ summary }}</p>
      </div>
    </div>
    <p class="readmore">Read more »</p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    summary: { type: String, default: '' },
    image: { type: String, default: '' },
    date: { type: String, default: '' },
    format: { type: String, default: 'col' },
  },
  mounted() {
    if (this.format === 'row') {
      // articles by columns
      this.$refs.card.style.flexDirection = 'row'
    } else {
      // articles by rows
      this.$refs.card.style.flexDirection = 'column'
    }
  },
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #3a3a3a;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.2s ease-in-out;
}
.card:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.card:hover h3 {
  text-decoration: underline;
}
@media screen and (min-width: 768px) {
  .card .img,
  .card .text {
    width: 50%;
  }
}
@media screen and (max-width: 768px) {
  .card .img {
    width: 30%;
  }
  .card .text {
    width: 70%;
  }
}
.card .img {
  /* width: 100%; */
  height: 200px;
  margin: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card .text {
  padding: 0 8%;
  text-align: left;
}
.card .text span {
  font-size: 12px;
  color: #afafaf;
  font-family: courier, monospace;
  font-weight: bold;
}

/* ::after (read more) */
/* .article-mini::after {
  content: 'Read more »';
  position: absolute;
} */
.article-mini .readmore {
  opacity: 0;
  text-align: right;
  transition: 0.2s;
  transform: translateX(-20px);
}
.article-mini:hover .readmore {
  opacity: 1;
  transform: translateX(-10px);
}
</style>
