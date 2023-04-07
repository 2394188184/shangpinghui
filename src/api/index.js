import request from "./request";
import requestmock from "./requestmock";
//获取三级联动数据
export const reqCategoryList= ()=>{
    //发请求
    return request({url:'/product/getBaseCategoryList', method:'get'})
};
//获取轮播图数据
export const reqBanner= ()=>{
    //发请求
    return requestmock({url:'/banner', method:'get'})
}
//获取home底部楼层数据
export const reqFloorList = ()=>{
    return requestmock({url:'/floor',method:'get'})
}
//获取serach中的数据
export const reqSearch = (params)=>{
    return request({url:'/list',method:'post',data:params})
}
