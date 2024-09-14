<template>

	<view class="">

<!-- 		<picker @change="bindPickerChange" :value="index" :range="array">
			<view class="qiun-title-dot-light">点击切换： {{array[index]}}</view>

			<uni-nav-bar left-icon="back">
				<view>{{array[index]}}</view>
				<view slot="left">切换</view>
				<view slot="right">right</view>
			</uni-nav-bar>

		</picker> -->

		<!-- <view> -->
		<!-- <view>
			        <web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view>
			    </view> -->
		<!-- <view class="uni-padding-wrap"> -->
		<view class="page-section swiper guding">
			<view class="page-section-spacing ">

				<swiper class="swiper" indicator-dots="indicatorDots" autoplay="autoplay" interval="interval" duration="duration">

					<swiper-item v-for="(item,index) in pics" :key="index">
						<image class="swiper-pic" :src="'https://voc.m-excel.cn/'+ item.pic"></image>

					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- </view> -->
		<!-- </view> -->
		<!-- 文字滚动 -->









		<!-- 		
		
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="qiun-title-dot-light">点击切换： {{array[index]}}</view>
					</picker>
				</view>
			</view>
		</view> -->



		<view class="container999" @click="conClick" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
			<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
			<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
			<!-- 点击反馈组件 -->
			<clickCircle ref="clickCircle"></clickCircle>
			<view class='nav'>
				<!-- #ifdef H5 -->
				<view style="height: 44px;width: 100%;">边距盒子</view>
				<!-- #endif -->
				<!-- 搜索 -->
				<!-- 	<view class='searchInput999'>
					<view class='searchBox999'>
						<image src='/static/icon-search.png' class='search999'></image>
					</view>
					<input class='input999' placeholder="输入关键词"></input>
				</view> -->
				<!-- 导航栏 agents导航栏标题 -->

				<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>



			</view>
			<!-- 回到顶部悬浮按钮 -->
			<movable-area style="height: 100vh; width: 100vw;position: absolute;bottom: 0;">
				<movable-view class="addBtnBox" style="padding-top:120upx;padding-bottom:120upx;" @touchmove.stop="" :x="isX" :y="isY"
				 direction="all">
					<view class="addBtn" @click="toTop">TOP</view>
				</movable-view>
			</movable-area>
			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
				<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
					<scroll-view style="height: 900upx;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation
					 :scroll-into-view="toView">
						<!-- <view :id="'top'+listIndex" style="width: 100%;height: 120upx;">边距盒子</view> -->
						<uni-notice-bar showIcon="true" scrollable="true" single="true" v-if="text" :text="text"></uni-notice-bar>
						<view class='content'>
							<view v-if="listIndex == 0">
								<view style="width: 100%;height: 20upx; "></view>
							</view>
							<view v-if="listIndex == 1">
							</view>
							<view v-if="listIndex == 2">
							</view>
							<view v-if="listIndex == 3">
							</view>
							<view class='card' v-for="(item,index) in listItem"  v-if="listItem.length > 0 " :key="index">

								<view class="card" hover-class="" v-for="(value,key,index) in item.cp" :key="key">
									<!-- <view class="uni-media-list-text-top">{{value}}</view> -->
									<view v-if="key!=='attrs'" class=""><span class="title">{{key | yinzi }}</span>

										<view class="" v-for="(value,key,index) in value" :key="key">
											<!-- <span class="deviceName">{{value}}</span>	 -->
											<span v-if="key!=='Max'&&key!=='Min'&&key!=='Flag'" class="">{{value}}</span>
										</view>

									</view>

								</view>

							</view>
							<!-- 	<view class='noCard' v-if="!item">
								暂无数据
							</view> -->
						</view>
						<view class='noCard' v-if="listItem.length===0">
							暂无数据
						</view>
					<!-- 	<view style="width: 100%;height: 200upx;opacity:0;">底部占位盒子</view> -->
					</scroll-view>
				</swiper-item>
			</swiper>
			<!-- <tabBar4 :currentPage="currentPage"></tabBar4> -->
		</view>



		<!-- 		
		<view class="end-title">
			　　<view @tap="change(0)" :class="{btna:btnnum == 0}">实时数据</view>
			　<view @tap="change(1)" :class="{btna:btnnum == 1}">分钟数据</view>
			　　<view @tap="change(2)" :class="{btna:btnnum == 2}">小时数据</view>
			<view @tap="change(3)" :class="{btna:btnnum == 3}">日数据</view>
		</view>
		<view class="end-cont" :class="{dis:btnnum == 0}">
			　　
		</view>
		<view class="end-cont" :class="{dis:btnnum == 1}">
			　　
		</view>
		<view class="end-cont" :class="{dis:btnnum == 2}">
			　
		</view>
		<view class="end-cont" :class="{dis:btnnum == 3}">
			
		</view> -->




	</view>
