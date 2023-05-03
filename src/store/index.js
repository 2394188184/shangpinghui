import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/home/index.js'
import search from '@/store/search/index.js'
// 引入detail仓库
import detail from '@/store/detail/index.js'
//引入Cart【购物车】仓库
import cart from '@/store/cart/index.js'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        cart
    }
})