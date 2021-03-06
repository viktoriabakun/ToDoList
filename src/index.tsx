import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './app/App';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {HashRouter} from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#abc4ac'
        },
        secondary: {
           main:  '#4b6154'
        } ,
        error: {
            main: '#ff0058'
        },
    },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
