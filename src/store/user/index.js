import {getCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLoginOut} from '@/api/index.js'
import { setToken,getToken} from '@/utils/token'
const  state = {
    code:'',//验证码
    token:getToken(),//令牌  第一次的时候为空，后面登录后就从缓存中获取
    userInfo:{},//用户信息
}
const mutations = {
    GETCODE(state,value){
        state.code = value
    },
    USERLOGIIN(state,value){
        state.token = value
    },
    GETUSERINFO(state,value){
        state.userInfo = value
    },
    LOGINOUT(state){
        localStorage.removeItem('token')
        state.token = '',
        state.userInfo = {}
    }
}
const actions = {
    //获取验证码
    async getCode(context,phone){
        let {data}  = await getCode(phone)
        if(data.code == 200){
            context.commit('GETCODE',data.data)
            return 'ok'
        }else{
            return  Promise.reject(new Error('接口执行失败！'))
        }
    },
    //获取注册是否成功
    async userRegister(context,user){   
        let {data} = await reqUserRegister(user)
        console.log(data)
        if(data.code == 200){
            return 'ok'
        }else{
            return Promise.reject(data.message)
        }
    },
    //获取token
    async userLogin(context,user){
        let {data} = await reqUserLogin(user)
        console.log(data)
        if(data.code == 200){
            context.commit('USERLOGIIN',data.data.token)
            //将token放在缓存中，进行持久化
            setToken(data.data.token)
            return 'ok'
        }else{
            return Promise.reject(data.message)
        }
    },
    //获取用户数据
    async GetUserInfo(context){
        let {data} = await reqGetUserInfo();
        if(data.code == 200 ){
            context.commit('GETUSERINFO',data.data)
        }
    },
    //退出登录
    async loginOut(context){
        let {data} = await reqLoginOut();
        if(data.code == 200){
            context.commit('LOGINOUT')
            return 'ok'
        }else{
            Promise.reject(data.message)
        }
    }
}
const getters = {
    name(state){
        return state.userInfo.name
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}