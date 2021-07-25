<template>
  <div
    :tooltip="text ? text : 'Go back'"
    flow="right"
    role="button"
    :aria-input-field-name="text ? text : 'Go back'"
    class="goback"
    :class="{ bounce: animated }"
    @click="
      animated = true
      path ? $goTo(path) : $goBack()
    "
    @animationend="animated = false"
  >
    <img
      :src="require(`~/assets/icons/${icon}`)"
      :alt="text ? text : 'Go back'"
    />
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
    path: { type: String, default: '' },
    icon: { type: String, default: 'back.svg' },
  },
  data() {
    return {
      animated: false,
    }
  },
}
</script>

<style scoped>
.goback {
  position: absolute;
  display: flex;
  padding: 20px;
  width: 60px;
  height: 60px;
  top: 77px;
  left: 10px;
  font-size: 32px;
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  border-radius: 100%;
  transition: 0.2s;
  z-index: 5;
}
.goback:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.goback img {
  filter: invert(1);
}
</style>
