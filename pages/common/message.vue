<template>
    <view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="content">信息填写</block>
		</cu-custom>
		 <!--表单区域-->
		<view>
			<form>
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
			</form>
		</view>
    </view>
</template>

<script>
	const plan_type = [{text:'全体可见',value:'1'},{text:'仅自己可见',value:'0'},{text:'部分可见',value:'2'}];
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
                model: {},
				plan_type,
				visible:'',
                backRouteName:'index',
                url: {
                  queryById: "/runrab/message/queryById",
                  add: "/runrab/message/add",
                  edit: "/runrab/message/edit",
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
                let myForm = {...this.model};
                this.loading = true;
                let url = myForm.id?this.url.edit:this.url.add;
				myForm.identity='1'//1代表教师 0学生 -1删除
				// myForm.visible='1' //0不可见 1可见 
				myForm.visible=this.visible
				myForm.userid=this.$store.getters.userid
				myForm.createBy=this.$store.getters.username
				console.log(myForm.username)
				this.$http.post(url,myForm).then(res=>{
				   console.log("res",res)
				   this.loading = false
				   this.$Router.push({name:'messagedetail'})
				   // this.$Router.push({name:this.backRouteName})
				   // console.log(this.$Router.push({name:this.backRouteName}))
				}).catch(()=>{
					this.loading = false
				});
				//提交完成重定向到留言板
				// uni.redirectTo({
				// 	url:'/pages/common/messagedetail'
				// })
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
