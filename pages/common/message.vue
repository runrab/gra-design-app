<template>
    <view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="content">留言发布</block>
		</cu-custom>
		<view>
		<view class="cu-form-group">
		<uni-forms class="padding flex flex-direction" ref="valiForm" :rules="rules" :modelValue="model">
			<uni-forms-item label="可见性" required name="visible">
				<uni-data-checkbox v-model="model.visible" :localdata="visibleData" />
			</uni-forms-item>
			<uni-forms-item label="消息"  required name="context">
				<uni-easyinput type="textarea" v-model="model.context" placeholder="请输入留言消息" />
			</uni-forms-item>		
		</uni-forms>
		</view>	
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green shadow-blur round lg" @click="onSubmit">
				<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>提交
			</button>
		</view>
<!-- 			<form>
				<view class="cu-form-group">
				<view class="flex align-center">
						<app-select label="可见性：" v-model="visible" placeholder="请选择类型" :dict="plan_type" space ></app-select>
				 </view>
				</view>
				 <view class="cu-form-group">
					 <textarea placeholder="请填写留言信息" v-model="model.context"> </textarea>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-green shadow-blur round lg" @click="onSubmit">
						<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>提交
					</button>
				</view>
			</form> -->
		</view>
    </view>
</template>

<script>
    import myDate from '@/components/my-componets/my-date.vue'
	import appSelect from '@/components/my-componets/appSelect.vue'

    export default {
        name: "MessageForm",
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
                model: {
					
				},
                backRouteName:'index',
				useUrl:"/runrab/message/add",
				depId:'',
				// 单选数据源
				visibleData: [{
					text: '全部',
					value: getApp().globalData.ALL.VISIBLE_ALL
				}, {
					text: '个人',
					value: getApp().globalData.ALL.VISIBLE_GE
				}, {
					text: '组织',
					value: getApp().globalData.ALL.VISIBLE_ORG
				}],
				rules: {
					visible: {
						rules: [{
							required: true,
							errorMessage: '可见行必选'
						}]
					},
					context:{
						rules: [{
							required: true,
							errorMessage: '内容不能为空'
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
               if(this.formData){
                    let dataId = this.formData.dataId;
                    this.$http.get(this.url.queryById,{params:{id:dataId}}).then((res)=>{
                        if(res.data.success){
                            console.log("表单数据",res);
                            this.model = res.data.result;
                        }
                    })
                }
            },
            onSubmit() {
				this.$refs["valiForm"].validate().then(res => {
					let myForm = {...this.model};
					this.loading = true;
					let url = this.useUrl;
					myForm.identity=this.$store.getters.identity //1代表教师 0学生 -1删除
					myForm.visible=this.model.visible
					myForm.userid=this.$store.getters.userid
					myForm.createBy=this.$store.getters.username
					this.$http.post(url,myForm).then(res=>{
					this.loading = false
					this.$Router.push({name:'messagedetail'})
					this.$tip.success('发布成功')
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
