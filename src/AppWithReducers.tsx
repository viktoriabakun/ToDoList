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

export type FiltersValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string,
    title: string,
    filter: FiltersValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithReducers() {

    let todoListID1 = v1();
    let todoListID2 = v1();


    let [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "Songs", filter: "all"},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
            [todoListID1]: [
                {id: v1(), title: 'JavaScript', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Typescript', isDone: false},
            ],
            [todoListID2]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
            ]
        }
    )

    // let [filter, setFilter] = useState<FiltersValuesType>('all');

    function removeTask(id: string, todoListID: string) {
        const action = removeTaskAC(id, todoListID);
        dispatchTasks(action);
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID);
        dispatchTasks(action);
    }

    function changeFilter(id: string, value: FiltersValuesType) {
        const action = changeFilterAC(id, value);
        dispatchTodoLists(action)
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
        const action =changeTaskStatusAC(taskId, isDone, todoListID);
        dispatchTasks(action)

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        const action =changeTaskTitleAC(taskId, newTitle, todoListID);
        dispatchTasks(action)

    }

    function removeTodoList(id: string) {
        dispatchTodoLists(removeTodoListAC(id))
        dispatchTasks(removeTodoListAC(id))
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {

        const action = changeTodolistTitleAC(todoListID, newTitle);
        dispatchTodoLists(action)
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatchTodoLists(action)
        dispatchTasks(action)
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
                    todoLists.map(tl => {

                        let allTasks = tasks[tl.id]
                        let tasksForTodoList = allTasks;

                        if (tl.filter === 'completed') {
                            tasksForTodoList = allTasks.filter(t => t.isDone === true);
                        }
                        if (tl.filter === 'active') {
                            tasksForTodoList = allTasks.filter(t => t.isDone === false);
                        }
                        return (
                            <Grid item>
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

export default AppWithReducers;
