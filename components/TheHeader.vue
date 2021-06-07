<template>
  <header class="header">
    <div class="header-content">
      <!-- main logo -->
      <div class="title" @click="goToHome"><h3>MouBE</h3></div>
      <!-- search form (not there yet) -->
      <div class="search"></div>
      <!-- nav menu -->
      <nav class="right">
        <!-- mobile toggle -->
        <div
          class="nav__toggle"
          :class="{ open: mobileMenuOpen, close: !mobileMenuOpen }"
          :aria-expanded="mobileMenuOpen"
          :aria-label="mobileMenuOpen ? 'close menu' : 'menu'"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="menu-text">MENU</span>
        </div>
        <!-- menu items -->
        <ul class="nav__wrapper" :class="{ active: mobileMenuOpen }">
          <li
            v-for="(item, itemIndex) of menuOptions"
            :key="'menu-item-' + itemIndex"
            class="nav__item"
          >
            <nuxt-link
              :to="item.path"
              @mouseover="item.dropdownOpen = true"
              @mouseout="item.dropdownOpen = false"
            >
              <div v-html="item.icon" />
              <span>{{ item.name }}</span>
            </nuxt-link>
            <nav-dropdown
              v-show="item.dropdownOpen"
              :items="item.options"
            ></nav-dropdown>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import NavDropdown from './NavDropdown.vue'

export default {
  components: { NavDropdown },
  data() {
    return {
      menuOptions: [
        {
          name: 'Areas',
          path: '/areas',
          icon: require('~/assets/icons/areas.svg?raw'),
        },
        {
          name: 'Solutions',
          path: '/solutions',
          icon: require('~/assets/icons/solutions.svg?raw'),
        },
        {
          name: 'Blog',
          path: '/blog',
          icon: require('~/assets/icons/blog.svg?raw'),
        },
        {
          name: 'About',
          path: '/company',
          icon: require('~/assets/icons/about.svg?raw'),
          dropdownOpen: false,
          options: [
            {
              name: 'Company',
              path: '/company',
              icon: require('~/assets/icons/about.svg?raw'),
            },
            {
              name: 'People',
              path: '/people',
              icon: require('~/assets/icons/about.svg?raw'),
            },
          ],
        },
        {
          name: 'Contact',
          path: '/contact',
          icon: require('~/assets/icons/contact.svg?raw'),
        },
      ],
      mobileMenuOpen: false,
      itemHover: null,
    }
  },
  mounted() {
    // set container margin-top the same as nav height
    // document.body.style.marginTop = window
    //   .getComputedStyle(document.querySelector('header'))
    //   .getPropertyValue('height')
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    navHover(item) {
      if (item.options) {
        item.dropdownOpen = !item.dropdownOpen
      }
    },
  },
}
</script>

<style>
.header {
  position: sticky;
  width: 100%;
  top: 0;
  height: auto;
  background: rgba(210, 210, 210, 0.6);
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
  margin: 0 auto;
  align-items: center;
}
@media (min-width: 800px) {
  .header {
    backdrop-filter: blur(5px);
  }
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
  .nav__item a {
    display: block;
    padding: 7px 1rem 2px;
  }
}