</template>
<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	//import uniCard from '@/components/uni-card/uni-card.vue'
	import uniCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue'
	//import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniNoticeBar from '@/uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.vue'
	//import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniNavBar from '@/uni_modules/uni-nav-bar//components/uni-nav-bar/uni-nav-bar.vue'
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
				index: 0,
				currentPage: 'other',
				toView: '', //回到顶部id
				isX: 0, //放在store统一管理
				isY: 999, //放在store统一管理
				tabTitle: ['实时数据', '分钟数据', '小时数据', '日数据'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1], //第几个swiper的第几页
				list: [
					[1],
					[2],
					[3],
					[4]
				] //数据格式
			}
			console.log(this.list);
		},

		onShow: function() {
			console.log(uni.getStorageSync('dataList'));
					// this.mnAll = uni.getStorageSync('userInfo').mn;

			this.devs = uni.getStorageSync('userInfo').devs;
			this.len = this.devs.length;
			this.mnNames = [];

			for (var i = 0; i < this.len; i++) {
				this.mnNames[i] = this.devs[i]['name']
			};
			uni.request({
				url: 'https://voc.m-excel.cn/appapi.php?m=news&a=api&fenlei=2',
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.pics = res.data.result.data;
				},
				fail: () => {},
				complete: () => {}
			});
			// console.log(this.mnNames);

			this.st = uni.getStorageSync('userInfo').st;
			this.uInfo = uni.getStorageSync('userInfo');
			this.server = uni.getStorageSync('userInfo').server;
			this.array = this.mnNames;
			this.mnName = this.mnNames[this.index]
			this.mn = uni.getStorageSync('userInfo').devs[this.index].mn;
			// console.log(this.list);
			if (this.server == 2) {
				this.server = 'https://voc.blueinfo.com.cn/appapi.php?m=api&';
			} else {
				this.server = 'https://voc.16861.com:2020/api/v1/query?';
			}
			// console.log(uni.getStorageSync('token'));
			// console.log(uni.getStorageSync('userInfo').ent);
			// console.log(this.server);

			// console.log(this.mn);

			// console.log(this.array);
			// console.log(uni.getStorageSync('userInfo').mn[this.index]);
			if (!this.mn) {
				// console.log(uni.getStorageSync('userInfo.ent'));
				uni.reLaunch({
					url: "../login/login"
				});
			};
			// this.mn=uni.getStorageSync('userInfo').mn; 


			// console.log(e)
			uni.request({
				url: this.server + 'size=10&cn=2011&st=' + this.st + '&mn=' + this.mn,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res.data[0].cp.i33101.Rtd);
					this.rtd = res.data;
					this.list[0] = res.data;

					// if (res.data[0].cp.i33101.Rtd > 28) {
					// 	this.text = '机房温度已超过28度，请注意';
					// } else {
					// 	this.text = '暂无消息';
					// }
					// console.log(this.list);
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.server + 'size=10&cn=2051&st=' + this.st + '&mn=' + this.mn,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.mindata = res.data;
					this.list[1] = res.data;



				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.server + 'size=10&cn=2061&st=' + this.st + '&mn=' + this.mn,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.houdata = res.data;
					this.list[2] = res.data;

					// console.log(this.news);
				},
				fail: () => {},
				complete: () => {}
			});
			uni.request({
				url: this.server + 'size=10&cn=2031&st=' + this.st + '&mn=' + this.mn,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res);
					this.daydata = res.data;
					this.list[3] = res.data;

					// console.log(this.news);
				},
				fail: () => {},
				complete: () => {}
			});

			uni.setStorageSync('dataList', this.list);




			uni.setNavigationBarTitle({

				 title: this.mn
			});
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
				// console.log(this.btnnum)
			},
			// openinfo(e) {
			// 	//console.log(e);
			// 	var mn = e.currentTarget.dataset.mn;
			// 	var qn = e.currentTarget.dataset.qn;
			// 	uni.navigateTo({
			// 		url: '../datainfo/datainfo?mn=' + mn + '&qn=' + qn
			// 	});
			// }
			// uni.redirectTo({
			//     url: 'test?id=1'
			// });
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.mn = uni.getStorageSync('userInfo').devs[e.target.value].mn
				// console.log(this.mn)
				
			},
			upData: function(mn, i, cn) {
				console.log(mn, i, cn);
				uni.request({
					url: this.server + 'size=5&cn=2011&st=' + this.st + '&mn=' + this.mn,
					method: 'GET',
					data: {},
					success: res => {
						// console.log(res.data);
						this.rtd = res.data;
						this.list[i] = res.data;
						// if (res.data[0].cp.i33101.Rtd > 28) {
						// 	this.text = '机房温度已超过28度，请注意';
						// } else {
						// 	this.text = '暂无消息';
						// }
						console.log(this.list);
					},
					fail: () => {
						console.log("错误");
					},
					complete: () => {}
				});
			},

			toTop() {
				this.toView = ''
				setTimeout(() => {
					this.toView = 'top' + this.currentTab
				}, 10)
			},
			changeTab(index) {
				this.currentTab = index
				// console.log(index)
				
			},
			// 点击反馈事件
			conClick(e) {
				this.$refs.clickCircle.conClick(e);
			},
			// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest(pages) {
				// return new Promise((resolve, reject) => {
				// 	this.pages[this.currentTab]++
				// 	var that = this
				// 	setTimeout(() => {
				// 		uni.hideLoading()
				// 		uni.showToast({
				// 			icon: 'none',
				// 			title: `请求第${that.currentTab + 1 }个导航栏的第${that.pages[that.currentTab]}页数据成功`
				// 		})
				// 		let newData = ['新数据1', '新数据2', '新数据3']
				// 		resolve(newData)
				// 	}, 1000)
				// })
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.$refs.navTab.longClick(index);
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
				console.log(`加载${this.currentTab}`) //currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
				// uni.showLoading({
				// 	title: '加载中',
				// 	mask: true
				// })
				this.isRequest().then((res) => {
					let tempList = this.list
					tempList[this.currentTab] = tempList[this.currentTab].concat(res)
					console.log(tempList)
					this.list = tempList
					this.$forceUpdate() //二维数组，开启强制渲染
				})
			}, 300),
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},

			isRefresh() {
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '刷新成功'
					})
					
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
			}

		}
	}
