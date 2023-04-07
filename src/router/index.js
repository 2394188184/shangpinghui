import Vue from  'vue';
import VueRouter from 'vue-router'; //引入
import Home from '@/pages/Home/index.vue'
import Search from '@/pages/Search/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
Vue.use(VueRouter);//使用
//定义一个VueRouter
export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{isShow:true}
        },
        {
            name:'search',
            path:'/search/:keyWord?',
            component:Search,
            meta:{isShow:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{isShow:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{isShow:false}
        },
        //重定向主页为首页  /或者*
        {
            path:'/',
            redirect:'/home'
        }
]
})