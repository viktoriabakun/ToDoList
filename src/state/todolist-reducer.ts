import {FiltersValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type ActionType =
    RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTitleActionType |
    ChangeFilterActionType

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeFilterActionType = {
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

