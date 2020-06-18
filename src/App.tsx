import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";
import {v1} from "uuid";

export type FiltersValuesType = 'all' | 'completed' | 'active';

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true}
    ]);
    let [filter, setFilter] = useState<FiltersValuesType>('all');

    function removeTask(id: string) {
    let resultTasks = tasks.filter(t => t.id !== id);
    setTasks(resultTasks);
    }

    function addTask(title: string) {
    let newTask = {id: v1(), title: title, isDone: false}
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
    }

    function changeFilter(value: FiltersValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === 'completed'){
        tasksForTodoList = tasks.filter(t => t.isDone === true);
    }
    if (filter === 'active'){
        tasksForTodoList = tasks.filter(t => t.isDone === false);
    }



    return (
        <div className="App">
           <Todolist title='What to learn'
                     tasks={tasksForTodoList}
                     removeTask={removeTask}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     />
        </div>
    )
}

export default App;
