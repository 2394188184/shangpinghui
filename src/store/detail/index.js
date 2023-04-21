import {reqDetail, reqPhoneConfig,reqAddToCart} from '@/api/index.js'
const state = {
    goodsInfo:{},
    spuSaleAttrList:[]
}
const mutations = {
    GETDETAIL(state,goodsInfo){
        state.goodsInfo = goodsInfo
    },
    GETPHONECONFIG(state,spuSaleAttrList){
        state.spuSaleAttrList = spuSaleAttrList
    }
}
const actions = {
    async getDetail(context,skuId){
        let result = await reqDetail(skuId);
        if(result.data.code ==200){
            context.commit('GETDETAIL',result.data.data)
        }
    },
    async getPhoneConfig(context){
        let result = await reqPhoneConfig();
        if(result.data.code ==200){
            context.commit('GETPHONECONFIG',result.data.data)
        }
    },
    //加入到购物车
    /*
​	      (1):action只有2个参数，一个是context,一个是value【传过来的值】，当传过来的数据大于1个时，用对象的形式进行获取 
        （2）结构  =>{skuId,skuNum}
        （3）发请求后【加入购物车】，将前台的数据保存到接口
        （4）获取接口数据，并不用写vueX三连获取数据，因为没有返回数据，只有返回code = 200代表成功
    */
    async addToCart(context,value){
        const {skuId,skuNum} = value
	    let result = await reqAddToCart(skuId,skuNum)
        if(result.data.code == 200){
            return Promise.resolve('ok')
        }
        else{
            return Promise.reject(result.data.message)
        }
    }
}
const getters = {
    categoryView(store){
        return store.goodsInfo.categoryView || {}
    },
    skuInfo(store){
        return store.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(store){
        return store.spuSaleAttrList || []
    }
}
export default {state,mutations,actions,getters}