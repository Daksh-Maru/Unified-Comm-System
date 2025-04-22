import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/FinanceDashboard.css'; // Import the CSS file
import Navbar from '../components/Navbar';

function FinanceDashboard() {
    const [accountName, setAccountName] = useState('');
    const [accountType, setAccountType] = useState('savings');
    const [initialBalance, setInitialBalance] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionType, setTransactionType] = useState('deposit');
    const [transactionDate, setTransactionDate] = useState('');
    
    const handleSubmitAccount = (e) => {
        e.preventDefault();
        // Logic for adding account
    };
    
    const handleSubmitTransaction = (e) => {
        e.preventDefault();
        // Logic for adding transaction
    };
    
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Dashboard Section */}
            <section className="dashboard-section container" style={{ marginTop: '80px' }}>
                <h2 className="text-center">Finance Management Dashboard</h2>

                {/* Accounts and Transaction Management */}
                <div className="row">
                    {/* Manage Accounts */}
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Manage Accounts</h4>
                                <form onSubmit={handleSubmitAccount}>
                                    <div className="mb-3">
                                        <label htmlFor="account-name" className="form-label">Account Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="account-name"
                                            placeholder="Enter account name"
                                            value={accountName}
                                            onChange={(e) => setAccountName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="account-type" className="form-label">Account Type</label>
                                        <select
                                            className="form-select"
                                            id="account-type"
                                            value={accountType}
                                            onChange={(e) => setAccountType(e.target.value)}
                                        >
                                            <option value="savings">Savings</option>
                                            <option value="checking">Checking</option>
                                            <option value="credit">Credit</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="initial-balance" className="form-label">Initial Balance</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="initial-balance"
                                            placeholder="Enter initial balance"
                                            value={initialBalance}
                                            onChange={(e) => setInitialBalance(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add Account</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Management */}
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4>Transaction Management</h4>
                                <form onSubmit={handleSubmitTransaction}>
                                    <div className="mb-3">
                                        <label htmlFor="transaction-amount" className="form-label">Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="transaction-amount"
                                            placeholder="Enter transaction amount"
                                            value={transactionAmount}
                                            onChange={(e) => setTransactionAmount(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="transaction-type" className="form-label">Transaction Type</label>
                                        <select
                                            className="form-select"
                                            id="transaction-type"
                                            value={transactionType}
                                            onChange={(e) => setTransactionType(e.target.value)}
                                        >
                                            <option value="deposit">Deposit</option>
                                            <option value="withdrawal">Withdrawal</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="transaction-date" className="form-label">Transaction Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="transaction-date"
                                            value={transactionDate}
                                            onChange={(e) => setTransactionDate(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success">Add Transaction</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="transactions-table">
                    <h4>Recent Transactions</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Account</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-02-01</td>
                                <td>Savings</td>
                                <td>$500</td>
                                <td>Deposit</td>
                                <td>Completed</td>
                            </tr>
                            <tr>
                                <td>2025-02-02</td>
                                <td>Checking</td>
                                <td>$100</td>
                                <td>Withdrawal</td>
                                <td>Completed</td>
                            </tr>
                            <tr>
                                <td>2025-02-03</td>
                                <td>Credit</td>
                                <td>$200</td>
                                <td>Deposit</td>
                                <td>Pending</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* AI-based Charts */}
                <div className="chart-container row">
                    <div className="col-md-6">
                        <h4>Account Analysis (AI)</h4>
                        <div className="chart-placeholder">
                            <p>AI-based account analysis chart goes here.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h4>Transactions Overview (AI)</h4>
                        <div className="chart-placeholder">
                            <p>AI-based transaction visualization goes here.</p>
                        </div>
                    </div>
                </div>

                {/* Financial Predictions (AI) */}
                <div className="chart-container">
                    <h4>Financial Predictions (AI)</h4>
                    <div className="chart-placeholder">
                        <p>AI-based predictions chart goes here.</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="action-btns">
                    <button className="btn btn-danger">Delete Account</button>
                    <button className="btn btn-warning">Generate Report</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" style={{ background: '#212529', color: 'white', textAlign: 'center', padding: '20px 0', marginTop: '40px' }}>
                <div className="container">
                    <p>&copy; 2025 Finance Dashboard. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default FinanceDashboard;
