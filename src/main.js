import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'LUM054PkDKgX441BrE3KMMdqc00GNbcz'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
