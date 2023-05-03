//创建util
//创建uuid_tooken.js 目的：生成uuid游客模式
import { v4 as uuidv4 } from 'uuid';
export const getUUId = ()=>{
    let uuid = localStorage.getItem('tooken')
    //如果本地缓存【localStorage】不存在,uuid为空
    if(!uuid){
        uuid = uuidv4(); 
        localStorage.setItem('tooken',uuid)
    }
    return uuid
}