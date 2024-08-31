import React from 'react'
import './style.css'

function Button({ disable, text, onClick, blue}) {
  return (
    <div className={disable && blue ? 'btn btn-blue disable' : blue ? 'btn btn-blue' : disable ? 'disable btn' : 'btn'} onClick={onClick}>{text}</div>
  )
}

export default Button
