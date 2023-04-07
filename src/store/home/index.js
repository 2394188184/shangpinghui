//home的vuex小仓库
//存储数据
import {reqCategoryList,reqBanner,reqFloorList} from '@/api/index.js'
const state = {
    a:1,
    reqCategoryList:[],//3级联动
    reqBannerList:[], //轮播图
    reqFloorList:[] //楼层数据
};
//对state进行修改
const mutations = {
    REQCATEGORYLIST(state,value){
        state.reqCategoryList = value
    },
    GETBANNERLIST(state,value){
        state.reqBannerList = value
    },
    GETFLOORLIST(state,value){
        state.reqFloorList = value
    }
};
//异步处理，业务处理
const actions = {
    //获取3级联动数据
    async reqCategoryList(context){
        //返回一个成功的回调
        let result = await reqCategoryList();
        // let result1 = reqCategoryList();
        // console.log(result)
        // console.log(result1)
        if(result.data.code ==200){
            context.commit('REQCATEGORYLIST',result.data.data)
        }
        
    },
    //获取轮播图数据
    async getBannerList(context){
        let result = await reqBanner();
        if(result.data.code ==200){
            context.commit('GETBANNERLIST',result.data.data)
        }
    },
    //获取floor的数据
    async getFloorList(context){
        let result = await reqFloorList();
        if(result.data.code ==200){
            context.commit('GETFLOORLIST',result.data.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}