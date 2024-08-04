import React from 'react'
import './style.css'

function Input({ type, label, placeholder, state, setState }) {
  return (
    <div className="input-wrapper">
        <p className='input-label'>{label}</p>
        <input
            type={type}
            placeholder={placeholder}
            value={state}
            onChange={(e)=>{setState(e.target.value)}}
            className='custom-input'
            />
    </div>
  )
}

export default Input
