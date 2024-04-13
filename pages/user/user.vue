<template>
	<view class="box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人中心</block>
		</cu-custom>
		<!--中间内容-->
		<view class="personal">
			<view class="personal-main" v-if="isLogin">
				<u-avatar :src="avatars" mode="img" shape="square" size="60" class="u-avatar"></u-avatar>
				<view class="personal-info">
					<view style="margin-left: 10px;">
						<u-tag :text="userName" type="success" plain></u-tag>
					</view>
				</view>
			</view>
			<view class="personal-main" v-else-if="nickName">
				<u-avatar :src="avatar" mode="img" shape="square" size="60" class="u-avatar"></u-avatar>
				<view class="personal-info">
					<view style="margin-left: 10px;">
						<u-tag :text="nickName" type="success" plain></u-tag>
					</view>
				</view>
			</view>
			<view class="personal-main" v-else>
				<view class="personal-info">
					尊贵的用户&nbsp;请您先登录！
				</view>
			</view>
			<u-icon name="arrow-right" size="20" class="p-right-icon"></u-icon>
		</view>
		<view class="n-p" v-for="(item,index) in list" :key="index" hover-class="hover-class" @click="onClick(item)">
			<view style="position: relative">
				<view class="p-left">
					<u-icon :name="item.icon" size="16"></u-icon>
				</view>
			</view>
			<view class="p-right">
				<view class="p-right-main">
					<view class="p-right-main-name">{{item.name}}</view>
				</view>
				<view class="lfet-a">
					<view style="position: relative"></view>
					<u-icon name="arrow-right" size="20" class="p-right-icon"></u-icon>
				</view>
			</view>
		</view>
		<view class="padding-xl">
			<button class="cu-btn block bg-blue margin-tb-sm lg shadow" @click="hasLogin">
				登录<text style="margin: 10px;">|</text>注册
			</button>
			<view>
				<button class="cu-btn block bg-green margin-tb-sm lg shadow" @click="getUserProfile"> 微信一键登录
				</button>
				<button v-if="isLogin" class="cu-btn block bg-green margin-tb-sm lg shadow" @click="Recommend"> 关键词药品推荐
				</button>
			</view>
			<button class="cu-btn block bg-grey margin-tb-sm lg shadow" @click="loginOut">
				退出登录
			</button>
		</view>

		<!--引入tabar-->
		<tabbar tabIndex="0"></tabbar>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				avatars: '/static/image/logo.jpeg',
				list: [{
					name: '设置',
					id: 'setUp',
					icon: 'setting-fill',
					iconBackground: '#3b2021',
				}],
				nickName:"",
				avatar:""
			}
		},
		mounted() {

		},
		computed: {
			userName() {
				return this.$store.getters.getName;
			},
			isLogin() {
				return this.$store.getters.isLogin;
			}
		},

		methods: {
			getUserProfile: function(e) {
                var that = this
                uni.showModal({
                	mask: true,
                	title: '温馨提示',
                	content: '授权微信登录后才能正常使用小程序',
                	success(res) {
                		if (res.confirm) {
                			uni.getUserProfile({
                				desc: '获取你的昵称、头像',
                				success: userRes => {
                					if (userRes.errMsg == 'getUserProfile:ok' && userRes.userInfo !=
                						undefined) {
                						var userInfo = {
                							avatarUrl: userRes.userInfo.avatarUrl,
                							nickName: userRes.userInfo.nickName
                						}
                						// 对页面中的变量进行赋值
                						that.nickName = userInfo.nickName
                						that.headerUrl = userInfo.avatarUrl
                						// 调用接口请求openid
                						that.getUserOpenId(userInfo)
                					} else {
                						uni.showToast({
                							icon: 'none',
                							title: '获取失败，请重试'
                						})
                					}
                				},
                				fail: error => {}
                			})
                		} else if (res.cancel) {
                
                		}
                	}
                })
			},
			getUserOpenId(userInfo) {
				var that = this
				uni.login({
					provider: 'weixin',
					async success(loginAuth) {
						var data = {
							'avatarUrl':userInfo.avatarUrl,
							'nickName':userInfo.nickName,
							'code': loginAuth.code
						}
						uni.request({
							url:  that.$api+'/users/wxlogin',
							data: data,
							method: 'post',
							success: (res) => {
								if (res.data.length) {
									//请求回来后，把用户信息存储到VUEX里
									that.$store.dispatch('saveUserInfo', res.data[0].nickName);
									that.$store.dispatch('saveUserId', res.data[0].user_id);
									that.$store.dispatch('isLogin', "token");
								}
								uni.switchTab({
									url:'/pages/index/index'
								})
							},
							fail: (err) => {
								uni.showToast({
								 	title: '网络或接口出现错误',
								 	icon: 'none'
								});
							}
						})
					}
				})
			},
			hasLogin() {
				if (isNaN(this.isLogin) == true||isNaN(this.nickName)==true) {
					uni.showToast({
						title: '您已经登录',
						icon: 'success'
					});
				} else {
					uni.navigateTo({
						url: "/pages/user/loginAndReg/login"
					})
				}
			},
			loginOut() {
				if (isNaN(this.isLogin) == false&&isNaN(this.nickName)==false) {
					uni.showToast({
						title: '您还未登录',
						icon: 'none'
					});
				} else {
					wx.removeStorageSync("userinfo")
					this.nickName=""
					this.$store.dispatch("LogOut").then(response => {
						uni.showToast({
							title: '成功退出',
							icon: 'success'
						});
					});
				}
			},
			Recommend(){
				uni.navigateTo({
					url: "/pages/recommend/index"
				})
			},
			onClick(item){
				console.log(item)
			}
		}
	}
</script>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>

<style lang="scss" scoped>
	.personal {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0 40rpx 30rpx;
		background-color: #ffffff;
		margin-top: 12px;
	}

	.personal-main {
		display: flex;
		align-items: center;
		height: 40px;

	}

	.personal-info {
		display: flex;
		flex-direction: column;
		font-size: 16px;
	}

	.u-avatar {
		margin-right: 30rpx;
	}

	.navbar-right {
		padding: 0 40rpx;
	}

	.navbar-right-icon {
		margin-left: 50rpx;
	}

	.hover-class {
		background-color: #efefef;
	}

	.n-p {
		margin-top: 10px;
		display: flex;
		align-items: center;
		background-color: #ffffff;
		margin-bottom: 20rpx;
	}

	.p-right-icon {
		padding: 0 40rpx;
	}

	.p-left {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		padding: 10rpx;
		margin: 20rpx;
		color: #FFFFFF;
		border-radius: 10rpx;

	}

	.p-right {
		height: 90rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-right-main {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-right-main-name {
		font-size: 30rpx;
		font-weight: 500;
	}

	.p-right-main-time {
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #9d9d9d;
	}
</style>
