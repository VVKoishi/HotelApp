<template>
  <el-card :body-style="{ padding: '0px' }" shadow="never">
    <el-row>
      <el-col :span="8"><div class="grid-content">
        <img src="@/assets/hotel.jpg" class="image">
      </div></el-col>
      <el-col :span="16"><div class="grid-content">
        <div style="padding: 4px;">
          <el-row>
            <el-col :span="12">
              <span style="float: left;">{{ hotelName }}</span>
            </el-col>
            <el-col :span="12">
              <span style="float: right;"><small>￥</small><span style="color: red; font-size: 150%;">{{ minPrice }}</span><small>起</small></span>
            </el-col>
          </el-row>
          
          <Rating :value5="stars" style="float: left; margin-left: 4px;"/>
          <div style="float: right;">
            <i class="el-icon-location" style="color: #1BA2E6;"></i>
            <span style="color: grey; font-size: 50%;">成都市高新西区</span>
          </div>
          <!-- <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
          </div> -->
        </div>
      </div></el-col>
    </el-row>
  </el-card> 
</template>

<style>
  a:-webkit-any-link {
      color: inherit;
      cursor: none;
      text-decoration: none;
  }

  small {
    font-size: 50%;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    margin: 2px;
    border-radius: 4px;
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .el-row {
    vertical-align: middle;
    padding: 5px;
    margin-bottom: 0;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<script>
import Rating from './Rating.vue'

export default {
  name: 'Card',
  props: ['hotelName', 'stars', 'minPrice'],
  // data() {
  //   return {
  //     hotelId: 10,
  //     hotelName: '宜家酒店',
  //     stars: 2.7,
  //     minPrice: 120,
  //     currentDate: new Date()
  //   };
  // },
  components: {
    Rating
  }
}
</script>
