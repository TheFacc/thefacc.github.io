(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{619:function(t,e,n){"use strict";n.r(e);var r=n(25),o=(n(85),{head:function(){return{title:"Home"}},mounted:function(){this.$store.commit("setTheme","default"),this.$store.commit("setTitle",""),this.$store.commit("updateRoute",{title:"Home",url:window.location.href})},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.params,o=t.error,c=r.slug||"index",e.next=4,n(c).fetch().catch((function(t){o({statusCode:404,message:"Markdown file not found"})}));case 4:return f=e.sent,e.abrupt("return",{page:f});case 6:case"end":return e.stop()}}),e)})))()}}),c=n(40),component=Object(c.a)(o,(function(){var t=this._self._c;return t("div",[t("nuxt-content",{attrs:{document:this.page}})],1)}),[],!1,null,null,null);e.default=component.exports}}]);