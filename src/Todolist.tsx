import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FiltersValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type PropsType = {
    id: string,
    title: string,
    tasks: Array<TasksType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (id: string, value: FiltersValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheckboxStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FiltersValuesType
    removeTodoList: (id: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

function Todolist(props: PropsType) {

    // const [newTaskTitle, setNewTaskTitle] = useState('');
    // const [error, setError] = useState<string | null>(null);

    // const onTaskNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(event.currentTarget.value)
    //     setError(null);
    // }
    // const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (event.charCode === 13) {addTaskFunction()}
    // }
    // const addTaskFunction = () => {
    //     if (newTaskTitle.trim() !== ''){
    //         props.addTask(newTaskTitle.trim(), props.id)
    //         setNewTaskTitle('')
    //     } else {
    //         setError('Title is required');
    //     }
    // }
    const onAllChangeFilter = () => props.changeFilter(props.id, 'all', props.id)
    const onActiveChangeFilter = () => props.changeFilter(props.id, 'active', props.id)
    const onCompletedChangeFilter = () => props.changeFilter(props.id, 'completed', props.id)
    const deleteTodoList = () => props.removeTodoList(props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    function changeTodoListTitle(newTitle: string) {
    props.changeTodoListTitle(props.id, newTitle)
    }

    return (

        <div>
            <h3><EditableSpan title={props.title}
                              saveNewTitle={changeTodoListTitle}/>
                <button onClick={() => {
                    deleteTodoList()
                }}>x
                </button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input value={newTaskTitle}*/}
            {/*           onChange={onTaskNameChange}*/}
            {/*           onKeyPress={onKeyPressHandler}*/}
            {/*           className={error ? 'error' : ''}*/}
            {/*    />*/}
            {/*    <button onClick={addTaskFunction}>+</button>*/}
            {/*    {error && <div className='error-message'>{error}</div>}*/}
            {/*</div>*/}
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.id);

                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeCheckboxStatus(t.id, newIsDoneValue, props.id);
                        }

                        let changeTaskTitle = (newTitle: string) => {
                            props.changeTaskTitle(t.id, newTitle, props.id)
                        }

                        return <li key={t.id}
                                   className={t.isDone ? 'is-done' : ''}
                        >
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeStatus}
                            />
                            {/*<span>{t.title}</span>*/}
                            <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                            <button onClick={onRemoveHandler}>x
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllChangeFilter}
                        className={props.filter === "all" ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveChangeFilter}
                        className={props.filter === "active" ? 'active-filter' : ''}
                >Active
                </button>
                <button onClick={onCompletedChangeFilter}
                        className={props.filter === "completed" ? 'active-filter' : ''}
                >Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;