import axios from 'axios'
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data
        let code = res.code;
        if(code === 10000){
            return res.data
        }else{
            if(code === 10003){//登录过期
                return;
            }
            return new Promise((resolve, reject) => {
                new Error(res.msg || 'Error')
            }).catch((e) => {});
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
