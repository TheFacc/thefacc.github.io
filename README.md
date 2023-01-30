# Alessio Facincani

I'm building my personal website. In the future, when the world catches up, it will be hosted on my very personal web3 domain. For now, let's use GitHub Pages.

This website is a fork of a website I built for a Polimi course project, which was built entirely from scratch using [Nuxt.js v2](https://nuxtjs.org/) (all code, no fancy UI frameworks).

To change it, I took all its code and removed the unnecessary pages, components and plugins. I then added the nice [Vuetify](https://vuetifyjs.com/) to use some of its ready components and styling system to make it all more robust. I also added the [Content module](https://content.nuxtjs.org/), a headless CMS which lets me write posts and pages directly in Markdown files - the module will automatically fetch them and dynamically load pages, sections and theur content, without rebuilding anything.

Content is currently used for Homepage and Learn sections. Other sections are WIP.

### Plugins used

##### Local plugins:

- **`store/index.js`**: used to store global variables (and their setters). The setters are called in every page mounted() function in order to update them accordingly to the page.
  - `$store.state.title` = page title (eg. in Area X it displays the area name in the empty part of the header)
  - `$store.state.theme` = website theme, accepting:
    - '' or 'default' strings -> reset theme to slight gray
    - 'dark' string -> makes the website dark theme (only used in Blog section)
    - hex color -> slightly colors the header when scrolling after 300px
  - `$store.state.pageCurrent` / `$store.state.pagePrevious` = store 1-level routing history (href + title) to allow personalized **`<back-button>`** naming. Can be easily extended to infinite levels in order to support 2+ consecutive backs with correct titling.
- **`plugins/functions.js`**: global methods to inject in every page (it may not be the best option since sometimes in some not-better-defined cases the $functions defined here are not found)
  - `$goTo(path)`: the well-known routing push
  - `$goToHome()`: pushes `/`
  - `$goBack()`: executes `window.history.back()`
  - custom built functions to overcome missing chroma-js plugin:
    - `$hex2rgb(hex)`: converts color '#hex' string to color 'r,g,b' string
    - `$changeColorBrightness(color,offset)`: since we're only provided 1 area color from db, it's often needed to make it darker but keep the same color for nice styling, for example all green buttons and background, but not the same green. INPUT: color in hex, offset int from -100 to +100 which reflects % brightness change. Not perfect: seems unstable at very low offset levels somehow (like it drops to 0 too early), and also changed hue with some material cyan color, which made us change Blockchain area to a nice Lilla. Wise choice, since it lets us use blue/cyan things for general non-area-related items.

##### Third-party plugins:

- [Content module](https://content.nuxtjs.org/) - headless CMS to retrieve content directly from Markdown files
- [Nuxt svg module](https://github.com/nuxt-community/svg-module) - to import svg files as raw data in order to support css animations
- [Vuetify](https://vuetifyjs.com/) - nice Material UI Framework with a handy styling system and a bunch of ready components
- ~~[chroma.js](https://gka.github.io/chroma.js/) - to dynamically edit colors in various ways (eg. darken, hue, ...)~~ (mostly replaced with a couple custom-made $functions... indeed it makes sense to just use a couple function instead of a full library if it's enough!)

### Comments

The nuxt framework makes creating a website as fun as playing with lego. Having in mind a simple personal website, building it through components and dynamic pages was easy. A dynamic page taking as parameter input the `slug` from the url is enough to retrieve any kind of data needed for the specific page, with the use of `$content`. Any dynamic list of items becomes extremely easy to obtain with v-for and assures consistency among all the items in the list.

The entire website is filled with effects and animations, with many complex methods and conditioning working under the hood, yet the website feels extremely responsive, fast and reliable. The animations are there to improve UX and help understanding the events that are taking place - for example, when filtering from a list, the items smoothly scroll into position from where they were before; when clicking on a card or on the back button, which are raised elements as in good material-elevation practices, it shows a quick bounce animation that makes the user confident that the click happened. The scroll transitioning is always smooth so the user doesn't get lost, and also the transition between pages gives a feel of moving forward. The usual old-style text-underlined links are avoided when possible in favour of a more modern-looking button-style link or directly object-style link like clicking on a card for a product or person. This makes the UX more intuitive since it feels like touching objects instead of wandering around a bunch of text lines.
