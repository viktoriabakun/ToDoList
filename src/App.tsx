import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {

    let tasks = [
        {id: 1, title: 'JavaScript', isDone: true},
        {id: 2, title: 'React', isDone: false},
        {id: 3, title: 'Typescript', isDone: false},
        {id: 4, title: 'HTML', isDone: true},
        {id: 5, title: 'CSS', isDone: true}
    ]

    return (
        <div className="App">
           <Todolist title='What to learn' tasks={tasks}/>
        </div>
    )
}

export default App;
