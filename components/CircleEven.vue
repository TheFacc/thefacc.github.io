<template>
  <svg
    id="areas"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    :viewBox="vbox"
    xml:space="preserve"
  >
    <g>
      <circle class="circle-main" :cx="mainCx" :cy="mainCy" :r="mainR" />
    </g>

    <a
      v-for="(item, index) of items"
      :key="'area-' + index"
      @click="goTo(`/areas/${index}`)"
    >
      <g>
        <circle
          class="circle-area"
          :cx="mainCx"
          :cy="mainCy"
          r="30"
          :style="'stroke:' + item.color + ';fill:' + item.color"
        />
        <text>
          <tspan :x="mainCx" :y="mainCy">{{ item.name }}</tspan>
          <tspan :x="mainCx" :y="mainCy" dy="1.5em">{{ item.desc }}</tspan>
        </text>
      </g>
    </a>
  </svg>
</template>

<script>
export default {
  props: ['vbox', 'items', 'mainCx', 'mainCy', 'mainR', 'spacing'],
  mounted() {
    // adjust area-circles positions around the main big circle: c(375,250),r=150
    let cx = 0
    let cy = 0
    const mainCx = 450
    const mainCy = 250
    const mainR = 150
    const mainCircle = document.querySelector('.circle-main')
    const baseColor = mainCircle.style.stroke
    const areaGs = document.querySelectorAll('svg#areas a g')
    const areasNo = areaGs.length
    areaGs.forEach((areaG, index) => {
      //  calculate #areasNo evenly spaced points around the main circle,
      //  (starting from bottom and rotating by 45deg)
      // compute centers directions
      if (this.spacing === 'even') {
        cx = Math.cos(((2 * Math.PI) / areasNo) * (index + 1.5))
        cy = Math.sin(((2 * Math.PI) / areasNo) * (index + 1.5))
      } else if (this.spacing === 'left') {
        // works with any areasNo (+ reversed rendering for mental order)
        cx = Math.cos(
          ((2 * Math.PI) / 3 / areasNo) * (2 * areasNo - index - 0.5)
        )
        cy = Math.sin(
          ((2 * Math.PI) / 3 / areasNo) * (2 * areasNo - index - 0.5)
        )
      } else if (this.spacing === 'right') {
        // wrong for other than 4 somehow
        cx = Math.cos(((2 * Math.PI) / 3 / areasNo) * (index + areasNo - 5.5))
        cy = Math.sin(((2 * Math.PI) / 3 / areasNo) * (index + areasNo - 5.5))
      }
      // set circles centers
      const areaCircle = areaG.querySelector('svg#areas circle')
      areaCircle.setAttribute('cx', mainR * cx + mainCx)
      areaCircle.setAttribute('cy', mainR * cy + mainCy)
      // set text centers + 60px away from the main center
      const areaTexts = areaG.querySelectorAll('svg#areas tspan')
      areaTexts.forEach((areaText) => {
        areaText.setAttribute('x', (mainR + 60) * cx + mainCx)
        areaText.setAttribute('y', (mainR + 60) * cy + mainCy)
        // set right text anchor for leftie texts
        if (cx < 0) areaText.style.textAnchor = 'end'
      })
      // color main circle on small circle hover
      areaG.addEventListener('mouseover', function () {
        mainCircle.style.stroke = areaCircle.style.stroke
      })
      areaG.addEventListener('mouseout', function () {
        mainCircle.style.stroke = baseColor
      })
    })
  },
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
  },
}
</script>

<style>
.circle-main {
  fill: transparent;
}
.circle-area {
  fill: white;
}
svg a:hover {
  cursor: pointer;
}
g:not(:hover) .circle-area {
  stroke: #47494e !important;
  fill: white !important;
}
.circle-main,
.circle-area {
  stroke: #47494e;
  stroke-width: 10px;
  transition: 0.3s;
}
g:hover .circle-area {
  stroke-width: 20px;
}
svg text,
svg tspan {
  alignment-baseline: middle;
  transition: 0.3s;
  transform-origin: center;
}
svg tspan:first-child {
  font-size: 28px;
  font-weight: 600;
}
g:hover text {
  transform: scale(1.02);
}
g:hover tspan:first-child {
  font-size: 34px;
  font-weight: 900;
}
</style>
