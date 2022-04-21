<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">招聘信息</block>
				<view slot="right"  @tap="rightClick">发布</view>
			</cu-custom>
			<!-- list列表 -->
<!-- 			<view class="cu-list menu"> -->
<!-- 				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.1s'}]">
					<view class="content">
						<text class="text-grey">头像</text>
					</view>
					<view class="action">
						<view class="cu-avatar round sm" :style="{backgroundImage: 'url(' + personalMsg.avatar + ')'}"></view>
					</view>
				
				</view> -->
<!-- 				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.2s'}]">
					<view class="content">
						<text class="text-grey">姓名</text>
					</view>
					<view class="action">
						<text class="text-grey">{{personalMsg.realname}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.3s'}]">
					<view class="content">
						<text class="text-grey">性别</text>
					</view>
					<view class="action">
						<text class="text-grey">{{personalMsg.sex}}</text>
					</view>
				</view>
				<view class="cu-item animation-slide-bottom" :style="[{animationDelay: '0.4s'}]">
					<view class="content">
						<text class="text-grey">生日</text>
					</view>
					<view class="action">
						<text class="text-grey">{{personalMsg.birthday}}</text>
					</view>
				</view> -->
<!-- 			</view> -->
			<view class="cu-list menu" v-for="(item,index) in list" :key="index">
				<view class="cu-item animation-slide-bottom" > 
				<!-- :style="[{animationDelay: '1s'}] -->
						<view class="action" v-html="item.context"></view>
						<!-- <text class="text-grey">{{item.context}}</text> -->
				</view>	
				<view class="cu-item animation-slide-bottom" > 
					<text class="text-grey" space="ensp">{{item.createTime}} </text>  
					<view class="action" v-if="item.userid!=localuserid">
						<text class="text-grey" space="ensp">{{item.createBy}} </text>  
					</view>
					<view class="action" v-if="item.userid==localuserid">
						<text class="text-grey" space="ensp"> 本人 </text> 
					</view>
					<view  @tap="delClick(item.id)" v-if="item.userid==localuserid">删除</view>
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
				list:'',
				localuserid: '',  //存储桶中用户id
				useUrl:'/runrab/zhaopin/list',
				delUrl:'/runrab/zhaopin/delete'
			};
		},
		onLoad() {
			this.loadinfo()
		},
		methods: {
			rightClick(){
				this.$Router.push({name:'zhaopin'})
				/* uni.navigateTo({
				    url: '/pages/user/useredit?item='+item
				}); */
			},
			delClick(ids){
				this.$http.delete(this.delUrl+'?id='+ids).then(res=> {
					if (res.data.success) {
					this.$Router.push({name:'zhaopindetail'})
					this.$tip.success("删除成功")
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
			},
			loadinfo(){				
				// this.$http.get(this.useUrl,{params:{id:this.$store.getters.userid}}).then(res=> {
				this.$http.get(this.useUrl).then(res=> {
					console.log("用户",res)
					console.log(res.data.result.records[0].context.toString())
					if (res.data.success) {
						// let result = res.data.result
						// this.personalMsg.avatar = api.getFileAccessHttpUrl(result.avatar)
						// // if(result.avatar&&result.avatar.length >0)
						// // this.personalMsg.avatar = api.getFileAccessHttpUrl(result.avatar)
						// this.personalMsg.context = res.data.result.records[0].context.toString()
						// this.personalMsg.createBy= res.data.result.records[0].createBy.toString()
						// this.personalMsg.userid= res.data.result.records[0].userid.toString()
						this.list= res.data.result.records
						this.localuserid=this.$store.getters.userid
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
