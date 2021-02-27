import React, {useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    MuiThemeProvider,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, InitialStateType, RequestStatusType} from './app-reducer'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Login} from "../features/Login/Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import {logoutTC} from "../features/Login/auth-reducer";
import {theme} from "../index";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized )
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn )

const logoutHandler = () => {
        dispatch(logoutTC())
}

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (

        <div className="App">
            <MuiThemeProvider theme={theme}>
            <ErrorSnackbar/>
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    <IconButton edge="start" color="primary" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    {/*<Typography variant="h6">*/}
                    {/*    News*/}
                    {/*</Typography>*/}

                    {isLoggedIn && <Button  color="primary" onClick={logoutHandler}>Log out</Button>}

                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>401: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>

            </Container>
            </MuiThemeProvider>
        </div>

    )
}

export default App
