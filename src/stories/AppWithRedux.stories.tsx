import AppWithRedux from "../AppWithRedux";
import {Meta, Story} from "@storybook/react";
import React from "react";
import {store} from "../state/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default  {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args}/>

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};
