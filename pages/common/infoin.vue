<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="content">信息填写</block>
			</cu-custom>
<!-- 			<view class="padding flex flex-direction">
				<app-select label="目的城市 ：" v-model="model.city_name" placeholder="请选择类型" :dict="plan_type" space ></app-select>
			</view> -->
		<uni-section title="未填写的信息 也需要补充" type="line">
		   <view class="cu-form-group">
				<view class="padding flex flex--direction">
					<text space="ensp">目的城市: </text>
				</view>	
				<view class="padding flex flex--direction">
					<input type="text" v-model="model.city_name" placeholder="省-市"/>	
				</view>
			</view>
			
			<view class="cu-form-group" v-if="show.email==''">
					<view class="padding flex flex--direction">
						<text space="ensp">电子邮件: </text>
					</view>	
				<view class="padding flex flex--direction">
					<input type="text" v-model="model.email" placeholder="xx@xx.com"/>	
				</view>
		   </view>
			<view class="cu-form-group" v-if="show.phone==''">
					<view class="padding flex flex--direction">
						<text space="ensp">手机号码: </text>
					</view>	
				<view class="padding flex flex--direction">
					<input type="text" v-model="model.phone" placeholder="输入手机号"/>	
				</view>
		   </view>		
			   
			<view class="cu-form-group" v-if="show.workNo==''">
					<view class="padding flex flex--direction">
						<text space="ensp">学号: </text>
					</view>	
				<view class="padding flex flex--direction">
					<input type="text" v-model="model.workNo" placeholder="输入学号"/>	
				</view>
		   </view>				   
		</uni-section>	
<!-- 			<view class="cu-form-group">
				<view class="padding flex flex--direction">
					<text space="ensp">身份证: </text>
				</view>	
				<view class="padding flex flex--direction">
				<input type="idcard" v-model="idcard" placeholder="输入身份证"/>	
				</view>
			</view>	
			<view class="cu-form-group">
				<view class="padding flex flex--direction">
					<text space="ensp">手机号: </text>
				</view>	
				<view class="padding flex flex--direction">
				<input type="tel" maxlength="11" v-model="phone" placeholder="输入手机号"/>	
				</view>
			</view>	
			<view class="cu-form-group">
				<view class="padding flex flex--direction">
					<text space="ensp">学号: </text>
				</view>	
				<view class="padding flex flex--direction">
				<input type="number" maxlength="12" v-model="stu" placeholder="输入学号"/>	
				</view>
			</view>	
			<view class="cu-form-group">
				<view class="padding flex flex--direction">
					<text space="ensp">学校: </text>
				</view>	
				<view class="padding flex flex--direction">
				<input type="text" v-model="school" placeholder="输入学校"/>	
				</view>
			</view>	
		<view class="cu-form-group">
			<view class="padding flex flex--direction">
				<text space="ensp">密码: </text>
			</view>	
			<view class="padding flex flex--direction">
			<input type="password" v-model="password" placeholder="输入密码"/>	
			</view>
		</view>	
		 -->
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green shadow-blur round lg" @tap="submitInfo()">提交
			</button>
		</view>	
		</scroll-view>
	</view>

</template>

<script>
	import appSelect from '@/components/my-componets/appSelect.vue'
	import myImageUpload from '@/components/my-componets/my-image-upload.vue'
	import myDate from '@/components/my-componets/my-date.vue'
	export default {
		components:{
		    appSelect,myImageUpload,myDate
		 },
		data() {
			return {
				formData: {
					email: 'xx@qq.com',
				},
				more:{},
				show:{},
				modalName: null,
				item:{msg:'退出成功'},
				// type:"1",
				selected:[],
				beginTime:'',
				endTime:'',
				password:"",
				school:"",
				model: {},
				url: {
				  add: "/sys/user/appGoInfo",
				},
			}
		},
		onLoad() {
			this.loadinfo()
		},
		methods: {
			loadinfo(){
				this.show.email=this.$store.getters.email
				this.show.phone=this.$store.getters.phone
				this.show.workNo=this.$store.getters.workNo
			},
			submitInfo(){
			let myForm = {...this.model};
			this.loading = true;
			let url = this.url.add;
			myForm.city_name=this.model.city_name;
			this.$http.post(url,myForm).then(res=>{
			   this.loading = false
			   this.$Router.push({name:'index'})
			}).catch(()=>{
				this.loading = false
			});
			}
		}
	}
</script>

<style>
</style>
