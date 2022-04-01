<template>
    <view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="content">学生新增</block>
		</cu-custom>
		 <!--表单区域-->
		<view>
			<form>
              <view class="cu-form-group">
                <view class="flex align-center">
                  <view class="title"><text space="ensp">用户名：</text></view>
                  <input  placeholder="请输入用户名" v-model="model.username"/>
                </view>
              </view>
			  <view class="cu-form-group">
			    <view class="flex align-center">
			      <view class="title"><text space="ensp">真实名：</text></view>
			      <input  placeholder="请输入真实名" v-model="model.realname"/>
			    </view>
			  </view>
			  <view class="cu-form-group">
			    <view class="flex align-center">
			      <view class="title"><text space="ensp">学号：</text></view>
			      <input  placeholder="请输入学号" v-model="model.workNo"/>
			    </view>
			  </view>
			  <view class="cu-form-group">
			    <view class="flex align-center">
			      <view class="title"><text space="ensp">手机号：</text></view>
			      <input  placeholder="请输入手机号" v-model="model.phone" type="tel"/>
			    </view>
			  </view>
			  <view class="cu-form-group">
			    <view class="flex align-center">
			      <view class="title"><text space="ensp">目的城市：</text></view>
			      <input  placeholder="请输入目的城市" v-model="model.cityName"/>
			    </view>
			  </view>
			  <view class="cu-form-group">
			    <view class="flex align-center">
			      <view class="title"><text space="ensp">初始化密码：</text></view>
			      <input  placeholder="学号后六位/123456" v-model="model.password" type="password"/>
			    </view>
			  </view>
<!-- 			  <view class="cu-form-group">
			    <view class="flex align-center">
			      <view class="title"><text space="ensp">班级：</text></view>
			      <input  placeholder="xx大学-xx学院-x班" v-model="model."/>
			    </view>
			  </view> -->
			  <view class="cu-form-group">
				  <view class="flex align-center">
				  	<app-select label="性别：" v-model="model.sex" placeholder="请选择性别" :dict="plan_type" space ></app-select>
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
	const plan_type = [{text:'男',value:'1'},{text:'女',value:'0'}];
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
                  add: "/sys/user/add",
                },
            }
        },
        created(){
             this.initFormData();
        },
        methods:{
           initFormData(){
			   
			   // this.model.departids=departids
            },
            onSubmit() {
                let myForm = {...this.model};
                this.loading = true;
                let url = this.url.add;
				myForm.identity='0'//1代表教师 0学生 -1删除
				// myForm.visible='1' //0不可见 1可见 
				myForm.visible='0'
				
				//非用户表数据
				myForm.selectedroles="1260924539346472962"
				myForm.selecteddeparts="c6d7cb4deeac411cb3384b1b31278596"
				
				
				// myForm.createBy=this.$store.getters.username
				this.$http.post(url,myForm).then(res=>{
				   this.loading = false
				   this.$Router.push({name:'stuinfo'})
				}).catch(()=>{
					this.loading = false
				});
            }
        }
    }
</script>
