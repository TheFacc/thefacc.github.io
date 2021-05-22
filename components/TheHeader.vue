<template>
  <header class="header">
    <div class="header-content">
      <div class="title" @click="goToHome"><h3>MouBE</h3></div>
      <div class="search"></div>
      <nav class="right">
        <button
          class="nav__toggle"
          aria-expanded="false"
          type="button"
          @click="navToggle"
        >
          menu
        </button>
        <ul class="nav__wrapper">
          <li
            v-for="(item, itemIndex) of menuOptions"
            :key="'menu-item-' + itemIndex"
            class="nav__item"
          >
            <nuxt-link :to="item.path">
              <img :src="item.icon" />
              <span>{{ item.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOptions: [
        {
          name: 'Areas',
          path: '/areas',
          icon: require('~/assets/icons/areas.svg'),
        },
        {
          name: 'Solutions',
          path: '/solutions',
          icon: require('~/assets/icons/solutions.svg'),
        },
        {
          name: 'Blog',
          path: '/blog',
          icon: '',
        },
        {
          name: 'About',
          path: '/about',
          icon: '',
        },
        {
          name: 'Contact',
          path: '/contact',
          icon: '',
        },
      ],
    }
  },
  // head: {
  //   script: [
  //     {
  //       type: 'text/javascript',
  //       src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js',
  //       ssr: false,
  //     },
  //   ],
  // },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    navToggle(e) {
      // open/close mobile menu on button click (in mobile mode)
      const navWrapper = this.$el.querySelector('.nav__wrapper')
      if (navWrapper.classList.contains('active')) {
        e.currentTarget.setAttribute('aria-expanded', 'false')
        e.currentTarget.setAttribute('aria-label', 'menu')
        navWrapper.classList.remove('active')
      } else {
        navWrapper.classList.add('active')
        e.currentTarget.setAttribute('aria-label', 'close menu')
        e.currentTarget.setAttribute('aria-expanded', 'true')
      }
    },
  },
}
</script>

<style>
.header {
  position: relative;
  height: 70px;
  background: #d2d2d28f;
  /*backdrop-filter: blur(5px);*/
  color: #222;
  display: flex;
  justify-content: space-between;
  text-align: center;
  z-index: 9001;
}
.header a {
  color: #222;
}
.header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: auto;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
@media (min-width: 800px) {
  .header-content {
    padding-top: 0;
    padding-bottom: 0;
  }
  .nav__wrapper {
    display: flex;
  }
  .nav__wrapper .nav__item {
    float: left;
  }
  .nav__item:not(:last-child) {
    margin-right: 0.5rem;
  }
}

@media (max-width: 799px) {
  .nav__wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 100%;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d2d2d28f;
    backdrop-filter: blur(5px);
    visibility: hidden;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    transition: 0.3s ease-in-out;
  }
  .nav__wrapper.active {
    visibility: visible;
    opacity: 1;
    transform: scaleY(1);
  }
}
/**/
.title {
  display: flex;
  justify-content: flex-start;
  font-size: 1.3rem;
  float: left;
}
.title:hover {
  cursor: pointer;
}
.search {
  flex: 1;
}
.right {
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  margin-left: auto;
}

nav ul {
  list-style-type: none;
}
.nav__item a {
  display: block;
  text-decoration: none;
  padding: 1rem;
  border-left: 4px solid transparent;
}
@media (min-width: 800px) {
  .nav__item a {
    text-align: center;
    border-left: 0;
    border-bottom: 4px solid transparent;
  }
}
.nav__item img {
  display: inline-block;
  vertical-align: middle;
  width: 28px;
  height: 28px;
  margin-right: 1rem;
}
@media (min-width: 800px) {
  .nav__item img {
    display: block;
    margin: 0 auto 0.5rem;
  }
}
.nav__item.active a {
  border-left-color: #222;
}
@media (min-width: 800px) {
  .nav__item.active a {
    border-bottom-color: #222;
  }
}
.nav__toggle {
  display: none;
}
@media (max-width: 799px) {
  .nav__toggle {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
}
</style>
