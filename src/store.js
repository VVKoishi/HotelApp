import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // startDate: new Date().toLocaleDateString().split('/').join('-'),
    // endDate: new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString().split('/').join('-'),
    startDate: '2018-11-14',
    endDate: '2018-11-15',
    orders: [{
      order_id: 111,
      hotel_id: 1,
      hotel_name: '如家酒店',
      room_id: 1,
      room_name: '33号房',
      amount: 2,
      payment: 1300,
      start_date: '2018-11-14',
      leave_date: '2018-11-14'
    }]
  },
  mutations: {
    updateStartDate (state, message) {
      state.startDate = message
    },
    updateEndDate (state, message) {
      state.endDate = message
    },
    cancelOrder (state, order_id) {
      for(let i=0; i<state.orders.length; i++){
        if(state.orders[i].order_id == order_id) {
          state.orders.splice(i,1);
        }
      }
    }
  },
  actions: {

  }
})
