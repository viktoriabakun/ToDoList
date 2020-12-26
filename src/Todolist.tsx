import React, {useCallback} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from "./Task";
import {FilterValuesType} from "./AppWithRedux";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    _addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    _removeTodolist: (id: string) => void
    _changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist: React.FC<PropsType> = React.memo(function Todolist({
                                                                              id,
                                                                              title,
                                                                              tasks,
                                                                              removeTask,
                                                                              changeFilter,
                                                                              _addTask,
                                                                              changeTaskStatus,
                                                                              _changeTodolistTitle,
                                                                              changeTaskTitle,
                                                                              filter,
                                                                              _removeTodolist,
                                                                          }) {
    console.log('TODOLIST')

    const addTask = useCallback((title: string) => {
        _addTask(title, id);
    }, [_addTask, id])

    const removeTodolist = useCallback(() => {
        _removeTodolist(id);
    }, [id, _removeTodolist])

    const changeTodolistTitle = useCallback((title: string) => {
        _changeTodolistTitle(id, title);
    }, [_changeTodolistTitle, id])

    const onAllClickHandler = useCallback(() =>
        changeFilter("all", id), [
        // changeFilter, id
    ]);

    const onActiveClickHandler = useCallback(() =>
        changeFilter("active", id), [
        // changeFilter, id
    ]);

    const onCompletedClickHandler = useCallback(() =>
        changeFilter("completed", id), [
        // changeFilter, id
    ]);

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    const onClickHandler = useCallback((taskId: string) =>
        removeTask(taskId, id), [id, removeTask])

    const onChangeHandler = useCallback((taskId: string, isDone: boolean) => {
        changeTaskStatus(taskId, isDone, id);
    }, [id, changeTaskStatus])
    const onTitleChangeHandler = useCallback((taskId: string, title: string) => {
        changeTaskTitle(title, title, id);
    }, [id, changeTaskTitle])

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    return (
                        <Task key={t.id}
                              task={t}
                              onChangeHandler={onChangeHandler}
                              onClickHandler={onClickHandler}
                              onTitleChangeHandler={onTitleChangeHandler}
                        />)
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


