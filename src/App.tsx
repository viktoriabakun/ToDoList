import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";

export type FiltersValuesType = 'all' | 'completed' | 'active';

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: '1', title: 'JavaScript', isDone: true},
        {id: '2', title: 'React', isDone: false},
        {id: '3', title: 'Typescript', isDone: false},
        {id: '4', title: 'HTML', isDone: true},
        {id: '5', title: 'CSS', isDone: true}
    ]);
    let [filter, setFilter] = useState<FiltersValuesType>('all');

    function removeTask(id: string) {
    let resultTasks = tasks.filter(t => t.id !== id);
    setTasks(resultTasks);
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
                     />
        </div>
    )
}

export default App;
