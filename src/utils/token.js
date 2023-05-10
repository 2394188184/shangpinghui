//在缓存中存储token
export const setToken = (token)=>{
    localStorage.setItem('token',token)
}
//在缓存中获取token
export const getToken = ()=>{
    return localStorage.getItem('token')
}