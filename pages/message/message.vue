<template>
	<view class="content">
		<view class="input_box">
			<textarea placeholder="请输入您要留言的内容" class="textarea border" v-model="form.content"></textarea>
			<button @click="appPlusAdd" open-type="getUserInfo" @getuserinfo="miniApplogin" class="submit">提交</button>
		</view>		
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<image :src="item.avatarUrl" mode="widthFix" class="logo"></image>
				<view class="word">
					<text class="user_name">{{item.nickName}}</text>
					<text class="content">{{item.content}}</text>
				</view>
				<text class="delete" v-if="form.unionid==item.unionid" @click="remove(item._id)">删除</text>
			</view>
		</view>		
	</view>
</template>
<script>
	const myCloud = uniCloud.init({
		provider: 'aliyun',
		spaceId: '380c7682-e928-4ccd-b19b-99323fd9fdc6',
		clientSecret: 'dH77i2f5k0Jxp8wCY+Hcwg=='
	});
	export default {
		data() {
			return {
				form:{
					"nickName":"",
					"content":"",
					"uuid":'',
					"avatarUrl":"",
					"unionid":""
				},
				list:[
					{
						"user_name":"加载中",
						"content":"加载中"
					}
				],
				wHeight:0
			}
		},
		onLoad() {
			//this.wHeight = uni.getSystemInfoSync().windowHeight-30+'px';
			uni.login({
				provider: 'weixin',
				success:loginRes=>{
					console.log(loginRes);
					
					//#ifdef APP-PLUS
						console.log(loginRes.authResult.unionid);
						this.form.unionid = loginRes.authResult.unionid;
						uni.getUserInfo({
						provider: 'weixin',
							success: infoRes=>{
								console.log(infoRes);
								this.form.nickName  =  infoRes.userInfo.nickName;
								this.form.avatarUrl =  infoRes.userInfo.avatarUrl;
							}
						});						
						this.getData();
					//#endif					
					//#ifdef MP-WEIXIN					
					uni.showToast({
						title: '微信小程序登陆需要修改，云函数getUnionid的appid和secret',
						icon:'none',
						duration:5000
					});					
					myCloud.callFunction({
						name: 'getUnionid',
						data:{
							js_code  : loginRes.code
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
			miniApplogin(e){
				console.log(e.detail.userInfo);
				this.form.nickName  =  e.detail.userInfo.nickName;
				this.form.avatarUrl =  e.detail.userInfo.avatarUrl;
				this.add()
			},
			remove(id){
				myCloud.callFunction({
				  name: 'remove',
				  data:{
					  _id:id
				  }
				}).then((res) => {
					//console.log(res);
					this.getData()
				})
			},
			getData(){
				myCloud.callFunction({
				  name: 'get'
				}).then((res) => {
					//console.log(res);
					this.list = res.result.data;
				})
			},
			appPlusAdd(){
				//#ifdef APP-PLUS
					this.add();
				//#endif
			},
			add(){
				if(this.form.user_name==''){
					uni.showToast({
						title: '昵称不能为空'
					});
					return false
				}
				if(this.form.content==''){
					uni.showToast({
						title: '内容不能为空'
					});
					return false
				}
				if(this.form.unionid==''){
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
<style lang="scss">
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
</style>
