<template>
	<view>
		<view>
			<u-swiper :list="swiper_list" :interval="8000" :duration="1500" :height="200" indicator indicatorMode="line"
				circular></u-swiper>
		</view>
		<view>
			<uni-title class="equipment_title" color="#3c54b1" type="h1" title="设备列表"></uni-title>
			<view class="equipment_reminder" v-show="equipment_reminder_type">
				<text>当前暂未登录，无设备数据，请先登录</text>
			</view>
			<view>
				<view class="equipment_list">
					<view class="equipment_list_item" v-for="(item,index) in equipment_data">
						<view class="fold_drop_up">
							<view
								@click="real_time_data(item.mn,'real',equipment_type,accesstoken,item.data_name,item.factorNumber)"
								class="left_item">
								<view class="progress-box" ref="progress_index">
									<!-- <progress :percent='progress_flag' :active="true" :duration='600'
										stroke-width="1" /> -->
									<view class="progress-bar">
										<!-- :style="{animation: progress_flag==100?'panoramic 60s linear infinite':''}" -->
										<!-- :style="{width: progress_flag==100?'100%':'',transition: progress_flag==100?'width .6s linear':''}" -->
										<view class="progress-bg" :key="keyNum"></view>
									</view>
								</view>
								<view class="name_up">
									<view class="equipment_name">
										<text>{{item.name}}</text>
									</view>
									<view class="equipment_datetime">
										<text>{{item.year_time}}</text>
										<text>{{item.minute_time}}</text>
									</view>
								</view>
								<view class="data_down">
									<text>{{item.data_name}}: </text>
									<text>{{item.data}} </text>
									<text>{{item.unit}}</text>
								</view>

							</view>
							<view class="right_item" @click="fold_drop(index,foldFlag[index])">
								<image :src="foldFlag[index]?'../../static/img/down.png':'../../static/img/up.png'">
								</image>
							</view>
						</view>
						<view class="fold_drop_down" v-show="foldFlag[index]">
							<view class="tag-view">
								<uni-tag
									@click="real_time_data(item.mn,'real',equipment_type,accesstoken,item.data_name,item.factorNumber)"
									text="实时数据" type="primary" />
							</view>
							<view class="tag-view">
								<uni-tag
									@click="real_time_data(item.mn,'hour',equipment_type,accesstoken,item.data_name,item.factorNumber)"
									text="小时数据" type="primary" />
							</view>
							<view class="tag-view">
								<uni-tag @click="history(item.mn,accesstoken,equipment_type)" text="历史记录"
									type="primary" />
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>


	</view>

</template>

