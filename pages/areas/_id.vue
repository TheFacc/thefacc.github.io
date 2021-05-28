<template>
  <main>
    <item-intro :item="item"></item-intro>
    <div class="container">
      <section class="overview raised">
        <div>
          <img
            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
          />
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
:title="card.title" :summary="card.summary" :image="card.image"
<script>
import ItemIntro from '~/components/ItemIntro.vue'
import CardGrid from '~/components/CardGrid.vue'

export default {
  components: { ItemIntro, CardGrid },
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
      item: { title: 'item title', intro: 'some intro' }, // to be retrieved from db based on type(area,product) and route.params.id
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
