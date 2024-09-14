<template>
	<view>
		<!-- 折线图 -->
		<view class="line_chart_style">
			<view class="main_title_style">
				<text>数据统计</text>
			</view>
			<view class="charts_style">
				<qiun-data-charts background="rgba(49, 44, 52, 1.0)" :ontouch="true" type="line" :opts="opts"
					:chartData="chartData" />
			</view>
			<view class="boottom_style"></view>
		</view>
		<view class="uni-container">

			<view class="history_column">
				<view class="history_title">
					<text>历史记录</text>
				</view>
				<view class="history_filter">
					<!-- <view @click="radioClick(index)"
						:class="item.checked==true?'history_filter_item_active':'history_filter_item'"
						v-for="(item, index) in radios">
						<text>{{item.name}}</text>
					</view> -->
					<uni-forms class="form_style" ref="valiForm">
						<uni-forms-item>
							<uni-datetime-picker :clear-icon="false" :value="date_section" type="datetimerange"
								:end="end_time" rangeSeparator="-" @change="datetime_change" />
						</uni-forms-item>
						<view class="form_column2">
							<uni-forms-item class="select_style">
								<uni-data-select v-model="date_value" :localdata="date_filters" :clear="false"
									@change="date_filters_change" />
							</uni-forms-item>
							<uni-forms-item class="select_style">
								<uni-data-select v-model="page_value" :localdata="page_filters" :clear="false"
									@change="page_filters_change" />
							</uni-forms-item>
							<!-- <uni-forms-item class="submit_style">
								<button type="primary" @click="submit()">搜索</button>
							</uni-forms-item> -->
						</view>
					</uni-forms>
				</view>
			</view>
			<view>
				<uni-table class="history_table_style" :stripe="true">
					<uni-tr>
						<uni-th width="30" align="center">日期</uni-th>
						<uni-th width="55" v-for="item in equipment_factorName_group" align="center">{{item}}</uni-th>
					</uni-tr>
					<uni-tr align="center" v-for="(item,index) in equipment_data_group">
						<uni-td align="center" v-for="data in item">{{data}}</uni-td>
					</uni-tr>
				</uni-table>
				<view class="show_hint">
					<text>{{show_hint}}</text>
				</view>
			</view>



		</view>

	</view>
</template>

