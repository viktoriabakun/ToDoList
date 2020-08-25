import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

function EditableSpan(props: PropsType) {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)

    function activateEditMode() {
        setEditMode(true)
        setTitle(props.title)
    }

    function deActivateEditMode() {
        setEditMode(false)
        props.saveNewTitle(title)
    }

    function changeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            deActivateEditMode();
        }
    }

    return (
        editMode
            ? <input
                value={title}
                onBlur={deActivateEditMode}
                autoFocus={true}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}

            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>

    )
}

export default EditableSpan;