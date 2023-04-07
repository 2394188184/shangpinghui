import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/home/index.js'
import search from '@/store/search/index.js'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        home,
        search
    }
})