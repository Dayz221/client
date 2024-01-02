import './myLabel.css'

export const MyLabel = ({ children, text }) => {
    return (
        <label className="myLabel">
            {text
                ?
                <span className='myLabelText'>
                    {text}
                </span>
                :
                <></>
            }

            {children}
        </label>
    )
}