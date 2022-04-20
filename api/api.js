import { http } from '@/common/service/service.js' 
import configService from '@/common/service/config.service.js';
const apiService = {
	 
	 /**
	  * 登录
	  */
	login(params) {
		return http.post('/sys/mLogin',params)	
	},
	/**
	  * 手机号码登录
	  */
	phoneNoLogin(params) {
		return http.post('/sys/phoneLogin',params);
	},
	/**
	  * 退出
	  */
	logout(params) {
		return http.post('/sys/logout',params);
	},
	
	// 2022 4 20 新增获取用户更多信息存储在存储桶中
	more(params) {
		return http.post('/sys/mLogin',params)	
	},
	
	
	/**
	 * 获取文件访问路径
	 * @param avatar
	 * @param subStr
	 * @returns {*}
	 */
	getFileAccessHttpUrl(avatar,subStr){
	    if(!subStr) subStr = 'http'
	    if(avatar && avatar.startsWith(subStr)){
	        return avatar;
	    }else{
	        return configService.staticDomainURL + "/" + avatar;
	    }
	}
};

export default apiService;
