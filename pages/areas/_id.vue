<template>
  <main>
    <item-intro :item="items[$route.params.id - 1]"></item-intro>
    <page-anchors></page-anchors>
    <div class="container">
      <section class="overview raised">
        <div>
          <img :src="items[$route.params.id - 1].image" />
        </div>
        <div>
          <h2>This is area {{ $route.params.id }}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>
      <section class="items">
        <h1>Products &amp; Services</h1>
        <card-grid :cards="cards" shape="rectangle"></card-grid>
      </section>
      <section class="people raised dark">
        <h1>People</h1>
        <!-- leaderboard -->
        <card-grid :cards="teamLeaders" shape="circle"></card-grid>
        <!-- team -->
        <card-grid :cards="team" shape="rectangle"></card-grid>
      </section>
    </div>
  </main>
</template>

<script>
// :title="card.title" :summary="card.summary" :image="card.image"
import ItemIntro from '~/components/ItemIntro.vue'
import CardGrid from '~/components/CardGrid.vue'
import PageAnchors from '~/components/PageAnchors.vue'

export default {
  components: { ItemIntro, CardGrid, PageAnchors },
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
      items: [
        {
          title: 'Cloud computing',
          intro: 'some intro',
          image:
            'https://imgcdn.agendadigitale.eu/wp-content/uploads/sites/3/2017/04/15191852/cloud_611605280.jpg',
          color: '#F44336',
        },
        {
          title: 'Analytics',
          intro: 'some intro',
          image: 'https://media.engage.it/2020/11/analytics-730x416_305079.jpg',
          color: '#4CAF50',
        },
        {
          title: 'Machine Learning',
          intro: 'some intro',
          image:
            'https://www.ionos.it/digitalguide/fileadmin/DigitalGuide/Teaser/deep-learning-vs-machine-learning-t.jpg',
          color: '#FFC107',
        },
        {
          title: 'Blockchain',
          intro: 'some intro',
          image:
            'https://www.almaviva.it/dam/jcr:6212e8ef-1ed6-40e2-a75f-b6fa7c814662/Blockchain_1280x720.jpg',
          color: '#00BCD4',
        },
      ], // to be retrieved from db based on type(area,product) and route.params.id
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
        {
          title: 'Product 6',
          summary: 'Some area description',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
        {
          title: 'Product 7',
          summary: 'Some area description',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        },
      ],
      teamLeaders: [
        {
          title: 'Giovanni Vernia',
          summary: 'Area Manager',
          image:
            'https://icon-icons.com/downloadimage.php?id=149314&root=2468/PNG/256/&file=user_kids_avatar_user_profile_icon_149314.png',
        },
        {
          title: 'John Doe',
          summary: 'CRO',
          image:
            'https://icon-icons.com/downloadimage.php?id=149314&root=2468/PNG/256/&file=user_kids_avatar_user_profile_icon_149314.png',
        },
      ],
      team: [
        {
          title: 'Joan Doul',
          summary: 'Engineer',
          image:
            'https://icon-icons.com/downloadimage.php?id=149314&root=2468/PNG/256/&file=user_kids_avatar_user_profile_icon_149314.png',
        },
        {
          title: 'Joe Doe',
          summary: 'Engineer',
          image:
            'https://icon-icons.com/downloadimage.php?id=149314&root=2468/PNG/256/&file=user_kids_avatar_user_profile_icon_149314.png',
        },
        {
          title: 'Johnny Doo',
          summary: 'Engineer',
          image:
            'https://icon-icons.com/downloadimage.php?id=149314&root=2468/PNG/256/&file=user_kids_avatar_user_profile_icon_149314.png',
        },
        {
          title: 'Johanna Dowe',
          summary: 'Engineer',
          image:
            'https://icon-icons.com/downloadimage.php?id=149317&root=2468/PNG/256/&file=user_user_profile_user_icon_user_thump_icon_149317.png',
        },
      ],
      shape: 'rectangle',
      styles: {},
      debounceTimeout: 6, // for parallax scrolling
    }
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
@media screen and (min-width: 768px) {
  .overview {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: left;
  }
  .overview > div {
    width: 50%;
    padding: 20px;
  }
}
@media screen and (max-width: 768px) {
  .overview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: left;
  }
  .overview > div {
    padding: 10px;
  }
}
/* .overview > div:first-child {
  width: 50%;
} */
</style>
