import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FiltersValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
                              saveNewTitle={changeTodoListTitle}
            />

                <IconButton onClick={deleteTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
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

                        return <div key={t.id}
                                   className={t.isDone ? 'is-done' : ''}
                        >
                            <Checkbox
                                color={'primary'}
                                checked={t.isDone}
                                onChange={onChangeStatus}
                            />

                            <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button onClick={onAllChangeFilter}
                        variant={props.filter === "all" ? 'contained' : 'outlined'}
                        color={props.filter === "all" ? 'secondary' : 'primary'}
                        size={'small'}
                >All</Button>
                <Button onClick={onActiveChangeFilter}
                        variant={props.filter === "active" ? 'contained' : 'outlined'}
                        color={props.filter === "active" ? 'secondary' : 'primary'}
                        size={'small'}
                >Active</Button>
                <Button onClick={onCompletedChangeFilter}
                        variant={props.filter === "completed" ? 'contained' : 'outlined'}
                        color={props.filter === "completed" ? 'secondary' : 'primary'}
                        size={'small'}
                >Completed</Button>
            </div>
        </div>
    )
}

export default Todolist;