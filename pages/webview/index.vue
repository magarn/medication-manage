<template>
  <view>
	<cu-custom bgColor="bg-gradual-blue" :isBack="true">
	   <block slot="backText">返回</block>
	   <block slot="content">智能推荐</block>
	</cu-custom>
    <!--中间内容-->
    <view class="content">
		<web-view :src="ul"></web-view>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ul: ''
    }
  },
  onLoad(item) {
    this.ul = decodeURIComponent('https://www.baidu.com/s?wd='+item.keyword)
    // 传入需要跳转的链接 使用web-view标签进行跳转
  }
}
</script>

<style lang="scss">
	.content {
		margin-top: 12px;
		background-color: #FFFFFF;
	}
</style>

