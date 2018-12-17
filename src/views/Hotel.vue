<template>
  <div class="hotel">
    <div class="hotel_panel">
      <el-row>
        <el-col :span="16"><div class="grid-content">
          <div style="padding: 4px;">
            <el-row>
              <span style="float: left;">{{ $route.params.hotelName }}</span>
              <Rating :value5="parseInt($route.params.stars)" style="float: right; margin-right: 4px;"/>
            </el-row>
            <el-row style="padding: 0;">
              <div style="float: left; font-size: 50%; margin: 8px 0 0 5px;">
                <span>{{ $route.params.startDate }} 至 {{ $route.params.endDate }}</span>
                <span> 共{{ days }}晚</span>
              </div>
            </el-row>
            <div style="float: left; margin-left: 4px;">
              <router-link to="/map">
                <i class="el-icon-location" style="color: #1BA2E6;"></i>
                <span style="color: grey; font-size: 50%;">成都市高新西区西源大道2006号</span>
              </router-link>
            </div>
          </div>
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
          <img src="@/assets/hotel.jpg" class="image">
        </div></el-col>
      </el-row>
    </div>
    <RoomCard
      v-for="room in rooms"
      v-show="room.remain!=0"
      :key="room.room_id"
      :room="room"
      style="margin-bottom: 2px;"
      @addToOrders="addToOrders(room)"
    />
  </div>
</template>

<style>
  .hotel_panel {
    background-color:aliceblue;
    border-radius: 4px 4px 0 0;
    margin-bottom: 2px;
  }
</style>


<script>
import axios from 'axios';
import store from '@/store.js'
import RoomCard from '@/components/RoomCard.vue'
import Rating from '@/components/Rating.vue'



export default {
  name: 'hotel',
  data () {
    return {
      rooms: []
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      var startDate = this.$route.params.startDate;
      var endDate = this.$route.params.endDate;
      var endDateList = endDate.split('-');
      endDateList[2]--;
      endDate = endDateList.join('-');

      var days = this.days;

      axios.post('/api/room/selectRoom',{
        startDate: startDate,
        endDate: endDate,
        hotelId: this.$route.params.hotelId,
        days: days
      }).then((response) => {
        // console.log(response);
        this.rooms = response.data;

        if(this.rooms.length===0) this.$message({
          message: '未搜索到相应结果',
          center: true
        });
      });
    },
    addToOrders (room) {
      var startDate = this.$route.params.startDate;
      var endDate = this.$route.params.endDate;
      var endDateList = endDate.split('-');
      endDateList[2]--;
      endDate = endDateList.join('-');

      this.$store.commit('addToOrders', {
        order_id: Math.floor(Math.random() * 100000 + 1000), // 待改
        hotel_id: this.$route.params.hotelId,
        hotel_name: this.$route.params.hotelName,
        room_id: room.room_id,
        room_name: room.room_name,
        amount: room.amount,
        payment: room.payment,
        start_date: startDate,
        leave_date: endDate
      })
    }
  },
  computed: {
    days : function () {
      var startDate = this.$route.params.startDate;
      var endDate = this.$route.params.endDate;
      var endDateList = endDate.split('-');
      endDateList[2]--;
      endDate = endDateList.join('-');

      return new Date(new Date(endDate)-new Date(startDate)).getDate();
    }
  },
  components: {
    RoomCard,
    Rating
  }
}
</script>