import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, MuiThemeProvider, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import {theme} from "../../index";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function({addItem, disabled = false}: AddItemFormPropsType) {
    console.log("AddItemForm called")

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return <div>
        <MuiThemeProvider theme={theme}>
        <TextField variant="outlined"
                   disabled={disabled}
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="secondary" onClick={addItemHandler} disabled={disabled}>
            <AddBox />
        </IconButton>
    </MuiThemeProvider>
    </div>
})


