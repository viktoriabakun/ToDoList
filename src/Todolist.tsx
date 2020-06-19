import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type PropsType = {
    title: string,
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: 'all' | 'completed' | 'active') => void
    addTask: (title: string) => void
    changeCheckboxStatus: (taskId: string, isDone:boolean) => void
}

function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const onNewTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13 && newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTaskFunction = () => {
        if (newTaskTitle.trim() !== ''){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }
    const onAllChangeFilter = () => props.changeFilter('all')
    const onActiveChangeFilter = () => props.changeFilter('active')
    const onCompletedChangeFilter = () => props.changeFilter('completed')


    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChange}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTaskFunction}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id);

                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckboxStatus(t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllChangeFilter}>All
                </button>
                <button onClick={onActiveChangeFilter}>Active
                </button>
                <button onClick={onCompletedChangeFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;