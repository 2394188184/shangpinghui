import Vue from  'vue';
import VueRouter from 'vue-router'; //引入
//引入router的配置
import routes from './routes.js'
// 引入store
import store from '@/store/index.js'
Vue.use(VueRouter);//使用
//定义一个VueRouter
let router =  new VueRouter({
    routes:routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return { y: 0 }
        }
    }
})
//全局前置守卫
router.beforeEach(async (to,from,next)=>{
    //如果你不先放行的话，进不来
    next();
    //登录才有token
    let token = store.state.user.token;
    //name是否存在
    let name = store.state.user.userInfo.name
    if(token){
      //登录号不能去登录页面
      if(to.path =='/login' && !name){
       next('/login')
      }else{
        //如果存在登录信息，放行
        //如果不存在登录信息，获取数据后放行
        //如果token失效，清除用户登录信息并且跳转到登录页面
        if(name){
          next();
        }else{
          try{
            //获取用户数据
            await store.dispatch('GetUserInfo')
            next()
          }catch(e){
            //清除登录数据
            await store.dispatch('loginOut')
            next('/login')
          }
        }
      }
    }
    //未登录暂未处理(不能交易相关（trade）,支付相关（pay,paysuccess）,用户中心（center）)相关跳转到登录页面
    else{
      if(to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1  || to.path.indexOf('/center') != -1){
          next('/login?redirect='+to.path)
      }
    }

})
export default router