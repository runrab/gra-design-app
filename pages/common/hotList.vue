<template>
	<view>
		<view class="charts-box" style="height: 400px;">
			<qiun-data-charts type="map" :opts="{extra:{map:{mercator:true}}}" :chartData="chartsDataMap1"/>
		</view>
		<scroll-view scroll-y class="page">
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
				<block slot="content">热门城市排行</block>
			</cu-custom>
			<view class="charts-box">
			  <qiun-data-charts type="bar" :opts="{color:['#FAC858','#00e7ae'],xAxis:{max:maxNum},extra:{bar:{linearType:'custom',barBorderCircle:true}}}" :chartData="chartsDataColumn1"/>
			</view>
			<view class="action" v-for="(item,index) in list" :key="index">
				<text class="text-grey" space="emsp" style="color: #ee2746;">编号: {{index++}}: 城市: {{item}} </text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import demodata from '@/mockdata/demodata.json';
	import mapdata from '@/mockdata/mapdata.json'
	import api from '@/api/api.js'
	export default {
		data() {
			return {
				chartsDataColumn1:{},
			    chartsDataMap1:{},
				list:'',
				maxNum:10,
				useUrl:'/sys/user/showChartsCount',
			};
		},
		onLoad() {
			this.loadinfo()
		},
		// onReady() {
		//   //模拟从服务器获取数据
		//   this.getServerData()
		// },
		methods: {
			loadinfo(){		
				this.$http.get(this.useUrl).then(res=> {
					if (res.data.success) {
						this.chartsDataColumn1=JSON.parse(JSON.stringify(res.data.result.Column))
						this.list=res.data.result.Column.categories
						this.chartsDataColumn1.categories=[0,1,2,3,4,5,6,7,8,9]
						this.maxNum=res.data.result.Column.series[0].data[0]
					this.chartsDataMap1={series:mapdata.features}
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
	
	
	.content {
	  display: flex;
	  flex-direction: column;
	  flex: 1;
	}
	
	.charts-box {
	  width: 100%;
	  height: 300px;
	}
</style>
