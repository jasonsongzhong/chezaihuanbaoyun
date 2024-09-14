<template>
	<view>
		<!-- 主容器设备界面 -->
		<view>
			<!-- 设备详细含量数据 -->
			<view class="gas_detail_data">
				<view class="suspend_style">
					<u-row class="suspend_style_row">
						<u-col span="6">
							<!-- <text>{{equipment_type == '8' ? 'TVOC' : 'NMHC'}}</text> -->
							<text>{{factorName}}</text>
							<text>时间{{equipment_updata_time}}</text>
						</u-col>
						<u-col span="6">
							<text>{{main_equipment_data}}</text>
							<text style="color: #858585;">{{main_equipment_unit}}</text>
						</u-col>
					</u-row>
				</view>
				<view class="gas_list_style">
					<u-grid :border="false" col="2">
						<u-grid-item @click="equipmentFactorData(item.name,item.factorNumber)" class="gas_list_item"
							v-for="item in equipment_data">

							<u-row class="gas_list">
								<u-col class="gas_list_icon" span="5">
									<u-icon size="35" name="../../static/img/gas.png">
									</u-icon>
								</u-col>
								<u-col class="gas_list_data" span="7">
									<text class="gas_list_name">{{item.name}}</text>
								</u-col>
							</u-row>

							<u-row class="gas_data_list">
								<u-col class="gas_list_number" span="6">
									<text class="gas_number">{{item.data}}</text>
								</u-col>
								<u-col class="gas_list_unit" span="6">
									<text class="gas_unit">{{item.unit}}</text>
								</u-col>
							</u-row>
						</u-grid-item>
					</u-grid>
				</view>

				<view class="charts-box">
					<uni-title class="main_title_style" type="h1" color="#ffffff" title="数据饼图"></uni-title>
					<qiun-data-charts background="rgba(0, 0, 0, 1.0)" :ontouch="true" type="line" :opts="opts"
						:chartData="chartData" />
				</view>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {


		onLoad(res) {
			this.equipment_model = res.mn;
			this.time_type = res.timeType;
			this.equipment_type = res.equipmentType;
			this.access_token = res.accesstoken;
			this.factorName = res.factorName;
			this.factorNumber = res.factorNumber;
			if (res.timeType == 'real') {
				this.time_type = 1
				if (res.equipmentType == '8') {
					this.time_type = 2
				}
			}
			if (res.timeType == 'hour') {
				this.time_type = 3
			}
			// console.log("this.factorName-----" + this.factorName);
			// console.log("this.factorNumber" + this.factorNumber);
			//获取api数据
			// this.syncApiData();

		},
		onReady() {
			this.syncApiData();
		},

		data() {
			return {
				//设备因子名称factorName
				factorName: '',
				//设备因子编码factorNumber
				factorNumber: '',
				//显示设备更新时间
				equipment_updata_time: '',
				// 设备型号
				equipment_model: '',
				//搜索的时间类型
				time_type: '',
				//TVOC或者非甲烷总烃显示数据
				main_equipment_data: '',
				//TVOC或者非甲烷总烃显示单位
				main_equipment_unit: '',
				//accesstoken
				access_token: '',
				//设备类型显示对应数据
				equipment_type: '',
				//单个设备
				equipment: {},
				//定时器更新设备数据临时存储
				temporary_equipment: [],
				//设备数据
				equipment_data: [],
				//测试使用
				todos: [{
						"mn": "MYHJ00002021000080011101",
						"name": "纺织检测中心01"
					},
					{
						"mn": "MYHJ00002021000080011102",
						"name": "纺织检测中心02"
					},
					{
						"mn": "MYHJ00002021000080011103",
						"name": "纺织检测中心03"
					}
				],
				testdata: [{
						"name": "总烃",
						"data": 94.66,
						"unit": 'mg/m3'
					},
					{
						"name": "非甲烷总烃",
						"data": 73.6,
						"unit": 'mg/m3'
					},
					{
						"name": "甲烷",
						"data": 2.6,
						"unit": 'mg/m3'
					},
					{
						"name": "苯",
						"data": 5.3,
						"unit": 'mg/m3'
					},
					{
						"name": "温度",
						"data": 94.6,
						"unit": '%'
					}, {
						"name": "总烃",
						"data": 94.6,
						"unit": 'mg/m3'
					},
					{
						"name": "非甲烷总烃",
						"data": 73.6,
						"unit": 'mg/m3'
					},
					{
						"name": "甲烷",
						"data": 2.6,
						"unit": 'mg/m3'
					},
					{
						"name": "苯",
						"data": 5.3,
						"unit": 'mg/m3'
					}
				],
				//可视化图表界面ucharts数据
				chartData: {},
				uchartdata: [],
				//可视化图表界面ucharts数据临时存储
				xCoords: [],
				charts_group: [],
				//可视化图表界面ucharts数据实际显示
				categories: [],
				series: [],
				//您可以通过修改 config-ucharts.js 文件中下标为 ['bar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					legend: {
						// backgroundColor: rgba(120, 120, 120, 0.0),

					},
					background: 'rgba(78, 78, 78, 0.0)',
					enableScroll: true, //开启图表拖拽功能
					scrollAlign: 'left', //图表滚动条起始位置
					xAxis: {
						disableGrid: true,
						itemCount: 5, //x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "curve",
							width: 2
						}
					}
				}


			};
		},
		methods: {
			//初始化数据
			async syncApiData() {
				// let factorName = "非甲烷总烃";
				// let factorNumber = "a24088";
				let factorName = this.factorName;
				let factorNumber = this.factorNumber;
				if (this.equipment_type == '8') {
					factorName = "TVOC"
					factorNumber = "a99054"
				}
				await this.syncGetEquipmentData();
				this.equipmentFactorData(factorName, factorNumber);
				// this.getServerData();
			},

			async equipmentFactorData(factorName, factorNumber) {
				this.xCoords = [];
				this.charts_group = [];
				await this.syncGetEquipmentFactorData(factorName, factorNumber)
				this.categories = this.xCoords;
				this.series = this.charts_group;
				this.getServerData();
				// console.log("时间:" + JSON.stringify(this.categories) + '\n数据：' + JSON.stringify(this.series))
			},


			//接收用户设备数据
			syncGetEquipmentData() {
				return new Promise((resolve, reject) => {
					uni.request({
						// url: 'https://voc.16861.com/appapi?m=app&a=data&mn=SHAKS1234567898765432101&size=2&type=2&accesstoken=5aVy5cTv1655718104YIwWsldc859f1384212d35895a4ead128e75fa',
						url: 'https://voc.16861.com/appapi',
						data: {
							'm': 'app',
							'a': 'data',
							'mn': this.equipment_model,
							'size': 1,
							'type': this.time_type,
							'accesstoken': this.access_token,
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
							if (res.data.cp == null) {
								console.log("空数据");
							}
							console.log("测试数据" + JSON.stringify(res.data.cp))
							// 绘制uchartdata临时数据
							let temporary_uchartdata = {};
							let temporary_uchartdata_group = [];
							let list = res.data.cp[0];
							let updatatime = JSON.stringify(list.DataTime);
							this.equipment_updata_time = updatatime.slice(9, 11) + ":" + updatatime
								.slice(11, 13);
							for (let i in list) {

								if (i == 'MN' || i == 'DataTime' || i == 'PNUM' || i == 'PNO' || i ==
									'LA' || i == 'a34004' || i == 'a34002' || i ==
									'a34001') {
									continue;
								} else {
									this.equipment.factorNumber = i;
									this.equipment.unit = list[i].Unit
									if (i == "a99054") {
										this.main_equipment_data = list[i].Avg;
										this.main_equipment_unit = list[i].Unit;
									}
									if (i == "a24088") {
										if (this.time_type == "1") {
											this.main_equipment_data = list[i].Rtd;
										} else {
											this.main_equipment_data = list[i].Avg;
										}
										this.main_equipment_unit = list[i].Unit;
									}
									if (i == "ec0000") {
										if (this.time_type == "1") {
											this.main_equipment_data = list[i].Rtd;
										} else {
											this.main_equipment_data = list[i].Avg;
										}
										this.main_equipment_unit = list[i].Unit;
									}
									if (i == "a19002") {
										if (this.time_type == "1") {
											this.main_equipment_data = list[i].Rtd;
										} else {
											this.main_equipment_data = list[i].Avg;
										}
										this.main_equipment_unit = list[i].Unit;
									}
									if (i == "a05001") {
										if (this.time_type == "1") {
											this.main_equipment_data = list[i].Rtd;
										} else {
											this.main_equipment_data = list[i].Avg;
										}
										this.main_equipment_unit = list[i].Unit;
									}
									//硫化氢&氨气单位ppm修改为mg/m3
									if (i == "a21028" || i == "a21001") {
										list[i].Unit = 'mg/m3';
									}
									//修改风向单位
									if (i == "a01008") {
										list[i].Unit = '度';
									}

									if (this.time_type == "1") {
										this.equipment.data = list[i].Rtd;
										temporary_uchartdata.value = list[i].Rtd;
									} else {
										this.equipment.data = list[i].Avg;
										temporary_uchartdata.value = list[i].Avg;
									}

									this.equipment.name = list[i].Name;
									this.equipment.unit = list[i].Unit;
									this.temporary_equipment.push(this.equipment);
									this.equipment = {};
									temporary_uchartdata.name = list[i].Name;
									temporary_uchartdata_group.push(temporary_uchartdata);
									temporary_uchartdata = {}
								}


							}
							this.equipment_data = this.temporary_equipment;
							this.temporary_equipment = [];

							this.uchartdata = temporary_uchartdata_group;
							resolve('success');
						},
						fail: (err) => {
							console.log(err);
							reject('error');
						},
					});
				})
			},

			//点击对应因子获取设备数据
			syncGetEquipmentFactorData(factorName, factorNumber) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: 'https://voc.16861.com/appapi',
						data: {
							'm': 'app',
							'a': 'data',
							'mn': this.equipment_model,
							'size': 10,
							'type': this.time_type,
							'accesstoken': this.access_token,
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
								reject('error');
								return;
							}
							let list = res.data.cp;
							// console.log("查询数据因子数据：" + JSON.stringify(res.data.cp))
							let xCoords = [];
							let charts_group = {};
							let charts_data_group = [];
							charts_group.name = factorName;
							for (let i in list) {
								for (let j in list[i]) {
									if (j == 'MN') {
										continue;
									} else if (j == 'DataTime') {
										switch (this.time_type) {
											case 3:
												xCoords.push(list[i][j].slice(8, 10) + ":00");
												break;
											case 4:
												xCoords.push(list[i][j].slice(4, 6) + "-" + list[i][j]
													.slice(6, 8));
												break;
											default:
												xCoords.push(list[i][j].slice(8, 10) + ":" + list[i][j]
													.slice(10, 12));
												break;

										}
									} else if (j == factorNumber) {
										if (list[i][j].Avg != null) {
											charts_data_group.push(list[i][j].Avg);
										} else {
											// console.log("RTD数据值：" + list[i][j].Rtd);
											charts_data_group.push(list[i][j].Rtd);
										}
									}
								}
							}
							charts_group.data = charts_data_group;
							this.xCoords = xCoords;
							this.charts_group.push(charts_group);
							resolve('success');
						},
						fail: (err) => {
							console.log(err);
							reject('error');
						},
					})
				})
			},

			//uchart获取数据
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: this.categories,
						series: this.series,
						// categories: ["13:28", "13:27", "13:26", "13:25", "13:24", "13:23", "13:22", "13:21",
						// 	"13:20", "13:19"
						// ],
						// series: [{
						// 	"name": "非甲烷总烃",
						// 	"data": [2.58, 2.58, 2.59, 2.59, 2.59, 2.59, 2.59, 2.6, 2.6, 2.6]
						// }]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},





		}

	}