</script>

<style>
	.datatime {
		display: flex;
		height: 50rpx;
		background: #ffffff;
		padding: 0rpx;
	}

	.end-title {
		display: flex;
		height: 50rpx;
		background: #d2eb8f;
		padding: 0rpx;
	}

	.end-title view {
		flex-grow: 1;
		text-align: center;
	}

	.end-cont {
		display: none;
		background: #C8C7CC;

	}

	.btna {
		color: #FFFFFF;
		background: #00A0FF;
		height: 50rpx;
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
<style lang="scss">
	.guding {
		// position: fixed;
		width: 100%;
		// height: 100rpx;
		// left:100px;
		// top:150px;
		z-index: 996;
	}

	.addBtnBox {
		position: fixed;
		z-index: 900;
		width: 140upx;
		align-items: flex-end;
		justify-content: center;
		height: 140upx;
		display: flex;

		.addBtn {
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			color: white;
			font-size: 10px;
			font-weight: bold;
			background: #444857;
			line-height: 100upx;
			text-align: center;
			box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		}
	}

	.container999 {
		width: 100vw;
		font-size: 28upx;
		min-height: 100vh;
		overflow: hidden;
		color: #6B8082;
		position: relative;
		background-color: #f6f6f6;
	}

	.content {
		width: 100%;
	}

	.card {
		width: 90%;
		height: 100%;
		background-color: white;
		margin: 0 auto 42upx auto;
		background: #FFFFFF;
		box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.10);
		border-radius: 10px;
		// position: relative;
		// display: flex;
		align-items: center;
		justify-content: center;

	}

	.noCard {
		width: 90%;
		height: 200upx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
	}


	.nav {
		// position: fixed;
		left: 0;
		// top: 0;
		color: white;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #50B7EA;
		z-index: 996;
	}

	.searchInput999 {
		width: 90%;
		margin: 0 auto;
		background: white;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56upx;
	}

	.search999 {
		width: 32upx;
		height: 32upx;
	}

	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input999 {
		color: #999;
		width: 80%;
	}
</style>
