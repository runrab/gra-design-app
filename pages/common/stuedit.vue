<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">编辑学生资料</block>
		</cu-custom>
		<form>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" name="input" v-model="myFormData.realname"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">用户名</view>
				<input placeholder="用户名" name="input" v-model="myFormData.username" disabled></input>
			</view>
			<view class="cu-form-group">
				<view class="title">头像</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red radius" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">性别</view>
				<switch class='switch-sex' @change="SwitchC" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">手机号码</view>
				<input placeholder="输入手机号码" name="input" v-model="myFormData.phone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input placeholder="输入邮箱" name="input"  v-model="myFormData.email"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">目的城市</view>
				<input placeholder="输入目的城市" name="input"  v-model="myFormData.cityName"></input>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg"  @click="onSubmit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				index: -1,
				switchC: true,
				imgList: [],
				uploadUrl:"/sys/common/upload",
				userUrl:'/sys/user/queryById',
				positionUrl:'/sys/position/list',
				departUrl:'/sys/user/userDepartList',
				userId:'',
				myFormData:{
					avatar:'',
					realname:'',
					username:'',
					sex:1,
					birthday:'',
					orgCode:'',
					workNo:'',
					phone:'',
					email:'',
					id:'',
					identitystu:'',
					cityName:'',
					visible:'0',
				},
				personalMsg:{
					avatar:'',
					realname:'',
					username:'',
					sex:1,
					birthday:new Date(),
					orgCode:'',
					workNo:'',
					status:1,
					phone:'',
					telephone:'',
					email:'',
					post:'',
					departIds:'',
					identity:'',
					cityName:'',
					visible:'0',
				},
			};
		},
		onLoad: function (option) {  
			// let query=this.$Route.query
			this.userId=this.$Route.query.userId
			
			this.$http.get(this.userUrl,{params:{id:this.userId}}).then(res=> {
				if (res.data.success) {
					let result = res.data.result
					if(result.avatar&&result.avatar.length >0)
					this.personalMsg.avatar = api.getFileAccessHttpUrl(result.avatar)
					this.personalMsg.realname = result.realname
					this.personalMsg.username= result.username
					this.personalMsg.post = result.post
					this.personalMsg.sex = result.sex===1?'男':'女'
					// this.personalMsg.birthday = result.birthday== null?'无':result.birthday
					this.personalMsg.departIds= result.departIds
					this.personalMsg.workNo= result.workNo
					this.personalMsg.phone= result.phone
					this.personalMsg.telephone= result.telephone== null?'无':result.telephone
					this.personalMsg.email= result.email
					this.personalMsg.post= result.post
					this.personalMsg.identity= result.identity=== 1?'普通成员':'上级'
					this.personalMsg.status= result.status === 1?'正常':'冻结'
					this.personalMsg.orgCode= result.orgCode
					this.personalMsg.cityName= result.cityName
					this.personalMsg.visible='0'
				}
			}).catch(e=>{
				console.log("请求错误",e)
			})
			
			
			this.$http.get(this.departUrl,{params:{userId:this.userId}}).then(res=> {
				if (res.success) {
					for (let item of res.result){
						this.personalMsg.orgCode = item.title
						this.personalMsg.departIds = item.title
					}
				}
			}).catch(e=>{
				console.log("请求错误",e)
			})
			
			this.$http.get(this.positionUrl).then(res=> {
				if (res.success) {
					let postArr = res.result.records
					for (let item of postArr ){
						if (this.personalMsg.post == item.code){
							this.personalMsg.post = item.name
						}
					}
				}
			}).catch(e=>{
				console.log("请求错误",e)
			})
			let query=this.personalMsg
			if(query){
				this.myFormData=query;
				this.myFormData.visible='0'
				if(this.myFormData.sex=='女'){
				  this.switchC = false
				}else if(this.myFormData.sex=='男'){
				  this.switchC = true
				}
				if(this.myFormData.avatar){
				  this.imgList=[this.myFormData.avatar]
				}
				if(!this.myFormData.birthday){
				  this.myFormData.birthday= '无'
				}
				if(this.myFormData.identity=='普通成员'){
				  this.myFormData.identity = 1
				}else if(this.myFormData.identity=='上级'){
				  this.myFormData.identity = 2
				}
				if(this.myFormData.status=='正常'){
				  this.myFormData.status = 1
				  
				}else if(this.myFormData.status=='冻结'){
				  this.myFormData.status = 2
				}
				 this.Avatar=this.myFormData.avatar
	
	
				Object.keys(this.myFormData).map(key=>{
				  if(this.myFormData[key]=='无'){
					this.myFormData[key] = ''
				  }
				})
				console.log("this.myFormData",this.myFormData)
			}
		},
		methods: {
			onSubmit() {
			  let myForm = this.myFormData
			  let checkPhone = new RegExp(/^[1]([3-9])[0-9]{9}$/);
			  let checkEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
			  console.log("myForm",myForm)
			  if(!myForm.phone || myForm.phone.length==0){
				this.$tip.alert('请输入手机号');
				return false
			  }
			  if(!checkPhone.test(myForm.phone)){
				this.$tip.alert('请输入正确的手机号');
				return false
			  }
			  if(!checkEmail.test(myForm.email)){
				this.$tip.alert('请输入正确的邮箱地址');
				return false
			  }
				this.myFormData.id = this.userId
				if(this.switchC){
					this.myFormData.sex=1
				}else{
					this.myFormData.sex=2
				}
				console.log('myform',this.myFormData)
				this.$tip.loading();
				this.$http.put('/sys/user/appEdit',this.myFormData).then(res=>{
					console.log(res)
					this.$tip.loaded();
					if (res.data.success){
						this.$tip.toast('提交成功')
						this.$Router.replace({name:'stuinfo'})
					}
				}).catch(()=>{
					this.$tip.loaded();
					this.$tip.error('提交失败')
				});
			},
			DateChange(e) {
				this.myFormData.birthday = e.detail.value
			},
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			ChooseImage() {
				var that=this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.$http.upload(that.$config.apiUrl+that.uploadUrl, {
								filePath: res.tempFilePaths[0],
								name: 'file'
							})
							.then(res => {
								that.myFormData.avatar=res.data.message;
							})
							.catch(err => {
								that.$tip.error(err.data.message)
							});
						this.imgList = res.tempFilePaths
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
