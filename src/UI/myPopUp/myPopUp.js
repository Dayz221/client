import classnames from "classnames"
import './myPopUp.css'

export const MyPopUp = ({ setActive, isActive, id, children, title }) => {
    return (
        <div className={classnames('popUp', { active: isActive })} id={id} /*onClick={(e) => setActive(false)}*/>
            <div className="popUp__container" onClick={(e) => e.stopPropagation()}>
                <div className="popUp__header">
                    <div className="popUp__title">{title}</div>
                    <button className="popUp_exit" onClick={(e) => setActive(false)}>
                        <div className="popUp_exit__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6L18 18" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                </div>
                <div className="popUp__body">
                    {children}
                </div>
            </div>
        </div>
    )
}