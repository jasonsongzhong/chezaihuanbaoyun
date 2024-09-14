<template>
	<view class="container">
		<view class="title">
			<text>请输入信息注册</text>
		</view>
		<!-- <view class="desc">
			<view>本示例为简易登录示例，请按照自己的需求修改</view>
			<view>请按照README.md修改本示例来运行</view>
		</view> -->
		<view class="login-form">
			<input type="text" value="" placeholder="用户ID" v-model="userId" />
			<input type="text" value="" placeholder="密码" password="true" v-model="password" />
			<input type="text" value="" placeholder="企业" v-model="ent" />
			<input type="text" value="" placeholder="设备ID" v-model="mn" />
			<input type="text" value="" placeholder="设备类型(例:31)" v-model="st" />
			<input type="text" value="" placeholder="平台(新平台:1;老平台:2)" v-model="server" />
			<button type="primary" @click="signUp">注册</button>
			<view class="action-row">
				<navigator url="../login/login">直接登陆</navigator>
				<!-- 	<text>|</text>
				<navigator url="../pwd/pwd">忘记密码</navigator> -->
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<!-- <button type="primary" @click="loginMp">微信登录</button>
			<button type="primary" @click="validateToken">token验证</button> -->
			<!-- #endif -->
			<!-- <button type="primary" @click="remove">退出登陆</button> -->
		</view>

	</view>
</template>

