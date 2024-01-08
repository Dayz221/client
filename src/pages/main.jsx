import '../styles/main.css'
import { MyMenu } from '../components/menu.js'
import { useEffect, useState } from "react"
import { useCheckAuth } from '../utils/checkAuth.js'
import { Tasks } from '../components/tasks.js'
import { MyPopUp } from '../UI/myPopUp/myPopUp.js'
import { MyInput } from '../UI/myInput/myInput.js'
import { MyButton } from '../UI/myButton/myButton.js'
import { MyLabel } from '../UI/myLabel/myLabel.js'
import { MyTextarea } from '../UI/myTextarea/myTextarea.js'
import { MyPreloader } from '../UI/myPreloader/myPreloader.js'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, getTodos, patchTodo } from '../features/todos.js'

export const MainPage = () => {
    useCheckAuth()

    const [searchText, setSearchText] = useState("")
    const [filter, setFilters] = useState("all")

    const [newFormActive, setNewFormActive] = useState(false)
    const [editFormActive, setEditFormActive] = useState(false)
    const [formVals, setFormVals] = useState({ name: "", description: "", start: 0, end: 0 })
    const [curId, setId] = useState(0)

    const tasks = useSelector((state) => state.todos.todos)
    const isLoading = useSelector((state) => state.todos.isLoading)
    const dispatch = useDispatch()

    function millisToDate(millis) {
        const date = new Date(millis)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
        // return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    }

    function openNewTask() {
        const date = new Date().getTime()

        setFormVals({ name: "", description: "", start: date, end: date+24*60*60*1000 })
        setNewFormActive(true)
    }

    function openEdit(id) {
        setId(id)
        const task_info = tasks.find(el => el._id == id)
        const task = {
            name: task_info.name,
            description: task_info.description,
            start: task_info.start,
            end: task_info.end
        }
        setFormVals(task)
        setEditFormActive(true)
    }

    function newTask() {
        const task = {
            name: formVals.name,
            description: formVals.description,
            start: formVals.start,
            end: formVals.end
        }
        dispatch(addTodo(task))
        setNewFormActive(false)
    }

    function patchTask() {
        dispatch(patchTodo({ id: curId, task: formVals }))
        setEditFormActive(false)
    }

    function deleteTask() {
        if (window.confirm("Подтвердите удаление...")) {
            dispatch(deleteTodo(curId))
            setEditFormActive(false)
        }
    }

    function findFilter(tasks, text) {
        return tasks.filter(el => el.name.toLowerCase().includes(text.toLowerCase()) || el.description.toLowerCase().includes(text.toLowerCase()))
    }

    function dateFilter(tasks) {
        return tasks.filter(el => {
            const date = new Date().getTime()
            const start = new Date(el.start)
            const startDate = new Date(
                start.getFullYear(), 
                start.getMonth(), 
                start.getDate(),
                0, 0, 0
            ).getTime()
            const end = new Date(el.end)
            const endDate = new Date(
                end.getFullYear(), 
                end.getMonth(), 
                end.getDate(),
                0, 0, 0
            ).getTime() + 24*60*60*1000
            return ((startDate <= date && date <= endDate) || (el.start == 0 || el.end == 0))
        })
    }

    function activeFilter(tasks) {
        return tasks.filter(el => {
            switch (filter) {
                case 'all':
                    return true
                case 'done':
                    return el.isDone
                case 'active':
                    return !el.isDone
            }
        })
    }

    useEffect(() => {
        dispatch(getTodos())
    }, [])

    return (
        <>
            {isLoading
                ?
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                    <MyPreloader />
                </div>
                : <>
                    <div id="page">
                        <MyMenu searchCallback={setSearchText} cur_filter={filter} filterCallback={setFilters} />
                        <div className='task_groups'>
                            {!!searchText
                                ?
                                <Tasks
                                    title={`Поиск '${searchText}'`}
                                    tasks={findFilter(activeFilter(tasks), searchText)}
                                    openNewTask={openNewTask}
                                    openEdit={openEdit}
                                />
                                : <>
                                    <Tasks
                                        title="Сегодня"
                                        tasks={dateFilter(activeFilter(tasks))}
                                        openNewTask={openNewTask}
                                        openEdit={openEdit}
                                    />
                                    <Tasks
                                        title="Все заметки"
                                        hidden={activeFilter(tasks).length > 0}
                                        tasks={activeFilter(tasks)}
                                        openNewTask={openNewTask}
                                        openEdit={openEdit}
                                    />
                                </>
                            }
                        </div>
                    </div>

                    <MyPopUp id="newTask" isActive={newFormActive} setActive={setNewFormActive} title="Создать заметку">
                        <form name="newFormActive" className="form" onSubmit={(e) => { e.preventDefault() }}>
                            <MyLabel text="Название *">
                                <MyInput type="text" value={formVals.name} placeholder="Название заметки" onChange={(e) => setFormVals({ ...formVals, name: e.target.value })} />
                            </MyLabel>
                            <MyLabel text="Описание">
                                <MyTextarea value={formVals.description} placeholder="Описание заметки" onChange={(e) => setFormVals({ ...formVals, description: e.target.value })} />
                            </MyLabel>

                            <MyLabel text="Начало и конец">
                                {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
                                <MyInput type="datetime-local" value={formVals.start !== 0 ? millisToDate(formVals.start) : ""} onChange={(e) => setFormVals({ ...formVals, start: Date.parse(e.target.value) })} />
                                {/* <div style={{ flex: "1 1 3%" }}></div> */}
                                <MyInput type="datetime-local" value={formVals.end !== 0 ? millisToDate(formVals.end) : ""} min={millisToDate(formVals.start)} onChange={(e) => setFormVals({ ...formVals, end: Date.parse(e.target.value) })} />
                                {/* </div> */}
                            </MyLabel>

                            <MyButton onClick={() => newTask()}>Создать</MyButton>
                        </form>
                    </MyPopUp>

                    <MyPopUp id="editTask" isActive={editFormActive} setActive={setEditFormActive} title="Редактировать заметку">
                        <form name="editFormActive" className="form" onSubmit={(e) => { e.preventDefault() }}>
                            <MyLabel text="Название *">
                                <MyInput type="text" value={formVals.name} placeholder="Название заметки" onChange={(e) => setFormVals({ ...formVals, name: e.target.value })} />
                            </MyLabel>
                            <MyLabel text="Описание">
                                <MyTextarea value={formVals.description} placeholder="Описание заметки" onChange={(e) => setFormVals({ ...formVals, description: e.target.value })} />
                            </MyLabel>

                            <MyLabel text="Начало и конец">
                                {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
                                <MyInput type="datetime-local" value={formVals.start !== 0 ? millisToDate(formVals.start) : ""} onChange={(e) => setFormVals({ ...formVals, start: Date.parse(e.target.value) })} />
                                {/* <div style={{ flex: "1 1 3%" }}></div> */}
                                <MyInput type="datetime-local" value={formVals.end !== 0 ? millisToDate(formVals.end) : ""} min={millisToDate(formVals.start)} onChange={(e) => setFormVals({ ...formVals, end: Date.parse(e.target.value) })} />
                                {/* </div> */}
                            </MyLabel>

                            <MyButton onClick={() => patchTask()}>Сохранить</MyButton>

                            <div className='deleteButton' onClick={() => deleteTask()}>Удалить заметку</div>
                        </form>
                    </MyPopUp>

                </>
            }
        </>
    )
}