<script>
	export default {

		onLoad() {
			this.accesstoken = uni.getStorageSync('accesstoken');
			this.equipment_type = uni.getStorageSync('equipment_type');
		},

		onReady() {
			this.getBanner();
			// console.log("设备型号组数据请求----" + JSON.stringify(this.equipment_composition));
		},
		onShow() {
			console.log('this.keyNum' + this.keyNum);
			if (this.keyNum - 0 == 1) {
				this.keyNum = 2;
			} else {
				this.keyNum = 1;
			}
			this.syncApiData();
			this.timer = setInterval(() => {
				console.log('progress_flag：' + this.progress_flag)
				// this.temporary_equipment = [];
				this.syncApiData();
				if (this.keyNum - 0 == 1) {
					this.keyNum = 2;
				} else {
					this.keyNum = 1;
				}
				console.log('this.keyNum' + this.keyNum);
			}, 60000);
		},
		onHide() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		onUnload() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		data() {
			return {
				//导航条自控刷新
				keyNum: 1,
				//进度条开关
				progress_flag: 0,
				progress_state: true,
				//设备登录状态
				equipment_reminder_type: true,

				timer: null, // 定时器
				//accesstoken
				accesstoken: '',
				//设备类型显示对应数据
				equipment_type: '',
				//定时器更新设备数据临时存储
				temporary_equipment: [],
				//当前所有设备
				equipment_composition: [],
				//折叠面板状态
				foldFlag: [],
				//单个设备
				equipment: {},
				swiper_list: [],
				equipment_data: [],
				testdata: [{
						"mn": "MYHJ00002021000080011101",
						"name": "纺织检测中心01纺织检测中纺织检测中心01纺织检测中纺织检测中心01纺织检测中纺织检测中心01纺织检测中心01纺织检测中心01纺织检测中心01",
						"data": "15.66",

					},
					{
						"mn": "MYHJ00002021000080011102",
						"name": "纺织检测中心02",
						"data": "14",

					},
					{
						"mn": "MYHJ00002021000080011103",
						"name": "纺织检测中心03",
						"data": "63.66",

					}, {
						"mn": "MYHJ00002021000080011104",
						"name": "纺织检测中心04",
						"data": "70.5",

					},
					{
						"mn": "MYHJ00002021000080011105",
						"name": "纺织检测中心05",
						"data": "90.12",

					},
					{
						"mn": "MYHJ00002021000080011106",
						"name": "纺织检测中心06",
						"data": "101.55",

					}, {
						"mn": "MYHJ00002021000080011107",
						"name": "纺织检测中心07",
						"data": "150",

					},
					{
						"mn": "MYHJ00002021000080011108",
						"name": "纺织检测中心08",
						"data": "362",

					},
					{
						"mn": "MYHJ00002021000080011109",
						"name": "纺织检测中心09",
						"data": "19.22",

					}
				],


			}
		},
		methods: {
			//初始化数据
			async syncApiData() {
				this.equipment_composition = uni.getStorageSync('equipment_composition');

				if (this.equipment_composition == '' || this.equipment_composition == null) {
					await this.syncLoginEquipmentData();
				}
				this.dataFiltration();
				this.temporary_equipment = [];
			},

			//数据筛选
			async dataFiltration() {

				this.equipment_reminder_type = false;
				for (let item of this.equipment_composition) {
					this.equipment = {};
					this.equipment.name = item.name;
					this.equipment.mn = item.mn;
					await this.syncGetEquipmentData(item.mn);
				}
				this.equipment_data = this.temporary_equipment;
				console.log("equiApment_data" + JSON.stringify(this.equipment_data));
			},


			//接收用户登录设备数据
			syncLoginEquipmentData() {
				return new Promise((resolve, reject) => {
					let userId = uni.getStorageSync('user_id');
					let password = uni.getStorageSync('password');
					if (userId == '' || password == '') {
						this.equipment_reminder_type = true;
						return;
					} else {
						this.equipment_reminder_type = false;
					}
					uni.request({
						// url: 'https://voc.16861.com/appapi?m=app&username=akssh&password=123456',
						url: 'https://voc.16861.com/appapi?',
						data: {
							'm': 'app',
							'username': userId,
							'password': password,
						},
						method: "GET",
						header: {
							'Content-Type': 'application/json',
						},
						success: (res) => {
							if (res.statusCode != 200) {
								console.log("--------");
								console.log("网络请求失败");
								reject('error');
							}
							console.log("进入")
							//accesstoken赋值
							// this.accesstoken = res.data.accesstoken;
							uni.setStorageSync('accesstoken', res.data.accesstoken);
							//设备类别
							this.equipment_type = res.data.roleid;
							//获取当前设备型号组
							this.equipment_composition = res.data.devs;
							uni.setStorageSync('equipment_composition', res.data.devs);
							uni.setStorageSync('equipment_type', res.data.roleid);
							for (let i in this.equipment_composition) {
								this.foldFlag.push(false);
							}

							console.log("设备型号组数据请求----" + JSON.stringify(this.equipment_composition));

							resolve('success');
						},
						fail: (err) => {
							console.log(err);
							reject('error');
						},
					});
				})
			},
			//接收用户设备数据（非甲烷总烃）
			syncGetEquipmentData(mn) {
				return new Promise((resolve, reject) => {
					uni.request({
						// url: 'https://voc.16861.com/appapi?m=app&a=rtd&mn=SHAKS1234567898765432101&size=2&type=2&accesstoken=5aVy5cTv1655718104YIwWsldc859f1384212d35895a4ead128e75fa',
						url: 'https://voc.16861.com/appapi',
						data: {
							'm': 'app',
							'a': 'data',
							'mn': mn,
							'size': 1,
							'type': this.equipment_type == '8' ? '2' : '1',
							'accesstoken': this.accesstoken,
						},
						method: "GET",
						header: {
							'Content-Type': 'application/json',
						},
						success: (res) => {
							if (res.statusCode != 200) {
								console.log("--------");
								console.log("网络请求失败");
								reject('error');
								return;
							}
							if (res.data.cp == null) {
								console.log("空数据");
								return;
							}
							// if (this.equipment_type == "3") {
							// 	this.equipment.data_name = 'NMHC';
							// 	this.equipment.data = JSON.stringify(res.data.cp[0].a24088.Rtd);
							// }
							// if (this.equipment_type == "8") {
							// 	this.equipment.data = JSON.stringify(res.data.cp[0].a99054.Avg);
							// 	this.equipment.data_name = 'TVOC: ';
							// }
							//TVOC
							if (res.data.cp[0].a99054 != null) {
								this.equipment.data_name = 'TVOC:';
								this.equipment.data = JSON.stringify(res.data.cp[0].a99054.Avg);
								this.equipment.factorNumber = 'a99054';
								this.equipment.unit = 'mg/m3';
							}
							//非甲烷总烃
							if (res.data.cp[0].a24088 != null) {
								this.equipment.data_name = res.data.cp[0].a24088.Name;
								this.equipment.data = JSON.stringify(res.data.cp[0].a24088.Rtd);
								this.equipment.factorNumber = 'a24088';
								this.equipment.unit = res.data.cp[0].a24088.Unit;
							}
							// 恶臭
							if (res.data.cp[0].ec0000 != null) {
								this.equipment.data_name = res.data.cp[0].ec0000.Name;
								this.equipment.data = JSON.stringify(res.data.cp[0].ec0000.Rtd);
								this.equipment.factorNumber = 'ec0000';
								this.equipment.unit = res.data.cp[0].ec0000.Unit;
							}
							// OU值
							if (res.data.cp[0].a19002 != null) {
								this.equipment.data_name = res.data.cp[0].a19002.Name;
								this.equipment.data = JSON.stringify(res.data.cp[0].a19002.Rtd);
								this.equipment.factorNumber = 'a19002';
								this.equipment.unit = res.data.cp[0].a19002.Unit;
							}
							//二氧化碳
							if (res.data.cp[0].a05001 != null) {
								this.equipment.data_name = res.data.cp[0].a05001.Name;
								this.equipment.data = JSON.stringify(res.data.cp[0].a05001.Rtd);
								this.equipment.factorNumber = 'a05001';
								this.equipment.unit = res.data.cp[0].a05001.Unit;
							}
							let datatime = res.data.cp[0].DataTime
							this.equipment.year_time = datatime.slice(0, 4) + '.' +
								datatime.slice(4, 6) + '.' + datatime.slice(6, 8);
							this.equipment.minute_time = datatime.slice(8, 10) + ':' +
								datatime.slice(10, 12);
							this.temporary_equipment.push(this
								.equipment);
							resolve('success');

						},
						fail: (err) => {
							console.log(err);
							reject('error');
						},
					});
				})
			},



			//点击实时（小时）跳转页面
			real_time_data(mn, timeType, equipmentType, accesstoken, factorName, factorNumber) {
				uni.navigateTo({
					url: '../gasdata/gasdata?mn=' + mn + '&timeType=' + timeType + '&equipmentType=' +
						equipmentType + '&accesstoken=' + accesstoken + '&factorName=' + factorName +
						'&factorNumber=' + factorNumber,
					success() {
						// console.log("成功");
					},
					fail() {
						console.log("失败");
					}
				})
				// console.log(mn);
			},
			//点击历史记录跳转页面
			history(mn, accesstoken, equipment_type) {

				uni.navigateTo({
					url: '../gasdata/history?mn=' + mn + '&accesstoken=' + accesstoken +
						'&equipmentType=' +
						equipment_type,
					success() {
						console.log("成功");
					},
					fail(res) {
						console.log("失败" + JSON.stringify(res));
					}
				})
			},
			//banner图
			getBanner() {
				uni.request({
					url: 'https://voc.16861.com/appapi.php?m=news&a=api&fenlei=2',
					method: 'GET',
					data: {},
					success: (res) => {
						// console.log(res);
						let list = res.data.result.data;
						for (let i in list) {
							this.swiper_list.push('https://voc.m-excel.cn/' + list[i].pic)
						}

					},
					fail: () => {},
					complete: () => {}
				});
				// console.log(JSON.stringify(this.swiper_list) );
			},

			//折叠面板
			fold_drop(index, foldFlag) {
				if (foldFlag) {
					this.foldFlag[index] = false;
				} else {
					this.foldFlag[index] = true;
				}
				this.$forceUpdate();
			},



		},
	}
