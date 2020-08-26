import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: PropsType) {

    const [itemName, setItemName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onItemNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setItemName(event.currentTarget.value)
        setError(null);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            addItemFunction()
        }
    }

    const addItemFunction = () => {
        if (itemName.trim() !== '') {
            props.addItem(itemName.trim())
            setItemName('')
        } else {
            setError('Title is required');
        }
    }

    return (

        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={itemName}
                onChange={onItemNameChange}
                onKeyPress={onKeyPressHandler}
                // className={error ? 'error' : ''}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            {/*<input value={itemName}*/}
            {/*       onChange={onItemNameChange}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            <IconButton onClick={addItemFunction}
                        color={'primary'}>
                <AddBox/>
            </IconButton>
            {/*<button onClick={addItemFunction}>+</button>*/}
            {/*{error && <div className='error-message'>{error}</div>}*/}

        </div>

    )

}

export default AddItemForm;