@media (max-width: 799px) {
  .header {
    background: rgb(230, 230, 230);
  }
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
  .nav__item a {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    border-right: 4px solid transparent;
    padding: 10px 1rem;
  }
  .nav__item a.nuxt-link-active {
    border-right-color: #222;
  }
  .nav__item span {
    margin: 0 10px;
  }
}
/**/
.title {
  display: flex;
  justify-content: flex-start;
  font-size: 1.3rem;
  float: left;
  padding: 0 20px;
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
  margin: auto;
}
.nav__item a {
  text-decoration: none;
}
.nav__item a.nuxt-link-active {
  font-weight: bold;
}
nav ul {
  list-style-type: none;
}
.nav__item svg {
  display: inline-block;
  vertical-align: middle;
  height: 28px;
}
@media (min-width: 800px) {
  .nav__item a {
    text-align: center;
    border-left: 0;
    border-bottom: 4px solid transparent;
  }
  .nav__item svg {
    display: block;
    margin: 0 auto 0.5rem;
  }
  .nav__item a.nuxt-link-active {
    border-bottom-color: #222;
  }
  .nav__toggle {
    display: none;
  }
}
/* hamburger menu v2 (text) */
@media (max-width: 799px) {
  /*OPEN*/
  @keyframes topBar_open {
    0% {
      transform: translateY(0px) rotate(0deg);
      width: 60px;
    }
    10% {
      transform: translateY(-8px) rotate(0deg);
      width: 60px;
    }
    50% {
      transform: translateY(11px) rotate(45deg);
      width: 84px;
    }
    75% {
      transform: translateY(0px) rotate(45deg);
      width: 84px;
    }
    100% {
      transform: translateY(0px) rotate(45deg);
      width: 84px;
    }
  }
  @keyframes bottomBar_open {
    0% {
      transform: translateY(0px) rotate(0deg);
      width: 60px;
    }
    60% {
      transform: translateY(-25px) rotate(-45deg);
      width: 84px;
    }
    100% {
      transform: translateY(-25px) rotate(-45deg);
      width: 84px;
    }
  }
  @keyframes menuLabel_open {
    0% {
      transform: translateY(0px);
      opacity: 1;
    }
    25% {
      transform: translateY(-18px);
    }
    45% {
      transform: translateY(44px);
      opacity: 1;
    }
    48% {
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      transform: translateY(30px);
      opacity: 0;
    }
  }
  /*CLOSE*/
  @keyframes topBar_close {
    0% {
      transform: translateY(17px) rotate(45deg);
      width: 84px;
    }
    35% {
      transform: translateY(-8px) rotate(-4deg);
      width: 60px;
    }
    53% {
      transform: translateY(10px) rotate(3deg);
      width: 60px;
    }
    70% {
      transform: translateY(-6px) rotate(0deg);
      width: 60px;
    }
    100% {
      transform: translateY(-2px) rotate(0deg);
      width: 60px;
    }
  }
  @keyframes bottomBar_close {
    0% {
      transform: translateY(-8px) rotate(-45deg);
      width: 84px;
    }
    35% {
      transform: translateY(-18px) rotate(6deg);
      width: 60px;
    }
    53% {
      transform: translateY(0px) rotate(-3deg);
      width: 60px;
    }
    68% {
      transform: translateY(-7px) rotate(0deg);
      width: 60px;
    }
    100% {
      transform: translateY(0px) rotate(0deg);
      width: 60px;
    }
  }
  @keyframes menuLabel_close {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    5% {
      transform: translateY(25px);
      opacity: 1;
    }
    25% {
      transform: translateY(-30px);
      opacity: 1;
    }
    37% {
      transform: translateY(-22px);
      opacity: 1;
    }
    45% {
      transform: translateY(-22px);
      opacity: 1;
    }
    58% {
      transform: translateY(8px) rotate(-10deg);
      opacity: 1;
    }
    83% {
      transform: translateY(-6px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  .nav__toggle {
    display: block;
    position: relative;
    text-align: center;
    width: 60px;
    height: 67px;
    transform: scale(0.6);
  }
  .nav__toggle:before,
  .nav__toggle:after {
    content: '';
    width: 100%;
    height: 8px;
    background-color: #222;
    display: block;
    position: absolute;
    border-radius: 20px;
  }
  .nav__toggle:before {
    transform-origin: left center;
  }
  .nav__toggle:after {
    right: 0;
    top: 25px;
    transform-origin: right center;
  }
  .nav__toggle .menu-text {
    color: #222;
    font-family: 'Candal', sans-serif;
    display: block;
    position: absolute;
    bottom: 0;
    font-size: 17px;
    letter-spacing: 2.5px;
  }
  .nav__toggle:hover {
    cursor: pointer;
  }
  .nav__toggle.open:before {
    animation: topBar_open 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }
  .nav__toggle.open:after {
    animation: bottomBar_open 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }
  .nav__toggle.open .menu-text {
    animation: menuLabel_open 0.5s ease-in;
    animation-fill-mode: forwards;
  }
  .nav__toggle.close:before {
    animation: topBar_close 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }
  .nav__toggle.close:after {
    animation: bottomBar_close 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }
  .nav__toggle.close .menu-text {
    animation: menuLabel_close 0.5s ease-in;
    animation-fill-mode: forwards;
  }
}
</style>
