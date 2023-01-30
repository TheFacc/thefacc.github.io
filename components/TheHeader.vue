<template>
  <header ref="header" class="header">
    <div class="header-content">
      <!-- 1. main logo -->
      <div class="logo" @click="$goToHome">
        <!-- <div v-html="require('~/assets/moube.svg?raw')" /> -->
        Alessio Facincani
      </div>

      <!-- 2. page title -->
      <div class="title">
        <transition name="title">
          <div v-if="showTitle">{{ $store.state.title }}</div>
        </transition>
      </div>

      <!-- 3. nav menu -->
      <nav class="right" role="navigation">
        <!-- mobile menu toggle button -->
        <div
          class="nav__toggle"
          role="button"
          :class="{ open: mobileMenuOpen, close: !mobileMenuOpen }"
          :aria-expanded="mobileMenuOpen"
          :aria-label="mobileMenuOpen ? 'close menu' : 'menu'"
          @click="toggleMobileMenu"
        >
          <span class="menu-text">MENU</span>
        </div>
        <!-- menu items -->
        <ul class="nav__wrapper" :class="{ active: mobileMenuOpen }">
          <li
            v-for="(item, itemIndex) of menuOptions"
            :key="'menu-item-' + itemIndex"
            class="nav__item"
            :class="{ active: item.options && item.dropdownOpen }"
            @mouseover="item.dropdownOpen = true"
            @mouseleave="item.dropdownOpen = false"
            @click="
              // close menu on item click
              if (!item.options) {
                toggleMobileMenu()
              }
            "
          >
            <nuxt-link :to="item.path">
              <div v-html="item.icon" />
              <span>{{ item.name }}</span>
            </nuxt-link>
            <!-- show item dropdown (if the current menu item does have sub-content) -->
            <!-- <transition name="dropdown">
              <nav-dropdown
                v-if="item.options && item.dropdownOpen"
                :items="item.options"
                @dropdown-clicked="toggleMobileMenu"
              ></nav-dropdown
            ></transition> -->
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
// import NavDropdown from './NavDropdown.vue'

export default {
  // components: { NavDropdown },
  data() {
    return {
      menuOptions: [
        {
          name: 'Learn',
          path: '/learn',
          icon: require('~/assets/icons/blog.svg?raw'),
        },
        {
          name: 'Photography',
          path: '/photography',
          icon: require('~/assets/icons/photo.svg?raw'),
        },
        {
          name: 'Videomaking',
          path: '/videomaking',
          icon: require('~/assets/icons/videom.svg?raw'),
        },
        {
          name: 'Life hacks',
          path: '/lifehacks',
          icon: require('~/assets/icons/solutions.svg?raw'),
        },
        // {
        //   name: 'Contact',
        //   path: '/contact',
        //   icon: require('~/assets/icons/contact.svg?raw'),
        // },
        {
          name: 'CV',
          path: '',
          icon: require('~/assets/icons/about.svg?raw'),
        },
      ],
      mobileMenuOpen: false,
      theme: this.$store.state.theme,
      showTitle: false,
    }
  },
  mounted() {
    const alpha = 0.6
    const header = this.$refs.header
    const body = document.body
    // set initial header color
    header.style.background = `rgba(${this.$hex2rgb(this.theme)},${alpha})`
    // change stuff on page scroll
    document.addEventListener('scroll', (e) => {
      const scrolled = document.scrollingElement.scrollTop
      const position = body.offsetTop
      if (scrolled > position + 300) {
        // specific color theme (area of product of an area) or default grey
        header.style.background = `rgba(${this.$hex2rgb(
          this.$store.state.theme
        )},${alpha})`
        this.showTitle = true
      } else {
        header.style.background = `rgba(${this.$hex2rgb(this.theme)},${alpha})`
        this.showTitle = false
      }
    })
    // listen to page clicks to close mobile menu if outside ;)
    document.addEventListener('click', (e) =>
      this.hideOnClickOutside(this.$refs.header)
    )
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    hideOnClickOutside(element) {
      const outsideClickListener = (event) => {
        if (this.mobileMenuOpen && !element.contains(event.target)) {
          this.toggleMobileMenu()
          removeClickListener()
        }
      }
      const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
      }
      document.addEventListener('click', outsideClickListener)
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
  color: #222;
  display: flex;
  justify-content: space-between;
  text-align: center;
  z-index: 9001;
  transition: 0.4s;
}
.header:before,
.nav__wrapper:before {
  content: '';
  position: absolute;
  backdrop-filter: blur(8px) saturate(0.8);
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.header a {
  color: #222;
}
.header-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  align-items: center;
}
.nav__wrapper {
  padding: 0;
}
@media (min-width: 960px) {
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
  /* dropdown <transition> */
  .dropdown-enter {
    transform: translate(0px, -30px) scaleY(0);
    opacity: 0;
  }
  .dropdown-leave-to {
    transform: translate(0px, -10px);
    opacity: 0;
  }
  .dropdown-leave-active,
  .dropdown-enter-active {
    transition: 0.3s;
  }
}

@media (max-width: 959px) {
  .nav__wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    /* align-items: flex-end; */
    padding: 0;
    top: 100%;
    right: 0;
    left: 0;
    z-index: -1;
    background-color: rgba(210, 210, 210, 0.6);
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
  .nav__item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    transition: 0.5s;
  }
  .nav__item a {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    border-right: 4px solid transparent;
    padding: 10px 1rem;
  }
  .nav__item:not(:last-child) a.nuxt-link-active {
    border-right-color: rgba(0, 0, 0, 0.85);
  }
  .nav__item.active {
    margin-right: 45%;
  }
  .nav__item.active .dropdown-menu {
    transform: translate(5px, -50%);
    transition: 1s;
  }
  .nav__item span {
    margin: 0 10px;
  }
  .selector-filter {
    background: rgba(210, 210, 210, 0.6);
  }
  .container {
    margin: 0 auto;
    padding: 0 10px;
  }
}

/* 1. LOGO*/
.logo {
  display: flex;
  justify-content: flex-start;
  font-size: 1.3rem;
  float: left;
  padding: 0 20px;
}
.logo:hover {
  cursor: pointer;
}
.logo > div {
  width: 165px;
}

/* 2. TITLE */
.title {
  flex: 1;
  font-size: 20px;
  font-variant: small-caps;
}
/* <transitions> */
.title-enter {
  transform: translate(0px, 30px);
  opacity: 0;
}
.title-leave-to {
  /* font-size: 2em; */
  transform: translate(-60px, 30px) scale(1.7);
  opacity: 0;
}
.title-leave-active,
.title-enter-active {
  transition: 0.5s;
}
@media screen and (max-width: 900px) {
  .title-leave-active {
    position: absolute;
  }
}
/* 3. NAV */
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
.nav__item:not(:last-child) a.nuxt-link-active {
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
@media (min-width: 960px) {
  .nav__item a {
    text-align: center;
    border-left: 0;
    border-bottom: 4px solid transparent;
    transition: 0.5s;
  }
  .nav__item svg {
    display: block;
    margin: 0 auto 0.5rem;
  }
  .nav__item:hover a {
    border-bottom-color: rgba(0, 0, 0, 0.2);
    transition: 0s;
  }
  .nav__item:not(:last-child) a.nuxt-link-active {
    border-bottom-color: rgba(0, 0, 0, 0.85);
  }
  .nav__toggle {
    display: none;
  }
}
/* hamburger menu v2 (text) */
@media (max-width: 959px) {
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
