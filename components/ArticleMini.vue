<template>
  <div class="article-mini">
    <div class="card">
      <div class="img" :style="{ 'background-image': `url(${image})` }"></div>
      <div class="text">
        <span>{{ date }}</span>
        <h3>{{ title }}</h3>
        <p>{{ summary }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    summary: { type: String, default: '' },
    image: { type: String, default: '' },
    date: { type: String, default: '' },
  },
}
</script>

<style scoped>
.card {
  overflow: hidden;
  background: #2e2e2e;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.2s ease-in-out;
}
@media screen and (min-width: 768px) {
  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
@media screen and (max-width: 768px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
.card:hover {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.card:hover h3 {
  text-decoration: underline;
}
.card .text p {
  height: 60px;
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
  padding: 0 20px;
  text-align: left;
}
.card .text span {
  font-size: 12px;
  color: #afafaf;
  font-family: courier, monospace;
  font-weight: bold;
}

/* ::after (read more) */
.article-mini::after {
  content: 'Read more »';
  position: absolute;
  transition: 0.2s;
}
@media screen and (min-width: 768px) {
  .article-mini::after {
    opacity: 0;
    transform: translate(260%, -25px);
  }
  .article-mini:hover::after {
    opacity: 1;
    transform: translate(240%, -25px);
  }
}
@media screen and (max-width: 768px) {
  .article-mini::after {
    transform: translate(100%, -25px);
  }
}
</style>
