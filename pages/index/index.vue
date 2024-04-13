<template>
	<view class="content">
		<view class="text-area">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">查看备忘</block>
			</cu-custom>

            <view class="search">
				<u-search placeholder="请输入药品盒查询" v-model="keyword" @custom="search" @clear="clearSearch"></u-search>
			</view>
			<view class="box">
			<view v-for="(item, index) in memoList" :key="index" class="box_card">
				<uni-card :is-shadow="true" :title="item.title"
					@longpress="touchstart(item.memoId)">
					记录日期：<text>{{dateTimeStr(item.date,'y-m-d h:i:s')}}</text>
					<br />
					用药提醒日期：<text>{{dateTimeStr(item.alarm,'y-m-d h:i:s')}}</text>
					<br />
					用药剂量：<text>{{item.dose}}</text>
					<br />
					是否用药：<text>{{item.flog===1 ? '已用药' : item.flog===0 ? '等待提醒中' : '提示时间过期,未确认用药' }}</text>
					<br />
					<view class="btn">
					<u-button v-if="item.flog===0" :custom-style="btnStyle" type="primary" text="确认用药" size="mini" @click="confirm(item.memoId)"></u-button>
					<u-button :custom-style="btnStyle" type="warning" text="修改" size="mini" @click="detail(item.memoId)"></u-button>	
					<u-button :custom-style="btnStyle" type="error" text="删除" size="mini" @click="touchstart(item.memoId)"></u-button>
					</view>
				</uni-card>
			</view>
			<u-loadmore :status="status" :nomore-text="nomoreText" />
			</view>
			<u-back-top :scroll-top="scrollTop" top="100"></u-back-top>
			<!--弹出层-->
			<view>
				<u-popup :show="show" @close="close" :round="8" mode="center">
					<view style="width: 280px;">
						<u--form :model="loginForm" ref="uLoginForm">
							<u-form-item prop="title">
								药品盒：{{loginForm.title}}
							</u-form-item>
							<u-form-item prop="dose">
								药品剂量：{{loginForm.dose}}
							</u-form-item>
							<u-form-item prop="flog">
								是否用药：{{loginForm.flog===1 ? '已用药' : loginForm.flog===0 ? '等待提醒中' : '提示时间过期,未确认用药'}}
							</u-form-item>
							<u-form-item prop="content">
								药品备注：<u--textarea v-model="loginForm.content" border="true" height=100></u--textarea>
							</u-form-item>
							<u-form-item prop="alarm">
								<u-datetime-picker :minDate="newDay" ref="datetimePicker" @confirm="confirm_date" :show="alarm_show" v-model="loginForm.alarm" :formatter="formatter" mode="datetime">
								</u-datetime-picker>
								<u-button @click="alarm_show = true">{{loginForm.alarm ? loginForm.alarm : '点击选择用药时间' }}</u-button>
							</u-form-item>
							<view class="btn_Box">
								<button type="primary" class="submitBtn" size="mini" @click="updateMemo">确定</button>
								<button type="warn" class="resetBtn" size="mini" @click="retun_btn">取消</button>
							</view>
						</u--form>
					</view>
				</u-popup>
			</view>
			<!--引入tabar-->
			<tabbar tabIndex="0"></tabbar>
		</view>
	</view>
</template>