<script>
	export default {
		onLoad(parameter) {
			this.equipment_model = parameter.mn;
			this.access_token = parameter.accesstoken;
			this.equipment_type = parameter.equipmentType;
			this.setDateTime();
			console.log("设备名称" + this.equipment_model)
		},
		data() {
			return {
				//上滑加载更多提示
				show_hint: '上滑加载更多',
				//查询总数
				total: 0,
				//第几页
				from: 0,
				date_section: [],
				// start_time : Date.now(),
				end_time: Date.now(),
				// 设备型号
				equipment_model: '',
				//accesstoken
				access_token: '',
				equipment_type: '',
				radios: [{
						checked: true,
						name: "实时",
					},
					{
						checked: false,
						name: "分钟"
					},
					{
						checked: false,
						name: "小时"
					}, {
						checked: false,
						name: "日"
					}
				],
				//表单数据

				date_value: 1,
				page_value: 10,
				//1.时间模式选项
				date_filters: [{
						value: 1,
						text: "实时数据"
					},
					{
						value: 2,
						text: "分钟数据"
					},
					{
						value: 3,
						text: "小时数据"
					},
					{
						value: 4,
						text: "日数据"
					}
				],
				//页数选择器
				page_filters: [{
						value: 10,
						text: "10"
					},
					{
						value: 20,
						text: "20"
					},
					{
						value: 30,
						text: "30"
					},
					{
						value: 50,
						text: "50"
					},
					{
						value: 100,
						text: "100"
					},
				],

				//设备因子名称组
				equipment_factorName_group: [],
				//设备数据组
				equipment_data_group: [],
				//懒加载设备数据组
				lazy_equipment_data_group: [],
				//图表时间节点
				charts_XCoords: [],
				//图表数据展示
				charts_data_group: [],
				testdata: [{
						"one": "2020-10-20",
						"two": "10",
						"three": "15.66",
						"four": "50",
						"five": "7",
						"six": "55",
						"seven": "50",
						"eight": "79",
						"nine": "60",
					}, {
						"one": "2020-10-20",
						"two": "10",
						"three": "15.66",
						"four": "50",
						"five": "7",
						"six": "55",
						"seven": "50",
						"eight": "79",
						"nine": "60",
					}, {
						"one": "2020-10-20",
						"two": "10",
						"three": "15.66",
						"four": "50",
						"five": "7",
						"six": "55",
						"seven": "50",
						"eight": "79",
						"nine": "60",
					}, {
						"one": "2020-10-20",
						"two": "10",
						"three": "15.66",
						"four": "50",
						"five": "7",
						"six": "55",
						"seven": "50",
						"eight": "79",
						"nine": "60",
					}, {
						"one": "2020-10-20",
						"two": "10",
						"three": "15.66",
						"four": "50",
						"five": "7",
						"six": "55",
						"seven": "50",
						"eight": "79",
						"nine": "60",
					},

				],
				chartData: {},
				//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
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

			}
		},
		onReady() {
			this.syncApiData();
		},

		onReachBottom() {
			console.log("触发到底部")
			if (this.total < this.page_value) {
				// console.log("进入")
				this.show_hint = '无更多数据'
				return;
			} else {
				this.show_hint = '上滑加载更多数据'
			}
			this.from = this.from + this.page_value;
			// console.log("this.total总数：" + this.total + '----this.from：' + this.from+ '----this.page_value:' + this.page_value);
			// if (this.from < this.total) {
			// 	console.log("进入添加计算")
			// 	this.syncGetHistoryPage(this.page_value, this.from, this.date_value, new Date(this.date_section[0])
			// 		.getTime(), new Date(this
			// 			.date_section[1]).getTime()
			// 	);

			// }
			if (this.total <= this.page_value) {
				console.log("进入添加计算")
				this.syncGetHistoryPage(this.page_value, this.from, this.date_value, new Date(this.date_section[0])
					.getTime(), new Date(this
						.date_section[1]).getTime()
				);

			}
		},

		methods: {
			//切换日期函数
			datetime_change(value) {
				this.date_section = value
				this.from = 0;
				// console.log("value:", JSON.stringify(value));
				this.syncGetHistoryPage(this.page_value, this.from, this.date_value, new Date(this.date_section[0])
					.getTime(), new Date(this
						.date_section[1]).getTime());
			},
			//切换分钟数据函数（分钟、小时、日）
			date_filters_change(value) {
				this.date_value = value
				this.from = 0;
				// console.log("value:", this.date_value);
				this.syncGetHistoryPage(this.page_value, this.from, this.date_value, new Date(this.date_section[0])
					.getTime(), new Date(this
						.date_section[1]).getTime());
			},
			//切换显示页数函数（10、20、30、50、100）
			page_filters_change(value) {
				this.page_value = value
				this.from = 0;
				// console.log("value:", this.page_value);
				this.syncGetHistoryPage(this.page_value, this.from, this.date_value, new Date(this.date_section[0])
					.getTime(), new Date(this
						.date_section[1]).getTime());
			},

			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						categories: this.charts_XCoords,
						series: this.charts_data_group,
					};
					this.chartData = JSON.parse(JSON.stringify(res));
					// console.log("图标数据：" + this.chartData);
				}, 500);
			},

			//初始化数据
			async syncApiData() {

				await this.syncGetHistoryPage(10, 0, 1, new Date(this.date_section[0]).getTime(), new Date(this
					.date_section[1]).getTime());
			},

			//接收用户设备数据(size:返回几条数据，type：时间类型，日数据3，月记录4)
			syncGetHistoryPage(size, from, type, gte, lt, accesstoken) {
				return new Promise((resolve, reject) => {
					uni.request({
						// url: 'https://voc.16861.com/appapi?m=app&a=rtd&mn=SHAKS1234567898765432101&size=2&type=2&accesstoken=5aVy5cTv1655718104YIwWsldc859f1384212d35895a4ead128e75fa',
						url: 'https://voc.16861.com/appapi',
						data: {
							'm': 'app',
							'a': 'data',
							'mn': this.equipment_model,
							'from': from,
							'size': size,
							'type': type,
							'accesstoken': this.access_token,
							'gte': gte,
							'lt': lt,
						},
						method: "GET",
						header: {
							'Content-Type': 'application/json',
						},
						success: (res) => {
							// console.log("初次total：" + res.data.total)
							if (res.data.total <= 0) {
								console.log("查询剩余的数量为0进入");
								this.show_hint = '无更多数据';
								return;
							} else {
								this.show_hint = '上滑加载更多数据';
							}
							if (res.statusCode != 200) {
								console.log("--------");
								console.log("网络请求失败");
								reject('error');
								return;
							}
							if (res.data.cp == null) {
								console.log("空数据！");
								this.equipment_data_group = []
								reject('error');
								return;
							}

							let list = res.data.cp;
							let equipment_factorName_group = [];
							this.total = res.data.total;
							//临时数组
							let temporaryArray = [];
							let equipment_data_group = [];
							let date = '';
							//获取图表数据
							let chart_data = [];
							let xCoords = [];
							//总烃
							//非甲烷总烃
							let nmhc = {};
							let nmhc_data = [];
							//甲烷
							// console.log("total：" + this.total + "---from：" + from + '---size：' + size +
							// 	'---type:' + type +
							// 	'---gte起始时间:' + this.getDateTime(gte) +
							// 	'---lt结束时间:' + this.getDateTime(lt))
							//获取因子组数据
							for (let i in list[0]) {
								if (i == 'MN') {
									continue;
								} else if (i == 'DataTime') {
									// equipment_factorName_group.push('日期');
								} else {
									if (i != 'LA' && i != 'a34004' && i !=
										'a34002' && i != 'a34001') {
										equipment_factorName_group.push(list[0][i].Name);
									}

									// console.log(list[0][i].Name);
									switch (i) {
										case "a24088": {
											nmhc.name = list[0][i].Name;
											break;
										}
										case "ec0000": {
											nmhc.name = list[0][i].Name;
											break;
										}
										case "a19002": {
											nmhc.name = list[0][i].Name;
											break;
										}
										case "a05001": {
											nmhc.name = list[0][i].Name;
											break;
										}
									}
								}
							}
							this.equipment_factorName_group = equipment_factorName_group;
							//筛选数据
							for (let i in list) {
								for (let j in list[i]) {
									if (j == 'MN') {
										continue;
									} else if (j == 'DataTime') {
										switch (type) {
											case 3:
												date = list[i][j].slice(0, 4) + "-" + list[i][j].slice(
														4,
														6) + "-" + list[i][j].slice(6, 8) + "   " +
													list[
														i][j].slice(8, 10) + ":00";
												xCoords.push(list[i][j].slice(8, 10) + ":00");
												break;
											case 4:
												date = list[i][j].slice(0, 4) + "-" + list[i][j].slice(
													4,
													6) + "-" + list[i][j].slice(6, 8);
												xCoords.push(list[i][j].slice(4, 6) + "-" + list[i][j]
													.slice(6, 8));
												break;
											default:
												date = list[i][j].slice(0, 4) + "-" + list[i][j].slice(
														4,
														6) + "-" + list[i][j].slice(6, 8) + "   " +
													list[i][j].slice(8, 10) + ":" + list[i][j].slice(
														10, 12);
												xCoords.push(list[i][j].slice(8, 10) + ":" + list[i][j]
													.slice(10, 12));
												break;

										}
										temporaryArray.push(date);
									} else if (j != 'LA' && j != 'a34004' && j !=
										'a34002' && j != 'a34001') {
										if (list[i][j].Avg != null) {
											temporaryArray.push(list[i][j].Avg);
											switch (j) {
												case "a24088": {
													nmhc_data.push(list[i][j].Avg);
													break;
												}
												case "ec0000": {
													if (list[i][j].Rtd != null) {
														nmhc_data.push(list[i][j].Rtd);
													} else {
														nmhc_data.push(list[i][j].Avg);
													}
													break;
												}
												case "a19002": {
													if (list[i][j].Rtd != null) {
														nmhc_data.push(list[i][j].Rtd);
													} else {
														nmhc_data.push(list[i][j].Avg);
													}
													break;
												}
												case "a05001": {
													if (list[i][j].Rtd != null) {
														nmhc_data.push(list[i][j].Rtd);
													} else {
														nmhc_data.push(list[i][j].Avg);
													}
													break;
												}

											}
										} else {
											temporaryArray.push(list[i][j].Rtd);
											switch (j) {
												case "a24088": {
													nmhc_data.push(list[i][j].Rtd);
													break;
												}
												case "ec0000": {
													nmhc_data.push(list[i][j].Rtd);
													break;
												}
												case "a19002": {
													nmhc_data.push(list[i][j].Rtd);
													break;
												}
												case "a05001": {
													nmhc_data.push(list[i][j].Rtd);
													break;
												}
											}
										}

									}
								}
								equipment_data_group.push(temporaryArray);
								temporaryArray = [];
							}

							if (nmhc != null || nmhc != '') {
								nmhc.data = nmhc_data;
								chart_data.push(nmhc);
							}
							if (from == 0) {
								this.equipment_data_group = equipment_data_group;
								this.charts_XCoords = xCoords;
								this.charts_data_group = chart_data;
								// console.log(this.total + '---' + this.page_value)
								this.from = 0;
							} else {

								this.equipment_data_group = this.equipment_data_group.concat(
									equipment_data_group);

								this.charts_XCoords = this.charts_XCoords.concat(xCoords);
								// console.log("首次" + JSON.stringify(chart_data[0].data));
								this.charts_data_group[0].data.push.apply(this.charts_data_group[0]
									.data, chart_data[0].data);
								// console.log("加载" + JSON.stringify(this.charts_data_group));
							}
							// if (this.total - this.from <= this.page_value) {
							// 	console.log("进入")
							// 	this.show_hint = '无更多数据'
							// } else {
							// 	this.show_hint = '上滑加载更多数据'
							// }

							this.getServerData();
							// console.log("图标数据：" + JSON.stringify(this.charts_data_group))
							if (this.total < this.page_value) {
								// console.log("进入");
								this.show_hint = '无更多数据';
								return;
							} else {
								this.show_hint = '上滑加载更多数据';
							}
							resolve('success');
						},
						fail: (err) => {
							console.log(err);
							reject('error');
						},
					});
				})
			},

			//日期处理方法
			getDateTime(time) {
				var date = new Date(time)
				var len = time.toString().length;
				if (len < 13) {
					var sub = 13 - len;
					sub = Math.pow(10, sub);
					date = new Date(time * sub);
				}
				var y = date.getFullYear() + '-';
				var M = date.getMonth() + 1;
				M = (M < 10 ? '0' + M : M) + '-';
				var d = date.getDate();
				d = (d < 10 ? '0' + d : d) + ' ';
				var h = date.getHours();
				h = (h < 10 ? '0' + h : h) + ':';
				var m = date.getMinutes();
				m = (m < 10 ? '0' + m : m) + ':';
				var s = date.getSeconds()
				s = s < 10 ? ('0' + s) : s
				return y + M + d + h + m + s;
			},

			setDateTime() {
				var datatime = Date.now();
				this.date_section.push(this.getDateTime(datatime - 86400000));
				this.date_section.push(this.getDateTime(datatime));
				// console.log(JSON.stringify(this.date_section))
			},

			// submit() {
			// 	console.log("this.date_section[0]:" + this.date_section[0]);
			// 	var start_time = new Date(this.date_section[0]).getTime();
			// 	var end_time = new Date(this.date_section[1]).getTime();
			// 	this.from = 0;
			// 	console.log("点击提交之后的各个参数--this.total总数：" + this.total + '----this.from：' + this.from +
			// 		'-----this.date_value:' + this.date_value + '----this.page_value:' + this.page_value +
			// 		'-----开始时间：' + start_time + '-----结束时间：' + end_time)
			// 	this.syncGetHistoryPage(this.page_value, this.from, this.date_value, new Date(this.date_section[0])
			// 		.getTime(), new Date(this
			// 			.date_section[1]).getTime());
			// },


		},


	}
