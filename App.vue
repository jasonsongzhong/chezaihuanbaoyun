<script>
	import sql from '@/common/sql.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifndef APP-PLUS-NVUE
			const _handlePush = async (message) => { //收到推送后
				console.log(this.state, 'this.state');
				let {
					payload
				} = message;
				if (payload) {
					payload = JSON.parse(payload);
					payload.text = decodeURIComponent(payload.text);
				}

				if (this.state == -1) { //app处于后台运行
					let {
						data: [userData]
					} = await sql.selectSql(
						`
						select "username" from "userList"
						WHERE "_id" = "${payload.fromId}"
					`);
					payload.username = userData.username
					plus.push.createMessage(payload.text, payload, {
						"cover": true,
						"title": payload.username
					});
				} else {
					console.log('在前台');
				}
				uni.$emit('handlePush', {
					payload
				})
			}
			//监听push推送通知
			plus.push.addEventListener('receive', function(message) {
				_handlePush(message);
			});
			//监听点击通知栏
			plus.push.addEventListener('click', function(message) {
				if (plus.webview.getTopWebview().__uniapp_route != "pages/index/index") {
					uni.navigateBack()
				}
				uni.$emit('toChat', {
					currentUserId: message.payload.fromId,
					username: message.payload.username
				})
			});
			// #endif

		},
		onShow: function() {
			this.state = 1;
			plus.push.clear();
			console.log('App Show')
		},
		onHide: function() {
			this.state = -1;
			console.log('App Hide')
		},
		data() {
			return {
				state: 0,
			}
		}
	}
</script>

<style>
	// #ifndef APP-PLUS-NVUE
	@import './common/common.css';
	@import './common/terms.number.css';
	@import './common/uni.css';
	//#endif
	/*每个页面公共css

	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	/* 横屏样式 */
	.qiun-charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
		padding: 25upx;
	}

	.charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
	}

	/* 圆弧进度样式 */
	.qiun-charts3 {
		width: 750upx;
		height: 250upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;
	}

	.qiun-tip {
		display: block;
		width: auto;
		overflow: hidden;
		padding: 15upx;
		height: 30upx;
		line-height: 30upx;
		margin: 10upx;
		background: #ff9933;
		font-size: 30upx;
		border-radius: 8upx;
		justify-content: center;
		text-align: center;
		border: 1px solid #dc7004;
		color: #FFFFFF;
	}
</style>
<style lang="scss">
@import "./uni_modules/uview-ui/index.scss";
</style>