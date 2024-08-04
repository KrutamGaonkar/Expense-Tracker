import React from 'react'
import './style.css'

function Button({ disable, text, onClick, blue}) {
  return (
    <div className={blue?'btn btn-blue':'btn'} onClick={onClick} disabled={disable}>{text}</div>
  )
}

export default Button
