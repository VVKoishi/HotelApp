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
    orders: [],
    userID: '0'
  },
  mutations: {
    updateStartDate (state, message) {
      state.startDate = message
    },
    updateEndDate (state, message) {
      state.endDate = message
    },
    login (state, userID) {
      state.userID = userID
    },
    quit (state) {
      state.userID = '0'
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