</script>

<style lang="scss">
	.uni-page-head-btn {
		display: initial !important;
	}

	.main_title_style {
		padding-left: 35%;
		margin: 10px;
	}

	.suspend_style {
		width: 100%;
		height: 280px;

		background-image: url(../../static/img/starry.jpg);
		background-size: 100% 100%;
		background-position: 50% 50%;
		background-repeat: no-repeat;
		// background:linear-gradient (0deg,#3d5659, #9bd9e1);
		// #9bd9e1;
		border-radius: 0px 0px 60px 60px;

		.suspend_style_row {
			width: 100%;
			height: 80%;
			align-items: initial !important;

			.u-col:nth-child(1) {
				text:nth-child(1) {
					text-align: right;
					padding: 70px 30px 10px 0;
					font-size: 25px;
					font-weight: 400;
					color: #ffffff;
				}

				text:nth-child(2) {
					// padding-left: 50px;
					text-align: right;
					padding-right: 30px;
					font-size: 15px;
					color: #ffffff;
				}
			}

			.u-col:nth-child(2) {
				text:nth-child(1) {
					padding: 55px 0 0 0;
					font-size: 40px;
					color: #ffffff;
					font-weight: bolder;

				}

				text:nth-child(2) {
					text-align: left;
					font-size: 10px;
					padding-left: 40px;
					color: #ffffff;
				}
			}



		}
	}

	page {
		width: 100%;
		height: 100%;
		background-color: #000000;
	}

	.gas_list_style {
		position: relative;
		top: -80rpx;
	}

	.gas_detail_data {
		padding: 0rpx 0rpx 50px 0rpx;
	}

	.gas_list {
		width: 100%;
		height: 100%;
		margin-bottom: 40rpx;
	}

	.gas_data_list {
		width: 100%;
		height: 100%;

		.gas_list_number {
			font-size: 50rpx;
			font-weight: bold;
			color: #ffffff;

			.gas_number {
				text-align: center;
			}
		}

		.gas_list_unit {
			color: #858585;

			.gas_unit {
				text-align: right;
				padding-right: 10rpx;
			}
		}

	}

	.gas_list_item {
		// background-color: #312c34 !important;
		background: linear-gradient(0deg, #312c34 0%, #1c1c1c 80%) !important;
	}

	.u-grid-item--hover-class {
		opacity: 0.5;
	}
	
	.u-grid{
		justify-content: center !important;
	}

	//u-grid-item奇数列显示
	.u-grid-item:nth-of-type(odd) {
		padding: 10rpx;
		width: 43% !important;
		margin: 1% 1% 1% 6%;
		border-radius: 10px;
	}

	//u-grid-item偶数列显示
	.u-grid-item:nth-of-type(even) {
		padding: 10rpx;
		width: 43% !important;
		margin: 1% 6% 1% 1%;
		border-radius: 10px;
	}

	.gas_list_icon .u-icon {
		flex-direction: inherit;
	}

	.gas_list_name {
		font-weight: bolder;
		font-size: 30rpx;
		text-align: right;
		padding-right: 10rpx;
		color: #858585;
	}



	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 100%;
		height: 40%;
	}

	.gas-date {
		width: 100%;
		height: 60%;
	}

	.text {
		font-size: 12px;
		color: #fffffe;
		margin-top: 5px;
	}

	.uni-px-5 {
		padding-left: 10px;
		padding-right: 10px;
	}

	.uni-pb-5 {
		padding-bottom: 10px;
	}

	.center_box {
		width: 100%;
		height: 100%;

	}

	.left_box {
		width: 20%;
		background-color: #5500ff;
	}

	.right_box {
		width: 80%;
		height: 100%;
	}

	.left_navigation {
		word-break: break-all;
		height: 100%;
	}

	.navigation_item {
		padding: 0rpx 5rpx 5rpx 5rpx;
	}

	.active {
		background: rgb(196, 30, 0);
		color: #fff;
	}
</style>