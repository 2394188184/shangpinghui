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
//引入结算页面【trade】页面
import trade from '@/pages/Trade/index.vue'
//引入支付页面【Pay】页面
import Pay from '@/pages/Pay/index.vue'
//引入支付成功页面【paySuccess】
import paySuccess from '@/pages/PaySuccess/index.vue'
//引入个人中心页面【center】
import center from '@/pages/Center/index.vue'
//引入个人中心页面【center】的二级路由【myOrder】【groupOrder】
import myOrder from '@/pages/Center/myOrder/index.vue'
import groupOrder from '@/pages/Center/groupOrder/index.vue'
//默认暴露一个数组
export default [
    //个人中心页面
    {
        name:'center',
        path:'/center',
        component:center,
        meta:{isShow:true},
        children:[
            {
                name:'myOrder',
                path:'myOrder',
                component:myOrder
            },{
                name:'groupOrder',
                path:'groupOrder',
                component:groupOrder
            },{
                path:'/center',
                redirect:'/center/myOrder'
            }
        ]
    },
    //支付成功页面
    {
        name:'paySuccess',
        path:'/paySuccess',
        component:paySuccess,
        meta:{isShow:true},
        //独享路由守卫
        beforeEnter(to, from, next) {
            //如果是从购物车页面可以到结算页面
            if(from.path =="/pay"){
                next()
            }else{
                //其他页面跳转不发生变化
                next(false);
            }
        },
    },
    //支付页面
    {
        name:'pay',
        path:'/pay',
        component:Pay,
        meta:{isShoe:true},
        //独享路由守卫
        beforeEnter(to, from, next) {
            //如果是从购物车页面可以到结算页面
            if(from.path =="/trade"){
                next()
            }else{
                //其他页面跳转不发生变化
                next(false);
            }
        },
    },
    //结算页面
    {
        name:'trade',
        path:'/trade',
        component:trade,
        meta:{isShoe:true},
        //独享路由守卫
        beforeEnter(to, from, next) {
            //如果是从购物车页面可以到结算页面
            if(from.path =="/ShopCart"){
                next()
            }else{
                //其他页面跳转不发生变化
                next(false);
            }
        },
    },
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