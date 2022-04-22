const routes = [
	{
	 path: "/pages/login/login",
	 name: 'login',
		 meta: {
			 title: '登录',
		 },
	},
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
      path: '/pages/index/index',
      name: 'index',
        meta: {
	        title: '主页',
	    },
    },
	{
	    //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
	  path: '/pages/home/home',
	  //aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
	  name: 'home',
	    meta: {
	        title: '首页',
	    },
	},
    {
	    path: '/pages/user/people',
        name: 'people',
        meta: {
	        title: '个人中心',
	    },
	},
	{
	    path: '/pages/user/userdetail',
	    name: 'userdetail',
	    meta: {
	        title: '个人详情',
	    },
	},
	{
	    path: '/pages/user/useredit',
	    name: 'useredit',
	    meta: {
	        title: '个人编辑',
	    },
	},
	{
	    path: '/pages/user/userexit',
	    name: 'userexit',
	    meta: {
	        title: '退出',
	    },
	},
	{
	    path: '/pages/user/location',
	    name: 'location',
	    meta: {
	        title: '定位',
	    },
	},
	{
	    path: '/pages/common/exit',
	    name: 'exit',
	    meta: {
	        title: '退出',
	    },
	},
	{
	    path: '/pages/common/success',
	    name: 'success',
	    meta: {
	        title: 'success',
	    },
	},{
	  path: '/pages/addressbook/address-book',
	  name: 'addressBook',
	    meta: {
	        title: 'addressBook',
	    },
	},
	{
	  path: '/pages/addressbook/level-address-book',
	  name: 'levelAddressBook',
	    meta: {
	        title: 'levelAddressBook',
	    },
	},
	{
	  path: '/pages/addressbook/member',
	  name: 'member',
	    meta: {
	        title: 'member',
	    },
	},
	{
	  path: '/pages/addressbook/address-detail',
	  name: 'addressDetail',
	    meta: {
	        title: 'addressDetail',
	    },
	},
	{
	    path: '/pages/annotation/annotationList',
	    name: 'annotationList',
	    meta: {
	        title: '通知公告',
	    },
	},
	{
	    path: '/pages/annotation/annotationDetail',
	    name: 'annotationDetail',
	    meta: {
	        title: '通知详情',
	    },
	},
	{
	    path: '/pages/common/helloWorld',
	    name: 'helloWorld',
	    meta: {
	        title: 'helloWorld',
	    },
	},
	{
	    path: '/pages/common/infoin',
	    name: 'infoin',
	    meta: {
	        title: 'infoin',
	    },
	},
	{
	    path: '/pages/common/message',
	    name: 'message',
	    meta: {
	        title: 'message',
	    },
	},{
	    path: '/pages/generate/DemoForm',
	    name: 'DemoForm',
	    meta: {
	        title: 'DemoForm',
	    },
	},{
	    path: '/pages/common/zhaopin',
	    name: 'zhaopin',
	    meta: {
	        title: '招聘发布',
	    },
	},{
	    path: '/pages/common/zhaopindetail',
	    name: 'zhaopindetail',
	    meta: {
	        title: '招聘信息',
	    },
	},{
	    path: '/pages/common/message',
	    name: 'message',
	    meta: {
	        title: '留言发布',
	    },
	},{
	    path: '/pages/common/messagedetail',
	    name: 'messagedetail',
	    meta: {
	        title: '留言板',
	    },
	},{
	    path: '/pages/user/restpassword',
	    name: 'restpassword',
	    meta: {
	        title: '密码重置',
	    },
	},{
	    path: '/pages/common/stuinfo',
	    name: 'stuinfo',
	    meta: {
	        title: '学生信息管理',
	    },
	},{
	    path: '/pages/common/stucreate',
	    name: 'stucreate',
	    meta: {
	        title: '学生信息添加',
	    },
	},{
	    path: '/pages/common/stuedit',
	    name: 'stuedit',
	    meta: {
	        title: '学生信息修改',
	    },
	},{
	    path: '/pages/common/showStaticInfo',
	    name: 'showStaticInfo',
	    meta: {
	        title: '信息统计',
	    },
	},{
	    path: '/pages/common/showEcharts',
	    name: 'showEcharts',
	    meta: {
	        title: '数据分析',
	    },
	},{
	    path: '/pages/common/releaseInfo',
	    name: 'releaseInfo',
	    meta: {
	        title: '发布通告',
	    },
	},{
	    path: '/pages/common/hotList',
	    name: 'hotList',
	    meta: {
	        title: '热门城市排行',
	    },
	},{
	    path: '/pages/user/help',
	    name: 'help',
	    meta: {
	        title: '帮助中心',
	    },
	},
	{
	    path: '/pages/common/aaaa',
	    name: 'aaaa',
	    meta: {
	        title: '新',
	    },
	},
	
	
	
	
]
export default routes