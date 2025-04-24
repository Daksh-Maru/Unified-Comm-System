import React, { useState } from 'react';
import '../css/BusinessDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';

const BusinessDashboard = () => {
  // Report Generation State
  const [reportType, setReportType] = useState('financial');
  const [reportPeriod, setReportPeriod] = useState('last-quarter');
  const [reportContent, setReportContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Business Performance Analysis State
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [analysisPeriod, setAnalysisPeriod] = useState('last-quarter');
  const [analysisContent, setAnalysisContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  const availableMetrics = [
    'Revenue',
    'Customer Acquisition',
    'Operational Efficiency',
    'Profit Margin',
    'Market Share',
    'Employee Productivity',
    'Customer Satisfaction',
  ];

  // Function to call AI API for report generation
  const generateAISummary = async (data) => {
    const apiKey = import.meta.env.VITE_AI_API_KEY;
    const prompt = `Act as a senior business analyst. Generate a ${reportType} report for ${reportPeriod.replace('-', ' ')}. 
      Focus on key metrics and strategic insights. Format using markdown with headers, bullet points and tables where appropriate.
      Data context: ${JSON.stringify(data)}`;

    try {
      const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are a business intelligence assistant" },
            { role: "user", content: prompt }
          ],
          temperature: 0.5,
          max_tokens: 1024
        }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const result = await response.json();
      return result.choices[0].message.content;
    } catch (err) {
      console.error("AI Summary Error:", err);
      throw err;
    }
  };

  // Function to call AI API for business performance analysis
  const generatePerformanceAnalysis = async (metrics, period) => {
    const apiKey = import.meta.env.VITE_AI_API_KEY;
    const prompt = `You are a business performance analyst. Provide a detailed analysis for the following metrics: ${metrics.join(', ')} during the period: ${period.replace('-', ' ')}.
    Focus on trends, improvements, risks, and strategic recommendations.
    Format your response using markdown with headers, bullet points, and tables if needed.`;

    try {
      const response = await fetch("https://api.aimlapi.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are a business performance analyst" },
            { role: "user", content: prompt }
          ],
          temperature: 0.5,
          max_tokens: 1024
        }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const result = await response.json();
      return result.choices[0].message.content;
    } catch (err) {
      console.error("Performance Analysis Error:", err);
      throw err;
    }
  };

  // Handle Report Generation form submit
  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setReportContent('');

    try {
      // Simulated business data - replace with real data source
      const businessData = {
        revenue: "$1.2M",
        growthRate: "8.2%",
        keyMetrics: {
          customerAcquisition: "15% increase",
          operationalEfficiency: "12% improvement"
        }
      };

      const aiReport = await generateAISummary(businessData);
      setReportContent(aiReport);
    } catch (err) {
      setError("Failed to generate report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Performance Analysis form submit
  const handleGenerateAnalysis = async (e) => {
    e.preventDefault();
    if (selectedMetrics.length === 0) {
      setAnalysisError("Please select at least one metric.");
      return;
    }
    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisContent('');

    try {
      const analysis = await generatePerformanceAnalysis(selectedMetrics, analysisPeriod);
      setAnalysisContent(analysis);
    } catch (err) {
      setAnalysisError("Failed to generate analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Toggle metric selection
  const toggleMetric = (metric) => {
    setSelectedMetrics(prev =>
      prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]
    );
  };

  return (
    <>
      <Navbar />

      <section className="dashboard-section container py-4">
        <div className="row g-4">
          {/* AI-Powered Report Generation Section */}
          <div className="col-md-12">
            <div className="card shadow-sm mb-5">
              <div className="card-body">
                <h4 className="mb-4">AI-Powered Report Generation</h4>
                <form onSubmit={handleGenerateReport}>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label htmlFor="report-type" className="form-label">Report Type</label>
                      <select
                        className="form-select"
                        id="report-type"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        disabled={isGenerating}
                      >
                        <option value="financial">Financial</option>
                        <option value="operational">Operational</option>
                        <option value="market-analysis">Market Analysis</option>
                        <option value="executive">Executive Summary</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="report-period" className="form-label">Period</label>
                      <select
                        className="form-select"
                        id="report-period"
                        value={reportPeriod}
                        onChange={(e) => setReportPeriod(e.target.value)}
                        disabled={isGenerating}
                      >
                        <option value="last-quarter">Last Quarter</option>
                        <option value="this-quarter">This Quarter</option>
                        <option value="year-to-date">Year to Date</option>
                        <option value="last-year">Fiscal Year</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="btn btn-success w-100"
                    type="submit"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        Generating AI Report...
                      </>
                    ) : 'Generate Smart Report'}
                  </button>
                </form>

                {error && (
                  <div className="alert alert-danger mt-4" role="alert">
                    {error}
                  </div>
                )}

                {reportContent && (
                  <div className="mt-4 report-output">
                    <div className="d-flex justify-content-between mb-3">
                      <h5>AI-Generated Report</h5>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigator.clipboard.writeText(reportContent)}
                      >
                        Copy Report
                      </button>
                    </div>
                    <div className="markdown-content">
                      <ReactMarkdown>{reportContent}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI-Powered Business Performance Analysis Section */}
          <div className="col-md-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">AI-Powered Business Performance Analysis</h4>
                <form onSubmit={handleGenerateAnalysis}>
                  <div className="mb-3">
                    <label className="form-label">Select Metrics</label>
                    <div className="d-flex flex-wrap gap-3">
                      {availableMetrics.map(metric => (
                        <div className="form-check" key={metric}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`metric-${metric}`}
                            value={metric}
                            checked={selectedMetrics.includes(metric)}
                            onChange={() => toggleMetric(metric)}
                            disabled={isAnalyzing}
                          />
                          <label className="form-check-label" htmlFor={`metric-${metric}`}>
                            {metric}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="analysis-period" className="form-label">Select Period</label>
                    <select
                      className="form-select"
                      id="analysis-period"
                      value={analysisPeriod}
                      onChange={(e) => setAnalysisPeriod(e.target.value)}
                      disabled={isAnalyzing}
                    >
                      <option value="last-quarter">Last Quarter</option>
                      <option value="this-quarter">This Quarter</option>
                      <option value="year-to-date">Year to Date</option>
                      <option value="last-year">Fiscal Year</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                        Generating Analysis...
                      </>
                    ) : 'Generate Performance Analysis'}
                  </button>
                </form>

                {analysisError && (
                  <div className="alert alert-danger mt-4" role="alert">
                    {analysisError}
                  </div>
                )}

                {analysisContent && (
                  <div className="mt-4 report-output">
                    <div className="d-flex justify-content-between mb-3">
                      <h5>AI-Generated Performance Analysis</h5>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => navigator.clipboard.writeText(analysisContent)}
                      >
                        Copy Analysis
                      </button>
                    </div>
                    <div className="markdown-content">
                      <ReactMarkdown>{analysisContent}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessDashboard;
    