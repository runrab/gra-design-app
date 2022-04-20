/**
 * 公共服务
 * useful server
 */
const  icon_prefix="/static/home/128/"

export const us = {
  data:[
{
      title:"招聘信息",
      icon:icon_prefix+"kaoqin.png",
      description:"发现新工作",
      useCount:10000,
	  page:'zhaopindetail'
    },{
      title:"发布留言",
      icon:icon_prefix+"richeng.png",
      description:"发布留言",
      useCount:10000,
	  page:'message'
    },{
      title:"留言板",
      icon:icon_prefix+"richeng.png",
      description:"留言板",
      useCount:10000,
	  page:'messagedetail'
    },
	{
	  title:"热门城市",
	  icon:icon_prefix+"gongwen.png",
	  description:"热门城市",
	  useCount:10000,
	  page:'hotList'
    },{
	  title:"通知公告",
	  icon:icon_prefix+"tongzhi.png",
	  description:"通知公告",
	  useCount:10000,
	  page:'annotationList'
    },
	// {
	//   title:"个人邮件",
	//   icon:icon_prefix+"youjian.png",
	//   description:"个人邮件",
	//   useCount:10000,
	//   dot:false,
	//   page:'helloWorld'
 //    },
	{
	  title:"通讯录",
	  icon:icon_prefix+"tongxun.png",
	  description:"查看部门，组员",
	  useCount:10000,
	  page:'levelAddressBook'
    },{
	  title:"帮助中心",
	  icon:icon_prefix+"wendang.png",
	  description:"帮助中心",
	  useCount:10000,
	  page:'help'
	},{
	  title:"密码修改",
	  icon:icon_prefix+"hetong.png",
	  description:"密码修改",
	  useCount:10000,
	  page:'restpassword'
	}
  ]
}
/**
 * other server 学生服务
 */
export const os = {
  data:[
   {
     title:"信息填写",
     icon:icon_prefix+"richang.png",
     description:"填写毕业去向信息",
     useCount:1000,
     page:'infoin'
   },{
     title:"信息修改",
     icon:icon_prefix+"zhoubao.png",
     description:"修改毕业去向信息",
     useCount:10000,
     page:'userdetail'
   },{
     title:"个人信息修改",
     icon:icon_prefix+"chuchai.png",
     description:"个人信息修改",
     useCount:10000,
     page:'userdetail'
   },{
      title:"定位",
      icon:icon_prefix+"dingwei.png",
      description:"定位",
      useCount:10000,
	  page:'location'
    }
  ]
}

//教师专用服务
export const tea = {
  data:[
    {
      title:"学生信息管理",
      icon:icon_prefix+"xinwen.png",
      description:"学生信息管理",
      useCount:10000,
	  page:'stuinfo'
    },{
      title:"学生信息添加",
      icon:icon_prefix+"toupiao.png",
      description:"学生信息添加",
      useCount:10000,
	  page:'stucreate'
    },{
      title:"学生信息修改",
      icon:icon_prefix+"renwu.png",
      description:"学生信息修改",
      useCount:10000,
	  page:'stuedit'
    },
	{
	  title:"招聘发布",
	  icon:icon_prefix+"kaoqin.png",
	  description:"寻找更多人才",
	  useCount:10000,
	  page:'zhaopin'
	},
	{
	  title:"管理后台",
	  icon:icon_prefix+"qingjia1.png",
	  description:"管理后台",
	  useCount:10000,
	  page:'helloWorld'
	},
	
	{
      title:"发布留言",
      icon:icon_prefix+"richeng.png",
      description:"发布留言",
      useCount:10000,
	  page:'message'
    },{
      title:"发布通告",
      icon:icon_prefix+"tongzhi.png",
      description:"发布通告",
      useCount:10000,
	  page:'releaseInfo'
    },{
      title:"信息统计",
      icon:icon_prefix+"tongji.png",
      description:"信息统计",
      useCount:10000,
	  page:'showStaticInfo'
    },{
      title:"数据分析",
      icon:icon_prefix+"fenxi.png",
      description:"数据分析",
      useCount:10000,
	  page:'showEcharts'
    }
	
  ]
}

