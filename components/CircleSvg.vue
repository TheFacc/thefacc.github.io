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
    <!-- main circle and text -->
    <g>
      <circle
        ref="circle-main"
        class="circle-main"
        :cx="mainCx"
        :cy="mainCy"
        :r="mainR"
      />
    </g>
    <g>
      <transition name="svgText">
        <text v-if="display[0]" :key="'showing-' + svgText" class="text-main">
          <tspan
            v-for="(line, index) in activeText && activeItem > -1
              ? ['Click again', 'to cancel filter']
              : svgText"
            :key="'line-' + line"
            :x="mainCx"
            :y="mainCy"
            :dy="`${index * 1.5 - 0.6}em`"
          >
            {{ line }}
          </tspan>
        </text>
      </transition>
    </g>

    <!-- ITEMS on the circle -->
    <!-- (old vfor: of orderBy(items, 'id')) -->
    <a
      v-for="(item, index) of items"
      :key="'area-' + index"
      @click="
        itemClick(item)
        activeItem = activeItem == index && !activatedOnLoad ? -1 : index
      "
      @mouseover="onItem(item)"
      @mouseleave="outItem(item)"
    >
      <g ref="svgitems" :class="{ active: activeItem == index }">
        <!-- ITEM ~ circle -->
        <circle
          ref="svgcircles"
          class="circle-area"
          :cx="mainCx"
          :cy="mainCy"
          r="30"
          :style="`stroke:${activeItem == index ? item.color : '#47494e'};
                   fill:${activeItem == index ? item.color : '#222'}`"
        />
        <!-- ITEM ~ icon -->
        <g
          ref="svgicons"
          :style="`transform:translate(${mainCx}px,${mainCy}px) scale(0);
                   transition-duration:.3s;
                   fill:${activeItem == index ? '#222' : item.color}`"
          v-html="require('~/assets/icons/' + item.icon + '?raw')"
        />
        <!-- ITEM ~ text(s) -->
        <text ref="svg-item-text" class="text-item">
          <tspan v-if="display[1]" :x="mainCx" :y="mainCy">
            {{ item.name }}
          </tspan>
          <tspan v-if="display[2]" :x="mainCx" :y="mainCy" dy="1.5em">
            {{ item.subtitle }}
          </tspan>
        </text>
      </g>
    </a>
  </svg>
</template>

<script>
// import Vue2Filters from 'vue2-filters' // to sort items by id

export default {
  // mixins: [Vue2Filters.mixin],
  props: {
    svgid: { type: String, default: 'svg' },
    vbox: { type: String, default: '0 0 900 450' },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    // main circle coordinates
    mainCx: { type: Number, default: 450 },
    mainCy: { type: Number, default: 250 },
    mainR: { type: Number, default: 150 },
    // default center text (array of strings)
    text: {
      type: Array,
      default() {
        return []
      },
    },
    // choose where to display mini-circles around the main circle
    spacing: {
      type: String,
      default: 'even', // even/left/right
    },
    // choose which texts to display
    display: {
      type: Array,
      default() {
        return [1, 1, 1] // [center, item titles, item subtitles]
      },
    },
    centerInfo: { type: Boolean, default: false }, // display hovering info in center text
    activeText: { type: Boolean, default: false }, // if non-empty, display cancel-filter text when an item is active
    activateItem: { type: Number, default: -1 }, // receive item to activate by default on load
  },
  data() {
    return {
      svgText: this.text, // default center text - can be later changed on item hover or else (see methods)
      activeItem: -1, // we'll only have 1 active item at a time (-1 = none active)
      activatedOnLoad: false,
    }
  },
  mounted() {
    // adjust area-circles positions around the main big circle: c(mainCx,mainCy),r=mainR
    // const vm = this
    let cx = 0
    let cy = 0
    const mainCx = this.mainCx
    const mainCy = 250
    const mainR = 150
    const mainCircle = this.$refs['circle-main']
    const baseGrey = mainCircle.style.stroke // default circle grey
    let baseColor = baseGrey // main circle color (grey or active-item-color)
    const itemGs = this.$refs.svgitems
    const itemNo = itemGs.length
    const itemCircles = this.$refs.svgcircles
    const itemIcons = this.$refs.svgicons
    const itemColors = []
    itemIcons.forEach((icon) => {
      itemColors.push(icon.style.fill) // save item colors for later use
    })

    // activate item on page load (if asked to)
    if (this.activateItem !== -1) {
      this.activeItem = this.activateItem
      // prevent disactivating
      this.activatedOnLoad = true
      // color main circle and set base color
      mainCircle.style.stroke = itemIcons[this.activeItem].style.fill
      baseColor = itemIcons[this.activeItem].style.fill
    }

    // set complex styling
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
      itemCircles[index].setAttribute('cx', mainR * cx + mainCx)
      itemCircles[index].setAttribute('cy', mainR * cy + mainCy)
      // set icon centers (minus 50% (own half-size) because looks like we got no centered anchor)
      itemIcons[index].style.transform = `translate(${mainR * cx + mainCx}px,${
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
      //   (most of hover styling was made in Vue template, but these below were a bit harder to obtain there)
      itemG.addEventListener('mouseover', function () {
        if (!itemG.classList.contains('active')) {
          // if (this.activeItem !== index) {
          itemG.classList.add('hover')
          mainCircle.style.stroke = itemColors[index]
          itemCircles[index].style.fill = itemColors[index]
          itemCircles[index].style.stroke = itemColors[index]
          itemIcons[index].style.fill = '#222'
        }
      })
      itemG.addEventListener('mouseout', function () {
        if (!itemG.classList.contains('active')) {
          // if (this.activeItem !== index) {
          itemG.classList.remove('hover')
          mainCircle.style.stroke = baseColor
          itemCircles[index].style.stroke = baseGrey
          itemCircles[index].style.fill = '#222'
          itemIcons[index].style.fill = itemColors[index]
        }
      })
      // update base color on item click (main circle coloring)
      itemG.addEventListener('click', function () {
        if (!itemG.classList.contains('active')) {
          baseColor = itemColors[index]
        } else {
          baseColor = baseGrey
        }
      })
    })
  },
  // beforeDestroy() {
  //   // window.removeEventListener('scroll', this.onScrollFunction)
  //   itemG.removeEventListener('mouseover', function () {})
  //   itemG.removeEventListener('mouseout', function () {})
  //   itemG.removeEventListener('click', function () {})
  // },
  methods: {
    goTo(path) {
      this.$router.push({ path })
    },
    itemClick(item) {
      this.$emit('itemClicked', item)
    },
    onItem(item) {
      if (this.centerInfo && !this.activeText) {
        this.svgText = [item.name]
      }
    },
    outItem(item) {
      if (this.centerInfo && !this.activeText) {
        this.svgText = this.text
      }
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
/* vue transitions */
.svgText-enter-active,
.svgText-leave-active {
  transition: 0.2s;
}
.svgText-enter,
.svgText-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
