import {FiltersValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type ActionType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTitleActionType |
    ChangeFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FiltersValuesType
}

// reducer -- чистая функция. принимает стартовый стейт, объект action(кот обязат имеет св-во type) и
// возвращает новый стейт

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {

    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]

        case 'CHANGE-TODOLIST-TITLE':
            let nextState = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl
            })
            return nextState;

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })

        default:
            throw new Error("I don't understand this type of action")
    }
}

export const RemoveTodoListAC = (todolistID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}


export const ChangeTitleAC = (todolistID: string, title: string): ChangeTitleActionType => {
return {type: "CHANGE-TODOLIST-TITLE", title: title, id: todolistID}
}

export const ChangeFilterAC = (todolistID: string, filter: FiltersValuesType): ChangeFilterActionType => {
return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id:todolistID}
}















