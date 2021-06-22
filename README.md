# Moube

Hypermedia project @ Polimi

Live app (deployed once every while): https://moube.herokuapp.com/

### Group members

| Name              | ID       | Contact                               |
| :---------------- | :------- | :------------------------------------ |
| Alessio Facincani | 10560352 | alessio.facincani@mail.polimi.it      |
| Dorotea Rigamonti | 10590941 | doroteamaria.rigamonti@mail.polimi.it |
| Mousa Sondoqah    | 10759335 | mousa.sondoqah@mail.polimi.it         |

Who did what?

### Technical documentation blueprint

- Server and DB technologies used
- Components developed, their functionalities and structure
- Plugins used (router, store, ...)
- Comments about how your usage fo the framework was complaint to the best practices for the specific application domain of your website (discussed during the course)

Deadline: 23:59 of the chosen exam date

### Server and DB technologies used

### Components developed

- &lt;the-header&gt;
- &lt;the-footer&gt;
- &lt;circle-svg&gt;
- &lt;item-intro&gt;
- &lt;page-anchors&gt;
- &lt;nav-dropdown&gt;
- &lt;card-grid&gt;
- &lt;carousel&gt;

### Plugins used

- [Nuxt svg module](https://github.com/nuxt-community/svg-module) - to import svg files as raw data in order to support css animations
- [vue2-filters](https://www.npmjs.com/package/vue2-filters) - to order the items retrieved from db
- [chroma.js](https://gka.github.io/chroma.js/) - to dynamically edit colors in various ways (eg. darken, hue, ...)
- [ScrollMagic](https://scrollmagic.io/) - for highlighting nav items while scrolling + parallax scrolling
  - requires [GSAP](https://greensock.com/gsap/) animation library and [jQuery](https://jquery.com/)
- [Webpack.js](https://webpack.js.org/) - to import jQuery
<!-- - (maybe later: Animate.css library (https://github.com/animate-css/animate.css) ) -->

### Comments
