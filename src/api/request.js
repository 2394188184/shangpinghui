import axios from 'axios'  //引入axios
import nprogress from 'nprogress'  //引入进度条
import '../../node_modules/nprogress/nprogress.css' //引入nprogress样式
import cart from '@/store/cart/index.js'; //引入购物车仓库
import user from '@/store/user/index.js';//引入用户登录仓库
const request = axios.create({
    //配置默认路径
    baseURL:'/api',
    timeout:5000,//超时时间
});
//请求拦截器：发送之前可以检测到
request.interceptors.request.use(
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    config=>{
        if(cart.state.uuid){ //【游客模式】
            config.headers.userTempId  =  cart.state.uuid
        }
        // if(cart.state.uuid){ //【游客模式】
        //     //请求头添加一个字段(userTempId)与后台商量
        //     config.headers.userTempId =  cart.state.uuid
        // }
        if(user.state.token){
            config.headers.token = user.state.token
        }
        //开启进度条
        nprogress.start();
        return config
    },
    (error)=>{return Promise.reject(error);}
)  
//响应拦截器
request.interceptors.response.use(
    //成功的回调函数：服务器请求数据回来之后，响应拦截器可以检测到
    //结束进度条
    nprogress.done(),
    (res)=>{return res},
    //响应失败的回调函数
    (error)=>{return Promise.reject(error)}
)
//将request暴露出去
export default request;