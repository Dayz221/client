import './myButton.css'
import classnames from 'classnames'

export const MyButton = ({children, classes, ...props}) => {
    if (!classes) classes=[]
     return (
        <button type="button" className={classnames('myButton', ...classes)} {...props}> 
            {children}
        </button>
    )
}