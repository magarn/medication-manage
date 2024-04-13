<template>
	<view class="box">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的关键字</block>
		</cu-custom>
		<!--中间内容-->
		<view class="content">
			<view class="title">属于我的关键字:</view>
			<view class="btn_box">
				<u-button v-for="(item,index) in keyWordList" :key="index" type="primary" :custom-style="btnStyle" size="mini" :text="item.keyword" @click="recommend(item.keyword)"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnStyle: {
					width: '80px',
					margin: '10px'
				},
				keyWordList: []
			}
		},
		computed: {
			userId() {
				return this.$store.getters.getId
			}
		},
		mounted() {
			uni.request({
				url: this.$api + '/search/select',
				data: {
					user_id: this.userId
				},
				method: 'post',
				header: {
					'content-type': 'application/json'
				},
				success: (res) => {
					this.keyWordList = res.data
				}
			})
		},
		methods:{
			recommend(keyword){
			    uni.navigateTo({
			    url: '/pages/webview/index?keyword=' + keyword
			    // page.json定义的路径 传url 到webview界面去接收 实现跳转
			    })
			}
		}
	}
</script>

<style scoped>
	.content {
		margin-top: 12px;
		background-color: #FFFFFF;
	}
	.btn_box{
		width: 100%;
		display: flex;
        justify-content:flex-start;
		flex-wrap:wrap;
	}
</style>
