import {TasksStateType} from "../App";
import {TasksType} from "../Todolist";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolist-reducer";

export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>


let initialState: TasksStateType = {

    ['todoListID1']: [
        {id: v1(), title: 'JavaScript', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
    ],
    ['todoListID2']: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
    ]
}

export const tasksReducer = (state=initialState, action: ActionsType) => {
    switch (action.type) {

        case 'REMOVE-TASK':
            const stateCopy = {...state}
            stateCopy[action.todolistId] = state[action.todolistId].filter(
                t => t.id !== action.taskId)
            return stateCopy

        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask: TasksType = {
                id: action.taskId,
                title: action.title,
                isDone: false
            }
            const tasksCopy = [newTask, ...tasks]
            stateCopy[action.todolistId] = tasksCopy
            return stateCopy
        }

        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]

            const tasksCopy = tasks
                .map(t => t.id !== action.taskId ? t : {...t, isDone: action.isDone})

            stateCopy[action.todolistId] = tasksCopy
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]

            const tasksCopy = tasks
                .map(t => t.id !== action.taskId ? t : {...t, title: action.title})

            stateCopy[action.todolistId] = tasksCopy
            return stateCopy
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return stateCopy
        }

        case 'REMOVE-TODOLIST':{
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId, taskId: v1()} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}











