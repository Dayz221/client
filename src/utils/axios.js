import axios from 'axios'

const instance = axios.create({
    baseURL: "https://todo-list-dayz221.onrender.com/api"
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token")

    return config
})

export default instance
