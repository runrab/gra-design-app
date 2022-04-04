<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="content">信息统计</block>
		</cu-custom>
  <view class="content">
    <qiun-title-bar title="热门城市排行"/>
    <view class="charts-box">
      <qiun-data-charts type="bar" :opts="{color:['#FAC858','#00e7ae'],xAxis:{max:40},extra:{bar:{linearType:'custom',barBorderCircle:true}}}" :chartData="chartsDataColumn1"/>
    </view>
    <qiun-title-bar title="填写率"/>
    <view class="charts-box">
      <qiun-data-charts type="ring" :opts="{legend:{position: 'bottom'},extra:{ring:{ringWidth: 60,linearType:'custom',centerColor:'#FF0'}}}" :chartData="chartsDataRing1"/>
    </view>
    <qiun-title-bar title="城市去向百分比"/>
    <view class="charts-box">
      <qiun-data-charts type="rose" :opts="{legend:{position: 'bottom'}}" :chartData="chartsDataRose1"/>
    </view>
<!--    <qiun-title-bar title="半径玫瑰图"/>
    <view class="charts-box">
      <qiun-data-charts type="rose" :opts="{legend:{position: 'bottom'},extra:{rose:{type:'radius'}}}" :chartData="chartsDataRose2"/>
    </view> -->
    <qiun-title-bar title="填写进度"/>
    <!-- 这里的title.name和subtitle.name如果需要联动chartData，请定义一个变量同步传入:opts和:chartData中 -->
    <view class="charts-box">
      <qiun-data-charts type="arcbar" :opts="{title:{name:'80%',color:'#2fc25b',fontSize:35},subtitle:{name:'正确率',color:'#666666',fontSize:25}}" :chartData="chartsDataArcbar1"/>
    </view>
    <qiun-title-bar title="倒三角形漏斗图"/>
    <view class="charts-box">
      <qiun-data-charts type="funnel" :opts="{extra:{funnel:{type:'triangle'}}}" :chartData="chartsDataFunnel1"/>
    </view>
    <qiun-title-bar title="全国地图"/>
    <view class="charts-box" style="height: 400px;">
      <qiun-data-charts type="map" :opts="{extra:{map:{mercator:true}}}" :chartData="chartsDataMap1"/>
    </view>
  </view>
  </view>
</template>

<script>
//下面是演示数据，您的项目不需要引用，数据需要您从服务器自行获取
import demodata from '@/mockdata/demodata.json';
import mapdata from '@/mockdata/mapdata.json'

export default {
  data() {
    return {
      chartsDataColumn1:{},
      chartsDataColumn2:{},
      chartsDataColumn3:{},
      chartsDataColumn4:{},
      chartsDataColumn5:{},
      chartsDataColumn6:{},
      chartsDataLine1:{},
      chartsDataLine2:{},
      chartsDataLine3:{},
      chartsDataLine4:{},
      chartsDataLine5:{},
      chartsDataTLine:{},
      chartsDataScatter:{},
      chartsDataBubble:{},
      chartsDataArea1:{},
      chartsDataArea2:{},
      chartsDataMix1:{},
      chartsDataPie1:{},
      chartsDataRing1:{},
      chartsDataRose1:{},
      chartsDataRose2:{},
      chartsDataArcbar1:{},
      chartsDataArcbar2:{},
      chartsDataGauge1:{},
      chartsDataGauge2:{},
      chartsDataRadar1:{},
      chartsDataRadar2:{},
      chartsDataWord1:{},
      chartsDataFunnel1:{},
      chartsDataMap1:{},
      chartsDataCandle1:{},
    };
  },
  onReady() {
    //模拟从服务器获取数据
    this.getServerData()
  },
  methods: {
    getServerData() {
      setTimeout(() => {
      	//因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
      	//开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
        this.chartsDataColumn1=JSON.parse(JSON.stringify(demodata.Column))
      	this.chartsDataColumn2=JSON.parse(JSON.stringify(demodata.Column))
      	this.chartsDataColumn3=JSON.parse(JSON.stringify(demodata.Column))
      	this.chartsDataColumn4=JSON.parse(JSON.stringify(demodata.Column))
        this.chartsDataColumn5=JSON.parse(JSON.stringify(demodata.Column))
        let tmpColumn6=JSON.parse(JSON.stringify(demodata.Column))
        tmpColumn6.series[1].data[2]={value:21,color:'#EE6666'}
        //注意，因为组件内监听了chartData，构造chartData的时候，一定要先定义一个临时变量，构造完成后统一赋值给chartData绑定的变量，否则会导致多次渲染图表
      	this.chartsDataColumn6=tmpColumn6
      	this.chartsDataLine1=JSON.parse(JSON.stringify(demodata.Line))
      	this.chartsDataLine2=JSON.parse(JSON.stringify(demodata.Line))
      	this.chartsDataLine3=JSON.parse(JSON.stringify(demodata.Line))
      	this.chartsDataLine4=JSON.parse(JSON.stringify(demodata.Line))
        let tmpLine5=JSON.parse(JSON.stringify(demodata.Line))
        for (var i = 0; i < tmpLine5.series.length; i++) {
          tmpLine5.series[i].data[2]=null
        }
        tmpLine5.series[1].connectNulls=true
        this.chartsDataLine5=tmpLine5
        this.chartsDataTLine=JSON.parse(JSON.stringify(demodata.TLine))
        this.chartsDataScatter=JSON.parse(JSON.stringify(demodata.Scatter))
        this.chartsDataBubble=JSON.parse(JSON.stringify(demodata.Bubble))
      	this.chartsDataArea1=JSON.parse(JSON.stringify(demodata.Line))
      	this.chartsDataArea2=JSON.parse(JSON.stringify(demodata.Line))
      	this.chartsDataMix1=JSON.parse(JSON.stringify(demodata.Mix))
      	this.chartsDataPie1=JSON.parse(JSON.stringify(demodata.PieA))
      	this.chartsDataRing1=JSON.parse(JSON.stringify(demodata.PieA))
      	this.chartsDataRose1=JSON.parse(JSON.stringify(demodata.PieA))
      	this.chartsDataRose2=JSON.parse(JSON.stringify(demodata.PieA))
      	this.chartsDataArcbar1=JSON.parse(JSON.stringify(demodata.Arcbar1))
      	this.chartsDataArcbar2=JSON.parse(JSON.stringify(demodata.Arcbar2))
      	this.chartsDataGauge1=JSON.parse(JSON.stringify(demodata.Gauge))
      	this.chartsDataGauge2=JSON.parse(JSON.stringify(demodata.Gauge))
      	this.chartsDataRadar1=JSON.parse(JSON.stringify(demodata.Radar))
      	this.chartsDataRadar2=JSON.parse(JSON.stringify(demodata.Radar))
      	this.chartsDataWord1=JSON.parse(JSON.stringify(demodata.Word))
      	this.chartsDataFunnel1=JSON.parse(JSON.stringify(demodata.PieA))
      	this.chartsDataMap1={series:mapdata.features}
      	this.chartsDataCandle1=JSON.parse(JSON.stringify(demodata.Candle))
      }, 1500);
    }
  }
};
</script>

<style>
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
