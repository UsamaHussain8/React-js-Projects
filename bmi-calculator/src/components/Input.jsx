import {useState} from 'react'
import './input.css'

function Input({value, onChange}) {
    return (
    <>
        <input 
            className="input-field" 
            type='number'
            value={value}
            onChange={onChange}
            required
        />
    </>
)}

export default Input