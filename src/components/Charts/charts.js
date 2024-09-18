import React, { useRef } from 'react';
import { Line, Pie } from '@ant-design/charts';

function Chart({ sortedTransactions }) {
    const lineChartRef = useRef(null);
    const pieChartRef = useRef(null);

    const data = sortedTransactions.map((item) => ({
        date: item.date,
        amount: item.amount
    }));

    let spendingData = sortedTransactions.filter((transaction) => {
        if (transaction.type === 'expense') {
            return { tag: transaction.tag, amount: transaction.amount };
        }
    });

    let finalSpendings = spendingData.reduce((acc, obj) => {
        let key = obj.tag;
        if (!acc[key]) {
            acc[key] = { tag: obj.tag, amount: obj.amount };
        } else {
            acc[key].amount += obj.amount;
        }
        return acc;
    }, {});

    const lineConfig = {
        data,
        width: 600,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
    };

    const spendingConfig = {
        data: Object.values(finalSpendings),
        width: 300,
        angleField: 'amount',
        colorField: 'tag',
    };

    // Export Image
    const downloadImage = () => {
        if (lineChartRef.current) {
            lineChartRef.current.downloadImage();
        } else {
            console.error('Chart instance is not available');
        }
    };

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col lg:flex-row justify-between m-5 w-[90%]'>
                <div className='flex justify-center lg:w-[65%] p-10 shadow1 items-center flex-col m-5 my-10 gap-3'>
                    <h2 className='text-2xl font-semibold mb-5'>Analytics Dashboard</h2>
                    <Line {...lineConfig} onReady={(chartInstance) => (lineChartRef.current = chartInstance)} />
                    <button
                        className='border-2 shadow1 border-[#2970ff] p-2 rounded-md text-[#2970ff] hover:bg-[#2970ff] hover:text-white transition-all duration-300'
                        type="button"
                        onClick={downloadImage}
                        style={{ marginRight: 24 }}
                    >
                        Export Image
                    </button>
                </div>
                <div className='flex justify-center shadow1 lg:w-[35%] p-10 items-center flex-col m-5 my-10 gap-3'>
                    <h2 className='text-2xl font-semibold mb-5'>Spending Summary</h2>
                    <Pie {...spendingConfig} onReady={(chartInstance) => (pieChartRef.current = chartInstance)} />
                </div>
            </div>
        </div>
    );
}

export default Chart;
