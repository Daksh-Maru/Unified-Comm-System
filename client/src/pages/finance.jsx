import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/FinanceDashboard.css'; // Import the CSS file
import Navbar from '../components/Navbar';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
function FinanceDashboard() {
    // Form states
    const [spendingData, setSpendingData] = useState([]);
    const [cashFlowData, setCashFlowData] = useState([]);
    const [accountName, setAccountName] = useState('');
    const [accountType, setAccountType] = useState('savings');
    const [initialBalance, setInitialBalance] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionType, setTransactionType] = useState('deposit');
    const [transactionDate, setTransactionDate] = useState('');
    const [transactionAccount, setTransactionAccount] = useState('');
    const [selectedFilterAccount, setSelectedFilterAccount] = useState('all');
    const [selectedAccountForDeletion, setSelectedAccountForDeletion] = useState('');
    
    // Modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportType, setReportType] = useState('monthly');
    const [reportPeriod, setReportPeriod] = useState('');
    
    // Toast notification state
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    
    // Accounts and transactions data
    const [accounts, setAccounts] = useState([
        { id: 1, name: 'Main Savings', type: 'savings', balance: 2500 },
        { id: 2, name: 'Primary Checking', type: 'checking', balance: 1200 },
        { id: 3, name: 'Credit Card', type: 'credit', balance: -450 }
    ]);
    
    const [transactions, setTransactions] = useState([
        { id: 1, date: '2025-02-01', accountId: 1, amount: 500, type: 'deposit', status: 'Completed' },
        { id: 2, date: '2025-02-02', accountId: 2, amount: 100, type: 'withdrawal', status: 'Completed' },
        { id: 3, date: '2025-02-03', accountId: 3, amount: 200, type: 'deposit', status: 'Pending' },
        { id: 4, date: '2025-02-05', accountId: 1, amount: 150, type: 'withdrawal', status: 'Completed' },
        { id: 5, date: '2025-02-10', accountId: 2, amount: 300, type: 'deposit', status: 'Completed' }
    ]);
    
    // Set current date as default for new transactions
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setTransactionDate(today);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountsResponse = await fetch('http://localhost:3000/finance/accounts');
                const accountsData = await accountsResponse.json();
                setAccounts(accountsData);

                const spendingResponse = await fetch('http://localhost:3000/finance/spending-category');
                const spendingData = await spendingResponse.json();
                setSpendingData(spendingData);

                const cashFlowResponse = await fetch('http://localhost:3000/finance/cashflow');
                const cashFlowData = await cashFlowResponse.json();
                setCashFlowData(cashFlowData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const spendingChartData = {
        labels: spendingData.map(item => item._id),
        datasets: [
            {
                label: 'Spending by Category',
                data: spendingData.map(item => item.total),
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };



    const cashFlowChartData = {
        labels: cashFlowData.map(item => `Month ${item._id.month}`),
        datasets: [
            {
                label: 'Income',
                data: cashFlowData.filter(item => item._id.type === 'income').map(item => item.total),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Expense',
                data: cashFlowData.filter(item => item._id.type === 'expense').map(item => item.total),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };
    
    // Show notification helper
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };
    
    // Get filtered transactions based on selected account
    const filteredTransactions = selectedFilterAccount === 'all' 
        ? transactions 
        : transactions.filter(transaction => transaction.accountId === parseInt(selectedFilterAccount));
    
    // Add new account
    const handleSubmitAccount = (e) => {
        e.preventDefault();
        
        // Validation
        if (!accountName.trim()) {
            showNotification('Account name is required', 'danger');
            return;
        }
        
        if (!initialBalance || isNaN(parseFloat(initialBalance))) {
            showNotification('Valid initial balance is required', 'danger');
            return;
        }
        
        // Create new account with unique ID
        const newAccount = {
            id: accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1,
            name: accountName,
            type: accountType,
            balance: parseFloat(initialBalance)
        };
        
        // Add account to state
        setAccounts([...accounts, newAccount]);
        
        // Reset form
        setAccountName('');
        setAccountType('savings');
        setInitialBalance('');
        
        // Show success notification
        showNotification(`Account "${newAccount.name}" created successfully`);
    };
    
    // Add new transaction
    const handleSubmitTransaction = (e) => {
        e.preventDefault();
        
        // Validation
        if (!transactionAccount) {
            showNotification('Please select an account', 'danger');
            return;
        }
        
        if (!transactionAmount || isNaN(parseFloat(transactionAmount)) || parseFloat(transactionAmount) <= 0) {
            showNotification('Valid positive amount is required', 'danger');
            return;
        }
        
        if (!transactionDate) {
            showNotification('Transaction date is required', 'danger');
            return;
        }
        
        const accountId = parseInt(transactionAccount);
        const amount = parseFloat(transactionAmount);
        
        // Create new transaction with unique ID
        const newTransaction = {
            id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
            date: transactionDate,
            accountId: accountId,
            amount: amount,
            type: transactionType,
            status: 'Completed'
        };
        
        // Add transaction to state
        setTransactions([...transactions, newTransaction]);
        
        // Update account balance
        const updatedAccounts = accounts.map(account => {
            if (account.id === accountId) {
                const balanceChange = transactionType === 'deposit' ? amount : -amount;
                return { ...account, balance: account.balance + balanceChange };
            }
            return account;
        });
        
        setAccounts(updatedAccounts);
        
        // Reset form
        setTransactionAmount('');
        setTransactionType('deposit');
        
        // Show success notification
        showNotification('Transaction added successfully');
    };
    
    // Delete account handler
    const handleDeleteAccount = () => {
        if (!selectedAccountForDeletion) {
            showNotification('Please select an account to delete', 'danger');
            setShowDeleteModal(false);
            return;
        }
        
        const accountId = parseInt(selectedAccountForDeletion);
        
        // Check if account has transactions
        const hasTransactions = transactions.some(t => t.accountId === accountId);
        
        if (hasTransactions) {
            // Remove related transactions
            const filteredTransactions = transactions.filter(t => t.accountId !== accountId);
            setTransactions(filteredTransactions);
        }
        
        // Delete account
        const accountToDelete = accounts.find(a => a.id === accountId);
        const filteredAccounts = accounts.filter(a => a.id !== accountId);
        setAccounts(filteredAccounts);
        
        // Reset selection
        setSelectedAccountForDeletion('');
        setShowDeleteModal(false);
        
        // Show success notification
        showNotification(`Account "${accountToDelete.name}" deleted successfully`);
    };
    
    // Generate report handler
    const handleGenerateReport = () => {
        // In a real app, this would generate a report based on selected type and period
        showNotification(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully`);
        setShowReportModal(false);
    };
    
    // Get account name by ID for display in table
    const getAccountNameById = (accountId) => {
        const account = accounts.find(acc => acc.id === accountId);
        return account ? account.name : 'Unknown';
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
                                    <div className="mb-3">
                                        <label htmlFor="transaction-account" className="form-label">Account</label>
                                        <select
                                            className="form-select"
                                            id="transaction-account"
                                            value={transactionAccount}
                                            onChange={(e) => setTransactionAccount(e.target.value)}
                                        >
                                            <option value="">Select an account</option>
                                            {accounts.map((account) => (
                                                <option key={account.id} value={account.id}>
                                                    {account.name} ({account.type})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-success">Add Transaction</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transactions Table with Filter */}
                <div className="transactions-table mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Recent Transactions</h4>
                        <div className="filter-container" style={{ width: '250px' }}>
                            <select 
                                className="form-select"
                                value={selectedFilterAccount}
                                onChange={(e) => setSelectedFilterAccount(e.target.value)}
                            >
                                <option value="all">All Accounts</option>
                                {accounts.map((account) => (
                                    <option key={account.id} value={account.id}>
                                        {account.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
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
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.date}</td>
                                        <td>{getAccountNameById(transaction.accountId)}</td>
                                        <td>${transaction.amount}</td>
                                        <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                                        <td>{transaction.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No transactions found for this account</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Account Summary Dashboard */}
                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Account Summary</h4>
                                <div className="row">
                                    {accounts.map(account => (
                                        <div key={account.id} className="col-md-4 mb-3">
                                            <div className={`card ${
                                                account.type === 'savings' ? 'bg-info text-white' : 
                                                account.type === 'checking' ? 'bg-primary text-white' : 
                                                'bg-secondary text-white'
                                            }`}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{account.name}</h5>
                                                    <h6 className="card-subtitle mb-2 text-light">
                                                        {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                                                    </h6>
                                                    <p className="card-text fs-4">
                                                        ${account.balance.toFixed(2)}
                                                    </p>
                                                    <div className="d-flex justify-content-between">
                                                        <small>
                                                            {transactions.filter(t => t.accountId === account.id).length} transactions
                                                        </small>
                                                        <button 
                                                            className="btn btn-sm btn-light"
                                                            onClick={() => setSelectedFilterAccount(account.id.toString())}
                                                        >
                                                            View Transactions
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts and Analytics */}
                <div className="chart-container row">
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Account Analysis</h4>
                                <div className="chart-visualization" style={{ height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div className="progress mb-3" style={{ height: '25px' }}>
                                        <div className="progress-bar bg-info" style={{ width: `${(accounts.filter(a => a.type === 'savings').reduce((sum, a) => sum + a.balance, 0) / accounts.reduce((sum, a) => sum + Math.max(0, a.balance), 1) * 100).toFixed(0)}%` }}>
                                            Savings
                                        </div>
                                    </div>
                                    <div className="progress mb-3" style={{ height: '25px' }}>
                                        <div className="progress-bar bg-primary" style={{ width: `${(accounts.filter(a => a.type === 'checking').reduce((sum, a) => sum + a.balance, 0) / accounts.reduce((sum, a) => sum + Math.max(0, a.balance), 1) * 100).toFixed(0)}%` }}>
                                            Checking
                                        </div>
                                    </div>
                                    <div className="progress mb-3" style={{ height: '25px' }}>
                                        <div className="progress-bar bg-secondary" style={{ width: `${(Math.abs(accounts.filter(a => a.type === 'credit' && a.balance < 0).reduce((sum, a) => sum + a.balance, 0)) / accounts.reduce((sum, a) => sum + Math.max(0, a.balance), 1) * 100).toFixed(0)}%` }}>
                                            Credit
                                        </div>
                                    </div>
                                    <p className="text-center mt-3">Distribution of funds across account types</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Transactions Overview</h4>
                                <div className="chart-visualization d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
                                    <div className="text-center">
                                        <div className="d-flex justify-content-center mb-4">
                                            <div className="mx-3 text-center">
                                                <div className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px', fontSize: '24px' }}>
                                                    {transactions.filter(t => t.type === 'deposit').length}
                                                </div>
                                                <p className="mt-2">Deposits</p>
                                            </div>
                                            <div className="mx-3 text-center">
                                                <div className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px', fontSize: '24px' }}>
                                                    {transactions.filter(t => t.type === 'withdrawal').length}
                                                </div>
                                                <p className="mt-2">Withdrawals</p>
                                            </div>
                                        </div>
                                        <p>Total Volume: ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Insights */}
                <div className="chart-container mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Financial Insights</h4>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">Monthly Cash Flow</h5>
                                            <p className="card-text">
                                                ${(transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0) - 
                                                transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}
                                            </p>
                                            <p className="text-muted">Based on recent transactions</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title text-success">Savings Rate</h5>
                                            <p className="card-text">
                                                {(transactions.filter(t => t.type === 'deposit' && accounts.find(a => a.id === t.accountId)?.type === 'savings').reduce((sum, t) => sum + t.amount, 0) / 
                                                transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0) * 100 || 0).toFixed(1)}%
                                            </p>
                                            <p className="text-muted">Percentage of income saved</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h5 className="card-title text-info">Net Worth</h5>
                                            <p className="card-text">
                                                ${accounts.reduce((sum, account) => sum + account.balance, 0).toFixed(2)}
                                            </p>
                                            <p className="text-muted">Total across all accounts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="action-btns mt-4 d-flex justify-content-end gap-3">
                    <button 
                        className="btn btn-danger" 
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete Account
                    </button>
                    <button 
                        className="btn btn-warning" 
                        onClick={() => setShowReportModal(true)}
                    >
                        Generate Report
                    </button>
                </div>
                
                {/* Delete Account Modal */}
                {showDeleteModal && (
                    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete Account</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Select the account you want to delete:</p>
                                    <select 
                                        className="form-select"
                                        value={selectedAccountForDeletion}
                                        onChange={(e) => setSelectedAccountForDeletion(e.target.value)}
                                    >
                                        <option value="">Select an account</option>
                                        {accounts.map((account) => (
                                            <option key={account.id} value={account.id}>
                                                {account.name} (${account.balance})
                                            </option>
                                        ))}
                                    </select>
                                    <div className="alert alert-warning mt-3">
                                        <i className="bi bi-exclamation-triangle"></i> Warning: This will delete the account and all related transactions.
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Generate Report Modal */}
                {showReportModal && (
                    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Generate Financial Report</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowReportModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Report Type</label>
                                        <select 
                                            className="form-select"
                                            value={reportType}
                                            onChange={(e) => setReportType(e.target.value)}
                                        >
                                            <option value="monthly">Monthly Statement</option>
                                            <option value="quarterly">Quarterly Report</option>
                                            <option value="annual">Annual Summary</option>
                                            <option value="tax">Tax Report</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Account</label>
                                        <select 
                                            className="form-select"
                                            value={selectedFilterAccount}
                                            onChange={(e) => setSelectedFilterAccount(e.target.value)}
                                        >
                                            <option value="all">All Accounts</option>
                                            {accounts.map((account) => (
                                                <option key={account.id} value={account.id}>
                                                    {account.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Period</label>
                                        <input 
                                            type="month" 
                                            className="form-control"
                                            value={reportPeriod}
                                            onChange={(e) => setReportPeriod(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowReportModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-warning" onClick={handleGenerateReport}>Generate Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Toast Notification */}
                {notification.show && (
                    <div 
                        className={`position-fixed bottom-0 end-0 p-3`} 
                        style={{ zIndex: 5 }}
                    >
                        <div 
                            className={`toast show bg-${notification.type === 'danger' ? 'danger' : 'success'} text-white`}
                            role="alert" 
                            aria-live="assertive" 
                            aria-atomic="true"
                        >
                            <div className="toast-header">
                                <strong className="me-auto">Notification</strong>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setNotification({...notification, show: false})}
                                ></button>
                            </div>
                            <div className="toast-body">
                                {notification.message}
                            </div>
                        </div>
                    </div>
                )}
            </section>
            
            {/* <section className="dashboard-section container" style={{ marginTop: '80px' }}>
                <h2 className="text-center">Finance Management Dashboard</h2>

                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Spending by Category</h4>
                                <Pie data={spendingChartData} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">Cash Flow Overview</h4>
                                <Bar data={cashFlowChartData} />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <footer className="footer" style={{ background: '#212529', color: 'white', textAlign: 'center', padding: '20px 0', marginTop: '40px' }}>
                <div className="container">
                    <p>&copy; 2025 Finance Dashboard. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default FinanceDashboard;