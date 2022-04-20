import Vue from 'vue'
import Vuex from 'vuex'
import api from "@/api/api"
import MinCache from'@/common/util/MinCache.js'
import { ACCESS_TOKEN,USER_NAME,USER_INFO } from "@/common/util/constants"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userid:'',
    username: '',
    realname: '',
    welcome: '',
    avatar: '',
	// 存储桶新增获取数据方法
	visible: '',
	identity: '',
	sex: '',
	email: '',
	phone: '',
	orgCode: '',
	orgCodeTxt: '',
	status: '',
	delFlag: '',
	workNo: '',
	post: '',
	telephone: '',
	createBy: '',
	createTime: '',
	updateBy: '',
	updateTime: '',
	activitiSync: 1,
	userIdentity: 2,
	departIds: '',
	relTenantIds: '',
	clientId: '',
	cityName: ''
	//=============end=================
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username
      state.realname = realname
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  actions: {
    // 登录
    mLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
       api.login(userInfo).then(response => {
          if(response.data.code ==200){ 
            const result = response.data.result
            const userInfo = result.userInfo
			// runrab 将需要的信息存储在storge中
			uni.setStorageSync(ACCESS_TOKEN,result.token);
			uni.setStorageSync(USER_INFO,userInfo);
            commit('SET_TOKEN', result.token)
            commit('SET_AVATAR', userInfo.avatar)
            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname})
            resolve(response)
          }else{
            resolve(response)
          }
        }).catch(error => {
			console.log("catch===>response",response)
          reject(error)
        })
      })
    },
    //手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        api.phoneNoLogin(userInfo).then(response => {
          if(response.data.code ==200){
            const result = response.data.result
            const userInfo = result.userInfo
			uni.setStorageSync(ACCESS_TOKEN,result.token);
			uni.setStorageSync(USER_INFO,userInfo);
            commit('SET_TOKEN', result.token)
            commit('SET_NAME', { username: userInfo.username,realname: userInfo.realname})
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          }else{
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        let logoutToken = state.token;
        commit('SET_TOKEN', '')
        uni.removeStorageSync(ACCESS_TOKEN)
        api.logout(logoutToken).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

  },
  getters:{
    token: state => state.token,
	// username: state => {state.userid=uni.getStorageSync(USER_INFO).username; return state.username},
	//原先代码将用户名,id 混用
	username: state => {state.username=uni.getStorageSync(USER_INFO).username; return state.username},
	nickname: state => {state.userid=uni.getStorageSync(USER_INFO).realname; return state.user.realname},
	// avatar: state => {state.userid=uni.getStorageSync(USER_INFO).avatar; return state.user.avatar},
	avatar: state => {state.avatar=uni.getStorageSync(USER_INFO).avatar; return state.avatar},
	userid:state => {state.userid=uni.getStorageSync(USER_INFO).id; return state.userid},
	//新增获取存储数据代码
	identity:state => {state.identity=uni.getStorageSync(USER_INFO).identity; return state.identity},
	visible:state => {state.visible=uni.getStorageSync(USER_INFO).visible; return state.visible},
	// 
	birthday:state => {state.birthday=uni.getStorageSync(USER_INFO).birthday; return state.birthday},
	sex:state => {state.sex=uni.getStorageSync(USER_INFO).sex; return state.sex},
	email:state => {state.email=uni.getStorageSync(USER_INFO).email; return state.email},
	phone:state => {state.phone=uni.getStorageSync(USER_INFO).phone; return state.phone},
	orgCode:state => {state.orgCode=uni.getStorageSync(USER_INFO).orgCode; return state.orgCode},
	orgCodeTxt:state => {state.orgCodeTxt=uni.getStorageSync(USER_INFO).orgCodeTxt; return state.orgCodeTxt},
	status:state => {state.status=uni.getStorageSync(USER_INFO).status; return state.status},
	delFlag:state => {state.delFlag=uni.getStorageSync(USER_INFO).delFlag; return state.delFlag},
	workNo:state => {state.workNo=uni.getStorageSync(USER_INFO).workNo; return state.workNo},
	post:state => {state.post=uni.getStorageSync(USER_INFO).post; return state.post},
	workNo:state => {state.workNo=uni.getStorageSync(USER_INFO).workNo; return state.workNo},
	telephone:state => {state.telephone=uni.getStorageSync(USER_INFO).telephone; return state.telephone},
	createBy:state => {state.createBy=uni.getStorageSync(USER_INFO).createBy; return state.createBy},
	createTime:state => {state.createTime=uni.getStorageSync(USER_INFO).createTime; return state.createTime},
	updateBy:state => {state.updateBy=uni.getStorageSync(USER_INFO).updateBy; return state.updateBy},
	updateTime:state => {state.updateTime=uni.getStorageSync(USER_INFO).updateTime; return state.updateTime},
	activitiSync:state => {state.activitiSync=uni.getStorageSync(USER_INFO).activitiSync; return state.activitiSync},
	userIdentity:state => {state.userIdentity=uni.getStorageSync(USER_INFO).userIdentity; return state.userIdentity},
	departIds:state => {state.departIds=uni.getStorageSync(USER_INFO).departIds; return state.departIds},
	relTenantIds:state => {state.relTenantIds=uni.getStorageSync(USER_INFO).relTenantIds; return state.relTenantIds},
	clientId:state => {state.clientId=uni.getStorageSync(USER_INFO).clientId; return state.clientId},
	cityName:state => {state.cityName=uni.getStorageSync(USER_INFO).cityName; return state.cityName},

			

	
	
  }
})
