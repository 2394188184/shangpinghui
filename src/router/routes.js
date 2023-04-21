import Home from '@/pages/Home/index.vue'
import Search from '@/pages/Search/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
//引入detail组件
import Detail from '@/pages/Detail/index.vue'
//默认暴露一个数组
export default [
    //详情页面
    {
        name:'detail',
        path:'/detail',
        component:Detail,
        meta:{isShow:true}
    },
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