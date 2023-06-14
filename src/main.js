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
//引入elementUI
import {Button,MessageBox,Message} from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
// import 'element-ui/lib/theme-chalk/index.css';
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loadimage from '@/assets/images/1.jpg' 
Vue.use(VueLazyload, {
  loading: loadimage,
})
Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)
Vue.component('Pagination',Pagination)
import * as API from '@/api'
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this  //安装全局事件总线
    Vue.prototype.$API = API   //安装$API(统一引入)
  },
  mounted(){
  }
}).$mount('#app')