</script>

<style lang="scss">
	// 修改u-cell的下拉面板更改颜色值，留下备注，方便后续修改
	// .u-cell--clickable {
	// 	background-color: #312c34;
	// }

	page {
		// background:linear-gradient(0deg, #1c1c1c 0%, #989898 100%);
		background-color: #000000;
		width: 100%;
		color: #ffffff;

	}

	.equipment_reminder {
		display: flex;
		// text-align: center;
		align-content: center;
		justify-content: center;
		font-size: 35rpx;
	}

	.equipment_list {
		background-color: #000000;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.equipment_title {
		margin-left: 5px;
	}

	.equipment_list_item {
		display: flex;
		background-color: #312c34;
		flex-direction: column;
		width: 98%;
		height: 100%;
		border-radius: 15px;
		margin-top: 10px;

		.fold_drop_up {
			display: flex;

			.progress-box {
				margin-left: 10px;
				width: 100%;

				.progress-bar {
					width: 100%;
					height: 10px;
					overflow: hidden;
					box-sizing: border-box;
					border-radius: 24px;
					background-color: rgba(180, 160, 120, .2);
					position: relative;
				}

				.progress-bg {
					// width: 0%;
					height: 100%;
					overflow: hidden;
					box-sizing: border-box;
					background-image: linear-gradient(345deg, #00BFFF 25%, #FA8072 0, #FA8072 50%, #00BFFF 0, #00BFFF 70%, #FA8072 0);
					border-radius: 24px;
					// animation-name: panoramic;
					// animation-duration: 60s;
					// animation-timing-function: linear;
					// animation-iteration-count: infinite;
					// animation: panoramic 60s linear infinite;
					animation: panoramic 60s linear infinite;
					-webkit-animation: panoramic 60s linear infinite;
					/*Webkit内核的浏览器（如 Safari、Chrome）*/
					-moz-animation: panoramic 60s linear infinite;
					/*gecko内核的浏览器（如 Firefox）*/
					-o-animation: panoramic 60s linear infinite;
					/*Opera 浏览器*/
					-ms-animation: panoramic 60s linear infinite;
					/*IE8+*/
					background-size: 32px 100%;
				}

				@keyframes panoramic {
					from {
						width: 0%;
					}

					to {
						background-position: 100% 0;
						width: 100%;
					}
				}

				@-webkit-keyframes panoramic {
					from {
						width: 0%;
					}

					to {
						background-position: 100% 0;
						width: 100%;
					}
				}

				@-moz-keyframes panoramic {
					from {
						width: 0%;
					}

					to {
						background-position: 100% 0;
						width: 100%;
					}
				}

				@-o-keyframes panoramic {
					from {
						width: 0%;
					}

					to {
						background-position: 100% 0;
						width: 100%;
					}
				}

				@-ms-keyframes panoramic {
					from {
						width: 0%;
					}

					to {
						background-position: 100% 0;
						width: 100%;
					}
				}

			}

			.left_item {
				display: flex;
				flex-direction: column;
				width: 90%;
				height: 100%;
				color: #ffffff;

				.name_up {
					display: flex;

					.equipment_name {
						width: 80%;
						padding: 5px 5px 0px 5px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
						text-align: left;

						text {
							font-size: 15px;
						}
					}

					.equipment_datetime {
						display: flex;
						flex-direction: column;
						width: 20%;
						color: #989898;
						justify-content: center;
						align-content: center;
						text-align: center;
						font-size: 12px;
						line-height: 12px;
					}
				}

				.data_down {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					color: #989898;
					padding: 0px 5px 5px 5px;
					text-align: center;

					text:nth-child(1) {
						font-size: 12px;
						padding-right: 10px;
					}

					text:nth-child(2) {
						font-size: 30px;
						font-weight: bold;
						color: rgba(255, 255, 255, 0.5);
					}


					text:nth-child(3) {
						padding-left: 10px;
						font-size: 8px;
					}

				}
			}

			.right_item {
				display: flex;
				width: 10%;
				align-items: center;
				justify-content: center;
				border-radius: 0px 15px 15px 0px;

				uni-image {
					width: 20px;
					height: 20px;
				}
			}
		}


		.fold_drop_down {
			display: flex;
			flex-direction: row;
			border-top-style: solid;
			border-width: 0.02px;
			border-top-color: #646464;

			.tag-view {
				margin: 10px 0px 10px 5px;
			}

		}
	}
</style>