<template>
	<view class="about">
		<view class="content">
			<view class="logo" :hover-class="!login ? 'logo-hover' : ''">
				<image class="logo-img" :src="avatarUrl"></image>
				<view class="logo-title">
					<!-- <text class="uer-name">欢迎您 {{ent}}！</text> -->
					<text class="uer-name">欢迎您 {{realname}}！</text>
					<!-- <text class="navigat-arrow" style="color: #fff;">&#xe6cb;</text> -->
				</view>
			</view>
			<view class="center-list">
				<!-- <view class="center-list-item border-bottom" @click="me">
					<text class="list-icon">&#xe727;</text>
					<text class="list-text">个人资料</text>
					<text class="navigat-arrow">&#xe6cb;</text>
				</view> -->
				<view class="center-list-item" @click="pass">
					<text class="list-icon">&#xe618;</text>
					<text class="list-text">修改密码</text>
					<text class="navigat-arrow">&#xe6cb;</text>
				</view>
			</view>
			<view class="center-list">
				<!-- <view class="center-list-item border-bottom">
					<text class="list-icon">&#xe71b;</text>
					<text class="list-text">当前版本</text>
					<text v-if="appInfo.version" class="txt-version">V{{ appInfo.version }}</text>
				</view> -->
				<!-- <view class="center-list-item" @click="appUpgrade">
					<text class="list-icon">&#xe71e;</text>
					<text class="list-text">检查更新</text>
					<text class="navigat-arrow">&#xe6cb;</text>
					<uni-badge v-if="hasNewV" text="1" type="error" style="width: 38rpx;height: 38rpx;"></uni-badge>
				</view> -->
			</view>
			<view class="center-list">
				<view class="center-list-item" @click="about">
					<text class="list-icon">&#xe728;</text>
					<text class="list-text">关于</text>
					<text class="navigat-arrow">&#xe6cb;</text>
				</view>
			</view>
			<button v-if="!this.ent" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="this.ent" type="default" @tap="bindLogout" >退出登录</button>
			<!-- <button type="primary" @click="bindLogin">{{hasLogin ? '退出登录' : '登录'}}</button> -->
			<!-- <button type="default" class="login" hover-class="hover"  style="font-size: 16px;" @click="exit">退出登陆</button> -->
		</view>
		<!-- <view class="version">出品:麦越环境</view> -->
		<luna-upgrade ref="showtip" :url="url" :notes="notes"></luna-upgrade>
	</view>
</template>

