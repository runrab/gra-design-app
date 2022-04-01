<template>
	<view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="content">热门城市排行</block>
			</cu-custom>
			<view class="cu-list menu" v-for="(item,index) in list" :key="index">
				<view class="cu-item animation-slide-bottom" > 
					{{index}}
					<view class="action">
						<text class="text-grey">人数: {{item}}</text>
					</view>
				</view>	
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				list:'',
				useUrl:'/sys/user/showChartsCount',
			};
		},
		onLoad() {
			this.loadinfo()
		},
		methods: {
			loadinfo(){				
				this.$http.get(this.useUrl).then(res=> {
					if (res.data.success) {
						this.list= res.data.result.hotCity
					}
				}).catch(e=>{
					console.log("请求错误",e)
				})
			},
		}
	}
</script>
<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}
	.page.show {
		overflow: hidden;
	}
	.switch-sex::after {
		content: "\e716";
	}
	.switch-sex::before {
		content: "\e7a9";
	}
	.switch-music::after {
		content: "\e66a";
	}
	.switch-music::before {
		content: "\e6db";
	}
</style>
