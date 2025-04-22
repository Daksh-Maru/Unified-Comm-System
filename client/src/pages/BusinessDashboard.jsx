import React from 'react';
import '../css/BusinessDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../components/Navbar';

const BusinessDashboard = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Section */}
      <section className="dashboard-section container">
        <h2 className="text-center">Business Analytics & Operations Dashboard</h2>

        <div className="row">
          {/* Business Performance Analysis */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4>Business Performance Analysis</h4>
                <form>
                  <div className="mb-3">
                    <label htmlFor="performance-metrics" className="form-label">Choose Metrics</label>
                    <select className="form-select" id="performance-metrics">
                      <option value="sales">Sales</option>
                      <option value="expenses">Expenses</option>
                      <option value="profit">Profit</option>
                      <option value="growth">Growth</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="analysis-period" className="form-label">Period</label>
                    <select className="form-select" id="analysis-period">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Analyze</button>
                </form>
              </div>
            </div>
          </div>

          {/* Reporting Section */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4>Generate Report</h4>
                <form>
                  <div className="mb-3">
                    <label htmlFor="report-type" className="form-label">Report Type</label>
                    <select className="form-select" id="report-type">
                      <option value="financial">Financial</option>
                      <option value="operational">Operational</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="report-period" className="form-label">Report Period</label>
                    <select className="form-select" id="report-period">
                      <option value="last-quarter">Last Quarter</option>
                      <option value="this-quarter">This Quarter</option>
                      <option value="year-to-date">Year to Date</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success">Generate Report</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="chart-container row">
          <div className="col-md-6">
            <h4>AI-Powered Performance Predictions</h4>
            <div className="chart-placeholder">
              <p>AI-powered business performance prediction (e.g., forecast next month's sales or growth trends).</p>
            </div>
          </div>
          <div className="col-md-6">
            <h4>AI-Based Operational Insights</h4>
            <div className="chart-placeholder">
              <p>AI-generated insights (e.g., operational bottlenecks, optimization suggestions).</p>
            </div>
          </div>
        </div>

        {/* Visualization Section */}
        <div className="chart-container">
          <h4>Business Insights Visualization</h4>
          <div className="chart-placeholder">
            <p>Visualization of key metrics (e.g., sales vs expenses, revenue vs growth, etc.).</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-btns">
          <button className="btn btn-danger">Delete Report</button>
          <button className="btn btn-warning">Export Data</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Business Analytics & Operations Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default BusinessDashboard;
