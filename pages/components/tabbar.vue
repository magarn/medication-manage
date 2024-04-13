<template>
	<view>
		<view class="cu-bar tabbar bg-white pos-bottom">
			<view class="action" @click="setTab(item)" v-for="(item,index) in tabbar" :key="index" :class="{'text-green':tabIndex == index,'text-gray add-action':item.center}">
				<view v-if="item.center">
					<button class="cu-btn cuIcon-cameraadd bg-orange shadow"></button>
				</view> 
				<view :class="item.icon" v-else></view> {{item.text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				tabbar: [
					{
						icon: "cuIcon-homefill",
						text: "首页",
						page: "../home/index",
						center: false
					},
					{
						icon: "cuIcon-shopfill",
						text: "药箱",
						page: "../add/add",
						center: false
					},
					{
						icon: "cuIcon-cameraadd",
						text: "拍照",
						page: "",
						center: true
					},
					{
						icon: "cuIcon-formfill",
						text: "体检单",
						page: "../user/user",
						center: false
					},
					{
						icon: "cuIcon-myfill",
						text: "个人中心",
						page: "../user/user",
						center: false
					}
				],
			}
		},
		name: 'tabbar',
		computed: {
		
		},
		props: {
			tabIndex: {
				type: String,
				default:JSON.toString(0)
			}
		},
		mounted() {
			this.index = this.tabIndex;
		},
		methods: {
			setTab(item) {
				uni.navigateTo({
					url:item.page
				})
			}
		}
	}
</script>

<style scoped>
	.pos-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	
	
</style>
