<template>
  <main>
    <item-intro :item="item"></item-intro>
    <div class="container">
      <p>this is area {{ $route.params.id }}</p>
      <section>
        <h1>Products &amp; Services</h1>
        <div class="card-grid">
          <div
            v-for="(card, cardIndex) of cards"
            :key="'card-' + cardIndex"
            @click="goTo(`/blog/${article.id}`)"
          >
            <card
              :title="card.title"
              :summary="card.summary"
              :image="card.image"
              :shape="shape"
            ></card>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import ItemIntro from '~/components/ItemIntro.vue'
import Card from '~/components/Card.vue'

export default {
  components: { ItemIntro, Card },
  asyncData({ $axios, route }) {
    // const { id } = route.params
    // const { data } = await $axios.get(
    //   `${process.env.BASE_URL}/api/article/${id}`
    // )
    // const article = data
    // return {
    //   article,
    // }
  },
  data() {
    return {
      item: { title: 'item title', intro: 'some intro' },
      cards: [
        {
          title: 'Product 1',
          summary: 'Some area description',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product 2',
          summary: 'Some area description',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product 3',
          summary: 'Some area description',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product 4',
          summary: 'Some area description',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product 5',
          summary: 'Some area description',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
      ],
      shape: 'circle',
    } // to be retrieved from db based on type(area,product) and route.params.id
  },
  mounted() {
    // if (this.shape === 'circle') {
    //   document.querySelector('.card-grid').style.gridTemplateColumns =
    //     'repeat(3, calc(100% / 3))'
    // }
  },
}
</script>

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, calc(100% / 4));
  grid-gap: 10px;
  margin-top: 40px;
}
/* .card-grid > div {
  display: flex;
  justify-content: center;
} */
@media screen and (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(3, calc(100% / 3));
  }
}
@media screen and (max-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, calc(100% / 2));
  }
}
</style>
