<template>
  <main class="container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 774.3 314.3"
      style="enable-background: new 0 0 774.3 314.3"
      xml:space="preserve"
    >
      <g>
        <circle class="circle-main" cx="387.1" cy="157.1" r="149.5" />
      </g>

      <a
        v-for="(area, areaIndex) of areas"
        :key="'area-' + areaIndex"
        :href="area.path"
      >
        <g>
          <circle
            class="circle-area"
            :cx="area.cx"
            :cy="area.cy"
            r="28.5"
            :style="'stroke:' + area.color"
          />
          <!-- :x="'calc(' + area.cx + (area.cx < 300 ? -1 : 1) * 50 + ')'" -->
          <text
            :x="area.cx"
            :y="area.cy"
            :style="'text-anchor:' + (area.cx < 300 ? 'end' : 'start')"
          >
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
          name: 'Analytics',
          path: '#',
          cx: '278.1',
          cy: '54.1',
          color: '#4CAF50',
        },
        {
          name: 'Cloud computing',
          path: '#',
          cx: '278.1',
          cy: '259.1',
          color: '#F44336',
        },
        {
          name: 'Machine learning',
          path: '#',
          cx: '497.1',
          cy: '54.1',
          color: '#FFC107',
        },
        {
          name: 'Blockchain',
          path: '#',
          cx: '497.1',
          cy: '259.1',
          color: '#00BCD4',
        },
      ],
    }
  },
  // mounted() {
  //   // adjust area-circles positions around the main big circle
  //   const areaCircles = document.querySelectorAll('svg a g')
  //   const areasNo = areaCircles.length
  //   areaCircles.forEach((areaG) => {
  //     areaG.querySelector('circle').setAttribute('cx', '300')
  //   })
  // },
  head() {
    return {
      title: 'Areas',
    }
  },
}
</script>

<style scoped>
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
