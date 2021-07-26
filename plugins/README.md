# PLUGINS

This [directory](https://nuxtjs.org/guide/plugins) contains JS plugins to run before mounting the root Vue.js application.

- (ACTIVE) **`plugins/functions.js`**: global methods to inject in every page (it may not be the best option since sometimes in some not-better-defined cases the $functions defined here are not found)
  - `$goTo(path)`: the well-known routing push
  - `$goToHome()`: pushes `/`
  - `$goBack()`: executes `window.history.back()`
  - custom built functions to overcome missing chroma-js plugin:
    - `$hex2rgb(hex)`: converts color '#hex' string to color 'r,g,b' string
    - `$changeColorBrightness(color,offset)`: since we're only provided 1 area color from db, it's often needed to make it darker but keep the same color for nice styling, for example all green buttons and background, but not the same green. INPUT: color in hex, offset int from -100 to +100 which reflects % brightness change. Not perfect: seems unstable at very low offset levels somehow (like it drops to 0 too early), and also changed hue with some material cyan color, which made us change Blockchain area to a nice Lilla. Wise choice, since it lets us use blue/cyan things for general non-area-related items.
- (INACTIVE) `chroma.js/scrollmagic.js` = used to import external plugins (not used in current project implementation)
