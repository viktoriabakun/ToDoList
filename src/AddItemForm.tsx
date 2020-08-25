import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
        if (itemName.trim() !== ''){
            props.addItem(itemName.trim())
            setItemName('')
        } else {
            setError('Title is required');
        }
    }

    return (

        <div>
            <input value={itemName}
                   onChange={onItemNameChange}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItemFunction}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )

}

export default AddItemForm;