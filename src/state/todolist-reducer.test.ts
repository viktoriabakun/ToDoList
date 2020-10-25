import {todoListReducer} from './todolist-reducer';
import {v1} from 'uuid';
import {TodoListType} from '../App';
test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});