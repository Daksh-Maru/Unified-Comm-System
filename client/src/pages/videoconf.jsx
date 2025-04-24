import React, { useState, useEffect } from 'react';
import '../css/VideoConferencing.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import {
    StreamVideo,
    StreamVideoClient,
    StreamCall,
    CallControls,
    SpeakerLayout,
    StreamTheme,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useUser } from '@clerk/clerk-react'; // Assuming you're using Clerk's React SDK

const VideoConferencing = () => {
    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
    const [loading, setLoading] = useState(false);
    const [transcript, setTranscript] = useState('');
    const { isSignedIn, user } = useUser(); // Get Clerk user info

    // Test token for specific user ID (NEVER DO THIS IN PRODUCTION)
    const testStreamToken = 'YOUR_TEST_STREAM_TOKEN_FROM_DASHBOARD';

    const createNewMeeting = async () => {
        if (!isSignedIn || !user) {
            alert('Please sign in first.');
            return;
        }

        setLoading(true);

        try {
            const apiKey = import.meta.env.VITE_VIDEO_API_KEY;
            if (!apiKey) {
                alert('API key not found. Please set VITE_VIDEO_API_KEY in your environment.');
                setLoading(false);
                return;
            }

            // Use the test Stream token (insecure, NEVER DO THIS IN PRODUCTION)
            const videoClient = new StreamVideoClient({
                apiKey,
                user: {
                    id: user.id, // Use the Clerk user ID
                    name: user.firstName || 'User',
                    image: user.imageUrl,
                },
                token: testStreamToken,
            });

            const callId = `meeting-${Date.now()}`;
            const newCall = videoClient.call('default', callId);
            await newCall.join({ create: true });

            setClient(videoClient);
            setCall(newCall);
            setTranscript('');
        } catch (error) {
            console.error('Error creating or joining call:', error);
            alert('Failed to create or join call');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (call) {
                call.leave();
                setCall(null);
            }
            if (client) {
                client.disconnectUser();
                setClient(null);
            }
        };
    }, [call, client]);

    const generateFakeTranscript = () => {
        const fakeText = `
            Meeting started at 10:00 AM.
            John: Hello team, let's discuss the project status.
            Jane: We completed the UI design.
            Meeting ended at 10:30 AM.
        `;
        setTranscript(fakeText);
    };

    const downloadTranscript = () => {
        if (!transcript) {
            alert('No transcript available yet.');
            return;
        }

        const element = document.createElement('a');
        const file = new Blob([transcript], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'meeting-transcript.txt';
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div>
            <Navbar/>

            <section className="hero-section">
                <div className="container text-white text-center py-5">
                    <h1 className="display-4">Host and Collaborate with Ease</h1>
                    <p className="lead">
                        Join high-quality video meetings and collaborate with team members effortlessly.
                    </p>
                    <a href="dashboard.html" className="btn btn-light btn-lg">
                        Get Started
                    </a>
                </div>
            </section>

            <div className="container mt-5">
                <div className="row">
                    <div className="col feature-box text-center">
                        <h3>Create a New Meeting</h3>
                        {isSignedIn ? (
                            <button onClick={createNewMeeting} className="btn btn-primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create a New Meeting'}
                            </button>
                        ) : (
                            <p>Please sign in to create a meeting.</p>
                        )}
                    </div>
                    <div className="col feature-box text-center">
                        <h3>Summarize with AI</h3>
                        <p>Use AI to generate meeting summaries automatically.</p>
                        <button onClick={generateFakeTranscript} className="btn btn-secondary mb-2">
                            Generate Transcript (Demo)
                        </button>
                        <br/>
                        <button onClick={downloadTranscript} className="btn btn-success" disabled={!transcript}>
                            Download Transcript
                        </button>
                    </div>
                </div>
            </div>

            {call && client && (
                <div className="container mt-4" style={{height: '600px'}}>
                    <StreamVideo client={client}>
                        <StreamCall call={call}>
                            <StreamTheme>
                                <SpeakerLayout participantsBarPosition="bottom"/>
                                <CallControls/>
                            </StreamTheme>
                        </StreamCall>
                    </StreamVideo>
                </div>
            )}

            <section className="cta-section mt-5">
                <div className="container text-white text-center py-5">
                    <h2>Boost Your Team's Productivity</h2>
                    <p>Host seamless video conferences and collaborate like never before with UCP.</p>
                </div>
            </section>

            <footer className="footer">
                <div className="container text-center">
                    <p>&copy; 2025 Unified Communication Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default VideoConferencing;

