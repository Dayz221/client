import classnames from 'classnames'
import './MyChange.css'

export const MyOption = ({ children, selected, name, selectButton }) => {
    return (
        <div className={classnames('change__option', {active: selected === name})} name={name} onClick={() => selectButton(name)}>
            {children}
        </div>
    )
}

export const MyChange = ({ children, selected, selectButton, ...props }) => {

    return (
        <div className='change__container'>
            {children.map(el => {
                return <MyOption {...el.props} key={el.props.name} selected={selected} selectButton={selectButton}/>
            })}
        </div>
    )
}