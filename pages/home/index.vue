<template>
	<view>
          <view class="header">
            <img :src="logo" alt="Health Track logo" class="logo">
            <img src="/static/image/暂未发布.png" alt="Health Track logo" class="anoimg">
          </view>
          <view class="btn">
            <view class="menu-item">
              <img src="/static/image/文档扫描.png"  class="scan">
              <view>
                <view class="menu-text">拍照导入</view>
                <view class="menu-description">扫描纸张，创建计划</view>
              </view>
              <i class="cuIcon-right"></i>
            </view>
           <view class="imp">
             <view class="menu-item menu-item-green">
              <img src="/static/image/导入.png" class="docin">
              <view>
                <view class="menu-text">文档导入</view>
                <view class="menu-description">处理PDF文件，永久导入</view>
              </view>
              <i class="cuIcon-right"></i>
            </view>
           </view>
          </view>
          
          <view class="form">
            <view class="description" >最近添加</view>
            <view class="content">
              <img src="/static/image/暂未发布.png" alt="Illustration of a person standing next to a large document" class="illustration">
              <tabbar tabIndex="0"></tabbar>
            </view>
		        
          </view>
		  
  </view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				logo:  '/static/image/logo.png',
			}
		}
	}
</script>

<style>
    body {
      font-family: 'Noto Sans SC', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #F5F5F7;
      width: 100%;
      height: 100%;
    }
    #app {
      max-width: 750px;
      margin: auto;
      color: #333;
    }
    .header {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      align-items: center;
      width:100%;
      height: 17%;
    }
    .logo {
      width: 59%;
      aspect-ratio: 100 / 36.2;  /* 等价于宽度与高度的比例为100:36.2 */
    }
    .anoimg {
      width: 41%;
      aspect-ratio: 100 / 40;
    }
    .header .status-bar {
      font-size: 12px;
      display: flex;
      gap: 5px;
    }
    .cuIcon-right{
      size: 50px;
    }
    .btn{
      width: 100%;
      height: 36.5%;
    }
    .form{
      width: 100%;
      height: 57%;
      display: flex;
    }
    .scan{
      height: 120px;
    }
    .docin{
      height: 120px;
    }
    .menu-item {
      background-color: #007AFF;
      border-radius: 15px;
      padding: 1rem;
      margin: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    .menu-item-green {
      background-color: #34C759;
    }
    .menu-text {
      font-size: 38px;
      font-weight: 500;
    }
    .menu-description {
      font-size: 20px;
      margin-top: 0.5rem;
    }
    .content {
      text-align: center;
      margin: 2rem 0;
    }
    .content img {
      width: 200px;
      height: 200px;
    }
    .description {
      color: #333;
      margin-top: 1rem;
      font-size: 35px;
      margin-left: 20px;
    }
	.menu-item{
		margin-left: 40px;
		margin-right: 40px;
	}
  .content{
    width: 100%;
    height: 70%;
  }
  .illustration{
    width: 60%;
    aspect-ratio: 1 / 1;
  }
  </style>