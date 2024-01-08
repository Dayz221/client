import axios from 'axios'

const instance = axios.create({
    baseURL: "https://nice-handkerchief-cow.cyclic.app/api"
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token")

    return config
})

export default instance
