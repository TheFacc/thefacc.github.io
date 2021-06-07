<template>
  <div class="dropdown-menu-wrapper">
    <div class="dropdown-menu">
      <li
        v-for="(item, itemIndex) of items"
        :key="'menu-item-' + itemIndex"
        class="dropdown-item"
        @click="$emit('dropdown-clicked', true)"
      >
        <nuxt-link :to="item.path">
          <div v-html="item.icon" class="dropdown-svg" />
          <span class="dropdown-name">{{ item.name }}</span>
        </nuxt-link>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      isOpen: true,
    }
  },
  methods: {
    openClose() {
      // Toggle menu
      const vm = this
      const closeListerner = (e) => {
        if (vm.catchOutsideClick(e, vm.$refs.menu)) {
          window.removeEventListener('click', closeListerner)
          vm.isOpen = false
        }
      }
      window.addEventListener('click', closeListerner)
      this.isOpen = !this.isOpen
    },
    catchOutsideClick(event, dropdown) {
      // When user clicks menu — do nothing
      if (dropdown === event.target) return false
      // When user clicks outside of the menu — close the menu
      if (this.isOpen && dropdown !== event.target) return true
    },
  },
}
</script>

<style scoped>
.dropdown-menu-wrapper {
  /* position: relative;
  top: 67px;
  width: 500px;
  height: 80px;
  border-radius: 8px;
  background: white;
  border: 1px solid #eee;
  box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.03);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); */
}
.dropdown-menu-wrapper * {
  box-sizing: border-box;
  text-align: left;
}
.dropdown-menu-wrapper .dropDownMenuButton {
  border: none;
  font-size: inherit;
  background: none;
  outline: none;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 70px 0 20px;
  margin: 0;
  line-height: 1;
  width: 100%;
  height: 100%;
  z-index: 2;
  cursor: pointer;
}
.dropdown-menu-wrapper .dropdown-menu {
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  border: 1px solid #eee;
  /* box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.03); */
  box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  padding: 10px;
}
@media (min-width: 768px) {
  .dropdown-menu-wrapper .dropdown-menu {
    animation: dropdown 0.3s ease;
  }
}
@media (max-width: 767px) {
  .dropdown-menu-wrapper .dropdown-menu {
    animation: dropdownMobile 0.5s ease;
  }
}
.dropdown-menu-wrapper .dropdown-menu a {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  border: 0;
}
.dropdown-menu-wrapper .dropdown-menu .dropdown-svg {
  margin: 0 10px;
}
/* item */
.dropdown-menu .dropdown-item a {
  transition: 0.5s;
}
.dropdown-menu .dropdown-item a {
  border-left: 4px solid transparent;
}
.dropdown-menu .dropdown-item:hover a {
  border-left-color: rgba(0, 0, 0, 0.2);
  transition: 0s;
}
.dropdown-menu .dropdown-item a.nuxt-link-active {
  border-left-color: rgba(0, 0, 0, 0.85);
}
@keyframes dropdown {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes dropdownMobile {
  from {
    opacity: 0;
    transform: translate(180px, -65%);
  }
  to {
    opacity: 1;
    transform: translate(5px, -65%);
  }
}
</style>
