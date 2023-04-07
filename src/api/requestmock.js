import axios from 'axios'  //引入axios
import nprogress from 'nprogress'  //引入进度条
import '../../node_modules/nprogress/nprogress.css' //引入nprogress样式
const requestmock = axios.create({
    //配置默认路径
    baseURL:'/mock',
    timeout:5000,//超时时间
});
//请求拦截器：发送之前可以检测到
requestmock.interceptors.request.use(
    //开启进度条
    nprogress.start(),
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    (config)=>{return config},
    (error)=>{return Promise.reject(error);}
)  
//响应拦截器
requestmock.interceptors.response.use(
    //成功的回调函数：服务器请求数据回来之后，响应拦截器可以检测到
    //结束进度条
    nprogress.done(),
    (res)=>{return res},
    //响应失败的回调函数
    (error)=>{return Promise.reject(error)}
)
//将request暴露出去
export default requestmock;