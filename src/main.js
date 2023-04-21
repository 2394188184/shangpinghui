import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router/index.js'
//全局注册组件
import TypeNav from '@/components/TypeNav/index.vue'
import Pagination from '@/components/Pagination/index.vue'
//引入store
import store from '@/store/index.js'
//引入mock的假数据
import '@/mock/index.js'
//引入swiper的样式
import 'swiper/css/swiper.min.css'
import  {reqCategoryList,reqBanner} from '@/api/index.js'
Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)
import request from '@/api/request'
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this  //安装全局事件总线
  },
  mounted(){
  }
}).$mount('#app')
