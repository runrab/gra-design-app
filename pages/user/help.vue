<template>
	<view>
		<scroll-view :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="content">帮助中心</block>
			</cu-custom>
			<view class="padding flex flex-direction">
			  <ul>
				  <li> 1 帮助中心 </li>
				  <li> 2常见问题 </li>
				  <li> 3失败切换 </li>
				  <li> 4作者 </li>
				  <li> 5版权归属 </li>
				  <li> 6后台地址 </li>
			  </ul>
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
				modalName: null,
				item:{msg:'退出成功'},
				plan_type,
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
