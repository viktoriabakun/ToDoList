import {TasksStateType} from "../App";
import {TasksType} from "../Todolist";
import {v1} from "uuid";

export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
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
                .map(t => t.id !== action.taskId ? t : {...t, isDone: action.status})

            stateCopy[action.todolistId] = tasksCopy
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type of action")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId, taskId: v1()} as const
}

export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId} as const
}











