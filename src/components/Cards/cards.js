import { Card, Row } from 'antd'
import React from 'react'
import './style.css'
import Button from "../Button/button"

function Cards({ showExpenseModal, showIncomeModal, income, expense, totalBalance, resetBalance }) {
    const formatAmount = (amount) => parseFloat(amount).toFixed(2);
    return (
        <div>
            <Row className="my-row grid grid-cols-1 md:grid-cols-3 gap-4 justify-between items-center w-[90%] mx-auto my-[1rem]">
                <Card className="my-card m-[2rem] rounded-sm" title="Current Balance">
                    <p className="m-0">₹{formatAmount(totalBalance)}</p>
                    {/* <Button text="Reset Balance" blue={false} onClick={resetBalance} /> */}
                    <button className='btn-red' onClick={resetBalance}>Reset Balance</button>
                </Card>
                <Card className="my-card m-[2rem] rounded-sm" title="Total Income">
                    <p className="m-0">₹{formatAmount(income)}</p>
                    <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
                </Card>
                <Card className="my-card m-[2rem] rounded-sm" title="Total Expenses">
                    <p className="m-0">₹{formatAmount(expense)}</p>
                    <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
                </Card>
            </Row>
        </div>
    )
}


export default Cards
