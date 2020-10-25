import React from 'react'


type StateType = {
    name: string
    age: number
    childrenCount: number
}

type ActionType = {
    type: string,
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {

    switch (action.type){
        case 'INCREMENT-AGE':
            state.age +=  1
            return state;

        case 'INCREMENT-CHILDREN-COUNT':
            state.childrenCount += 1;
            return state;
        default:
            throw new Error("I don't understand this type of action")
    }
}

// reducer -- чистая функция. принимает стартовый стейт, объект action(кот обязат имеет св-во type) и
// возвращает новый стейт