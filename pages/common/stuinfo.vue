<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">用户信息</block>
<!-- 				<view slot="right"  @tap="rightClick">新增 </view> -->
				<view slot="right"  @tap="rightClick"> 导入</view>
			</cu-custom>
			

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green shadow-blur round lg" @tap="rightClick">手动新增用户
				</button>
			</view>	
			
			<view class="cu-list menu" v-for="(item,index) in list" :key="index" v-if="item.identity ==0 ">
				<view class="cu-item animation-slide-bottom" > 
<!-- 					<view class="action">
						<text class="text-grey">用户名:{{item.username}}</text>
					</view> -->
					<view class="action">
						<text class="text-grey">学号:{{item.workNo}}</text>
					</view>
					<view class="action">
						<text class="text-grey">手机号:{{item.phone}}</text>
					</view>
				</view>	
				<view class="cu-item animation-slide-bottom" > 
					<text class="text-grey" space="ensp">真实名:{{item.realname}} </text>  
					<view class="action" >
						<text class="text-grey" space="ensp">目的城市:{{item.cityName}} </text>  
					</view>
					<view  @tap="editClick(item.id)">编辑</view> 
					<view  @tap="delClick(item.id)">删除</view> 
					 <!-- v-if="item.userid==localuserid" -->
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				parm:{}, //传参数到导航的位置
				list:'',
				localuserid: '',  //存储桶中用户id
				useUrl:'/sys/user/appQueryUserByDepartId',
				delUrl:'/sys/user/delete',
			};
		},
		onLoad() {
			this.loadinfo()
		},
		methods: {
			rightClick(){
				this.$Router.push({name:'stucreate', params:this.personalMsg})
			},
			//新增
			addClick(){
				this.$Router.push({name:'index'});
			},
			//删除
			delClick(userId){
				this.$http.delete(this.delUrl+'?id='+userId).then(res=> {
					if (res.data.success) {
					this.$Router.push({name:'stuinfo', params:this.personalMsg})
					this.$tip.success("删除成功")
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
			},
			//编辑
			editClick(userId){
				this.$Router.push({name:'stuedit', params:{userId:userId}})
			},
			loadinfo(){				
				this.$http.get(this.useUrl+'?departId='+this.$store.getters.depId).then(res=> {
					if (res.data.success) {
						//只要子节点
						this.list= res.data.result 
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
			},
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
