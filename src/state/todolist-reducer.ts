import {TodoListType} from "../App";


type ActionType = {
    type: string,
    [key: string]: any
}

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {

    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);

        default:
            throw new Error("I don't understand this type of action")
    }
}