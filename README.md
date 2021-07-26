# MouBE

#### Hypermedia & Web Applications project @ Polimi

Deadline: ~~23:59~~ **11:30 AM** of the chosen exam date 26/07/2021

Live app: https://moube.herokuapp.com/ (make sure it's https!)

### Group members

| Name              | ID       | Contact                               |
| :---------------- | :------- | :------------------------------------ |
| Alessio Facincani | 10560352 | alessio.facincani@mail.polimi.it      |
| Dorotea Rigamonti | 10590941 | doroteamaria.rigamonti@mail.polimi.it |
| Mousa Sondoqah    | 10759335 | mousa.sondoqah@mail.polimi.it         |

Alessio managed the most advanced techy stuff, knows the greater view of the website, created most of the components and made them communicate harmonically, and is definitely too committed at extensively committing every little fix all around the website. He only worked on the master branch(!) and managed the merging of other branches into master. Mousa filled and maintained the db with real data, created homepage concept, contact page and form component, and all the chatbot design, model, implementation and documentation in branch ChatBot (and lately in master). Dorotea created the DB structure and APIs, footer concept and footer component, about-company and about-people and about-person pages, developed an intro component later discontinued in favour of the more general `<item-intro>`.

### Server and DB technologies used

The DB connection resides in the `/server/db-conn.js` file, together with the definitions of all the needed tables and relations. We executed the code once with `{force: true}` in order to reset the database and create all the non-existent tables (but not the fields: no fake data, so it creates empty tables). From there on we set `{force: false}` so running the project wouldn't keep deleting the database, we only managed the DB manually through pgadmin4. This allowed us to connect both the local and the heroku app to the same database.

The API connection resides in the `/server/rest/api.js` file, and includes all the basic calls needed for the website. We preferred to use few simple API calls, and just change the data after the request if needed, since in many pages the same obtained data is used in mutiple ways.

### Components developed

Components developed, their functionalities and structure

- **`<the-header>`**: header, divided in 3 sections: logo/title/nav. The **title** is rendered conditionally based on `$store.state.title` global variable. Also includes the mobile menu shown at &lt;768px, which closes automatically on click outside.
- **`<the-footer>`**: footer, displays general company info and landmarks
- **`<circle-svg>`**: widely used circle component, since the circle is at the center of the company view. It's composed of N small circles around one main circle. Each item around the main circle is composed of an actual circle tag but also an injected svg icon via `v-html` (required for styling). The template contains a single &lt;svg&gt; tag, but heavily customized with vuejs stuff and also some vanillajs DOM-code that 'wasn't possible' with basic vuejs afaik. It accepts many props and it gets very customizable:
  - svg properties: id, vbox, center coordinates, main circle radius, items circles radii
  - spacing: left/right/even, allows to show the items obtained on the left or right of the circle instead of display them evenly
  - items: array of items to show around the main circle (must contain properties that are accessed, like .name, .color)
  - spacing: left/right/even, allows to show the items obtained on the left or right of the circle instead of display them evenly
  - text: optional infotext to show at the center of the circle
  - display: array of 3 numbers to conditionally display texts outside the main circle
  - centerInfo: display hovering info in center text
  - activeText: if non-empty, display cancel-filter text when an item is active
  - activateItem: receive item to activate by default on load (and also prevent deactivation)
