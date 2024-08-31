import React, { useState } from 'react';
import { Table, Radio, Select, Tag, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { parse, unparse } from "papaparse";
import './style.css';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';
import { db, auth, doc, deleteDoc } from "../../firebase";

const { Option } = Select;
function TransactionTable({ transactions, addTransaction, fetchTransaction }) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [filterType, setFilterType] = useState("");
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            render: (_, { tag }) => (
                <Tag className='mobile-tags' color={tag == "Salary" || tag == "Freelance" ? "green" : "red"} key={tag} bordered={false}>
                    {tag.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
              <Space size="middle">
                <a onClick={() => handleDeleteRecord(record)}><DeleteOutlined /></a>
              </Space>
            ),
        }
    ];

const handleDeleteRecord = async(record) => {
    console.log(record);
    const transactionDocRef = doc(db, 'users', auth.currentUser.uid, 'transactions', record.id);
    await deleteDoc(transactionDocRef);
    toast.success('Transaction Deleted!');
    fetchTransaction();
}

    let filterTransactions = transactions.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(filterType));

    let sortedTransactions = filterTransactions.sort((a, b) => {
        if (sortBy == "date") {
            return new Date(b.date) - new Date(a.date);
        }
        else if (sortBy == "amount") {
            return b.amount - a.amount;
        }
        else {
            return 0;
        }
    })

    function exportCsv() {
        if (transactions.length != 0) {
            var csv = unparse({
                fields: ["name", "type", "amount", "tag", "date"],
                data: transactions
            });
            const data = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const csvURL = URL.createObjectURL(data);
            const tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', 'transactions.csv');
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        } else {
            toast.error("No transactions to export");
        }
    }

    function importCsv(event) {
        try {
            parse(event.target.files[0], {
                header: true,
                complete: async function (results) {
                    for (const transaction of results.data) {
                        if (transaction.name != "") {
                            const newTransaction = {
                                ...transaction, amount: parseInt(transaction.amount)
                            };
                            await addTransaction(newTransaction, true);
                        }
                    }
                }
            })

        } catch (error) {

        }
    }

    return (
        <div>
            <div className="transaction-table">
                <div className="table-heading-wrapper">
                    <h3>My Transactions</h3>
                    <div className="sort-wrapper">
                        <Radio.Group onChange={(e) => { setSortBy(e.target.value) }} value={sortBy}>
                            <Radio.Button className='sortBtns' value="">No Sort</Radio.Button>
                            <Radio.Button className='sortBtns' value="date">Sort by Date</Radio.Button>
                            <Radio.Button className='sortBtns' value="amount">Sort by Amount</Radio.Button>
                        </Radio.Group>
                        <div className="import-export-wrapper">
                            <div className="my-btn" onClick={exportCsv}>Export to CSV</div>
                            <label for="file-csv" className="my-btn my-btn-blue">Import from CSV</label>
                            <input
                                id="file-csv"
                                type="file"
                                accept=".csv"
                                required
                                onChange={importCsv}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                </div>
                <div className="search-wrapper">
                    <div className="input-flex">
                        <SearchOutlined />
                        <input className='search-input' value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder='Search By Name' />
                    </div>
                    <Select className='select-input'
                        onChange={(value) => setFilterType(value)}
                        value={filterType}
                        placeholder="Filter"
                        style={{ boxShadow: "var(--shadow)", borderRadius: "0.25rem" }}
                        bordered={false}>
                        <Option className="select-value" value="">All</Option>
                        <Option className="select-value" value="Income">Income</Option>
                        <Option className="select-value" value="Expense">Expense</Option>
                    </Select>
                </div>
                <Table rowKey={sortedTransactions.id} dataSource={sortedTransactions} columns={columns} scroll={{ x: true }}/>
            </div>
        </div>
    )
}

export default TransactionTable
