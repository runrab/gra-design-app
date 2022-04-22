import Vue from 'vue'
import App from './App'
import store from './store'
import MinCache from'./common/util/MinCache.js'
import tip from'./common/util/tip.js'
import configService from'./common/service/config.service.js'

import router from './common/router'
import {RouterMount} from './plugin/uni-simple-router/index.js'


// 注册缓存器
Vue.use(MinCache,{timeout: 6})

// store
Vue.prototype.$store=store;
// tip
Vue.prototype.$tip=tip;
// config
Vue.prototype.$config=configService;

// request请求
import { http } from '@/common/service/service.js' 
Vue.prototype.$http = http

import home from './pages/home/home.vue'
Vue.component('home',home)


import people from './pages/user/people.vue'
Vue.component('people',people)

// 新增 
import peoplelis from './pages/home/peoplelis.vue'
Vue.component('peoplelis',peoplelis)

import annotationList from './pages/annotation/annotationList.vue'
Vue.component('annotationList',annotationList)


// 自定义组件
import mySelect from './components/my-componets/my-select.vue'
Vue.component('mySelect',mySelect)

import myImageUpload from './components/my-componets/my-image-upload.vue'
Vue.component('myImageUpload',myImageUpload)


import myPage from './components/my-componets/my-page.vue'
Vue.component('myPage',myPage)

//引入或者自定义组件 注册


import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import cuCustom from './plugin/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

// import VConsole from './js_sdk/vconsole.min'

//   var vConsole = new VConsole();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	MinCache,
    ...App
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

//新增静态资源过滤 当微信小程序的时候 将静态资源改为cdn 否则本地
// #ifdef MP
getApp().globalData.cdn='https://cdn.jsdelivr.net/gh/runrab/oss@main/app/static';
// #endif

// #ifndef H5
getApp().globalData.cdn='/static';
// #endif

// #ifndef MP
getApp().globalData.cdn='/static';
// #endif

// 全局变量
getApp().globalData.ALL={
        VISIBLE_ALL: 0,   //全体
 	    VISIBLE_ORG: 1,  //组织
 		VISIBLE_GE: -1,  //个人
		
		SEX_MAN: 1,      //男
		SEX_WUM: 2,      //女
		
		IDENTITY_TEA: 1, //教师身份
		IDENTITY_STU: 0, //学生身份
		IDENTITY_ADMIN: 2, //管理员身份
		
		ROLE_STU: "1260924539346472962",   //学生角色
		ROLE_TEA: "e51758fa916c881624b046d26bd09230",  //教师
		ROLE_THIRD: "1169504891467464705",            //第三方登录角色
		ROLE_TOURIST: "1508641340982882305",          //游客                   //tourist游客
        ROLE_ADMIN: "f6817f48af4fb3af11b9e8bf182f618b",  //管理员
		ROLE_TMP: "ee8626f80f7c2619917b6236f3a7f02b"   //临时角色	
			
		
 	}

//使用
// this.visible = getApp().globalData.ALL.VISIBLE_ALL;
