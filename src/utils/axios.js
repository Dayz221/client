import axios from 'axios'

const instance = axios.create({
    baseURL: "https://server-todolist-o2cb.onrender.com/api"
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem("token")

    return config
})

export default instance
