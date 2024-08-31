import React from 'react'
import { Card, Row } from 'antd'
import Button from '../Button';
import './style.css'

function Cards({ setIsIncomeModalVisible, setIsExpenseModalVisible, setIsDeleteModalVisible, income, expense, balance }) {
    const isDisabled = !income && !expense && !balance && true;
    return (
        <div>
            <Row className='my-row'>
                <Card className='my-card' title="Current Balance">
                    <p className='my-p'>₹{balance}</p>
                    <Button disable={isDisabled} text={"Reset Balance"} blue={true} onClick={()=>{setIsDeleteModalVisible(true)}}/>
                </Card>
                <Card className='my-card no-top-margin' title="Total Income">
                    <p className='my-p'>₹{income}</p>
                    <Button disable={false} text={"Add Income"} blue={true} onClick={()=>{setIsIncomeModalVisible(true)}}/>
                </Card>
                <Card className='my-card no-top-margin' title="Total Expense">
                    <p className='my-p'>₹{expense}</p>
                    <Button disable={false} text={"Add Expense"} blue={true} onClick={()=>{setIsExpenseModalVisible(true)}}/>
                </Card>
            </Row>
        </div>
    )
}

export default Cards;
