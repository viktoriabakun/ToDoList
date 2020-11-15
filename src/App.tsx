import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FiltersValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string,
    title: string,
    filter: FiltersValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "Songs", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeFilter(id: string, value: FiltersValuesType) {
        let todoList = todoLists.find(tl => tl.id === id);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks})

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
        }
        setTasks({...tasks})

    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    }

    function addTodoList(title: string) {
        let newTodoListID = v1()
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks, [newTodoListID]: []
        })
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let todolist = todoLists.find(tl => tl.id === todoListID)
        if (todolist) {
            todolist.title = newTitle
            setTodoLists([...todoLists])
        }
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

export default App;
