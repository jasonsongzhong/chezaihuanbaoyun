<template>
	<view class="uni-list">
		<!-- <view>
			<view class="uni-padding-wrap"> -->
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<!-- 一组幻灯片代码开始，用到组件swiper -->
				<!-- indicator-dots autoplay interval……：组件相关属性，具体可以查看官网说明 -->
				<swiper class="swiper" indicator-dots="indicatorDots" autoplay="autoplay" interval="interval" duration="duration">
					<!-- 每组幻灯片中的子项目 1 -->
					<swiper-item v-for="(item,index) in pics" :key="index">
						<image class="swiper-pic" :src="'https://voc.m-excel.cn/'+ item.pic"></image>
						<!-- 此处放内容，可以是图片，也可是图片加文字 -->
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 		</view> 
		</view> -->
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<uni-section title="我的设备" type="line"></uni-section>
			<!-- <view class="qiun-title-dot-light">我的设备</view> -->
		</view>
		<view class="" hover-class="" v-for="(item,index) in devs" :key="index" @click="openinfo"
		 :data-mn="item.mn" :data-name="item.name">
			<view class="example-body">
				<!-- <image class="uni-media-list-logo" :src="'https://voc.m-excel.cn/'+ item.pic"></image> -->
				<uni-card class="example-body">
					<!-- <view class="uni-media-list-text-top">{{item.st}}</view> -->
					<view class="example-box">{{item.name}}</view>
					<view class="example-box ">{{ item.mn}}</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>
<script>
</script>
<script>
	export default {
		data() {
			return {
				news: [],
				pics: [],
				attrs: false

			}
		},
		onShow: function() {
			this.devs = uni.getStorageSync('devs');
			// this.len = this.devs.length;
			// this.mnNames = [];

			// for (var i = 0; i < this.len; i++) {
			// 	this.mnNames[i] = this.devs[i]['name']
			// };
			// console.log(this.devs)
			uni.request({
				url: 'https://voc.16861.com/appapi.php?m=news&a=api',
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.news = res.data.result.data;
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: 'https://voc.16861.com/appapi.php?m=news&a=api&fenlei=2',
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.pics = res.data.result.data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			openinfo(nid) {

				var mn = nid.currentTarget.dataset.mn;
				var devName = nid.currentTarget.dataset.name;
				// console.log(newsid);
				// wx.redirectTo({
				// 	url: '../info/info?newsid=' + newsid
				// });
				// uni.switchTab({
				//        url: '../info/info?newsid=' + newsid
				// }); 
				wx.navigateTo({
					url: '../datasView/datasView?mn=' + mn + '&devName=' + devName
				});

				// uni.navigateTo({
				// 	url: '../info/info?newsid=' + newsid
				// });
			}
		}
	}
</script>

<style>
	.swiper-pic {
		width: 100%;
		white-space: nowrap;
		line-height: 100%;
		height: 100%;
		border-bottom: 1px solid #c8c7cc;
	}

	/* 将这组幻灯片中的子项目改成我们设计图中的灰色 */
	.swiper-item {
		background-color: #f8f8f8;

	}

	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list-text-top {
		line-height: 1.6em;
	}
</style>
