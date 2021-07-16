<template>
  <div class="carousel">
    <div class="carousel-cards">
      <transition-group name="slide">
        <!-- fake single-item vfor to enable animating through its key ;) -->
        <div
          v-for="(s, i) in 1"
          :key="'slide-' + i + currentSlideIndex"
          class="slide"
        >
          <div class="slide-left">
            <h2>{{ currentSlide.name }}</h2>
            <p class="slide-text">{{ currentSlide.description }}</p>
            <!-- <div class="slide-index">
              {{ currentSlideIndex + 1 }} / {{ slides.length }}
            </div> -->
          </div>
          <div class="slide-right">
            <img :src="currentSlide.image" />
          </div></div
      ></transition-group>
    </div>
    <!-- <div class="carousel-arrows">
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div> -->
    <div class="carousel-controls">
      <button
        type="button"
        class="carousel-slide-arrow-left"
        @click="plusSlides(-1)"
      >
        ←
      </button>
      <span
        v-for="(slide, index) in slides"
        :key="'slidecontrol-' + index"
        class="dot"
        :class="{ active: currentSlideIndex === index }"
        @click="currentSlideIndex = index"
        >{{ index + 1 }}</span
      >

      <button
        type="button"
        class="carousel-slide-arrow-right"
        @click="plusSlides(1)"
      >
        →
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return { currentSlideIndex: 0 }
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentSlideIndex]
    },
  },
  methods: {
    // Arrow controls
    plusSlides(i) {
      this.currentSlideIndex += i
      if (this.currentSlideIndex === this.slides.length) {
        this.currentSlideIndex = 0
      } else if (this.currentSlideIndex < 0) {
        this.currentSlideIndex = this.slides.length - 1
      }
    },
  },
}
</script>

<style>
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}
.slide {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: left;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  margin: auto;
  outline: 5px solid rgba(255, 255, 255, 0.5);
  outline-offset: -10px;
  width: 90%;
}
@media screen and (min-width: 768px) {
  .slide {
    flex-direction: row;
    height: 400px;
  }
  .slide-left,
  .slide-right {
    width: 50%;
  }
}
@media screen and (max-width: 767px) {
  .slide {
    flex-direction: column-reverse;
    height: 600px;
  }
}
.slide-left,
.slide-right {
  margin: 30px;
}
/* Arrows */
/* .carousel-arrows {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 400px;
  position: absolute;
  top: 25%;
  transform: translateX(-10px) scale(1.03, 0.9);
}
.prev,
.next {
  cursor: pointer;
  position: absolute;
  width: auto;
  padding: 20% 20px;
  color: white;
  font-weight: bold;
  font-size: 48px;
  transition: 0.6s ease;
  user-select: none;
}
.prev {
  left: 0;
}
.next {
  right: 0;
}
.prev:hover,
.next:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0s;
}
.prev:hover {
  transform: translateX(-5px);
}
.next:hover {
  transform: translateX(5px);
} */

/* Text */
.slide h2 {
  padding: 20px 0;
}
.slide-index {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  top: 0;
}

/* Indicators */
.carousel-controls {
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.dot {
  cursor: pointer;
  height: 30px;
  width: 30px;
  margin: 0 7px;
  padding: 6px;
  font-family: courier;
  font-weight: bold;
  color: white;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: 0.3s ease;
}
.dot.active,
.dot:hover {
  background-color: #717171;
  transform: scale(1.3);
}
.dot.active {
  width: 30px;
  border-radius: 5%;
}
.carousel-slide-arrow-left,
.carousel-slide-arrow-right {
  cursor: pointer;
  border: 0;
  background: 0;
  padding: 3px 10px;
  transition: 0.3s;
  font-size: 30px;
}
.carousel-slide-arrow-left:hover {
  text-decoration: underline;
  transform: translateX(-5px);
}
.carousel-slide-arrow-right:hover {
  text-decoration: underline;
  transform: translateX(5px);
}

/* <transitions> */
.slide-enter {
  transform: scale(0.5) translate(30px, -50px) rotate(-20deg);
  opacity: 0;
}
.slide-leave-to {
  transform: scale(1) translate(-30px, 70px) rotate(10deg);
  opacity: 0;
}
.slide-leave-active {
  position: absolute;
  z-index: -1;
}
.slide-leave-active,
.slide-enter-active {
  transition: 0.35s;
}
</style>
