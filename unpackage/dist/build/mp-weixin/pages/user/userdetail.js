(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/userdetail"],{"328a":function(t,e,n){"use strict";var r=n("b01f"),a=n.n(r);a.a},"46f1":function(t,e,n){"use strict";n.r(e);var r=n("ec1a"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},"53c8":function(t,e,n){"use strict";n.r(e);var r=n("62a2"),a=n("46f1");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("328a");var s,i=n("f0c5"),u=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],s);e["default"]=u.exports},"62a2":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.getSubStringText(t.personalMsg.realname+"@"+t.personalMsg.orgCode,11));t.$mp.data=Object.assign({},{$root:{m0:n}})},o=[]},"670a":function(t,e,n){"use strict";(function(t){n("8d6c");r(n("66fd"));var e=r(n("53c8"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},b01f:function(t,e,n){},ec1a:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("5ad3"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=s(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return i=t.done,t},e:function(t){u=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(u)throw o}}}}function s(t,e){if(t){if("string"===typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var u={data:function(){return{personalMsg:{avatar:"",realname:"",username:"",sex:1,birthday:new Date,orgCode:"",workNo:"",status:1,phone:"",telephone:"",email:"",post:"",departIds:"",identity:""},userUrl:"/sys/user/queryById",positionUrl:"/sys/position/list",departUrl:"/sys/user/userDepartList"}},onLoad:function(){this.loadinfo()},methods:{getSubStringText:function(t,e){return t&&0!=t.length?t.length<e?t:t.substr(0,e)+"...":""},rightClick:function(){this.$Router.push({name:"useredit",params:this.personalMsg})},loadinfo:function(){var t=this;this.$http.get(this.userUrl,{params:{id:this.$store.getters.userid}}).then((function(e){if(console.log("用户",e),e.data.success){var n=e.data.result;n.avatar&&n.avatar.length>0&&(t.personalMsg.avatar=r.default.getFileAccessHttpUrl(n.avatar)),t.personalMsg.realname=n.realname,t.personalMsg.username=n.username,t.personalMsg.post=n.post,t.personalMsg.sex=1===n.sex?"男":"女",t.personalMsg.birthday=null==n.birthday?"无":n.birthday,t.personalMsg.departIds=n.departIds,t.personalMsg.workNo=n.workNo,t.personalMsg.phone=n.phone,t.personalMsg.telephone=null==n.telephone?"无":n.telephone,t.personalMsg.email=n.email,t.personalMsg.post=n.post,t.personalMsg.identity=1===n.identity?"普通成员":"上级",t.personalMsg.status=1===n.status?"正常":"冻结",t.personalMsg.orgCode=n.orgCode}})).catch((function(t){console.log("请求错误",t)})),this.$http.get(this.departUrl,{params:{userId:this.$store.getters.userid}}).then((function(e){if(e.success){var n,r=o(e.result);try{for(r.s();!(n=r.n()).done;){var a=n.value;t.personalMsg.orgCode=a.title,t.personalMsg.departIds=a.title}}catch(s){r.e(s)}finally{r.f()}}})).catch((function(t){console.log("请求错误",t)})),this.$http.get(this.positionUrl).then((function(e){if(e.success){var n,r=e.result.records,a=o(r);try{for(a.s();!(n=a.n()).done;){var s=n.value;t.personalMsg.post==s.code&&(t.personalMsg.post=s.name)}}catch(i){a.e(i)}finally{a.f()}}})).catch((function(t){console.log("请求错误",t)}))}}};e.default=u}},[["670a","common/runtime","common/vendor"]]]);