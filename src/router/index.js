import Vue from  'vue';
import VueRouter from 'vue-router'; //引入
//引入router的配置
import routes from './routes.js'
Vue.use(VueRouter);//使用
//定义一个VueRouter
export default new VueRouter({
    routes:routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { y: 0 }
        }
    }
})