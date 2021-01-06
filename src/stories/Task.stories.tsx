import {Meta, Story} from "@storybook/react";
import {Task, TaskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'Todolist/Task',
    component: Task
} as Meta;

const removeCallback = action ('Remove button inside Task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args) => {
    return <Task {...args}/>
}

const baseArg = {
    removeTask: removeCallback,
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args={
    ...baseArg,
    task: {id: '1', isDone: true, title: 'CSS'},
    todolistId: 'todolist1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args={
    ...baseArg,
    task: {id: '2', isDone: false, title: 'Js'},
    todolistId: 'todolist2'
}