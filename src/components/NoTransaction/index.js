import React from 'react'
import transactions from '../../assets/transactions.svg';
import './style.css';

function NoTransaction() {
  return (
    <div className='no-transaction'>
      <img src={transactions} style={{width:"360px", margin:"2rem"}}/>
      <p style={{fontWeight:"600", fontSize:"20px"}}>You Have No Transactions Currently</p>
    </div>
  )
}

export default NoTransaction;