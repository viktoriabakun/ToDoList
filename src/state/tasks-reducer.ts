import {TasksStateType} from "../App";
import {TasksType} from "../Todolist";
import {v1} from "uuid";

export type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>


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
            const tasksCopy = [newTask,...tasks]
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













