import {reqUserAdress,reqTradeInfo} from '@/api/index.js'
const state = {
    adress:[],
    orderInfo:{}
}
const mutations = {
    GETUSERADRESS(state,value){
        state.adress = value
    },
    GETTRADEINFO(state,value){
        state.orderInfo = value
    }
}
const actions = {
    async getUserAdress(context){
        let {data} = await reqUserAdress();
        if(data.code == 200){
            context.commit('GETUSERADRESS',data.data)
        }
    },
    async getTradeInfo(context){
        let {data} = await reqTradeInfo()
        if(data.code == 200){
            context.commit('GETTRADEINFO',data.data)
        }
    }
}
const getters = {
}
export default {
    state,
    mutations,
    actions,
    getters 
}