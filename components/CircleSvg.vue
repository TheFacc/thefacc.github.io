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
    <g>
      <text class="text-main">
        <tspan
          v-for="(line, index) in text"
          :key="'line-' + index"
          :x="mainCx"
          :y="mainCy"
          :dy="`${index * 1.5 - 0.6}em`"
        >
          {{ line }}
        </tspan>
      </text>
    </g>

    <a
      v-for="(item, index) of items"
      :key="'area-' + index"
      @click="
        itemClick(item)
        activeItem = activeItem == index ? -1 : index
      "
    >
      <!-- with db implemented: @click="goTo(`/${svgid}/${item.id}`)" -->
      <g :class="{ active: activeItem == index }">
        <circle
          class="circle-area"
          :cx="mainCx"
          :cy="mainCy"
          r="30"
          :style="`stroke:${activeItem == index ? item.color : '#47494e'};
                   fill:${activeItem == index ? item.color : '#222'}`"
        />
        <g
          :style="`transform:translate(${mainCx}px,${mainCy}px) scale(0);
                   transition-duration:.3s;
                   fill:${activeItem == index ? '#222' : item.color}`"
          v-html="item.icon"
        />
        <text class="text-item">
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
    text: {
      type: Array,
      default() {
        return []
      },
    },
    spacing: { type: String, default: 'even' }, // even/left/right
    activateItem: { type: Number, default: -1 }, // receive item to activate by default on load
  },
  data() {
    return { activeItem: -1 } // we'll only have 1 active item at a time (-1 = none active)
  },
  mounted() {
    if (this.activateItem !== -1) {
      // activate item at load
      this.activeItem = this.activateItem
      // prevent disactivating
      // const activatedOnLoad = true // TODO: actually use this
    }
    // adjust area-circles positions around the main big circle: c(mainCx,mainCy),r=mainR
    // const vm = this
    let cx = 0
    let cy = 0
    const mainCx = this.mainCx
    const mainCy = 250
    const mainR = 150
    const mainCircle = document.querySelector('.circle-main')
    const baseGrey = mainCircle.style.stroke // default circle grey
    let baseColor = baseGrey // main circle color (grey or active-item-color)
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
      const itemColor = itemIcon.style.fill // save item color for later use
      // itemIcon.style.fill = itemColor
      itemIcon.style.transform = `translate(${mainR * cx + mainCx}px,${
        mainR * cy + mainCy
      }px) scale(.07) translate(-50%,-50%)`
      // set text centers + 60px away from the main center
      const itemTexts = itemG.querySelectorAll('svg#' + this.svgid + ' tspan')
      itemTexts.forEach((itemText) => {
        itemText.setAttribute('x', (mainR + 60) * cx + mainCx)
        itemText.setAttribute('y', (mainR + 60) * cy + mainCy)
        // set right text anchor for leftie texts
        if (cx < 0) itemText.style.textAnchor = 'end'
      })
      // add/remove .hover class (if inactive) + color main circle on small circle hover
      itemG.addEventListener('mouseover', function () {
        if (!itemG.classList.contains('active')) {
          // if (this.activeItem !== index) {
          itemG.classList.add('hover')
          mainCircle.style.stroke = itemColor
          itemCircle.style.fill = itemColor
          itemCircle.style.stroke = itemColor
          itemIcon.style.fill = '#222'
        }
      })
      itemG.addEventListener('mouseout', function () {
        if (!itemG.classList.contains('active')) {
          // if (this.activeItem !== index) {
          itemG.classList.remove('hover')
          mainCircle.style.stroke = baseColor
          itemCircle.style.stroke = baseGrey
          itemCircle.style.fill = '#222'
          itemIcon.style.fill = itemColor
        }
      })
      // update base color on item click (main circle coloring)
      itemG.addEventListener('click', function () {
        if (!itemG.classList.contains('active')) {
          baseColor = itemColor
        } else {
          baseColor = baseGrey
        }
      })
    })
  },
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
    itemClick(item) {
      this.$emit('itemClicked', item)
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
g:not(.hover) .circle-area {
  /* stroke: #47494e !important; */
  /* fill: #222 !important; */
}
.circle-main,
.circle-area {
  stroke: #47494e;
  stroke-width: 10px;
  transition: 0.3s;
}
svg text,
svg tspan {
  alignment-baseline: middle;
  transition: 0.3s;
  transform-origin: center;
}
svg .text-item tspan:first-child {
  font-size: 28px;
  font-weight: 600;
}
svg .text-main tspan {
  font-size: 24px;
  text-anchor: middle;
  dominant-baseline: middle;
}
/* g hover */
g.hover .circle-area {
  stroke-width: 20px;
}
g.hover .text-item {
  transform: scale(1.02);
}
g.hover .text-item tspan:first-child {
  font-size: 34px;
  font-weight: 900;
}
/* g active (filter toggle) */
g.active .circle-area {
  stroke-width: 20px;
}
g.active text {
  transform: scale(1.02);
}
g.active tspan:first-child {
  font-size: 34px;
  font-weight: 900;
}
</style>
