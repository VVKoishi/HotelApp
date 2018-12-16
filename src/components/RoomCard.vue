<template>
  <el-card :body-style="{ padding: '0px' }" shadow="never">
    <el-row>
      <el-col :span="8"><div class="grid-content">
        <img src="@/assets/room.jpg" class="image">
      </div></el-col>
      <el-col :span="16"><div class="grid-content">
        <div style="padding: 4px;">
          <el-row>
            <el-col :span="12">
              <span style="float: left;">{{ roomName }}</span>
            </el-col>
            <el-col :span="12">
              <span style="float: right;"><small>￥</small><span style="color: red; font-size: 150%;">{{ payment }}</span></span>
            </el-col>
          </el-row>
          <div style="margin: 10px 4px 0 4px;">
            <span style="font-size: 50%; float: left;">空余房间：<span style="color: green;">{{ remain }}</span></span>
            <el-input-number size="mini" v-model="amount" style="width: 100px;"
              :min="1"
              :max="parseInt(remain)"></el-input-number>
            <i style="font-size: 150%; float: right;" class="el-icon-sold-out"></i>
          </div>
        </div>
      </div></el-col>
    </el-row>
  </el-card> 
</template>

<style>
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

export default {
  name: 'RoomCard',
  props: ['roomName', 'remain', 'sumPrice'],
  data() {
    return {
      amount: 1    
    };
  },
  computed: {
    payment: function () {
      return this.amount * parseInt(this.sumPrice);
    }
  },
  components: {
    
  }
}
</script>
