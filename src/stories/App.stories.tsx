import React from 'react'
import App from "../app/App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props: any) => {
    return (<App />)
}