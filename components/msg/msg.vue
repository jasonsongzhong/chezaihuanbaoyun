<template>
	<view class="box" :class="{self:self}">
		<image :src="data.avatarUrl||avatarUrl" mode="widthFix" class="avatarUrl"></image>
		<view class="content" @longpress="copy">
			<text v-if="self" class="username">{{data.username||"我自己"}}</text>
			<text :class="textClass">{{data.text}}</text>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
	export default {
		computed: {
			...mapState({
				mineId: state=>state.storeMsgList.mineId,
			}),
			/* self(){
				return this.mineId == this.data.senderId
			}, */
			textClass() {
				var textClass = 'text'
				let ll = this.data.text.replace(/[\u0000-\u007f]/g,"a").replace(/[\u0080-\u07ff]/g,"aa").replace(/[\u0800-\uffff]/g,"aa").length
				if(ll>25){
					textClass += ' exceed'
				}
				if(this.self){
					textClass+= ' selfText'
				}
				return textClass
			}
		},
		methods:{
			copy(){
				console.log('ccc');
				uni.setClipboardData({
				    data: this.data.text,
				    success: function () {
				        console.log('success');
				    }
				});
			},
		},
		data() {
			return {
				username:"用户名",
				avatarUrl:"../..//static/logo.png",
			};
		},
		props: {
			data: {
				type: Object,
				default(){
					return {
						text:"你好",
						avatarUrl:"../..//static/logo.png",
						username:"大大"
					}
				}
			},
			self:{
				type: Boolean,
				default(){
					return false
				}
			}
		},
	}
</script>

<style lang="less">
.box{
	width: 750rpx;
	flex-direction: row;
	justify-content: flex-start;
	padding: 0 16rpx;
	margin: 16rpx 0;
	/* border-style: solid;
	border-width: 1px;
	border-color: #2C405A; */
}
.avatarUrl{
	width :100rpx;
	height:100rpx;
	border-radius: 10px;
}
.content{
	margin:0 16rpx;
	flex-direction: column;
	justify-content: flex-start;
}
.username{
	font-size: 26rpx;
	color: #666666;
	margin: 8rpx 0;
}
.text{
	padding:28rpx;
	border-radius: 10px;
	font-size: 32rpx;
	line-height: 20px;
	justify-content: space-between;
	background-color: #FFFFFF;
}
.selfText{
	background-color: #4CD964;
}
.exceed{
	width: 500rpx;
}
.self{
	flex-direction: row-reverse;
}
.selfIcon{
	//transform: rotate(180deg);
}
</style>
