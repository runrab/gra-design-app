<template name="home">
	<view>
		<scroll-view>
			<!-- 轮播 -->
			<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" :style="[{animation: 'show 0.2s 1'}]">
				<swiper-item v-for="(item,index) in swiperList" :key="index" @click="goDetail(item.link)">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				
				</swiper-item>
			</swiper>
			<!-- 公共服务 -->
			<view class="cu-bar bg-white solid-bottom" :style="[{animation: 'show 0.5s 1'}]">
				<view class="action">
					<text class='cuIcon-title text-blue'></text>公共服务
				</view>
			</view>
				
			<view class="cu-list grid col-4 text-sm">
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: (index + 1)*0.05 + 's'}]" v-for="(item,index) in usList" :key="index" @tap="goPage(item.page)">
					<view class="padding text-center">
						<image :src="item.icon" style="width:28px;height:28px;">
							<view class="cu-tag badge margin-top-sm" style="margin-left:1.2em" v-if="getTtemDotInfo(item)">
							   <block v-if="getTtemDotInfo(item)">{{getTtemDotInfo(item)}}</block>
							</view>
						</image>
						<view class="margin-top-xs">{{item.title}}</view>
					</view>
				</view>
			</view>
				
			<!-- 学生服务 -->
			<view class="cu-bar bg-white solid-bottom margin-top"  :style="[{animation: 'show 0.6s 1'}]" v-if="identity != 1">
				<view class="action">
					 <text class='cuIcon-title text-yellow'></text>学生服务
				</view>
			</view>
			<view class="cu-list grid col-4 text-sm" v-if="identity != 1">
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: (index + 1)*0.1 + 's'}]" v-for="(item,index) in osList" :key="index" @tap="goPage(item.page)">
					<view class="padding text-center">
						<image :src="item.icon" style="width:28px;height:28px;"/>
						<view class="margin-top-xs">{{item.title}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-tabbar-height margin-top"></view>
	</view>
</template>

<script>
	import { us,os } from '@/common/util/work.js'
	import socket from '@/common/js-sdk/socket/socket.js'
	export default {
		name: 'home',
		props:{
			cur:String,
		},
		watch: {
			cur: {
				immediate: true,
				handler:function(val,oldVal){
					console.log('cur',val,oldVal)
				    this.initMenu()
				},
			},
		},
		data() {
			return {
			 swiperList: [
				  {id:1,type: 'image',url: '/static/banner/banner1.png', link: '/pages/common/infoin'},
				  {id:2,type: 'image',url: '/static/banner/banner2.png', link: '/pages/common/zhaopindetail'},
				  {id:3,type: 'image',url: '/static/banner/banner3.png', link: '/pages/common/hotList'},
				  {id:4,type: 'image',url: '/static/banner/banner4.png', link: '/pages/common/messagedetail'},
				  {id:5,type: 'image',url: '/static/banner/banner6.png', link: '/pages/user/help'},
				],
				middleApps: [
				  {icon: 'line2_icon1.png', title: '管理', 'text': '管理'},
				  {icon: 'line2_icon2.png', title: '消息', 'text': '消息'},
				],
				usList:us.data,
				osList:os.data,
				msgCount:0,
				//首页禁止教师填写学生信息
				identity: "",
				dot:{
				  mailHome:false
				}
			}
		},
		methods: {
			initMenu(){
				console.log("-----------home------------")
			    this.onSocketOpen()
			    this.onSocketReceive()
			    this.loadCount(0);
				//切割学生服务
				this.identity=this.$store.getters.identity
				console.log("身份：" +this.$store.getters.identity)
			},
			goPage(page){
				if(!page){
					return false;
				}
				if(page==='annotationList'){
				  this.msgCount = 0
				}
				this.dot[page]=false
				this.$Router.push({name: page})
			},
			// 启动webSocket
			onSocketOpen() {
				socket.init('websocket');
			},
			onSocketReceive() {
				var _this=this
				socket.acceptMessage = function(res){
					// console.log("页面收到的消息", res);
					if(res.cmd == "topic"){
					  //系统通知
					  _this.loadCount('1')
					}else if(res.cmd == "user"){
					  //用户消息
					  _this.loadCount('2')
					} else if(res.cmd == 'email'){
					 //邮件消息
					  _this.loadEmailCount()
					}
				}
			},
			loadCount(flag){
				console.log("loadCount::flag",flag)
				let url = '/sys/annountCement/listByUser';
				this.$http.get(url).then(res=>{
					console.log("res::",res)
				  if(res.data.success){
					let msg1Count = res.data.result.anntMsgTotal;
					let msg2Count = res.data.result.sysMsgTotal;
					this.msgCount = msg1Count + msg2Count
					console.log("this.msgCount",this.msgCount)
				  }
				})
			},
			loadEmailCount(){
				this.dot.mailHome = true
			},
			getTtemDotInfo(item){
				if(item.page==='annotationList' && this.msgCount>0){
				  return this.msgCount
				}
				return '';
			},
			goDetail(link){
				uni.navigateTo({
					url:link
				})
			}
		}
	}
</script>

<style scoped>
	.cu-list.grid>.cu-item {
	  padding: 0px 0px; 
	}
    .line2-icon {
	  width: 60px;
	  height: 60px;
    }
	
</style>
