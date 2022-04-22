<template>
    <view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="content">招聘发布</block>
		</cu-custom>
			<view class="example">
				
			<uni-forms class="padding flex flex-direction" ref="valiForm" :rules="rules" :modelValue="model">
				<uni-forms-item label="公司名称" required name="company">
					<uni-easyinput v-model="model.company" placeholder="请输入公司名称" />
				</uni-forms-item>
				<uni-forms-item label="招聘信息"  required name="context">
					<uni-easyinput type="textarea" v-model="model.context" placeholder="请输入招聘消息" />
				</uni-forms-item>		
			</uni-forms>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green shadow-blur round lg" @click="onSubmit">
					<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>提交
				</button>
			</view>
    </view>
</template>

<script>
    import myDate from '@/components/my-componets/my-date.vue'

    export default {
        name: "zhaopin",
        components:{myDate},
        props:{
          formData:{
              type:Object,
              default:()=>{},
              required:false
          }
        },
        data(){
            return {
				CustomBar: this.CustomBar,
				NavBarColor: this.NavBarColor,
				loading:false,
                model: {},
                backRouteName:'index',
                url: {
                  queryById: "/runrab/zhaopin/queryById",
                  add: "/runrab/zhaopin/add",
                  edit: "/runrab/zhaopin/edit",
                },
				rules: {
					company: {
						rules: [{
							required: true,
							errorMessage: '公司名称必填'
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
                            this.model = res.data.result;
                        }
                    })
                }
            },
            onSubmit() {
				this.$refs["valiForm"].validate().then(res => {
					let myForm = {...this.model};
					myForm.userid=this.$store.getters.userid
					myForm.avatar=this.$store.getters.avatar
					myForm.createBy=this.$store.getters.username
					this.loading = true;
					let url = this.url.add;
					this.$http.post(url,myForm).then(res=>{
					   console.log("res",res)
					   this.loading = false
					   this.$Router.push({name:'zhaopindetail'})
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
