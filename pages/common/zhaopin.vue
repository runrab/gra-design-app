<template>
    <view>
        <!--标题和返回-->
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="content">信息填写</block>
		</cu-custom>
		 <!--表单区域-->
		<view>
			<form>
			  <view class="cu-form-group">
			  	 <textarea placeholder="请输入发布内容" v-model="model.context" > </textarea>
			  </view>	
			</form>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green shadow-blur round lg" @click="onSubmit">
					<text v-if="loading" class="cuIcon-loading2 cuIconfont-spin"></text>提交
				</button>
			</view>
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
                  queryById: "/runrab/zhaoPin/queryById",
                  add: "/runrab/zhaoPin/add",
                  edit: "/runrab/zhaoPin/edit",
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
				myForm.userid=this.$store.getters.userid
				myForm.avatar=this.$store.getters.avatar
				myForm.createBy=this.$store.getters.username
                this.loading = true;
                let url = myForm.id?this.url.edit:this.url.add;
				this.$http.post(url,myForm).then(res=>{
				   console.log("res",res)
				   this.loading = false
				   this.$Router.push({name:'zhaopindetail'})
				   // this.$Router.push({name:this.backRouteName})
				}).catch(()=>{
					this.loading = false
				});
            }
        }
    }
</script>
