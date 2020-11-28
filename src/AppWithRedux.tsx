import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todoListReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FiltersValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string,
    title: string,
    filter: FiltersValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID);
        dispatch(action);
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID);
        dispatch(action);
    }

    function changeFilter(id: string, value: FiltersValuesType) {
        const action = changeFilterAC(id, value);
        dispatch(action)
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
        const action =changeTaskStatusAC(taskId, isDone, todoListID);
        dispatch(action)

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        const action =changeTaskTitleAC(taskId, newTitle, todoListID);
        dispatch(action)

    }

    function removeTodoList(id: string) {
        dispatch(removeTodoListAC(id))
        dispatch(removeTodoListAC(id))
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {

        const action = changeTodolistTitleAC(todoListID, newTitle);
        dispatch(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatch(action)
        dispatch(action)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>{
                    todolists.map(tl => {

                        let allTasks = tasks[tl.id]
                        let tasksForTodoList = allTasks;

                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTasks.filter(t => t.isDone === true);
                        }
                        if (tl.filter === 'active') {
                            tasksForTodoList = allTasks.filter(t => t.isDone === false);
                        }
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '20px'}}
                                       elevation={7}
                                ><Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeCheckboxStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                /></Paper>
                            </Grid>
                        )
                    })}</Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
