import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
type ErrorUtilsType =  SetAppStatusActionType | SetAppErrorActionType
import {ResponseType} from '../api/todolists-api'


export const handleServerNetworkError = (message: string, dispatch: Dispatch<ErrorUtilsType>) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorUtilsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
dispatch(setAppStatusAC('failed'))
}
