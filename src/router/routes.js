import Home from '@/pages/Home/index.vue'
import Search from '@/pages/Search/index.vue'
import Login from '@/pages/Login/index.vue'
import Register from '@/pages/Register/index.vue'
//引入detail组件
import Detail from '@/pages/Detail/index.vue'
//引入AddCartSuccess【添加购物车】页面
import AddCartSuccess from '@/pages/AddCartSuccess/index.vue'
//引入ShopCart【展示购物车】页面
import ShopCart from '@/pages/ShopCart/index.vue'
//默认暴露一个数组
export default [
     //展示购物车页面
    {
        name:'ShopCart',
        path:'/ShopCart',
        component:ShopCart,
        meta:{isShow:true}
    },   
    //添加购物车页面
    {
        name:'AddCartSuccess',
        path:'/AddCartSuccess',
        component:AddCartSuccess,
        meta:{isShow:true}
    },
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