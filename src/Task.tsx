import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    onChangeHandler: (taskId: string, isDone: boolean) => void
    onTitleChangeHandler: (taskId: string, title: string) => void
    onClickHandler: (taskId: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, onChangeHandler, onTitleChangeHandler, onClickHandler}) => {
    return <div  className={task.isDone ? "is-done" : ""}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeHandler(task.id, e.currentTarget.checked)}
        />

        <EditableSpan value={task.title} onChange={() => onTitleChangeHandler(task.id, task.title)}/>
        <IconButton onClick={() => onClickHandler(task.id)}>
            <Delete/>
        </IconButton>
    </div>
})