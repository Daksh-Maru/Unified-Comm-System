const Transaction = require('../models/transaction');
const Account = require('../models/account');

// GET /api/finance/accounts
exports.getAccounts = async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
};

// GET /api/finance/spending-category
exports.getSpendingByCategory = async (req, res) => {
  const spending = await Transaction.aggregate([
    { $match: { type: 'expense' } },
    { $group: { _id: '$category', total: { $sum: '$amount' } } }
  ]);
  res.json(spending);
};

// GET /api/finance/cashflow
exports.getCashFlow = async (req, res) => {
  const cashFlow = await Transaction.aggregate([
    {
      $group: {
        _id: {
          month: { $month: '$date' },
          type: '$type'
        },
        total: { $sum: '$amount' }
      }
    }
  ]);
  res.json(cashFlow);
};