</script>

<style lang="scss">
	page {
		background-color: #000000;
		color: #ffffff;
	}

	.uni-date-x .uni-date-range {
		background-color: #312c34 !important;
		color: #ffffff !important;
	}

	.history_table_style {
		display: flex;

		.table {
			min-width: auto !important;
		}

		// tr:nth-child(1){
		// 	position: absolute;
		// }

	}

	.show_hint {
		text-align: center;

	}

	.main_title_style {
		margin: 20px;
		font-size: 20px;
		font-weight: bold;
	}

	.uni-container {
		background-color: #312c34;
		width: 98%;
		margin: 10px 0 50px 1%;
		position: absolute;
		top: 375px;
		padding-bottom: 30px;
		border-radius: 25px;

		.uni-table {
			color: #ffffff;

			.uni-table-tr:nth-of-type(odd) {
				background-color: #0096db;
				color: #ffffff;
			}

			.uni-table-tr:nth-of-type(even) {
				background-color: #00668e;
				color: #ffffff;
			}

			.uni-table-th {
				color: #ffffff;

			}

			.uni-table-td {
				color: #ffffff;
			}
		}

		.uni-table {
			.uni-table-tr:nth-of-type(odd):hover {
				background-color: #0096db;
			}

			.uni-table-tr:nth-of-type(even):hover {
				background-color: #00668e;
			}
		}
	}

	.line_chart_style {
		background-color: #312c34;
		border-radius: 25px;
		width: 98%;
		position: absolute;
		margin-left: 1%;
		margin-top: 3%;

		.boottom_style {
			height: 25px;
		}

		.charts_style {
			width: 98%;
			height: 250px;
		}
	}

	.history_column {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: auto;

		.history_title {
			width: 22%;
			height: auto;
			margin: 10px 20px;

			text {
				font-size: 20px;
				font-weight: bold;
			}
		}

		.history_filter {
			.form_style {
				.form_column2 {
					display: flex;
					width: 100%;
					column-gap: 20px;

					.select_style {
						flex: 1;
						width: 40%;
					}

					.submit_style {
						flex: 1;

						button {
							width: 100%;
							height: 35px;
						}
					}
				}
			}

		}

		// .history_filter {
		// 	width: 78%;
		// 	display: flex;
		// 	flex: 4;
		// 	align-items: center;
		// 	justify-content: center;

		// 	.history_filter_item {
		// 		flex-grow: 1;
		// 		border-radius: 25px;
		// 		border-style: solid;
		// 		border-width: 1rpx;
		// 		border-color: #0096db;
		// 		text-align: center;
		// 		margin-right: 5px;
		// 	}

		// 	.history_filter_item_active {
		// 		flex-grow: 1;
		// 		border-radius: 25px;
		// 		border-style: solid;
		// 		border-width: 1rpx;
		// 		border-color: #0096db;
		// 		background-color: #0096db;
		// 		text-align: center;
		// 		margin-right: 5px;
		// 	}
		// }



	}
</style>