<script>
	const myCloud = uniCloud.init({
		provider: 'aliyun',
		spaceId: '380c7682-e928-4ccd-b19b-99323fd9fdc6',
		clientSecret: 'dH77i2f5k0Jxp8wCY+Hcwg=='
	});
	// 由于作者有多个服务空间，已在main.js内执行初始化操作，如果你只有一个服务空间可以直接使用uniCloud.callFunction
	export default {
		data() {
			return {
				userId: '',
				password: '',
				ent: '',
				mn: '',
				st: '',
				server: '',
				form: {
					"nickName": "",
					"content": "",
					"uuid": '',
					"avatarUrl": "",
					"unionid": ""
				},
				list: [{
					"user_name": "加载中",
					"content": "加载中"
				}],
				wHeight: 0
			}
		},
		onLoad() {
			//this.wHeight = uni.getSystemInfoSync().windowHeight-30+'px';
			uni.login({
				provider: 'weixin',
				success: loginRes => {
					console.log(loginRes);

					//#ifdef APP-PLUS
					console.log(loginRes.authResult.unionid);
					this.form.unionid = loginRes.authResult.unionid;
					uni.getUserInfo({
						provider: 'weixin',
						success: infoRes => {
							console.log(infoRes);
							uni.setStorageSync('token', infoRes.userInfo.token)
							this.form.nickName = infoRes.userInfo.nickName;
							this.form.avatarUrl = infoRes.userInfo.avatarUrl;
						}
					});

					this.getData();
					//#endif


					//#ifdef MP-WEIXIN

					uni.showToast({
						title: '微信小程序登陆需要修改，云函数getUnionid的appid和secret',
						icon: 'none',
						duration: 5000
					});

					myCloud.callFunction({
						name: 'getUnionid',
						data: {
							js_code: loginRes.code
						}
					}).then((res) => {
						console.log(res.result.data.unionid);
						this.form.unionid = res.result.data.unionid;
						this.getData();
					})
					//#endif

				}
			});
		},
		methods: {
			signUp() {
				const {
					userId,
					password,
					ent,
					mn,
					st,
					server
				} = this
				if (userId.length < 6 || password.length < 6) {
					uni.showModal({
						content: '用户名密码长度均不能小于6',
						showCancel: false
					})
					return
				}
				uni.showLoading({
					title: '注册中...'
				})
				uniCloud.callFunction({
					name: 'signUp',
					data: {
						userId,
						password,
						ent,
						mn,
						st,
						server
					},
				}).then((res) => {
					console.log(res);
					uni.hideLoading()
					if (res.result.status !== 0) {
						return Promise.reject(new Error(res.result.msg))
					}
					uni.setStorageSync('token', res.result.token)
					uni.showModal({
						content: '注册成功，token已存储',
						showCancel: false
					})
				}).catch((err) => {
					console.log(err);
					uni.hideLoading()
					uni.showModal({
						content: '注册失败，' + err.message,
						showCancel: false
					})
				})
			},
			signIn() {
				const {
					userId,
					password
				} = this
				if (userId.length < 6 || password.length < 6) {
					uni.showModal({
						content: '用户名密码长度均不能小于6',
						showCancel: false
					})
					return
				}
				uni.showLoading({
					title: '登录中...'
				})
				uniCloud.callFunction({
					name: 'signIn',
					data: {
						userId,
						password
					},
				}).then((res) => {
					console.log(res);
					uni.hideLoading()
					if (res.result.status !== 0) {
						return Promise.reject(new Error(res.result.msg))
					}
					uni.setStorageSync('token', res.result.token)
					uni.showModal({
						content: '登录成功，token已存储',
						showCancel: false
					})
				}).catch((err) => {
					console.log(err);
					uni.hideLoading()
					uni.showModal({
						content: '登录失败，' + err.message,
						showCancel: false
					})
				})
			},
			// #ifdef MP-WEIXIN
			loginMp() {
				uni.showLoading({
					title: '登录中...'
				})
				this.getCode().then((code) => {
					console.log('code', code);
					return uniCloud.callFunction({
						name: 'login',
						data: {
							code
						}
					})
				}).then((res) => {
					uni.hideLoading()
					console.log(res);
					if (res.result.status !== 0) {
						return Promise.reject(new Error(res.result.msg))
					}
					uni.setStorageSync('token', res.result.token)
					uni.showModal({
						content: '登录成功，token已存储',
						showCancel: false
					})
				}).catch((err) => {
					console.log(err);
					uni.hideLoading()
					uni.showModal({
						content: '出现错误，请稍后再试.' + err.message,
						showCancel: false
					})
				})
			},
			getCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success(e) {
							if (e.code) {
								resolve(e.code)
							} else {
								reject(new Error('微信登录失败'))
							}
						},
						fail(e) {
							reject(new Error('微信登录失败'))
						}
					})
				})
			},
			// #endif
			validateToken() {
				uni.showLoading({
					title: '加载中...'
				});
				uniCloud.callFunction({
					name: 'validateToken',
					data: {
						token: uni.getStorageSync('token')
					}
				}).then((res) => {
					console.log(res);
					uni.hideLoading()
					uni.showModal({
						content: res.result.msg,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: '请求云函数发生错误，' + err.message,
						showCancel: false
					})
				})
			},
			miniApplogin(e) {
				console.log(e.detail.userInfo);
				this.form.nickName = e.detail.userInfo.nickName;
				this.form.avatarUrl = e.detail.userInfo.avatarUrl;
				this.add()
			},
			remove(id) {
				myCloud.callFunction({
					name: 'remove',
					data: {
						_id: id
					}
				}).then((res) => {
					//console.log(res);
					this.getData()
				})
			},
			getData() {
				myCloud.callFunction({
					name: 'get'
				}).then((res) => {
					//console.log(res);
					this.list = res.result.data;
				})
			},
			appPlusAdd() {
				//#ifdef APP-PLUS
				this.add();
				//#endif
			},
			add() {
				if (this.form.user_name == '') {
					uni.showToast({
						title: '昵称不能为空'
					});
					return false
				}
				if (this.form.content == '') {
					uni.showToast({
						title: '内容不能为空'
					});
					return false
				}
				if (this.form.unionid == '') {
					uni.showToast({
						title: '异常请稍后在试'
					});
					return false
				}

				myCloud.callFunction({
					name: 'add',
					data: this.form
				}).then((res) => {
					//console.log(res)
					this.form.content = ''
					this.getData()
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #000000;
		color: #ffffff;
	}
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.container {
		padding: 30px;
	}

	.title {
		text-align: center;
		font-size: 20px;
		padding: 20px 0px;
	}

	.desc {
		padding: 10px 0px;
		font-size: 14px;
		line-height: 22px;
		color: #999999;
	}

	.login-form input {
		height: 40px;
		border: solid 1px #DDDDDD;
		text-indent: 10px;
	}

	.login-form input,
	.login-form button {
		width: 100%;
		margin-bottom: 10px;
	}
</style>
<!-- <style lang="scss">
.border{
	border-style: solid;
	border-width: 1px;
	border-color: #eeeeee;
}
.input{
	padding: 6rpx 8rpx;
	height: 42px;
}
.submit{
	width: 400upx;
	margin-left: 175rpx;
	margin-top: 10px;
	margin-bottom: 20px;
}
.delete{
	background-color: #dddddd;
	color: #FFFFFF;
	width: 40rpx;
	line-height: 50rpx;
	height: 50rpx;
	text-align: center;
	width: 80rpx;
	font-size: 30rpx;
	border-radius: 6px;
}
.list{
	width: 750rpx;
}
.input_box{
	width: 750rpx;
	background-color: #FFFFFF;
	margin-bottom: 6px;
}
.textarea{
	width: 730rpx;
	padding: 10rpx;
	margin: 10rpx;
}
.item{
	@extend .border;
	border-radius: 16px;
	border-color: #eeeeee;
	padding:4px 8px;
	margin:5px;
	flex-direction: row;
	align-items: center;
}
.logo{
	width: 100rpx;
	height: 100rpx;
	border-radius: 100px;
}
.word{
	padding: 20rpx;
	flex: 1;
	justify-content: space-around;
}
.user_name{
	font-size: 28upx;
	color: #007AFF;
}
.content{
	font-size: 38upx;
	color: #666666;
}
</style> -->
