import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3cef8baf-ff4b-4311-bb54-af9699d41e4c'
    }
})

export type GetTodoResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: T
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<GetTodoResponseType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: GetTodoResponseType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

///////// TASKS /////////


type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


type GetTasksType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

export const tasksAPI = {

    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, updateTask: UpdateTaskType) {
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {})
    }
}