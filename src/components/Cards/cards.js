import { Card, Row } from 'antd'
import './style.css'
import Button from "../Button/button"

function Cards({ showExpenseModal, showIncomeModal, income, expense, totalBalance, resetBalance }) {
    // safer formatter -> handles undefined / NaN
    const formatAmount = (amount) => {
        const num = Number(amount);
        if (Number.isNaN(num)) return "0.00";
        return num.toFixed(2);
    };

    // Disable reset if there is nothing to reset (both income and expense are zero)
    const isResetDisabled = Number(income) === 0 && Number(expense) === 0;

    return (
        <div>
            <Row className="my-row grid grid-cols-1 md:grid-cols-3 gap-4 justify-between items-center w-[90%] mx-auto my-[1rem]">
                <Card className="my-card m-[2rem] rounded-sm" title="Current Balance">
                    <p className="m-0">₹{formatAmount(totalBalance)}</p>
                    {/* Reset button disabled when no transactions */}
                    <button
                        className={`btn-red ${isResetDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => { if (!isResetDisabled) resetBalance(); }}
                        disabled={isResetDisabled}
                        title={isResetDisabled ? "Nothing to reset" : "Reset Balance"}
                    >
                        Reset Balance
                    </button>
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
