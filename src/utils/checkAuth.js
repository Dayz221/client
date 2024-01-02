import { useEffect } from "react"
import axios from "./axios.js"
import { useNavigate } from 'react-router-dom'

export const useCheckAuth = () => {
    let navigate = useNavigate()
    useEffect(() => {
        axios.get('/auth/me')
        .catch(() => {
            navigate('/login')
        })
    }, [])
}