<script>
	import LunaUpgrade from '@/components/luna-upgrade/luna-upgrade.vue';
	import uniBadge from "@/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName'])
		},
		components: {
			LunaUpgrade,
			uniBadge

		},
		data() {
			return {
				notes: '',
				url: '',
				isCheck: false,
				login: false,
				visible: false,
				appInfo: {
					version: '',
					name: '',
					ent: ''
				},
				avatarUrl: '/static/img/user/toux.jpg',
				hasNewV: false,
				// type: 'top',
				// msgType: 'success',
				// message: '这是一条成功消息提示',
				// value: '默认输入的内容'
			};
		},
		onLoad(option) {

		},
		onShow() {
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
				this.appInfo.version = wgtinfo.version;
				this.appInfo.name = wgtinfo.name;
				//网络请求
				var req = {
					//升级检测数据
					// appid: plus.runtime.appid,
					// version: plus.runtime.version
				};
				uni.request({
					url: 'https://voc.16861.com/appapi.php?m=ver',
					data: req,
					success: res => {
						// console.log(res.data.data.VERSION);
						// console.log(wgtinfo.version < res.data.data.VERSION);
						if (res.data.code === 0) {
							if (wgtinfo.version < res.data.data.VERSION) {
								this.hasNewV = true;
							} else {
								this.hasNewV = false;
							}
						}
					}
				});
				//检查更新有新版本的角标测试
				this.hasNewV = true;
			});
			//#endif
			// setTimeout(function () {

			// uni.hideLoading();

			// }, 2000);
			this.ent = uni.getStorageSync('userInfo').ent;
			this.ent = uni.getStorageSync('devs');
			this.realname = uni.getStorageSync('realname');
			// console.log(uni.getStorageSync('token'));
			// console.log(uni.getStorageSync('userInfo').ent);

			if (!this.ent) {
				// console.log(uni.getStorageSync('userInfo.ent'));
				// uni.reLaunch({
				// 	url: "../login/login"
				// });
			}
		},

		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				uni.clearStorage();
				hasLogin: false;
				uni.reLaunch({
					url: '../my/my'
				})
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				// if (this.forcedLogin) {
				// uni.reLaunch({
				// 	url: '../login/login',
				// });
				// }
			},
			about() {
				uni.showModal({
					title: '关于',
					showCancel: false,
					content: '麦越环境感谢您的支持！\n\n简易使用说明：\n    同一企业如需多人查看，请安装APP后自助注册，设备ID和设备类型请咨询业务专员，2020年6月之前安装的设备请选择老平台，之后的选择新平台！',
					content: '麦越环境感谢您的支持！\n',
					duration: 2000
				})
			},
			pass() {
				uni.showToast({
					icon: 'none',
					title: '由于安全原因修改密码请联系服务专员！',
					duration: 2000
				});
			},
			me() {
				//   uni.showLoading({
				//    title: '加载中...'
				//   });
				//   uniCloud.callFunction({
				//    name: 'getUserInfo',

				//    data: {
				//     userId: uni.getStorageSync('userInfo').userId      
				//     // userId: "test29"
				//    }
				//   }).then((res) => {
				//    // console.log(res.result.data);
				//    // console.log(res)
				//    uni.hideLoading()
				//    showCancel: false,
				//    // uni.showToast({
				//    //  // icon:'none',
				//    //  title: res.result.data,

				//    //  duration: 20000
				//    // });
				//    this.uuu = res.result.data[0],
				//    // console.log(this.uuu)
				//    uni.showModal({
				//     title:'个人资料',
				//     content: '用户:  ' + this.uuu.userId + '\n企业:  ' + this.uuu.userId + '\nMN:  ' + this.uuu.mn + '\n平台:  ' + this.uuu.server +'\n\n同一企业如需多人使用，请按下面资料自助注册，企业、MN号、平台需一致，用户名不可重复\n' ,
				//     showCancel: false,
				//  confirmText:'知道了'
				//    })
				//   }).catch((err) => {
				//    uni.hideLoading()
				//    uni.showModal({
				//     content: '请检查网络，' + err.message,
				//     showCancel: false
				//    })
				//   })

				this.uuu = uni.getStorageSync('userInfo'),
					this.devs = uni.getStorageSync('userInfo').devs;
				this.len = this.devs.length;
				this.mns = [];

				for (var i = 0; i < this.len; i++) {
					this.mns[i] = this.devs[i]['mn']
				};
				// console.log(this.uuu)
				uni.showModal({
					title: '个人资料',
					content: '用户:  ' + this.uuu.userId + '\n企业:  ' + this.uuu.userId + '\nMN:  ' + this.mns +
						'\n平台:  ' + this.uuu.server +
						'\n\n同一企业如需多人使用，请按下面资料自助注册，企业、MN号、平台需一致，用户名不可重复\n',
					showCancel: false,
					confirmText: '知道了'
				})
			},
			// exit(){
			// 			uni.showModal({
			// 				title:'退出登陆',
			// 				content:'您确定要退出吗？',
			// 				success:function(res) {
			// 					if(res.confirm){

			// 						url:'../login/login.vue'
			// 					}
			// 				}
			// 			})
			// 		}, 
			handleCancel() {
				console.log('modal关闭')
			},
			appUpgrade() {
				//#ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
					this.appInfo.version = wgtinfo.version;
					this.appInfo.name = wgtinfo.name;
					//测试数据
					// this.$nextTick(() => {
					// 	this.$refs['showtip'].open();
					// 	this.notes = '升级测试';
					// 	this.url = 'https://m-excel.cn/a.apk';								
					// });


					if (this.isCheck) {
						return; //避免重复点击检查按钮
					}
					this.isCheck = true;

					//网络请求
					var req = {
						//升级检测数据
						// appid: plus.runtime.appid,
						// version: plus.runtime.version
					};
					// console.log(req);
					uni.request({
						url: 'https://voc.m-excel.cn/appapi.php?m=ver',
						data: req,
						success: res => {
							// console.log(res.data);
							if (res.data.code === 0) {
								if (wgtinfo.version < res.data.data.VERSION) {
									this.$nextTick(() => {
										this.$refs['showtip'].open();
										this.notes = res.data.data.NOTES;
										this.url = res.data.data.URL;
										// console.log(this.url)
									});
								} else {
									uni.showToast({
										title: '已是最新版本',
										duration: 2000
									});
								}
								this.isCheck = false;
							}
						},
						fail: (data, code) => {
							this.isCheck = false;
							console.log('fail' + JSON.stringify(data));
							uni.showModal({
								title: '请求失败',
								content: '请检查网络连接并重试！',
								showCancel: false,
								confirmText: '确定',
								success: res => {}
							});
						}
					});
				});
				//#endif
			},
		}
	};
</script>

<style lang="scss">
	page,
	view {
		display: flex;
	}

	page {
		display: flex;
		min-height: 100%;
		background-color: #000000;
		color: #ffffff;

	}

	template {
		display: flex;
		flex: 1;
	}

	.about {
		flex-direction: column;
		flex: 1;
	}

	.center-list {
		background-color: #312c34;

	}

	.list-text {
		color: #ffffff;
	}

	.border-bottom {
		border-color: #696969;
	}

	.content {
		flex: 1;
		flex-direction: column;
		background-color: #000000;
		/* justify-content: center; */
	}

	.list-text {
		font-size: 15px;
	}

	.uer-name {
		font-size: 17px;
	}

	.txt-version {
		width: 100upx;
		line-height: 90upx;
		font-size: 26upx;
		color: #666;
		text-align: right;
	}

	.version {
		/* margin-bottom: 50rpx; */
		background-color: #312c34;
		height: 80upx;
		line-height: 80upx;
		justify-content: center;
		color: #ccc;
	}

	button {
		width: 94%;
		margin-top: 40upx;
	}

	.modal-container {
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.modal-container_title {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 45rpx;
	}

	.modal-container_content {
		text-indent: 2em;
	}

	.modal-container>* {
		margin: 20rpx 0;
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
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
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
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 5px 15px;
	}


	.popup-content {
		background-color: #fff;
		padding: 15px;
	}

	/* #ifndef APP-NVUE */
	.button {
		margin: 0;
		padding: 0;
		line-height: 1;
	}

	/* #endif */

	.button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 40px;
		margin: 0 15px;
	}

	.button-text {
		color: #fff;
		font-size: 14px;
	}

	.message {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 15px 0;
	}

	.dialog {
		padding: 15px 0;
	}

	.dialog-box {
		margin-left: 15px;
		margin-bottom: 15px;
	}

	.dialog-text {
		font-size: 14px;
		color: #666;
	}

	.share {
		padding: 15px 0;
	}

	.popup__success {
		color: #fff;
		background-color: #4cd964;
	}

	.popup__warn {
		color: #fff;
		background-color: #f0ad4e;
	}

	.popup__error {
		color: #fff;
		background-color: #dd524d;
	}

	.popup__info {
		color: #fff;
		background-color: #909399;
	}
</style>
