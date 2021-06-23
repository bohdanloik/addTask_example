import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    onClick: (title: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('');
    let addTitle = () => {
        props.onClick(title);
        setTitle('');
    }
    function onChangeHandler (e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }
    const  onKeyPressHandler =  (e: KeyboardEvent<HTMLInputElement>)  => {
        console.log(e);
        
        if (e.charCode === 13) {
            addTitle();
        }
    }

    function onAllClickHandler () {
        props.changeFilter("all")
    }
    function onActiveClickHandler () {
        props.changeFilter("active")
    }
    function onCompletedClickHandler () {
        props.changeFilter("completed")
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input 
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler} />
            <button onClick={addTitle}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveTaskHandler = () => {
                        props.removeTask(t.id)
                    }
                    return (
                    <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} readOnly/>
                    <span>{t.title}</span>
                    <button onClick={ onRemoveTaskHandler}>x</button>
                </li>)})
            }
        </ul>
        <div>
            <button onClick={ onAllClickHandler }>
                All
            </button>
            <button onClick={onActiveClickHandler}>
                Active
            </button>
            <button onClick={onCompletedClickHandler}>
                Completed
            </button>
        </div>
    </div>
}