- **`<item-intro>`**: main banner with page info on the left and area-circles on the right, used in AreaX, ProductX as the intro for the current item X, and also in About, People by giving them a 'fake item' to show the intro.
- **`<page-anchors>`**: in-page navigation anchors topbar which stickies below header when scrolling. Gets a set of sections as props, from the parent page it must be specified all ids and name to display. Gets colored by default with the itemColor string prop. If can also receive multiple colors as a long string and smoothly cycle through them (and the same does item-intro bg) (eg it happens in about pages where there's not a specific color for the current page, so it shows all colors but only those defined by areas!)
- **`<nav-dropdown>`**: microdiv shown in header nav when hovering over about, which reveals more options. Closes automatically on :not(:hover) or on click outside if mobile.
- **`<card-grid>`**: very customizable component showing a list of cards. It's used for both solutions and people cards. Can be light or dark, rectangle or circular. Can also show an optional tooltip on hover, providing even more information about a card (for example it's used in AreaX people when there are many product referents, the tooltip shows to which product they refer to. Or in People page it shows the area of each person, even referents, but when filtering by referents it shows the product they refer to.)
- **`<carousel>`**: carousel component, used in ProductX to show use cases, and in Home to show a company overview and a random product from each area. It has controls both by-slide-number and by-next-or-previous-slide. The slide changes periodically every 8 seconds. It supports optional properties of the objects array such as url, in which case shows a button, or theme, light or dark.
- **`<article-mini>`**: blog article preview, supports as-rows or as-cols view mode (rows always used for mobile and in blog index, cols used only in desktop homepage and desktop single-article recent articles )
- **`<back-button>`**: universal back button to show in top-left. In addition to the one provided by browser, this is well integrated with the UI and always tells the user where the button is going to take (also in the browser, but nobody knows longpress...). So it supports custom text, custom icon, and custom path. If not provided, the default path is `history.back()`. The title prop uses the `$store.state.pagePrevious.title` global variable, so it's currently affected by its limited capability, i.e. the title can only go back 1-level, while the path can potentially be infinite if using `history.back()`, otherwise use `$store.state.pagePrevious.url` to always be consistent with title+action)
- **`<contact-form>`**: contact form component, duh. It's complete, no props, includes id="contact" used for anchors and chatbot, the actual post request is deactivated.

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

- [Nuxt svg module](https://github.com/nuxt-community/svg-module) - to import svg files as raw data in order to support css animations
- ~~[vue2-filters](https://www.npmjs.com/package/vue2-filters) - to order the items retrieved from db~~
- ~~[chroma.js](https://gka.github.io/chroma.js/) - to dynamically edit colors in various ways (eg. darken, hue, ...)~~ (mostly replaced with a couple custom-made $functions... indeed it makes sense to just use a couple function instead of a full library if it's enough!)
- ~~[ScrollMagic](https://scrollmagic.io/) - for highlighting nav items while scrolling + parallax scrolling~~
  - ~~requires [GSAP](https://greensock.com/gsap/) animation library and [jQuery](https://jquery.com/)~~
    <!-- - [Webpack.js](https://webpack.js.org/) - to import jQuery -->
    <!-- - (maybe later: Animate.css library (https://github.com/animate-css/animate.css) ) -->

**NOTE**: _the plugins with ~~strikethrough~~ were not allowed for this project and were thus disabled in the final delivery - but not removed: most of the code (working) is still present but commented, for a possible future use. (To highlight these extra comment parts from others, they're surrounded by the commented tags `/*[plugin:pluginname]...[/plugin:pluginname]*/`). Additionally, the following code was removed from global config files:_

- > in package.json:

```json
"dependencies": {
	"vue2-filters": "^0.12.0"
	"chroma-js": "^2.1.2",
	"jquery": "^3.6.0",
	"gsap": "^3.6.1",
	"scrollmagic": "git+https://github.com/TheFacc/ScrollMagic.git",
	"scrollmagic-plugin-gsap": "^1.0.4",
  }
```

- > in nuxt.config.js:

```javascript
  alias: {...}, // all the aliases commented
  build: {
  plugins: [
  new webpack.ProvidePlugin({
  $: 'jquery',
  }),
  ],
  transpile: ['gsap'],
  },
```

### Comments

The nuxt framework makes creating a website as fun as playing with lego. Having in mind an ICT company structure - also thanks to the IDM schemes - building a website through components and dynamic pages was easy. A dynamic page taking as parameter input the `id` from the url is enough to retrieve any kind of data needed for the specific page, even with basic API implementation. A dynamic list of items becomes extremely easy to obtain with v-for and assures consistency among all the items in the list. The homepage was built last, and it was as simple as picking some components from other pages and putting them together to get a good overview of the whole website.

The entire website is filled with effects and animations, with many complex methods and conditioning working under the hood, yet the website feels extremely responsive, fast and reliable. The animations are there to improve UX and help him understanding the events that are taking place - for example, when filtering from a list, the items smoothly scroll into position from where they were before; when clicking on a card or on the back button or chat button, which are raised elements as in good material-elevation practices, it shows a quick bounce animation that makes the user confident that the click happened. The scroll transitioning is always smooth so the user doesn't get lost, and also the transition between pages gives a feel of moving forward. The usual old-style text-underlined links are avoided when possible in favour of a more modern-looking button-style link or directly object-style link like clicking on a card for a product or person. This makes the UX more intuitive since it feels like touching objects instead of wondering around a bunch of text lines.
