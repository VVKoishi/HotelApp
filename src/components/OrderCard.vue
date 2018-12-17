<template>
  <div class="ordercard">
    <el-card 
      v-for="order in orders"
      :key="order.order_id"
      :body-style="{ padding: '0px' }" shadow="never">
      <el-row>
        <el-col :span="8">
          <img src="@/assets/room.jpg" class="image">
        </el-col>
        <el-col :span="16">
          <el-row>
            <div style="float: left; margin-left: 4px;">
              <span>{{ order.room_name }}</span> |
              <span>{{ order.hotel_name }}</span>
            </div>
            <div style="float: right;">
              <span style="color: red;"><small>￥</small>{{ order.payment }}</span> /
              <span><small>{{ order.amount }}间</small></span>
            </div>
          </el-row>
          <el-row style="float: left; margin-left: 4px; padding: 0 5px; font-size: 50%; color: grey;">
            <span>{{ order.start_date }}</span> 至
            <span>{{ leaveDatePlusOne(order.leave_date) }}</span>
            <span> 共{{ days(order.start_date,order.leave_date) }}晚</span>
          </el-row>
          <el-row style="position: absolute; bottom: 0; right: 0; padding: 5px;">
            <slot name="payOrPaid" :order_id="order.order_id"></slot>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>


<script>

export default {
  name: 'OrderCard',
  props: ['orders'],
  data () {
    return {
      
    }
  },
  methods: {
    leaveDatePlusOne: function (leaveDateStr) {
      return new Date(new Date(leaveDateStr).setDate(new Date(leaveDateStr).getDate()+1)).toLocaleDateString().split('/').join('-');
    },
    days: function (startDateStr, leaveDateStr) {
      return new Date(new Date(leaveDateStr)-new Date(startDateStr)).getDate();
    }
  },
  components: {

  }
}
</script>
