<template>
    <view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="content">发布公告</block>
		</cu-custom>
		 <!--表单区域-->
		<view class="example">
			<form>
<!-- 				<view class="cu-form-group">
				  <my-date label="结束时间：" v-model="model.endTime" placeholder="请选择结束时间" required fields="minute"></my-date>
				</view> -->
<!-- 				<view class="cu-form-group">
				<textarea placeholder="优先级" v-model="model.priority"> </textarea>	
				</view> -->
<!-- 				<view class="cu-form-group">
				  <textarea placeholder="请填写标题" v-model="model.titile"> </textarea>	
				</view>
				<view class="cu-form-group">
					<textarea placeholder="请填写招聘信息" v-model="model.msgAbstract"> </textarea>	
				</view> -->
<!-- 				<view class="cu-form-group">
				<textarea placeholder="请填写留言信息" v-model="model.msgContent"> </textarea>	
				</view> -->
<!-- 				<view class="cu-form-group">
						<app-select label="发布类型：" v-model="model.msgType" placeholder="请选择类型" :dict="plan_type" space ></app-select>
				 </view> -->
				 
				 <uni-forms class="padding flex flex-direction" ref="valiForm" :rules="rules" :modelValue="model">
					<uni-forms-item label="标题" required name="titile">
						<uni-easyinput v-model="model.titile" placeholder="请填写标题" />
					</uni-forms-item>
					<uni-forms-item label="优先级" required name="priority">
						<uni-data-checkbox v-model="model.priority" :localdata="priorityData" />
					</uni-forms-item>
				 	<uni-forms-item label="公告" required name="msgAbstract">
				 		<uni-easyinput type="textarea" v-model="model.msgAbstract" placeholder="请填写公告" />
				 	</uni-forms-item>
				 </uni-forms>
				 <uni-forms-item label="结束时间">
				 	<uni-datetime-picker type="datetime" return-type="timestamp" v-model="model.endTime"/>
				 </uni-forms-item>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-green shadow-blur round lg" @click="onSubmit">
						<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>提交
					</button>
				</view>
			</form>			
		</view>
    </view>
</template>

<script>
    import myDate from '@/components/my-componets/my-date.vue'
	import appSelect from '@/components/my-componets/appSelect.vue'

    export default {
        name: "releaseInfo",
        components:{myDate,appSelect},
        props:{
          formData:{
              type:Object,
              default:()=>{},
              required:false
          },
        },
        data(){
            return {
				CustomBar: this.CustomBar,
				NavBarColor: this.NavBarColor,
				loading:false,
                model: {},
				visible:'',
				rid:'',
                backRouteName:'index',
                url: {
                  add: "/sys/annountCement/appAdd",
                  push: "/sys/annountCement/doReleaseData",
                },
				priorityData: [{
					text: '高',
					value: 'H'
				}, {
					text: '中',
					value: 'M'
				}, {
					text: '低',
					value: 'L'
				}],
				rules: {
					titile: {
						rules: [{
							required: true,
							errorMessage: '标题必填'
						}]
					},
					msgAbstract:{
						rules: [{
							required: true,
							errorMessage: '公告内容不能为空'
						}]
					},
					priority: {
						rules: [{
							required: true,
							errorMessage: '标题必填'
						}]
					},

					
				},
					
            }
        },
        created(){
             this.initFormData();
        },
        methods:{
           initFormData(){
               // if(this.formData){
               //      let dataId = this.formData.dataId;
               //      this.$http.get(this.url.queryById,{params:{id:dataId}}).then((res)=>{
               //          if(res.data.success){
               //              console.log("表单数据",res);
               //              this.model = res.data.result;
               //          }
               //      })
               //  }
            },
            onSubmit() {
				
				this.$refs["valiForm"].validate().then(res => {
					let myForm = {...this.model};
					this.loading = true;
					let url = this.url.add;
					myForm.msgContent=this.model.msgAbstract
					myForm.userIds=this.$store.getters.userid+','
					myForm.priority=this.model.priority
					myForm.msgCategory="1"
					myForm.sendStatus="1"
					console.log(this.$store.getters.userid)
					myForm.sender=this.$store.getters.username
					myForm.endTime=this.model.endTime
					myForm.msgType="ORG" 
					myForm.createBy=this.$store.getters.username
					this.$http.post(url,myForm).then(res=>{
					   this.loading = false
					   this.rid = res.message
					   console.log(res.message)
					});
					let urlPush = this.url.push;
					//发布消息
					this.$http.get(urlPush+"?id="+this.rid).then(res=>{
					   this.loading = false
					   this.$Router.push({name:'index'})
					   console.log("sucess!")
					}).catch(()=>{
						this.loading = false
					});
					
					
				}).catch(err => {
					console.log('err', err);
				})

				
            }
        }
    }
</script>

<style lang="scss">

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>
