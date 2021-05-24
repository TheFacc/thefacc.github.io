<template>
  <main class="container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 750 500"
      style="enable-background: new 0 0 750 500"
      xml:space="preserve"
    >
      <g>
        <circle class="circle-main" cx="375" cy="250" r="149.5" />
      </g>

      <a
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        :href="area.path"
      >
        <g>
          <circle
            class="circle-area"
            :cx="mainCx"
            :cy="mainCy"
            r="30"
            :style="'stroke:' + area.color"
          />
          <text :x="mainCx" :y="mainCy">
            {{ area.name }}
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
          path: '#',
          color: '#F44336',
        },
        {
          name: 'Analytics',
          path: '#',
          color: '#4CAF50',
        },
        {
          name: 'Machine learning',
          path: '#',
          color: '#FFC107',
        },
        {
          name: 'Blockchain',
          path: '#',
          color: '#00BCD4',
        },
      ],
      mainCx: 375,
      mainCy: 250,
    }
  },
  head() {
    return {
      title: 'Areas',
    }
  },
  mounted() {
    // adjust area-circles positions around the main big circle: c(375,250),r=150
    const mainCx = 375
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
      // set text centers + 50px away from the main center
      const areaText = areaG.querySelector('svg text')
      areaText.setAttribute('x', (mainR + 50) * cx + mainCx)
      areaText.setAttribute('y', (mainR + 50) * cy + mainCy)
      // set right text anchor for leftie texts
      if (cx < 0) areaText.style.textAnchor = 'end'
      // color main circle on small circle hover
      areaG.addEventListener('mouseover', function () {
        mainCircle.style.stroke = areaCircle.style.stroke
      })
      areaG.addEventListener('mouseout', function () {
        mainCircle.style.stroke = baseColor
      })
    })
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
}
.circle-area,
.circle-main {
  fill: #ffffff;
}
g:not(:hover) .circle-area {
  stroke: #47494e !important;
}
.circle-main,
.circle-area {
  stroke: #47494e;
  stroke-width: 10px;
  transition: 0.3s;
}
g:hover .circle-area {
  stroke-width: 15px;
}
g:hover text {
  transform: scale(1.05);
}
svg text {
  font-size: 24px;
  alignment-baseline: middle;
  transition: 0.3s;
  transform-origin: center;
}
</style>