<script>
	import getDateTime from '@/utils/getdateTime.js';
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				btnStyle:{
				 width: '50px',
				 margin:'10px'
				},
				memoList: [],
				show: false,
				loginForm: {
					title: "",
					dose: "",
					flog: "",
					content: "",
					alarm: null
				},
				status: 'nomore',
				nomoreText: '——已加载全部——',
				scrollTop: 0,
				keyword: '',
				newDay: new Date().valueOf(),
				alarm_show: false

			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReady() {
			
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
			
			this.getList();
		},
		computed: {
			userId() {
				return this.$store.getters.getId;
			},
		},
		methods: {
			touchstart(memoId) {
				let that = this;
				clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
				this.Loop = setTimeout(function() {
					uni.showModal({
						title: '删除',
						content: '请问要删除本条记录吗？',
						success: (res) => {
							if (res.confirm) {
								uni.request({
									url: this.$api + '/memo/delMemoById',
									data: {
										memoId: memoId,
									},
									method: 'post',
									header: {
										'content-type': 'application/json'
									},
									success: (res) => {
										uni.showToast({
											title: '删除成功',
											icon: 'none'
										});
										this.getList();
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					});
				}.bind(this), 1000);
			},
			/*转换时间通用方法*/
			dateTimeStr(date,str){
				return getDateTime.dateTimeStr(date,str)
			},
			// touchend() {
			// 	clearInterval(this.Loop);
			// },
			search (keyword) {
				/*存储关键字*/
				uni.request({
					url: this.$api + '/search/add',
					data: {
						keyword: keyword,
						user_id: this.userId
					},
					method: 'post',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {}
				})
				
				uni.request({
					url: this.$api + '/memo/memoListByTitle',
					data: {
						title: keyword,
						userId: this.userId,
					},
					method: 'post',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						if(res.data.length){
							this.memoList = res.data
						}else{
							this.memoList = []
							uni.showToast({
								title: '搜索数据为空',
								icon: 'none'
							});
						}
					}
				})
				
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				if (type === 'hour') {
					return `${value}时`
				}
				if (type === 'minute') {
					return `${value}分`
				}
				return value
			},
			confirm(memoId){
				uni.request({
					url: this.$api + '/memo/confirm',
					data: {
						memoId:memoId
					},
					method: 'post',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						this.getList()
					}
				})
			},
			confirm_date(){
				setTimeout(() => {
				this.loginForm.alarm = this.dateTimeStr(this.loginForm.alarm,'y-m-d h:i:s')
				this.$refs.datetimePicker.close()  
				this.alarm_show = false  
				}, 20)
			},
			clearSearch(){
				this.getList()
			},
			getList() {
				uni.request({
					url: this.$api + '/memo/memoList',
					data: {
						userId: this.userId,
					},
					method: 'post',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						if(res.data.length){
							this.alarm(res.data)
						}
						this.memoList = res.data
					}
				})
			},
			alarm(data){
				 data.forEach(item=>{
				 setTimeout(()=>{
				 	var itemDay = this.dateTimeStr(Date.parse(item.alarm),'y-m-d')
				 	var newDay = this.dateTimeStr(new Date(),'y-m-d')
				 	var alarm = this.dateTimeStr(Date.parse(item.alarm),'y-m-d h:i:s')
				 	if(itemDay === newDay&&item.flog===0){
				 		uni.showToast({
				 			title: '今日'+alarm+'需要用药,请及时查看',
				 			icon: 'none'
				 		});	
				 	}
					/*如果提醒时间过期，更新用药状态*/
					if(Date.parse(item.alarm)<new Date() && item.flog!==1){
						this.$set(item,'flog',2)
					}
				 },200)
				 })
			},
			detail(memoId) {
				// clearInterval(this.Loop);
				
				this.show = true
				uni.request({
					url: this.$api + '/memo/selMemoById',
					data: {
						memoId: memoId
					},
					method: 'post',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log(res)
						this.loginForm.title = res.data[0].title
						this.loginForm.dose = res.data[0].dose
						this.loginForm.flog = res.data[0].flog
						this.loginForm.content = res.data[0].content
						this.memoId=memoId
					}
				})
			},
			updateMemo() {
				if(this.loginForm.alarm){
					uni.request({
						url: this.$api + '/memo/updateById',
						data: {
							content: this.loginForm.content,
							alarm: this.loginForm.alarm,
							memoId: this.memoId
						},
						method: 'post',
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							this.loginForm.alarm = null
							uni.showToast({
								title: '修改成功',
								icon: 'none'
							});
							this.getList()
							this.show = false
						}
					})
				}else{
					uni.showToast({
						title: '请选择修改时间',
						icon: 'none'
					});
				}	
			},
			retun_btn() {
				this.loginForm = {
					title: "",
					dose: "",
					flog: "",
					content: "",
					alarm: null
				},
				this.show = false
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFE4B5;
	}
</style>

<style scoped lang="scss">
	.search{
	  margin: 10px;	
	}
	
	.before_Login {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
    
	.box{
		height:73vh;
		width:100%;
		overflow-y: auto;
		.box_card {
			font-weight: bold;
		}
	}

	.btn_Box {
		text-align: center;
	}

	.submitBtn,
	.resetBtn {
		width: 80px;
		display: inline-block;
		margin: 5px;
	}
	.btn{
		width:100%;
		height:50px;
		display: flex;
        flex-direction:row;
		align-items:center;
		justify-content:flex-start;
	}
</style>
