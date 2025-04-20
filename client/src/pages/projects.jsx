import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Projects.css";

const ProjectDashboard = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">Project Management</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="home.html">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="user.html">User</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Projects</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Team</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Reports</a></li>
              <li className="nav-item"><a className="nav-link" href="settings">Settings</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dashboard Section */}
      <section className="dashboard-section container">
        <h2 className="text-center">Project Dashboard</h2>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4>Create New Task</h4>
                <form>
                  <div className="mb-3">
                    <label htmlFor="task-name" className="form-label">Task Name</label>
                    <input type="text" className="form-control" id="task-name" placeholder="Enter task name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="assigned-to" className="form-label">Assign To</label>
                    <select className="form-select" id="assigned-to">
                      <option value="user1">User 1</option>
                      <option value="user2">User 2</option>
                      <option value="user3">User 3</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="due-date" className="form-label">Due Date</label>
                    <input type="date" className="form-control" id="due-date" />
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Add Task</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4>Project Overview</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Project 1</strong>
                    <div className="progress task-progress">
                      <div className="progress-bar bg-success task-progress-bar" style={{ width: "60%" }}></div>
                    </div>
                    <span>Progress: 60%</span>
                  </li>
                  <li className="list-group-item">
                    <strong>Project 2</strong>
                    <div className="progress task-progress">
                      <div className="progress-bar bg-warning task-progress-bar" style={{ width: "30%" }}></div>
                    </div>
                    <span>Progress: 30%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4>Current Tasks</h4>
                <div className="task-card">
                  <h5>Task 1: Complete Project Report</h5>
                  <p>Assigned to: User 1</p>
                  <div className="progress task-progress">
                    <div className="progress-bar bg-info task-progress-bar" style={{ width: "50%" }}></div>
                  </div>
                  <p>Due Date: 2025-02-15</p>
                  <div className="action-btns">
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-warning important-btn">Mark as Important</button>
                  </div>
                </div>
                <div className="task-card">
                  <h5>Task 2: Design New UI</h5>
                  <p>Assigned to: User 2</p>
                  <div className="progress task-progress">
                    <div className="progress-bar bg-danger task-progress-bar" style={{ width: "25%" }}></div>
                  </div>
                  <p>Due Date: 2025-02-20</p>
                  <div className="action-btns">
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-warning important-btn">Mark as Important</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-btns">
          <button className="btn btn-success">Complete Project</button>
          <button className="btn btn-danger">Delete Project</button>
        </div>

        <div className="timeline">
          <h4>Project Timeline</h4>
          <div className="timeline-item">
            <strong>Task 1: Complete Project Report</strong> - Due: 2025-02-15
          </div>
          <div className="timeline-item">
            <strong>Task 2: Design New UI</strong> - Due: 2025-02-20
          </div>
        </div>

        <div className="gantt-chart">
          <h4>Gantt Chart</h4>
          <p>Gantt Chart goes here (use a library such as DHTMLX or Google Charts for implementation).</p>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Project Management Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDashboard;