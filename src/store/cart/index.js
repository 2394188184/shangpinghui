import {reqCartList,delCartList,checkCat} from '@/api/index.js';
import {getUUId} from '@/utils/uuid_token.js'
const state = {
    uuid:getUUId(),
    cartMainInfoList:[]
}
const mutations = {
    GETCARTLIST(state,cartMainInfoList){
        state.cartMainInfoList = cartMainInfoList
    }
}
const actions = {
    async getCartList(context){
        let result = await reqCartList();
        if(result.data.code == 200 ){
            context.commit('GETCARTLIST',result.data.data)
        }
    },
    //删除购物车数据
    async delCartList(context,skuId){
        let result = await delCartList(skuId);
        if(result.data.code ==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //修改购物车勾选框数据
    async checkCat(context,{skuId,isChecked}){
        let result  = await checkCat(skuId,isChecked)
        if(result.data.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //删除勾选数据
    delAllChecked(context){
        console.log(context)
        //获取数据
        let cartInfoList = context.getters.cartInfoZeroList.cartInfoList
        console.log(cartInfoList)
        let PromiseAll = []
        cartInfoList.forEach((item)=>{
            if(item.isChecked == "1"){
                let PromiseOne = context.dispatch('delCartList',item.skuId)
                PromiseAll.push(PromiseOne)
            }   
        })
        return Promise.all(PromiseAll)
    },
    //全选选中框状态的改变
    isAllCheck(context,isChecked){
        let promiseAll = []
        context.state.cartMainInfoList[0].cartInfoList.forEach((item)=>{
           let promise =context.dispatch('checkCat',{skuId:item.skuId,isChecked:isChecked})
           promiseAll.push(promise)  
        })
        //最终返回结果
        return Promise.all(promiseAll)
    }
}
const getters ={
    cartInfoZeroList(state){
        return state.cartMainInfoList[0] || {} 
    }
}
export default {state,mutations,actions,getters}