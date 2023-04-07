import {reqSearch} from '@/api/index'
//search的vuex小仓库
//存储数据
const state = {
    reqSearch:{},//搜索所用数据
};
//对state进行修改
const mutations = {
    REQSEARCH(state,value){
        state.reqSearch = value
    }
};
//异步处理，业务处理
const actions = {
    //第二个参数为用户派发action传过来的数据
    //es6的默认参数，无传递参数为空对象
    async reqSearch(context,params={}){
         let result = await reqSearch(params);
        //  console.log(result)
         if(result.data.code = 200){
            context.commit('REQSEARCH',result.data.data)
         }
    }
};
const getters = {
    //类似于计算属性
    //注意当前的state是当前仓库的state,并非分模块的大state  
    attrsList(state){
        return state.reqSearch.attrsList || []
    },
    goodsList(state){
        return state.reqSearch.goodsList || []
    },
    trademarkList(state){
        return state.reqSearch.trademarkList || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}