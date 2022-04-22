<template>
    <view>
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="content">密码重置</block>
			</cu-custom>
		 <!--表单区域-->
		<view>
			<form>
<!--              <view class="cu-form-group">
                <view class="flex align-center">
                  <view class="title"><text space="ensp">用户名：</text></view>
                  <input  placeholder="请输入用户名" v-model="model.username"/>
                </view>
              </view> -->
              <view class="cu-form-group">
                <view class="flex align-center">
                  <view class="title"><text space="ensp">旧密码：</text></view>
                  <input  placeholder="请输入旧密码" v-model="model.oldpassword"/>
                </view>
              </view>
			  <view class="cu-form-group">
			    <view class="flex align-center">
			      <view class="title"><text space="ensp">新密码：</text></view>
			      <input  placeholder="请输入新密码" v-model="model.password"/>
			    </view>
			  </view>
			  <view class="cu-form-group">
			    <view class="flex align-center">
			      <view class="title"><text space="ensp">新密码：</text></view>
			      <input  placeholder="请再次输入" v-model="model.confirmpassword"/>
			    </view>
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
    import myDate from '@/components/my-componets/my-date.vue'
	import api from "@/api/api";
    export default {
        name: "restpassword",
        components:{myDate},
        data(){
            return {
				CustomBar: this.CustomBar,
				NavBarColor: this.NavBarColor,
				loading:false,
                model: {
					username:'',
					oldpassword:'',
					password:'',
					confirmpassword:''
				},
                backRouteName:'index',
                url: {
                  updateUrl: "/sys/user/updatePassword"  //put请求
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
                let model = {...this.model};
                this.loading = true;
                let url = '/sys/user/restPassword';
				// myForm.username=this.$store.getters.username
				this.$http.post(url,model).then(res=>{
				   this.loading = false
				   if(res.data.success){
					 // this.$Router.push({name:'login'})
					 // this.$tip.success('密码修改成功')
				   }
				}).catch(()=>{
					// this.$tip.error('密码修改失败!')
					this.loading = false
				});
				api.logout().then(res=>{
					uni.clearStorageSync()
				})
				uni.redirectTo({
					url:'/pages/user/userexit'
				})
            }
        }
    }
</script>
