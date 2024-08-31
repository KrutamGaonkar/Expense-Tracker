import React from 'react'
import transactions from '../../assets/transactions.svg';
import './style.css';

function NoTransaction() {
  return (
    <div className='no-transaction'>
      <img src={transactions} className='no-transactoin-image'/>
      <p className='no-transactoin-text'>You Have No Transactions Currently</p>
    </div>
  )
}

export default NoTransaction;