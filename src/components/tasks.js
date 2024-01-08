import { useEffect, useState } from "react"
import classnames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { setDone } from "../features/todos.js"

export const Task = ({ task, openEdit }) => {
    const [isHide, setIsHide] = useState(true)

    const curTask = useSelector(store => store.todos.todos.find(el => el._id === task._id))
    const dispatch = useDispatch()

    function changeHandler () {
        dispatch(setDone({ id: curTask._id, isDone: !curTask.isDone }))
    }

    return (
        <div className={classnames("task", { hide: isHide })}>
            <div className="task__container" onClick={() => setIsHide(prev => !prev)}>
                <div className="left_side">
                    <h3 className="task__title">{task.name}</h3>
                </div>
                <div className="right_side">
                    <button className="task_button" onClick={(e) => { e.stopPropagation(); openEdit(task._id) }}>
                        <div className="task_button__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.204 10.796L19 9C19.5453 8.45475 19.8179 8.18213 19.9636 7.88803C20.2409 7.32848 20.2409 6.67152 19.9636 6.11197C19.8179 5.81788 19.5453 5.54525 19 5C18.4548 4.45475 18.1821 4.18213 17.888 4.03639C17.3285 3.75911 16.6715 3.75911 16.112 4.03639C15.8179 4.18213 15.5453 4.45475 15 5L13.1814 6.81866C14.1452 8.46926 15.5314 9.84482 17.204 10.796ZM11.7269 8.27311L4.8564 15.1436C4.43134 15.5687 4.21881 15.7812 4.07907 16.0423C3.93934 16.3034 3.88039 16.5981 3.7625 17.1876L3.1471 20.2646C3.08058 20.5972 3.04732 20.7635 3.14193 20.8581C3.23654 20.9527 3.40284 20.9194 3.73545 20.8529L6.81243 20.2375C7.40189 20.1196 7.69661 20.0607 7.95771 19.9209C8.21881 19.7812 8.43134 19.5687 8.8564 19.1436L15.7458 12.2542C14.1241 11.2386 12.7524 9.87627 11.7269 8.27311Z" />
                            </svg>
                        </div>
                    </button>
                    <div className="task_checkbox__container">
                        <label className={classnames('checkbox__label', { chkd: curTask.isDone })}>
                            <input
                                type="checkbox"
                                className="task_checkbox"
                                checked={curTask.isDone}
                                onChange={() => changeHandler()}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div className="task_description__container">
                {task.description
                    ?
                    <div style={{ minHeight: "0px" }}>
                        <div className="task__description">{task.description}</div>
                    </div>
                    :
                    <></>
                }

            </div>
        </div>
    )
}

export const Tasks = (props) => {
    const [isHide, setIsHide] = useState(!!props.hidden)
    const [numOfDoneTasks, setNumOfDoneTasks] = useState(0)

    useEffect(() => {
        let num = 0
        props.tasks.forEach(el => {
            if (el.isDone) num++
        })
        setNumOfDoneTasks(num)
    }, [props.tasks])

    function getColor(color1, color2, n, n0) {
        if (n0 == 0) {
            return `${color2[0]},${color2[1]},${color2[2]}`
        }
        const r = color1[0] + (color2[0]-color1[0])*(n/n0)
        const g = color1[1] + (color2[1]-color1[1])*(n/n0)
        const b = color1[2] + (color2[2]-color1[2])*(n/n0)
        return `${r},${g},${b}`
    }

    return (
        <div className={classnames("tasks_group", { hide: isHide })}>
            <div className="tasks__header">
                <div className="tasks__title">{props.title}</div>
                <div className="right_side">
                    {/* Добавить */}
                    <div 
                        className="numOfDone__table"
                        style={{
                            backgroundColor: `rgba(${getColor([255, 81, 81], [99,219,99], numOfDoneTasks, props.tasks.length)}, .4)`,
                            borderColor: `rgb(${getColor([255, 81, 81], [99,219,99], numOfDoneTasks, props.tasks.length)})`
                        }}    
                    >
                        {numOfDoneTasks} / {props.tasks.length}
                    </div>
                    <button className="tasks__button" onClick={() => props.openNewTask()}>
                        <div className="tasks__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <path d="M12 6L12 18" strokeWidth="3" strokeLinecap="round" />
                                <path d="M18 12L6 12" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                    </button>
                    {/* Настройки
                    <button className="tasks__button">
                        <div className="tasks__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="1" strokeWidth="3" strokeLinecap="round" />
                                <circle cx="6" cy="12" r="1" strokeWidth="3" strokeLinecap="round" />
                                <circle cx="18" cy="12" r="1" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                    </button> */}
                    {/* Скрыть */}
                    <button className="tasks__button h_b" onClick={() => setIsHide((prev) => !prev)}>
                        <div className="tasks__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                                <path d="M11.1808 15.8297L6.54199 9.20285C5.89247 8.27496 6.55629 7 7.68892 7L16.3111 7C17.4437 7 18.1075 8.27496 17.458 9.20285L12.8192 15.8297C12.4211 16.3984 11.5789 16.3984 11.1808 15.8297Z" strokeWidth={"0px"} />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            <div className="tasks__container">
                <div style={{ minHeight: "0px", minWidth: "0px", boxSizing: "content-box" }}>
                    {props.tasks?.map(el => (
                        <Task key={el._id} task={el} openEdit={props.openEdit} />
                    ))}
                </div>
            </div>
        </div>
    )
}