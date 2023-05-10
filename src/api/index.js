import request from "./request";
import requestmock from "./requestmock";
//export的分别暴露
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
//获取detail中的数据
export const reqDetail = (skuId)=>{
    return request({url:`/item/${skuId}`,method:'get'})
}
//获取手机配置信息
export const reqPhoneConfig = ()=>{
    return requestmock({url:'phoneConfig',method:'get'})
}
//保存购物车数据
export const reqAddToCart = (skuId,skuNum)=>{
    return request({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}
//获取购物车列表数据
export const reqCartList = ()=>{
    return request({url:'/cart/cartList',method:'get'})
}
//删除购物车数据
export const delCartList = (skuId)=>{
    return request({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}
//切换购物车勾选框功能
export const checkCat = (skuId,isChecked)=>{
    return request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
}
/* 
    用户注册与登录
*/
//获取验证码
export const getCode = (phone)=>{
     return request({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
//注册接口
export const reqUserRegister = (data)=>{
    return request({url:'user/passport/register',method:'post',data:data})
}
//获取登录接口
export const reqUserLogin = (data)=>{
    return request({url:'user/passport/login',method:'post',data})
}
//获取用户数据
export const reqGetUserInfo = () =>{
    return request({url:'user/passport/auth/getUserInfo',method:'get'})
}
//退出登录
export const reqLoginOut = ()=>{
    return request({url:'user/passport/logout',method:'get'})
}
