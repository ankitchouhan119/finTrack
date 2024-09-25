import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { Radio, Select, Table } from 'antd';
import { Option } from 'antd/es/mentions';
import React, { useState } from 'react'
import Button from '../Button/button';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';

function TransactionsTable({ transactions, addTransaction, fetchTransactions }) {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    const columns = [

        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },

        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },

        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    let filteredTransactions = transactions.filter((item) =>
        item.tag.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    );

    let sortedTransactions = filteredTransactions.sort((a, b) => {
        if (sortKey === "date") {
            return new Date(b.date) - new Date(a.date);
        } else if (sortKey === "amount") {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });


    function exportCSV() {
        var csv = unparse({
            fields: ["tag", "amount", "type", "date"],
            data: transactions,
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transaction.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function importCSV(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if (!file) {
            toast.error("Please select a file to import.");
            return;
        }
    
        parse(file, {
            header: true,
            complete: async (results) => {
                const transactionsToAdd = results.data.map((transaction) => ({
                    ...transaction,
                    amount: parseFloat(transaction.amount),
                }));
    
                // Add each transaction
                for (const transaction of transactionsToAdd) {
                    await addTransaction(transaction, true);
                }
    
                toast.success("Transactions Added!");
                fetchTransactions(); // Fetch transactions after importing
            },
            error: (error) => {
                console.error("Error parsing CSV: ", error);
                toast.error("Failed to import CSV.");
            }
        });
    }

    return (
        <>
            <div className="relative flex items-center m-3 gap-2 w-[95%]">
                <MagnifyingGlassIcon className="absolute left-3 w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by Tag"
                    className="w-[80%] shadow1 pl-10 pr-4 py-1 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Select
                    className=" w-[20%] shadow1  rounded-md  "
                    onChange={(value) => setTypeFilter(value)}
                    value={typeFilter}
                    placeholder="Filter"
                    allowClear
                >
                    <Option value="">All</Option>
                    <Option value="income">Income</Option>
                    <Option value="expense">Expense</Option>
                </Select>
            </div>
            <div className='flex items-center justify-between flex-col lg:flex-row  m-3  w-[95%]'>
                <div className='m-[1rem]'>

                    <h1 className='text-xl lg:text-2xl font-semibold'>My Transactions</h1>
                </div>
                <div className='m-[1rem]'>

                    <Radio.Group
                        className='input-radio'
                        onChange={(e) => setSortKey(e.target.value)}
                        value={sortKey}
                    >
                        <Radio.Button value="">No Sort</Radio.Button>
                        <Radio.Button value="date">Sort By Date</Radio.Button>
                        <Radio.Button value="amount">Sort By Amount</Radio.Button>

                    </Radio.Group>
                </div>
                <div className='flex flex-row gap-2 lg:w-[20%] w-[90%] items-center'>

                    <Button
                        text={"Export to CSV"} onClick={exportCSV} />
                    {/* <Button
                        text={"Import CSV"} blue={true} onClick={importCSV} /> */}
                    <label htmlFor="csv-import" className="w-full">
                        <Button
                            text={"Import CSV"}
                            blue={true}
                            onClick={() => document.getElementById('csv-import').click()}
                        />
                        <input
                            id="csv-import"
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={importCSV}
                        />
                    </label>
                </div>
            </div>
            <div className='w-full flex justify-center items-center'>

                <div className=' w-[90%]'>

                    <Table className=' my-1' dataSource={filteredTransactions} columns={columns} />
                </div>
            </div>
        </>
    )
}

export default TransactionsTable
