import './myInput.css'

export const MyInput = ({errors, ...props}) => {
    return (
        <input className={!!errors ? "myInput err" : "myInput"} {...props} />
    )
}