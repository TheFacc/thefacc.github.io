<template>
  <main class="container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 900 500"
      style="enable-background: new 0 0 900 500"
      xml:space="preserve"
    >
      <g>
        <circle class="circle-main" :cx="mainCx" :cy="mainCy" :r="mainR" />
      </g>

      <a
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        @click="goTo(`/to/${area.path}`)"
      >
        <g>
          <circle
            class="circle-area"
            :cx="mainCx"
            :cy="mainCy"
            r="30"
            :style="'stroke:' + area.color + ';fill:' + area.color"
          />
          <text>
            <tspan :x="mainCx" :y="mainCy">{{ area.name }}</tspan>
            <tspan :x="mainCx" :y="mainCy" dy="1.5em">{{ area.desc }}</tspan>
          </text>
        </g>
      </a>
    </svg>
  </main>
</template>

<script>
export default {
  data() {
    return {
      areas: [
        {
          name: 'Cloud computing',
          desc: 'Some area description',
          path: '#',
          color: '#F44336',
        },
        {
          name: 'Analytics',
          desc: 'Some area description',
          path: '#',
          color: '#4CAF50',
        },
        {
          name: 'Machine learning',
          desc: 'Some area description',
          path: '#',
          color: '#FFC107',
        },
        {
          name: 'Blockchain',
          desc: 'Some area description',
          path: '#',
          color: '#00BCD4',
        },
      ],
      mainCx: 450,
      mainCy: 250,
      mainR: 150,
    }
  },
  head() {
    return {
      title: 'Areas',
    }
  },
  mounted() {
    // adjust area-circles positions around the main big circle: c(375,250),r=150
    const mainCx = 450
    const mainCy = 250
    const mainR = 150
    const mainCircle = document.querySelector('.circle-main')
    const baseColor = mainCircle.style.stroke
    const areaGs = document.querySelectorAll('svg a g')
    const areasNo = areaGs.length
    areaGs.forEach((areaG, index) => {
      //  calculate #areasNo evenly spaced points around the main circle,
      //  (starting from bottom and rotating by 45deg)
      // compute centers direction
      const cx = Math.cos(((2 * Math.PI) / areasNo) * (index + 1.5))
      const cy = Math.sin(((2 * Math.PI) / areasNo) * (index + 1.5))
      // set circles centers
      const areaCircle = areaG.querySelector('svg circle')
      areaCircle.setAttribute('cx', mainR * cx + mainCx)
      areaCircle.setAttribute('cy', mainR * cy + mainCy)
      // set text centers + 60px away from the main center
      const areaTexts = areaG.querySelectorAll('svg tspan')
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

<style scoped>
.container {
  margin: 0 auto;
}
.circle-area,
.circle-main {
  fill: white;
}
g:hover {
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
