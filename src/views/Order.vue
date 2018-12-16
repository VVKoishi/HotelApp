<template>
  <div class="order">
    <h2>待支付</h2>
    <OrderCard :orders="orders">
      <template slot="payOrPaid" slot-scope="slotProps">
        <el-button @click="cancel(slotProps.order_id)" style="margin-right: 5px;" type="info" size="small" round>取消订单</el-button>
        <el-button type="primary" size="small" round>确认支付</el-button>
      </template>
    </OrderCard>

    <h2>完成订单</h2>
    <OrderCard :orders="finishedOrder">
      <template slot="payOrPaid">
        <i style="font-size: 150%;" class="el-icon-check"></i>
      </template>
    </OrderCard>
  </div>
</template>


<script>
import axios from 'axios';
import store from '@/store.js'
import OrderCard from '@/components/OrderCard'



export default {
  data () {
    return {
      finishedOrder: []
    }
  },
  computed: {
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
  methods: {
    fetchData () {
      axios.post('/api/order/selectOrder',{
      }).then((response) => {
        // console.log(response);
        this.finishedOrder = response.data;
        this.finishedOrder.forEach(order => {
          order.start_date = new Date(order.start_date).toLocaleDateString().split('/').join('-');
          order.leave_date = new Date(order.leave_date).toLocaleDateString().split('/').join('-');
        });
      });
    },
    cancel (order_id) {
      this.$store.commit('cancelOrder', order_id);
    }
  },
  components: {
    OrderCard
  }
}
</script>
