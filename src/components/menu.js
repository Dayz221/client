import { useState } from 'react'
import { MyChange, MyOption } from '../UI/myChange/MyChange.js'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

export const MyMenu = ({ searchCallback, cur_filter, filterCallback }) => {
    const navigate = useNavigate()
    function logout() {
        window.localStorage.setItem("token", "")
        navigate('/login')
    }
    const [menuIsHide, setMenuIsHide] = useState(true)

    return (
        <>
            <div className="menu">
                <div className="menu__container">
                    <div className="left_side">
                        <div className="logout_button" onClick={logout}>
                            <div className="logout_button__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.37905 2.66859L12.0686 2.08881C15.2892 1.58272 16.8995 1.32967 17.9497 2.22779C19 3.12591 19 4.75596 19 8.01607V10.9996H13.0806L15.7809 7.62428L14.2191 6.37489L10.2191 11.3749L9.71938 11.9996L10.2191 12.6243L14.2191 17.6243L15.7809 16.3749L13.0806 12.9996H19V15.9831C19 19.2432 19 20.8733 17.9497 21.7714C16.8995 22.6695 15.2892 22.4165 12.0686 21.9104L8.37905 21.3306C6.76632 21.0771 5.95995 20.9504 5.47998 20.3891C5 19.8279 5 19.0116 5 17.3791V6.6201C5 4.98758 5 4.17132 5.47998 3.61003C5.95995 3.04874 6.76632 2.92202 8.37905 2.66859Z" fill="#222222" />
                                </svg>
                            </div>
                        </div>
                        <div className={classNames('filters__container', { hide: !menuIsHide })}>
                            <div style={{ minWidth: "0", overflow: "hidden" }}>
                                <div className="filters">
                                    <MyChange selected={cur_filter} selectButton={filterCallback} >
                                        <MyOption name="all">Все</MyOption>
                                        <MyOption name="done">Выполненные</MyOption>
                                        <MyOption name="active">Активные</MyOption>
                                    </MyChange>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="search">
                        <div className={classNames("search__container", { hide: menuIsHide })}>
                            <input type="text" className="search__input" placeholder='Найти запись' onChange={(e) => searchCallback(e.target.value.trim())} />
                        </div>
                        <button type="button" className='search__button' onClick={() => setMenuIsHide(prev => !prev)}>
                            <div className="sbutton__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                    <circle cx="7" cy="7" r="7" transform="matrix(-1 0 0 1 20 4)" stroke="white" strokeWidth="3" />
                                    <path d="M4 20L7 17" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}