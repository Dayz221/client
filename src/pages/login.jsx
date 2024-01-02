import { MyInput } from "../UI/myInput/myInput.js"
import { MyButton } from "../UI/myButton/myButton.js"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import '../styles/auth.css'
import axios from '../utils/axios.js'
import classnames from "classnames"
import { MyLabel } from "../UI/myLabel/myLabel.js"

export const LoginPage = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function submit() {
        axios
            .post('/auth/login', { login, password })
            .then(response => {
                window.localStorage.setItem('token', response.data.token)
                navigate('/')
            })
            .catch(({ response }) => {
                setError(response.data.message)
            })
    }

    function onChangeLogin(e) {
        e.target.value = e.target.value.split(' ').join('')
        setLogin(e.target.value)
        setError("")
    }

    function onChangePassword(e) {
        e.target.value = e.target.value.split(' ').join('')
        setPassword(e.target.value)
        setError("")
    }

    return (
        <div id="auth_page">
            <div className="header">
                <h2 className="header__title">Вход</h2>
                <div className={classnames('header__icon', { err: !!error })}>
                    <div className="icons">
                        <div className="err_ico">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
                                <path d="M17 17L3 3" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                <path d="M17 3L3 17" stroke="white" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="ok_ico">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none">
                                <path d="M11.6 4L18 10.5M18 10.5L11.6 17M18 10.5H2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <form name="login" className="form" onSubmit={(e) => e.preventDefault()}>
                <MyLabel>
                    <MyInput type="text" placeholder="Ваш логин" errors={error} onChange={(e) => { onChangeLogin(e) }} />
                </MyLabel>
                <MyLabel>
                    <MyInput type="password" placeholder="Ваш пароль" errors={error} onChange={(e) => { onChangePassword(e) }} />
                </MyLabel>
                <MyButton onClick={submit}>Войти</MyButton>
            </form>

            <div className="footer">
                <span className="register__title">Ещё нет аккаунта?</span>
                <Link to="/register" className="register__button">Зарегистрируйся</Link>
            </div>
        </div>
    )
}