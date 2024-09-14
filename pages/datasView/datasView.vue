<template>
	<view class="">
		<view class="page-section swiper guding">
			<view class="page-section-spacing ">
				<swiper class="swiper" indicator-dots="indicatorDots" autoplay="autoplay" interval="interval" duration="duration">
					<swiper-item v-for="(item,index) in pics" :key="index">
						<image class="swiper-pic" :src="'https://voc.m-excel.cn/'+ item.pic"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<u-subsection :list="list" :current="0" @change="change" active-color="#3681ff" bg-color="#eeeeef" button-color="#ffffff"></u-subsection>
		<view class="end-cont" :class="{dis:btnnum == 0}">
			<view class='uni-list' v-for="(item,index) in rtd" :key="index">
				<view class="aaa">
					<view>数据时间： {{item.cp.attrs.DataTime}} </view>
					<view>MN号：{{item.mn}}</view>
				</view>
				<view class="" hover-class="" v-for="(value,key,index) in item.cp" :key="key">
					<view v-if="key!=='attrs'" class="uni-media-list">
						<span class="uni-media-list-body">{{key | yinzi }}</span>
						<view class="" v-for="(value,key,index) in value" :key="key">
							<span v-if="key=='Rtd'" class="uni-media-list-text-bottom uni-ellipsis">[实时值={{value}}]</span>
							<span></span>
							<span v-if="key=='Flag'" class="uni-media-list-text-bottom uni-ellipsis">[{{value}}]</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="end-cont" :class="{dis:btnnum == 1}">
			　<view class='uni-list' v-for="(item,index) in mindata" :key="index">
				<view class="aaa">
					<view>数据时间： {{item.cp.attrs.DataTime}} </view>
					<view>MN号：{{item.mn}}</view>
				</view>
				<view class="" hover-class="" v-for="(value,key,index) in item.cp" :key="key">
					<view v-if="key!=='attrs'" class="uni-media-list">
						<span class="uni-media-list-body">{{key | yinzi }}</span>
						<view class="" v-for="(value,key,index) in value" :key="key">
							<span v-if="key=='Avg'" class="uni-media-list-text-bottom uni-ellipsis">平均值={{value}}</span>
						</view>
					</view>
				</view>
			</view>　
		</view>
		<view class="end-cont" :class="{dis:btnnum == 2}">
			　<view class='uni-list' v-for="(item,index) in houdata" :key="index">
				<view class="aaa">
					<view>数据时间： {{item.cp.attrs.DataTime}} </view>
					<view>MN号：{{item.mn}}</view>
				</view>
				<view class="" hover-class="" v-for="(value,key,index) in item.cp" :key="key">
					<view v-if="key!=='attrs'" class="uni-media-list">
						<span class="uni-media-list-body">{{key | yinzi }}</span>
						<view class="" v-for="(value,key,index) in value" :key="key">
							<span v-if="key=='Avg'" class="uni-media-list-text-bottom uni-ellipsis">平均值={{value}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="end-cont" :class="{dis:btnnum == 3}">
			<view class='uni-list' v-for="(item,index) in daydata" :key="index">
				<view class="aaa">
					<view>数据时间： {{item.cp.attrs.DataTime}} </view>
					<view>MN号：{{item.mn}}</view>
				</view>
				<view class="" hover-class="" v-for="(value,key,index) in item.cp" :key="key">
					<view v-if="key!=='attrs'" class="uni-media-list">
						<span class="uni-media-list-body">{{key | yinzi }}</span>
						<view class="" v-for="(value,key,index) in value" :key="key">
							<span v-if="key=='Avg'" class="uni-media-list-text-bottom uni-ellipsis">平均值={{value}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class='noCard' v-if="this.noData">
			暂无数据
		</view>
	</view>
</template>
<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
//	import uniCard from '@uni_modules/uni-card/components/uni-card/uni-card.vue'
	import uniCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue'
	import uniNoticeBar from '@/uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.vue'
	import uniNavBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	const util = require('../../util/util.js');
	import refresh from '../../components/refresh.vue';
	import navTab from '../../components/navTab.vue';
	import clickCircle from '../../components/clickCircle.vue';
	import tabBar4 from '../../components/tabBar4.vue';
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName'])
		},
		components: {
			uniNoticeBar,
			refresh,
			navTab,
			clickCircle,
			tabBar4,
			uniNavBar
		},
		data() {
			return {
				rtd: [],
				mindata: [],
				houdata: [],
				daydata: [],
				pics: [],
				text: '',
				btnnum: 0,
				list: [{
						name: '实时数据'
					},
					{
						name: '分钟数据'
					},
					{
						name: '小时数据'
					},
					{
						name: '日数据'
					}
				],
				current: 0
			}
		},
		onLoad(e) {
			this.mn = e.mn;
			this.devName = e.devName;
			this.noData = 0;
			uni.request({
				url: 'https://voc.16861.com/appapi.php?m=news&a=api&fenlei=2',
				method: 'GET',
				data: {},
				success: res => {
					this.pics = res.data.result.data;
				},
				fail: () => {},
				complete: () => {}
			});
			this.st = uni.getStorageSync('userInfo').st;
			this.server = uni.getStorageSync('userInfo').server;
			if (this.server == 2) {
				this.server = 'https://voc.16861.com/appapi.php?m=api&';
			} else {
				this.server = 'https://voc.16861.com/appapi.php?m=api&';
			}
			// if (!this.st) {
			// 	uni.reLaunch({
			// 		url: "../login/login"
			// 	});
			// };
			uni.request({
				url: this.server + 'size=1&cn=2011&st=' + this.st + '&mn=' + this.mn,
				method: 'GET',
				data: {},
				success: res => {
					this.rtd = res.data;
					// if (res.data[0].cp.i33101.Rtd > 28) {
					// 	this.text = '机房温度已超过28度，请注意';
					// } else {
					// 	this.text = '暂无消息';
					// }
					if (!res.data) {
						this.noData = 1;
					}
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.server + 'size=1&cn=2051&st=' + this.st + '&mn=' + this.mn,
				method: 'GET',
				data: {},
				success: res => {
					this.mindata = res.data;
					if (!res.data) {
						this.noData = 1;
					}
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.server + 'size=1&cn=2061&st=' + this.st + '&mn=' + this.mn,
				method: 'GET',
				data: {},
				success: res => {
					this.houdata = res.data;
					if (!res.data) {
						this.noData = 1;
					}
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.server + 'size=1&cn=2031&st=' + this.st + '&mn=' + this.mn,
				method: 'GET',
				data: {},
				success: res => {
					this.daydata = res.data;
					if (!res.data) {
						this.noData = 1;
					}
				},
				fail: () => {},
				complete: () => {}
			});
			uni.setNavigationBarTitle({
				title: this.devName
			});
		},
		onShow: function() {
		},
		filters: {
			yinzi(msg) {
				let newMsg = msg;
				if (msg.indexOf('NH3_N_') !== -1) {
					newMsg = JSON.stringify(msg).replace('NH3_N_', '氨氮');
				} else if (msg.indexOf('DO_') !== -1) {
					newMsg = JSON.stringify(msg).replace('DO_', '溶解氧');
				} else if (msg.indexOf('PH_') !== -1) {
					newMsg = JSON.stringify(msg).replace('PH_', '酸碱度');
				} else if (msg.indexOf('i33101') !== -1) {
					newMsg = JSON.stringify(msg).replace('i33101', '温度');
				} else if (msg.indexOf('a24088') !== -1) {
					newMsg = JSON.stringify(msg).replace('a24088', '非甲烷总烃');
				} else if (msg.indexOf('a24087') !== -1) {
					newMsg = JSON.stringify(msg).replace('a24087', '总烃');
				} else if (msg.indexOf('a01012') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01012', '烟气温度');
				} else if (msg.indexOf('a01013') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01013', '烟气压力');
				} else if (msg.indexOf('a01014') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01014', '烟气湿度');
				} else if (msg.indexOf('a01011') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01011', '烟气流速');
				} else if (msg.indexOf('a05002') !== -1) {
					newMsg = JSON.stringify(msg).replace('a05002', '甲烷');
				} else if (msg.indexOf('a00000') !== -1) {
					newMsg = JSON.stringify(msg).replace('a00000', '流量');
				} else if (msg.indexOf('a19001') !== -1) {
					newMsg = JSON.stringify(msg).replace('a19001', '氧量');
				} else if (msg.indexOf('a25002') !== -1) {
					newMsg = JSON.stringify(msg).replace('a25002', '苯');
				} else if (msg.indexOf('a25003') !== -1) {
					newMsg = JSON.stringify(msg).replace('a25003', '甲苯');
				} else if (msg.indexOf('a25005') !== -1) {
					newMsg = JSON.stringify(msg).replace('a25005', '二甲苯');
				} else if (msg.indexOf('a21002') !== -1) {
					newMsg = JSON.stringify(msg).replace('a21002', '氮氧化物');
				} else if (msg.indexOf('w00000') !== -1) {
					newMsg = JSON.stringify(msg).replace('w00000', '污水');
				} else if (msg.indexOf('w01018') !== -1) {
					newMsg = JSON.stringify(msg).replace('w01018', '化学需氧量');
				} else if (msg.indexOf('w01001') !== -1) {
					newMsg = JSON.stringify(msg).replace('w01001', 'pH值');
				} else if (msg.indexOf('w21001') !== -1) {
					newMsg = JSON.stringify(msg).replace('w21001', '总氮');
				} else if (msg.indexOf('w21011') !== -1) {
					newMsg = JSON.stringify(msg).replace('w21011', '总磷');
				} else if (msg.indexOf('w21003') !== -1) {
					newMsg = JSON.stringify(msg).replace('w21003', '氨氮');
				} else if (msg.indexOf('a99054') !== -1) {
					newMsg = JSON.stringify(msg).replace('a99054', 'TVOC');
				} else if (msg.indexOf('a01001') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01001', '温度');
				} else if (msg.indexOf('a01002') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01002', '湿度');
				} else if (msg.indexOf('a01006') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01006', '气压');
				} else if (msg.indexOf('a01007') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01007', '风速');
				} else if (msg.indexOf('a01008') !== -1) {
					newMsg = JSON.stringify(msg).replace('a01008', '风向');
				}
				newMsg = newMsg.replace(/\"/g, '');
				return newMsg
			}
		},
		methods: {
			change(e) {
				this.btnnum = e
			}
		}
	}
</script>

<style>
	.aaa{
		width: 100%;
		padding: 20rpx;
		margin: 0 auto;
		color: #303133;
		border-radius: 10rpx;
		border: #006464;
		border-style: double;
		border-color: #dcdfe6;
		/* box-shadow: 10px 10px 5px #888888; */
		/* text-shadow: 5px 5px 5px #aa0000 */
		background-color: #19be6b;
	}
	.datatime {
		display: flex;
		height: 50rpx;
		background: #ffffff;
		padding: 0rpx;
	}

	.end-title {
		display: flex;
		height: 60rpx;
		background: #d2eb8f;
		padding: 0rpx;

	}

	.end-title view {
		flex-grow: 1;
		text-align: center;
		font-size: 18px;
	}

	.end-cont {
		display: none;
		background: #C8C7CC;

	}

	.btna {
		color: #FFFFFF;
		background: #5eae86;
		height: 60rpx;
		border-radius: 10px;

	}

	.dis {
		display: block;
	}

	.data-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 18rpx;
		background-color: #ffffff;
	}

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

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 28rpx;
		line-height: inherit;
	}

	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}

	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}


	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.example-body {
		padding: 20rpx 0;
		padding-bottom: 0;

	}

	.example-box {
		/* margin-bottom: 30rpx;
	*/
	}

	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 350rpx;
		overflow: hidden;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.content-box-text {
		font-size: 30rpx;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 10rpx 0;
		font-size: 30rpx;
		color: #666;
	}
</style>
