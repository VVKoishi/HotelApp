<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="block" style="margin-bottom: 5px;">
      <el-row>
        <span class="demonstration">入住日期：</span>
        <el-date-picker
          v-model="startDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="入住日期">
        </el-date-picker>
      </el-row>
      <el-row>
        <span class="demonstration">离店日期：</span>
        <el-date-picker
          v-model="endDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="离店日期">
        </el-date-picker>
      </el-row>
      <el-button id="search" type="primary" icon="el-icon-search"
        @click="selectHotel()"
        style="min-width: 320px;">搜索
      </el-button>
    </div>
    <transition-group name="list-complete">
      <template v-for="hotel in hotels">
        <div :key="hotel.hotel_id"
          class="list-complete-item">
          <router-link :to="'/'+hotel.hotel_id+'/'+hotel.hotel_name+'/'+hotel.stars+'/'+startDate+'/'+endDate">
            <Card
              :hotelName="hotel.hotel_name"
              :stars="hotel.stars"
              :minPrice="hotel.minPrice"
              style="margin-bottom: 2px;"
            />
          </router-link>
        </div>
      </template>
    </transition-group>
  </div>
</template>

<style>

.list-complete-item {
  transition: all .5s;
  display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.demonstration {
  margin: 0 10px;
  font-family: Hiragino Sans GB;
}

el-button {
  font-size: 16px;
}

#search {
  background-color: #409EFF;
  border-color: #409EFF;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import DateSelector from '@/components/DateSelector.vue'
import Card from '@/components/Card.vue'
import axios from 'axios'

// axios.post

export default {
  name: 'home',
  data() {
    return {
      hotels: []
    }
  },
  methods: {
    selectHotel: function() {
      var startDate = this.startDate;
      var endDate = this.endDate;
      var endDateList = endDate.split('-');
      endDateList[2]--;
      endDate = endDateList.join('-');

      var days = this.days;

      axios.post('/api/hotel/selectHotel',{
        startDate: startDate,
        endDate: endDate,
        days: days
      }).then((response) => {
        // console.log(response);
        this.hotels = response.data;

        if(this.hotels.length===0) this.$message({
          message: '未搜索到相应结果',
          center: true
        });
      });
    }
  },
  computed: {
    // sortable: function () {
    //   return this.hotels.length!=0;
    // },
    startDate: {
      get () {
        return this.$store.state.startDate;
      },
      set (value) {
        this.$store.commit('updateStartDate', value)
      }
    },
    endDate: {
      get () {
        return this.$store.state.endDate;
      },
      set (value) {
        this.$store.commit('updateEndDate', value)
      }
    },
    days : function () {
      var startDate = this.startDate;
      var endDate = this.endDate;
      var endDateList = endDate.split('-');
      endDateList[2]--;
      endDate = endDateList.join('-');

      return new Date(new Date(endDate)-new Date(startDate)).getDate();
    }
  },
  components: {
    // HelloWorld,
    // DateSelector,
    Card
  }
}
</script>
