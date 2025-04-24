import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Projects.css";
import Navbar from "../components/Navbar";

const ProjectDashboard = () => {
  // State for tasks and projects
  const [tasks, setTasks] = useState([
    {
      name: "Complete Project Report",
      assignedTo: "User 1",
      dueDate: "2025-02-15",
      progress: 50,
      important: false,
      completed: false,
      description: "Complete the final report for the project.",
    },
    {
      name: "Design New UI",
      assignedTo: "User 2",
      dueDate: "2025-02-20",
      progress: 25,
      important: false,
      completed: false,
      description: "Design the new user interface for the application.",
    }
  ]);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("user1");
  const [dueDate, setDueDate] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [selectedTaskIdx, setSelectedTaskIdx] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedUser, setSelectedUser] = useState('');
  const [clerkUsers, setClerkUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/clerkUser'); // Adjust if your API base path differs
        const data = await res.json();
        const formatted = data.map(user => ({
          id: user.id,
          name: user.name
        }));
        setClerkUsers(formatted);
        if (formatted.length > 0) {
          setSelectedUser(formatted[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch Clerk users:', err);
      }
    };

    fetchUsers();
  }, []);
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
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
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
    const systemPrompt = "You are a professional assistant who helps manage projects";
    const userPrompt = `Compose a professional reply to this task description:\n\n${textToReply}`;
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
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
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

  // Add Task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !assignedTo || !dueDate) {
      setToast({ show: true, message: "All fields are required.", type: "danger" });
      return;
    }
    setTasks([
      ...tasks,
      {
        name: taskName,
        assignedTo,
        dueDate,
        progress: 0,
        important: false,
        completed: false,
        description: "",
      }
    ]);
    setTaskName("");
    setAssignedTo("user1");
    setDueDate("");
    setToast({ show: true, message: "Task added successfully!", type: "success" });
  };

  // Delete Task
  const handleDeleteTask = (idx) => {
    setTasks(tasks.filter((_, i) => i !== idx));
    if (selectedTaskIdx === idx) setSelectedTaskIdx(null);
    setToast({ show: true, message: "Task deleted.", type: "danger" });
  };

  // Mark as Important
  const handleMarkImportant = (idx) => {
    setTasks(tasks.map((task, i) =>
      i === idx ? { ...task, important: !task.important } : task
    ));
    setToast({ show: true, message: "Task importance updated.", type: "info" });
  };

  // Mark as Completed
  const handleCompleteTask = (idx) => {
    setTasks(tasks.map((task, i) =>
      i === idx ? { ...task, completed: true, progress: 100 } : task
    ));
    setToast({ show: true, message: "Task marked as completed.", type: "success" });
  };

  // Complete Project
  const handleCompleteProject = () => {
    setTasks(tasks.map(task => ({ ...task, progress: 100, completed: true })));
    setToast({ show: true, message: "Project marked as complete!", type: "success" });
  };

  // Delete Project
  const handleDeleteProject = () => {
    setTasks([]);
    setAiSummary("");
    setAiReply("");
    setSelectedTaskIdx(null);
    setToast({ show: true, message: "Project deleted.", type: "danger" });
  };

  // Summarize Task with AI
  const handleSummarizeTask = async (idx) => {
    setAiLoading(true);
    setAiSummary("");
    setAiReply("");
    const task = tasks[idx];
    const text = task.description || task.name;
    const summary = await summarizeWithAI(text);
    setAiSummary(summary);
    setSelectedTaskIdx(idx);
    setAiLoading(false);
  };

  // Smart Reply with AI
  const handleSmartReply = async (idx) => {
    setAiLoading(true);
    setAiReply("");
    setAiSummary("");
    const task = tasks[idx];
    const text = task.description || task.name;
    const reply = await generateSmartReplyWithAI(text);
    setAiReply(reply);
    setSelectedTaskIdx(idx);
    setAiLoading(false);
  };

  // Progress for Project Overview (average of all tasks)
  const getProjectProgress = () => {
    if (tasks.length === 0) return 0;
    const total = tasks.reduce((sum, t) => sum + t.progress, 0);
    return Math.round(total / tasks.length);
  };

  // Timeline is just all tasks, sorted by due date
  const timelineTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Toast auto-hide
  React.useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div>
      <Navbar />

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast align-items-center text-bg-${toast.type} border-0 show position-fixed top-0 end-0 m-3`} role="alert" style={{ zIndex: 9999, minWidth: 250 }}>
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast({ ...toast, show: false })}></button>
          </div>
        </div>
      )}

      <section className="dashboard-section container py-4">
        <h2 className="text-center mb-4">Project Dashboard</h2>

        <div className="row g-4">
          {/* Create New Task */}
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h4 className="mb-3">Create New Task</h4>
                <form onSubmit={handleAddTask} autoComplete="off">
                  <div className="mb-3">
                    <label htmlFor="task-name" className="form-label">Task Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="task-name"
                      placeholder="Enter task name"
                      value={taskName}
                      onChange={e => setTaskName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="assigned-to" className="form-label">Assign To</label>
                    <select
                      className="form-select"
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                    >
                      {clerkUsers.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="due-date" className="form-label">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="due-date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Add Task</button>
                </form>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h4 className="mb-3">Project Overview</h4>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Overall Progress</strong>
                    <span>{getProjectProgress()}%</span>
                  </li>
                </ul>
                <div className="progress mt-3" style={{ height: '22px' }}>
                  <div className="progress-bar bg-success" style={{ width: `${getProjectProgress()}%` }}>
                    {getProjectProgress()}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Tasks */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-3">Current Tasks</h4>
                {tasks.length === 0 && <div className="text-muted">No tasks available.</div>}
                <div className="row g-3">
                  {tasks.map((task, idx) => (
                    <div
                      className={`col-md-6`}
                      key={idx}
                    >
                      <div
                        className={`task-card p-3 rounded shadow-sm h-100 ${task.important ? 'border border-warning' : ''} ${task.completed ? 'bg-light text-muted' : ''}`}
                        style={{ border: selectedTaskIdx === idx ? '2px solid #007bff' : undefined }}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0">
                            Task {idx + 1}: {task.name}
                            {task.important && <span className="badge bg-warning ms-2">Important</span>}
                            {task.completed && <span className="badge bg-success ms-2">Completed</span>}
                          </h5>
                        </div>
                        <p className="mb-1">Assigned to: {task.assignedTo}</p>
                        <div className="progress mb-2" style={{ height: '12px' }}>
                          <div
                            className={`progress-bar ${task.completed ? 'bg-success' : task.progress > 50 ? 'bg-info' : 'bg-danger'}`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <p className="mb-1">Due Date: {task.dueDate}</p>
                        <div className="action-btns d-flex flex-wrap gap-2 mt-2">
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(idx)}>
                            Delete
                          </button>
                          <button className="btn btn-warning btn-sm" onClick={() => handleMarkImportant(idx)}>
                            {task.important ? "Unmark Important" : "Mark as Important"}
                          </button>
                          {!task.completed && (
                            <button className="btn btn-success btn-sm" onClick={() => handleCompleteTask(idx)}>
                              Mark as Completed
                            </button>
                          )}
                          <button className="btn btn-info btn-sm" onClick={() => handleSummarizeTask(idx)} disabled={aiLoading}>
                            Summarize Task
                          </button>
                          <button className="btn btn-primary btn-sm" onClick={() => handleSmartReply(idx)} disabled={aiLoading}>
                            Smart Reply
                          </button>
                        </div>
                        {/* Show AI summary/reply for selected task */}
                        {selectedTaskIdx === idx && (aiSummary || aiReply) && (
                          <div className="mt-3 p-3 bg-light rounded">
                            {aiSummary && (
                              <>
                                <h6>AI Summary:</h6>
                                <p>{aiSummary}</p>
                              </>
                            )}
                            {aiReply && (
                              <>
                                <h6>AI Reply:</h6>
                                <p>{aiReply}</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {aiLoading && (
                  <div className="mt-3 text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Actions */}
        <div className="action-btns my-4 d-flex gap-3 justify-content-center">
          <button className="btn btn-success" onClick={handleCompleteProject}>
            Complete Project
          </button>
          <button className="btn btn-danger" onClick={handleDeleteProject}>
            Delete Project
          </button>
        </div>

        {/* Timeline */}
        <div className="timeline mb-4">
          <h4>Project Timeline</h4>
          {timelineTasks.map((task, idx) => (
            <div className="timeline-item" key={idx}>
              <strong>Task {idx + 1}: {task.name}</strong> - Due: {task.dueDate}
            </div>
          ))}
        </div>

      </section>

      <footer className="footer mt-4">
        <div className="container text-center">
          <p>&copy; 2025 Project Management Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDashboard;
