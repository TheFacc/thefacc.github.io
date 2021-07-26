# COMPONENTS

The components directory contains your Vue.js Components.

_Nuxt.js doesn't supercharge these components._

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
