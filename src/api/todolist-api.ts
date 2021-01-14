import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {

        'API-KEY': '3cef8baf-ff4b-4311-bb54-af9699d41e4c'
    }
}

export const todolistAPI = {
    getTodolist() {
        return axios.get('https://social-network.samuraijs.com/api/1.1//todo-lists',
            settings)
    },
    createTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1//todo-lists', {title}, settings)
    },
    deleteTodolist(todolistId: string) {
        return  axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
    }
}
