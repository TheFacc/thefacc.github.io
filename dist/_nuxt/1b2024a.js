(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{510:function(t,e,r){var content=r(542);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(15).default)("56eff2c7",content,!0,{sourceMap:!1})},536:function(t,e,r){var map={"./audio-signals.jpg":537,"./deep-learning.jpg":538};function n(t){var e=c(t);return r(e)}function c(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}n.keys=function(){return Object.keys(map)},n.resolve=c,t.exports=n,n.id=536},537:function(t,e,r){t.exports=r.p+"img/audio-signals.925fcc8.jpg"},538:function(t,e,r){t.exports=r.p+"img/deep-learning.1464a33.jpg"},541:function(t,e,r){"use strict";r(510)},542:function(t,e,r){var n=r(14)(!1);n.push([t.i,".search[data-v-e65ccc20]{max-width:600px}.card[data-v-e65ccc20],.card .img[data-v-e65ccc20]{transition:.3s cubic-bezier(.25,.8,.25,1)}.card[data-v-e65ccc20]{background:#fff;color:#222;cursor:pointer;margin:5px;max-width:300px}.card[data-v-e65ccc20]:hover{transform:scale(1.02);box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}.article[data-v-e65ccc20],.article-mini[data-v-e65ccc20]{transition:.3s cubic-bezier(.25,.8,.25,1)}.article-enter[data-v-e65ccc20]{transform:scale(.5) translateY(-80px);opacity:0}.article-leave-to[data-v-e65ccc20]{transform:translateY(30px);opacity:0}.article-leave-active[data-v-e65ccc20]{position:absolute;z-index:-1}.article-enter-active[data-v-e65ccc20],.article-leave-active[data-v-e65ccc20]{transition:all .35s}",""]),t.exports=n},617:function(t,e,r){"use strict";r.r(e);var n=r(199),c=r(118),o=r(200),l=r(302),d=r(522),f=r(628),m=r(614),h=r(615),v=(r(29),r(213),r(25)),x=(r(13),r(3),r(12),r(62),r(41),r(57),r(85),{asyncData:function(t){return Object(v.a)(regeneratorRuntime.mark((function e(){var r,n,c,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,n=t.params,c=t.error,e.next=3,r("learn","index").fetch().catch((function(t){c({statusCode:404,message:"Markdown file not found"})}));case 3:return o=e.sent,e.next=6,r("learn",n.slug).where({slug:{$regex:"^(?!.*[0-9])(?!.*index).*$"}}).sortBy("createdAt","asc").fetch().catch((function(t){c({statusCode:404,message:"Markdown file not found"})}));case 6:return l=e.sent,e.abrupt("return",{page:o,articles:l});case 8:case"end":return e.stop()}}),e)})))()},data:function(){return{search:"",animating:-1}},head:function(){return{title:"Learn"}},computed:{filteredListSearch:function(){var t=this;return this.articles.filter((function(e){for(var r=e.title+" "+e.description,i=0;i<e.topics.length;i++)r+=" "+e.topics[i];return r.toLowerCase().includes(t.search.toLowerCase())}))}},mounted:function(){this.$store.commit("setTheme","default"),this.$store.commit("setTitle",""),this.$store.commit("updateRoute",{title:"Solutions",url:window.location.href})}}),w=(r(541),r(40)),component=Object(w.a)(x,(function(){var t=this,e=t._self._c;return e("div",[e("nuxt-content",{attrs:{document:t.page}}),t._v(" "),e("div",{staticClass:"search ma-auto",attrs:{role:"search"}},[e(d.a,{staticClass:"v-input mx-4 mx-md-12"},[e(f.a,{staticClass:"grey lighten-3 rounded-xl px-6 py-4",attrs:{label:"Search...","hide-details":"auto",error:0===t.filteredListSearch.length,rounded:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}},[e(o.a,{attrs:{slot:"prepend",color:"grey"},slot:"prepend"},[t._v(" mdi-magnify ")])],1)],1)],1),t._v(" "),e("section",{attrs:{role:"feed"}},[0===t.filteredListSearch.length?e("h4",[t._v("No articles found.")]):t._e(),t._v(" "),e("transition-group",{staticClass:"d-flex justify-space-around flex-column flex-sm-row",attrs:{name:"article"}},t._l(t.filteredListSearch,(function(article){return e(n.a,{key:"art-"+article.title,staticClass:"card ma-4",class:{bounce:t.animating>=0&&article.id===t.animating},attrs:{role:"article"},on:{click:function(e){t.animating=article.id,t.$goTo("/learn/".concat(article.slug))},animationend:function(e){t.animating=-1}}},[e(l.a,{staticClass:"align-end",attrs:{src:r(536)("./".concat(article.slug,".jpg")),height:"200",gradient:"to top, black 0, transparent 50%"}},[e(c.b,{staticClass:"white--text py-0"},[e("h4",{staticClass:"ml-3"},[t._v(t._s(article.title))])])],1),t._v(" "),e(c.a,[e("div",{staticClass:"font-weight-bold ml-8 mb-2"},[t._v("Topics")]),t._v(" "),e(m.a,{attrs:{"align-top":"",dense:""}},t._l(article.topics,(function(r){return e(h.a,{key:r,attrs:{color:article.color,small:""}},[t._v("\n              "+t._s(r)+"\n            ")])})),1)],1)],1)})),1)],1)],1)}),[],!1,null,"e65ccc20",null);e.default=component.exports}}]);