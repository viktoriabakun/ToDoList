import {TodoListType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string,
    [key: string]: any
}

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
            return  state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })

        default:
            throw new Error("I don't understand this type of action")
    }
}