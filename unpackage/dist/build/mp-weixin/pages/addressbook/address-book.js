(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/addressbook/address-book"],{4062:function(t,e,r){"use strict";var n;r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},6409:function(t,e,r){"use strict";(function(t){r("8d6c");n(r("66fd"));var e=n(r("ff2a"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=r,t(e.default)}).call(this,r("543d")["createPage"])},"7eab":function(t,e,r){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(r("8a29")),i=r("5ad3");function o(t){return t&&t.__esModule?t:{default:t}}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){u(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function u(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var c={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,hidden:!0,listCurID:"",list:[],userList:[],listCur:"",keyword:"",queryUserByKeyWord:"/sys/user/appQueryUser"}},onLoad:function(){for(var t=[{}],e=0;e<26;e++)t[e]={},t[e].name=String.fromCharCode(65+e);this.list=t,this.listCur=t[0],this.loadInfo()},onReady:function(){var e=this;t.createSelectorQuery().select(".indexBar-box").boundingClientRect((function(t){e.boxTop=t.top})).exec(),t.createSelectorQuery().select(".indexes").boundingClientRect((function(t){e.barTop=t.top})).exec()},methods:{backTap:function(){this.$Router.replace({name:"index"})},toAddressDetail:function(t){var e=s({},t);e.departName=e.orgCode,this.$Router.push({name:"addressDetail",params:e})},searchUserByKey:function(){this.loadInfo()},loadInfo:function(){var t=this;this.$http.get(this.queryUserByKeyWord,{params:{keyword:this.keyword}}).then((function(e){if(e.data.success){console.log("res",e);var r=e.data.result,o=[];t.userList=r.map((function(t){var e=t.id,r=t.realname,a=t.avatar,s=t.username,u=t.phone,c=t.email,l=t.post,f=t.orgCode,d=s.toUpperCase();r&&/.*[\u4e00-\u9fa5]+.*$/.test(r)&&(d=n.default.chineseToPinYin(r)),a&&(a=(0,i.getFileAccessHttpUrl)(a));var h={id:e,realname:r,avatar:a,username:s,phone:u,email:c,post:l,orgCode:f,szm:d.substr(0,1)};return o.push(h.szm),h})),t.list=t.list.filter((function(t){return-1!=o.indexOf(t.name)}))}})).catch((function(t){console.log(t)}))},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){this.hidden=!0,this.listCur=this.listCur},tMove:function(t){var e=t.touches[0].clientY,r=this.boxTop,n=this;if(e>r){var i=parseInt((e-r)/20);this.listCur=n.list[i].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var e=this,r=this.barHeight,n=this.list,i=Math.ceil(n.length*t.detail.y/r),o=0;o<n.length;o++)if(i<o+1)return e.listCur=n[o].name,e.movableY=20*o,!1}}};e.default=c}).call(this,r("543d")["default"])},bc20:function(t,e,r){},c521:function(t,e,r){"use strict";r.r(e);var n=r("7eab"),i=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},dbf6:function(t,e,r){"use strict";var n=r("bc20"),i=r.n(n);i.a},ff2a:function(t,e,r){"use strict";r.r(e);var n=r("4062"),i=r("c521");for(var o in i)"default"!==o&&function(t){r.d(e,t,(function(){return i[t]}))}(o);r("dbf6");var a,s=r("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);e["default"]=u.exports}},[["6409","common/runtime","common/vendor"]]]);