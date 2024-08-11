import React from 'react'
import { Card, Row } from 'antd'
import Button from '../Button';
import './style.css'

function Cards({ setIsIncomeModalVisible, setIsExpenseModalVisible, income, expense, balance }) {
    return (
        <div>
            <Row className='my-row'>
                <Card className='my-card' title="Current Balance">
                    <p className='my-p'>₹{balance}</p>
                    <Button text={"Reset Balance"} blue={true} onClick={()=>{setIsIncomeModalVisible(true)}}/>
                </Card>
                <Card className='my-card' title="Total Income">
                    <p className='my-p'>₹{income}</p>
                    <Button text={"Add Income"} blue={true} onClick={()=>{setIsIncomeModalVisible(true)}}/>
                </Card>
                <Card className='my-card' title="Total Expense">
                    <p className='my-p'>₹{expense}</p>
                    <Button text={"Add Expense"} blue={true} onClick={()=>{setIsExpenseModalVisible(true)}}/>
                </Card>
            </Row>
        </div>
    )
}

export default Cards;
