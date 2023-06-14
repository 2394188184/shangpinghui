import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/home/index.js'
import search from '@/store/search/index.js'
// 引入detail仓库
import detail from '@/store/detail/index.js'
//引入Cart【购物车】仓库
import cart from '@/store/cart/index.js'
//引入user【登录与注册】仓库
import user from '@/store/user/index.js'
// 引入trade【结算】仓库
import trade from '@/store/trade/index.js'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        cart,
        user,
        trade
    }
})