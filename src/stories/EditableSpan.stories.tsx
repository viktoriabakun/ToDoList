import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Change value for editable span'
        },
        value: {
            defaultValue: 'it is default value, you can change it',
            description: 'Start value for editable span'
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />

export const EditableSpanExample = Template.bind({});

EditableSpanExample.args = {
    onChange: action('Value changed')
}