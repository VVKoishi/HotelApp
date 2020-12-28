<template>
  <div class="account_info">
    <h1>Account Info</h1>    
    <el-avatar icon="el-icon-user-solid" shape="square" :size="50"></el-avatar>
    <h2 class="info-text">{{ user.user_name }} <img alt="logout" src="@/assets/logout.png" @click="logout()"></h2>
    <p class="info-text">{{ user.user_phone }}</p>
    <p class="info-text description">{{ user.user_description }} <i class="el-icon-edit" @click="alter()"></i></p>
    
    <AccountChart :orders="finishedOrder"></AccountChart>
  </div>
</template>


<style scoped>
.el-avatar {
  font-size: 30px;
}
.info-text {
  margin: 10px;
}
.description {
  font-family: Brush Script MT;
  font-size: 25px;
}
.info-text img {
  height: 18px;
  width: 18px;
  margin-right: -20px;
}
.info-text i {
  font-size: 70%;
  margin-right: -20px;
  color: grey;
}
</style>

<script>
import axios from 'axios';
import AccountChart from '@/components/AccountChart';

export default {
  name: 'AccountInfo',
  data() {
    return {
      user: {},
      finishedOrder: []
    };
  },
  computed: {
    userID: {
      get() {
        return this.$store.state.userID;
      }
    },
    userType: {
      get() {
        return this.$store.state.userType;
      }
    },
    orders: {
      get() {
        return this.$store.state.orders;
      }
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果有变化，会再次执行该方法
    'userID': 'fetchData',
    'orders': 'fetchData', // 防止提交新订单后，本地支出数据不更新，比较tricky
  },
  methods: {
    fetchData () {
      // 检查是否已经登录，否则退出
      if (this.userID == 0) {
        return;
      }

      // 获取用户信息
      axios.post('/api/user/info',{
        user_id: this.userID
      }).then((response) => {
        // console.log(response.data);
        this.user = response.data[0];
        this.fetchDataRound2();
      });
    },
    fetchDataRound2 () {
      // 获取订单信息，用于展示图表
      // 为什么要同步请求，因为否则hotel_id拿不到
      if (this.userType == 0) { // 用户
        axios.post('/api/order/selectOrder',{
          user_id: this.userID
        }).then((response) => {
          // console.log(response);
          this.finishedOrder = response.data;
          this.finishedOrder.forEach(order => {
            order.create_date= new Date(order.create_date).toLocaleDateString().split('/').join('-');
            order.start_date = new Date(order.start_date).toLocaleDateString().split('/').join('-');
            order.leave_date = new Date(order.leave_date).toLocaleDateString().split('/').join('-');
          });
        });
      }
      else if (this.userType == 1) {  // 商家
        var hotel_id = parseInt(this.user.admin_hotel_id);  // 为什么要同步请求，因为否则hotel_id拿不到
        axios.post('/api/order/selectHotelOrder',{
          hotel_id: hotel_id
        }).then((response) => {
          // console.log(hotel_id);
          // console.log(response);
          this.finishedOrder = response.data;
          this.finishedOrder.forEach(order => {
            order.create_date= new Date(order.create_date).toLocaleDateString().split('/').join('-');
            order.start_date = new Date(order.start_date).toLocaleDateString().split('/').join('-');
            order.leave_date = new Date(order.leave_date).toLocaleDateString().split('/').join('-');
          });
        });
      }
      else {
        this.finishedOrder = [];
      }
    },
    logout () {
      this.$store.commit('quit');
    },
    alter () {
      // this.$store.commit('submitOrder', order_id);
      // this.$router.push('/pay');
      this.$message({
        showClose: true,
        message: '暂不支持修改账户信息',
        type: 'warning'
      });
    }
  },
  components: {
    AccountChart
  }
}
</script>