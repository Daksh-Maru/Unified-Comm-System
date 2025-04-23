import React, { useState, useEffect } from 'react';
import '../css/EmailIntegration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import { gapi } from 'gapi-script';
import { useUser } from '@clerk/clerk-react';

const EmailIntegration = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [smartReply, setSmartReply] = useState('');
    const [summarizeInput, setSummarizeInput] = useState('');
    const [replyInput, setReplyInput] = useState('');

    // Gmail API Configuration
    const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

    // Initialize Gmail API
    useEffect(() => {
        const initializeGapiClient = async () => {
            try {
                await new Promise((resolve) => gapi.load('client:auth2', resolve));

                await gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
                    scope: SCOPES
                });

                if (user) {
                    const googleToken = await user.getToken('google'); // Requires Clerk Google OAuth setup
                    gapi.auth.setToken({ access_token: googleToken });
                }
            } catch (error) {
                console.error('Error initializing Gmail client:', error);
            }
        };

        initializeGapiClient();
    }, [user]);

    // AI Summarization
    const summarizeWithAI = async (textToSummarize) => {
        const apiKey = import.meta.env.VITE_AI_API_KEY;
        const systemPrompt = "You are a helpful assistant";
        const userPrompt = `Summarize the following text:\n\n${textToSummarize}`;

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
                        {
                            role: "system",
                            content: systemPrompt,
                        },
                        {
                            role: "user",
                            content: userPrompt,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 256,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Error during AI summarization:", error);
            return "Failed to summarize with AI.";
        }
    };

    // AI Smart Reply
    const generateSmartReplyWithAI = async (textToReply) => {
        const apiKey = import.meta.env.VITE_AI_API_KEY;
        const systemPrompt = "You are a professional assistant who helps create emails";
        const userPrompt = `Compose a professional reply to this text:\n\n${textToReply}`;

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
                        {
                            role: "system",
                            content: systemPrompt,
                        },
                        {
                            role: "user",
                            content: userPrompt,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 256,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("Error during AI smart reply generation:", error);
            return "Failed to generate a smart reply with AI.";
        }
    };

    const handleSummarize = async () => {
        setLoading(true);
        setSummary('');
        try {
            const summaryText = await summarizeWithAI(summarizeInput);
            setSummary(summaryText);
        } catch (error) {
            console.error("Error during summarization:", error);
            setSummary("Failed to summarize.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateReply = async () => {
        setLoading(true);
        setSmartReply('');
        try {
            const replyText = await generateSmartReplyWithAI(replyInput);
            setSmartReply(replyText);
        } catch (error) {
            console.error("Error during smart reply generation:", error);
            setSmartReply("Failed to generate a smart reply.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <section className="hero-section">
                <div className="container text-center">
                    <h1 className="display-4">AI-Powered Email Management</h1>
                    <p className="lead">Smart email processing with AIML integration</p>
                </div>
            </section>

            <div className="container mt-5 d-flex flex-column align-items-center">
                <div className="row justify-content-center text-center gap-5">
                    <div className="col-md-5 feature-box">
                        <h3>Summarize Text</h3>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Enter text to summarize"
                            value={summarizeInput}
                            onChange={(e) => setSummarizeInput(e.target.value)}
                        />
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleSummarize}
                            disabled={loading}
                        >
                            Summarize
                        </button>
                        {summary && (
                            <div className="mt-3 p-3 bg-light rounded">
                                <h5>Summary:</h5>
                                <p>{summary}</p>
                            </div>
                        )}
                    </div>

                    <div className="col-md-5 feature-box">
                        <h3>Generate Smart Reply</h3>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Enter text to generate a reply for"
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                        />
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleGenerateReply}
                            disabled={loading}
                        >
                            Generate Reply
                        </button>
                        {smartReply && (
                            <div className="mt-3 p-3 bg-light rounded">
                                <h5>Suggested Reply:</h5>
                                <p>{smartReply}</p>
                            </div>
                        )}
                    </div>
                </div>

                {loading && (
                    <div className="mt-4 spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </div>

            <div className="email-options text-center mt-5">
                <h2>Quick Actions</h2>
                <div className="container">
                    <div className="row justify-content-center gap-3">
                        <button
                            className="btn btn-success col-md-3"
                            onClick={() => window.open('https://mail.google.com/mail/u/0/#inbox', '_blank')}
                        >
                            Open Inbox
                        </button>
                        <button
                            className="btn btn-primary col-md-3"
                            onClick={() => window.open('https://mail.google.com/mail/?view=cm', '_blank')}
                        >
                            Compose
                        </button>
                    </div>
                </div>
            </div>

            <footer className="footer mt-5">
                <div className="container text-center">
                    <p>&copy; 2025 Unified Communication Platform</p>
                </div>
            </footer>
        </>
    );
};

export default EmailIntegration;
