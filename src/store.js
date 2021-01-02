import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // startDate: new Date().toLocaleDateString().split('/').join('-'),
    // endDate: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString().split('/').join('-'),
    startDate: '2020-11-14',
    endDate: '2020-11-15',
    orders: [], // 打算提交的订单
    userID: 0,
    userType: 0, // 0为用户，1为商家，2为管理，3为超管
    userHotelID: 0, // 仅当userType为商家时使用
  },
  mutations: {
    updateStartDate (state, message) {
      state.startDate = message
    },
    updateEndDate (state, message) {
      state.endDate = message
    },
    login (state, obj) {
      state.userID = obj.userID;
      state.userType = obj.userType;
      if (obj.userHotelID) state.userHotelID = obj.userHotelID;
      else state.userHotelID = 0;
    },
    quit (state) {
      state.userID = 0
      state.userType = 0;
      state.userHotelID = 0;
    },
    cancelOrder (state, order_id) {
      for(let i=0; i<state.orders.length; i++){
        if(state.orders[i].order_id == order_id) {
          state.orders.splice(i,1);
        }
      }
    },
    addToOrders (state, obj) {
      state.orders.push(obj);
    },
    submitOrder (state, order_id) {
      for(let i=0; i<state.orders.length; i++){
        if(state.orders[i].order_id == order_id) {
          state.orders.splice(i,1).forEach(element => {
            axios.post('/api/order/insertOrder',{
              order_id: element.order_id,
              room_id: element.room_id,
              start_date: element.start_date,
              leave_date: element.leave_date,
              amount: element.amount,
              payment: element.payment
            }).then((response) => {
              // console.log(response);
            });
          });
        }
      }
    }
  },
  actions: {

  }
})
