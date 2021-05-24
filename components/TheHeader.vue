<template>
  <header class="header">
    <div class="header-content">
      <div class="title" @click="goToHome"><h3>MouBE</h3></div>
      <div class="search"></div>
      <nav class="right">
        <div class="nav__toggle" aria-expanded="false" @click="navToggle">
          <span class="menu-text">MENU</span>
        </div>
        <ul class="nav__wrapper">
          <li
            v-for="(item, itemIndex) of menuOptions"
            :key="'menu-item-' + itemIndex"
            class="nav__item"
          >
            <nuxt-link :to="item.path">
              <div v-html="item.icon" />
              <!-- <img :src="item.icon" /> -->
              <span>{{ item.name }}</span>
              <!-- <div v-html="item.icon" /> -->
              <!-- <header-icon
                :iconfile="item.icon"
                :icontext="item.name"
              ></header-icon> -->
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
// import HeaderIcon from './HeaderIcon.vue'

export default {
  // components: { HeaderIcon },
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
          path: '/about',
          icon: require('~/assets/icons/about.svg?raw'),
        },
        {
          name: 'Contact',
          path: '/contact',
          icon: require('~/assets/icons/contact.svg?raw'),
        },
      ],
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    navToggle(e) {
      // open/close mobile menu on button click (in mobile mode)
      const navWrapper = this.$el.querySelector('.nav__wrapper')
      const hamButton = this.$el.querySelector('.nav__toggle')
      if (navWrapper.classList.contains('active')) {
        e.currentTarget.setAttribute('aria-expanded', 'false')
        e.currentTarget.setAttribute('aria-label', 'menu')
        navWrapper.classList.remove('active')
        hamButton.classList.remove('open')
        hamButton.classList.add('close')
      } else {
        navWrapper.classList.add('active')
        hamButton.classList.remove('close')
        hamButton.classList.add('open')
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
  height: auto;
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
  margin: 0 auto;
  align-items: center;
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
  .nav__item a {
    display: block;
    padding: 7px 1rem 2px;
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
    height: 65px;
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
/*nav hover fx v1 (::after)
li.nav__item::after {
  position: absolute;
  content: '';
  width: 100%;
  height: 4px;
  background: #ced7db;
  bottom: 0;
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: right top;
  background-image: linear-gradient(120deg, #ff5722 0, #ff5722 100%);
}
li.nav__item:hover::after {
  transform-origin: left top;
  transform: scaleX(1);
}*/
/*nav hover fx v2 (border) */
/* .border-animation {
  --border-width: 0.1em;
  --animation-speed: 0.5s;
  --color: #222;
  color: var(--color);
  position: relative;
  display: inline-block;
  border: var(--border-width) solid transparent;
}
.border-animation .border-animation__inner {
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  z-index: 1;
  border: solid var(--border-width) transparent;
}
.border-animation:before,
.border-animation:after {
  content: '';
  position: absolute;
  background: var(--color);
}
.border-animation:focus:before,
.border-animation:hover:before {
  animation: beforeBorders var(--animation-speed) forwards ease-in-out;
}
.border-animation:focus:after,
.border-animation:hover:after {
  animation: afterBorders var(--animation-speed) forwards ease-in-out;
}
.border-animation:focus,
.border-animation:hover {
  animation: borderColors var(--animation-speed) steps(10) forwards;
  outline: none;
} */
/*.border-animation:focus .border-animation__inner,
.border-animation:hover .border-animation__inner {
  animation: background calc(var(--animation-speed) / 5 * 3) forwards
    ease-in-out;
  animation-delay: calc(var(--animation-speed) / 5 * 2);
}*/
/* @keyframes beforeBorders {
  0% {
    top: calc(var(--border-width) * -1);
    left: 50%;
    bottom: auto;
    right: auto;
    width: 0;
    height: 0;
  }
  33% {
    top: calc(var(--border-width) * -1);
    left: calc(var(--border-width) * -1);
    bottom: auto;
    right: auto;
    width: calc(var(--border-width) + 50%);
    height: 2px;
  }
  66% {
    top: calc(var(--border-width) * -1);
    left: calc(var(--border-width) * -1);
    bottom: auto;
    right: auto;
    width: var(--border-width);
    height: 3px;
  }
  100% {
    top: auto;
    left: calc(var(--border-width) * -1);
    bottom: calc(var(--border-width) * -1);
    right: auto;
    width: calc(var(--border-width) + 50%);
    height: 4px;
  }
}
@keyframes afterBorders {
  0% {
    top: calc(var(--border-width) * -1);
    left: auto;
    bottom: auto;
    right: 50%;
    width: 0;
    height: var(--border-width);
  }
  33% {
    top: calc(var(--border-width) * -1);
    left: auto;
    bottom: auto;
    right: calc(var(--border-width) * -1);
    width: calc(var(--border-width) + 50%);
    height: var(--border-width);
  }
  66% {
    top: calc(var(--border-width) * -1);
    left: auto;
    bottom: auto;
    right: calc(var(--border-width) * -1);
    width: var(--border-width);
    height: calc((var(--border-width) * 2) + 100%);
  }
  100% {
    top: auto;
    left: auto;
    bottom: calc(var(--border-width) * -1);
    right: calc(var(--border-width) * -1);
    width: calc(var(--border-width) + 50%);
    height: calc((var(--border-width) * 2) + 100%);
  }
}
@keyframes borderColors {
  0% {
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  33% {
    border-top-color: var(--color);
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  66% {
    border-top-color: var(--color);
    border-right-color: var(--color);
    border-bottom-color: transparent;
    border-left-color: var(--color);
  }
  100% {
    border-top-color: var(--color);
    border-right-color: var(--color);
    border-bottom-color: var(--color);
    border-left-color: var(--color);
  }
}
@keyframes background {
  to {
    background: #aaa;
  }
} */
</style>
