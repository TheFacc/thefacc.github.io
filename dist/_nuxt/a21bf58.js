(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{613:function(t,e,n){"use strict";n.r(e);var o=n(27),r=(n(84),{asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,r,c,article;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,o=t.params,r=t.error,c=o.slug||"index",e.next=4,n("learn",c).fetch().catch((function(t){r({statusCode:404,message:"Markdown file not found"})}));case 4:return article=e.sent,e.abrupt("return",{article:article});case 6:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"Solutions"}},mounted:function(){this.$store.commit("setTheme","default"),this.$store.commit("setTitle",""),this.$store.commit("updateRoute",{title:"Solutions",url:window.location.href})}}),c=n(40),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("div",[e("nuxt-content",{attrs:{document:t.article}}),t._v(" "),e("coming-soon")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ComingSoon:n(306).default})}}]);