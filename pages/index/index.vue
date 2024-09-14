<template>
	<view>
		<view>
			<u-swiper :list="swiper_list" indicator indicatorMode="line" circular></u-swiper>
		</view>
		<view>
			<view class="u-page">
				<u-list @scrolltolower="scrolltolower">
					<u-list-item class="news_list" v-for="(item, index) in news_content_list" :key="index">
						<u-row>	
							<u-col span="4">
							<image class="news_picture" :src="item.picture"></image>
							</u-col>
							<u-col span="8">
								<text>{{item.title}}</text>
								<text>{{item.content}}</text>
								<text>{{item.createtime}}</text>
							</u-col>
						</u-row>
					</u-list-item>
				</u-list>
			</view>
		</view>
	</view>



</template>

<script>
	export default {
		data() {
			return {
				swiper_list: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				],
				news_content_list: [{
					title: "新闻标题1",
					content: "新闻内容1",
					createtime:"2022:16:40",
					picture: "https://cdn.uviewui.com/uview/album/1.jpg"
				}, {
					title: "新闻标题2",
					content: "新闻内容2",
					createtime:"2020:5:45",
					picture: "https://cdn.uviewui.com/uview/album/2.jpg"
				}, {
					title: "新闻标题3",
					content: "新闻内容3",
					createtime:"2021:3:10",
					picture: "https://cdn.uviewui.com/uview/album/3.jpg"
				}, {
					title: "新闻标题4",
					content: "新闻内容4",
					createtime:"2022:13:50",
					picture: "https://cdn.uviewui.com/uview/album/4.jpg"

				}],

			}
		},
		// onLoad() {
		// 	this.loadmore()
		// },
		methods: {
			// 事件@scrolltolower滚动到底部触发事件
			// scrolltolower() {
			// 	this.loadmore()
			// },
			// loadmore() {
			// 	for (let i = 0; i < 30; i++) {
			// 		this.indexList.push({
			// 			url: this.urls[uni.$u.random(0, this.urls.length - 1)]
			// 		})
			// 	}
			// }
		},


	}
</script>

<style lang="scss">
	page {
		background-color: #000000;
		color: white;
	}
	.news_list{
		width: 100%;
		height:200px;
	}
	.news_picture{
		width: 80px !important;
		height: 80px !important;
	}
</style>
