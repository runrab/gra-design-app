<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">留言板</block>
				<view slot="right"  @tap="rightClick">发布</view>
			</cu-custom>
			<uni-section title="留言内容" type="line">
			<view class="cu-list menu" v-for="(item,index) in list" :key="index" v-if="item.visible==0||item.userid==localuserid">
				<view class="cu-item animation-slide-bottom" > 
					<view class="action" v-html="item.context">
					</view>
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
			</uni-section>	

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
				useUrl:'/runrab/message/list',
				delUrl:'/runrab/message/delete',
				positionUrl:'/runrab/message/list',
				departUrl:'/runrab/message/list'
			};
		},
		onLoad() {
			this.loadinfo()
		},
		methods: {
			// getSubStringText(text,len){
			// 	if(!text || text.length==0){
			// 		return ''
			// 	}
			// 	if(text.length<len){
			// 		return text;
			// 	}
			// 	return text.substr(0,len)+"..."
			// },
			rightClick(id){
				this.$Router.push({name:'message', params:this.iteam})
				/* uni.navigateTo({
				    url: '/pages/user/useredit?item='+item
				}); */
			},
			delClick(ids){
				this.$http.delete(this.delUrl+'?id='+ids).then(res=> {
					if (res.data.success) {
					    uni.reLaunch({
					       url: '/pages/common/messagedetail',
					     });
						this.$tip.success("删除成功")
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
			},
			
			loadinfo(){				
				// this.$http.get(this.useUrl,{params:{userid:this.$store.getters.userid}}).then(res=> {
				this.$http.get(this.useUrl).then(res=> {
					// console.log("用户",res)
					// console.log(res.data.result.records[0].context.toString())
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
				this.$http.get(this.departUrl,{params:{userId:this.$store.getters.userid}}).then(res=> {
					if (res.success) {
						for (let item of res.result){
							// this.personalMsg.orgCode = item.title
							// this.personalMsg.departIds = item.title
						}
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
				
				this.$http.get(this.positionUrl).then(res=> {
					if (res.success) {
						let postArr = res.result.records
						for (let item of postArr ){
							// if (this.personalMsg.post == item.code){
							// 	this.personalMsg.post = item.name
							// }
						}
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
