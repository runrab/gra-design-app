<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="content">帮助中心</block>
			</cu-custom>
			<uni-card :is-shadow="false" is-full>
				<text class="uni-h6">帮助中心 包含使用指导、忘记密码、注册用户、后台，说明、问题反馈等、常见问题。</text>
			</uni-card>
			<uni-section title="1 版权归属" type="line">
				<ul>
					<li> 1 作者 </li>
					<text> 常幸伟</text> <br>
					<text> 孙王震</text> <br>
					<text> 李贤帅</text> <br>
					<li> 2 学校 </li>
					<text> 中原工学院-软件学院</text> <br>
				</ul>
			</uni-section>	
			<uni-section title="2 常见问题" type="circle">
				<ul>
					<li> 1 后台地址: <a href="https://graweb.runrab.com">点我跳转</a> </li><br>
				</ul>
				
			</uni-section>	
			<uni-section title="3 失败切换" type="circle">
			</uni-section>	
			<uni-section title="4 修改密码" type="circle">
			</uni-section>	
			
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
				modalName: null,
				item:{msg:'退出成功'},
				plan_type:'',
				type:"1",
				selected:[],
				beginTime:'',
				endTime:''
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
