<template>
  <div class="dropdown-menu-wrapper" @click="isOpen = !isOpen">
    <div class="dropdown-menu">I am here!</div>
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
  top: 65px;
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
.dropdown-menu-wrapper .iconWrapper {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 1;
}
.dropdown-menu-wrapper .iconWrapper .bar1 {
  width: 100%;
  max-width: 28px;
  height: 3px;
  background: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 9999px;
  transform: translate(-50%, calc(-50% - 8px));
  transition: all 0.2s ease;
}
.dropdown-menu-wrapper .iconWrapper .bar1--open {
  transform: translate(-50%, -50%) rotate(45deg);
  margin-top: 0;
  background: red;
}
.dropdown-menu-wrapper .iconWrapper .bar2 {
  width: 100%;
  max-width: 28px;
  height: 3px;
  background: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 9999px;
  opacity: 1;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}
.dropdown-menu-wrapper .iconWrapper .bar2--open {
  opacity: 0;
}
.dropdown-menu-wrapper .iconWrapper .bar3 {
  width: 100%;
  max-width: 28px;
  height: 3px;
  background: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 9999px;
  transform: translate(-50%, calc(-50% + 8px));
  transition: all 0.2s ease;
}
.dropdown-menu-wrapper .iconWrapper .bar3--open {
  top: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  background: red;
}
.dropdown-menu-wrapper .iconWrapper--noTitle {
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: auto;
  height: auto;
  transform: none;
}
.dropdown-menu-wrapper .dropdown-menu {
  position: absolute;
  top: 100%;
  /* width: 100%;
  min-width: 300px;
  min-height: 10px; */
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 10px 10px 0 0 rgba(0, 0, 0, 0.03);
  background: white;
  padding: 10px 30px;
  animation: menu 0.3s ease forwards;
}
.dropdown-menu-wrapper .dropdown-menu .menuArrow {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  left: 20px;
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  background: white;
  transform: rotate(45deg);
  border-radius: 4px 0 0 0;
}
.dropdown-menu-wrapper .dropdown-menu .option {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.dropdown-menu-wrapper .dropdown-menu .option:last-child {
  border-bottom: 0;
}
.dropdown-menu-wrapper .dropdown-menu .option * {
  color: inherit;
  text-decoration: none;
  background: none;
  border: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
}
.dropdown-menu-wrapper .dropdown-menu .desc {
  opacity: 0.5;
  display: block;
  width: 100%;
  font-size: 14px;
  margin: 3px 0 0 0;
  cursor: default;
}
@keyframes menu {
  from {
    transform: translate3d(0, -20px, 0);
  }
  to {
    transform: translate3d(0, 10px, 0);
  }
}
.dropdown-menu-wrapper--noTitle {
  padding: 0;
  width: 60px;
  height: 60px;
}
</style>
