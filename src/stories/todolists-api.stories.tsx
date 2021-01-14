import React, {useEffect, useState} from 'react'
import axios from "axios";
import {tasksAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '3cef8baf-ff4b-4311-bb54-af9699d41e4c'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'New Todolist'
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'b0ebf4c0-cdec-4c00-8146-fcca0398372d'
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '9abbf8f8-4b11-4279-8188-2def7a7320e6'
        const title = 'NEW TODO TITLE'
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


///////// TASKS /////////

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '9abbf8f8-4b11-4279-8188-2def7a7320e6'
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '9abbf8f8-4b11-4279-8188-2def7a7320e6'
        const title = 'NEW TASK'
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'b0ebf4c0-cdec-4c00-8146-fcca0398372d'
        const taskId = ''
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [description, setDescription] = useState<string>('descripton 1')
    const [priority, setPriority] = useState<number>(0)
    const [status, setStatus] = useState<number>(0)
    useEffect(() => {

        const todolistId = 'b0ebf4c0-cdec-4c00-8146-fcca0398372d'
        const taskId = 'a5e52310-6893-4b2b-b66f-e481db7cea92'
        const title = 'UPDATED TASK'
        tasksAPI.updateTask(todolistId, taskId,  {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        })
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
