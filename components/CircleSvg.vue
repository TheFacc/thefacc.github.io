<template>
  <svg
    :id="svgid"
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
      @click="goTo(item.path)"
    >
      <!-- with db implemented: @click="goTo(`/${svgid}/${item.id}`)" -->
      <g>
        <circle
          class="circle-area"
          :cx="mainCx"
          :cy="mainCy"
          r="30"
          :style="'stroke:' + item.color + ';fill:' + item.color"
        />
        <g
          :style="
            'transform:translate' +
            `(${mainCx}px,${mainCy}px) scale(0); transition-duration:.3s;`
          "
          v-html="item.icon"
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
  props: {
    svgid: { type: String, default: 'svg' },
    vbox: { type: String, default: '0 0 900 450' },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    mainCx: { type: Number, default: 450 },
    mainCy: { type: Number, default: 250 },
    mainR: { type: Number, default: 150 },
    spacing: { type: String, default: 'even' },
  },
  mounted() {
    // adjust area-circles positions around the main big circle: c(375,250),r=150
    let cx = 0
    let cy = 0
    const mainCx = 450
    const mainCy = 250
    const mainR = 150
    const mainCircle = document.querySelector('.circle-main')
    const baseColor = mainCircle.style.stroke
    const itemGs = document.querySelectorAll('svg#' + this.svgid + ' a>g')
    const itemNo = itemGs.length
    itemGs.forEach((itemG, index) => {
      //  calculate #itemNo evenly spaced points around the main circle,
      //  (starting from bottom and rotating by 45deg)
      // compute centers directions
      if (this.spacing === 'even') {
        cx = Math.cos(((2 * Math.PI) / itemNo) * (index + 1.5))
        cy = Math.sin(((2 * Math.PI) / itemNo) * (index + 1.5))
      } else if (this.spacing === 'left') {
        // works with any itemNo (+ reversed rendering for mental top-down order)
        cx = Math.cos(((2 * Math.PI) / 3 / itemNo) * (2 * itemNo - index - 0.5))
        cy = Math.sin(((2 * Math.PI) / 3 / itemNo) * (2 * itemNo - index - 0.5))
      } else if (this.spacing === 'right') {
        // wrong for !=4 somehow
        cx = Math.cos(((2 * Math.PI) / 3 / itemNo) * (index + itemNo - 5.5))
        cy = Math.sin(((2 * Math.PI) / 3 / itemNo) * (index + itemNo - 5.5))
      }
      // set circles centers
      const itemCircle = itemG.querySelector('svg#' + this.svgid + ' circle')
      itemCircle.setAttribute('cx', mainR * cx + mainCx)
      itemCircle.setAttribute('cy', mainR * cy + mainCy)
      // set icon centers (minus 50% (own half-size) because looks like we got no centered anchor)
      const itemIcon = itemG.querySelector('svg#' + this.svgid + ' a>g>g')
      itemIcon.style.fill = itemCircle.style.stroke
      itemIcon.style.transform = `translate(${mainR * cx + mainCx}px,${
        mainR * cy + mainCy
      }px) scale(0.07) translate(-50%,-50%)`
      // set text centers + 60px away from the main center
      const itemTexts = itemG.querySelectorAll('svg#' + this.svgid + ' tspan')
      itemTexts.forEach((itemText) => {
        itemText.setAttribute('x', (mainR + 60) * cx + mainCx)
        itemText.setAttribute('y', (mainR + 60) * cy + mainCy)
        // set right text anchor for leftie texts
        if (cx < 0) itemText.style.textAnchor = 'end'
      })
      // color main circle on small circle hover
      itemG.addEventListener('mouseover', function () {
        mainCircle.style.stroke = itemCircle.style.stroke
        itemIcon.style.fill = '#222'
      })
      itemG.addEventListener('mouseout', function () {
        mainCircle.style.stroke = baseColor
        itemIcon.style.fill = itemCircle.style.stroke
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
  fill: #222 !important;
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
