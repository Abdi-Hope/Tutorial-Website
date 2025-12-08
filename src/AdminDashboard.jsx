// src/components/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from './context/useTheme';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeUsers: 0,
    completionRate: 0
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading data
    setCourses([
      { id: 1, title: 'C++ Programming', students: 150, progress: 75, status: 'active' },
      { id: 2, title: 'JavaScript Basics', students: 200, progress: 60, status: 'active' },
      { id: 3, title: 'Python Fundamentals', students: 120, progress: 45, status: 'draft' }
    ]);

    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', progress: 80, lastActive: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', progress: 45, lastActive: '2024-01-14' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', progress: 90, lastActive: '2024-01-15' }
    ]);

    setStats({
      totalUsers: 1250,
      totalCourses: 8,
      activeUsers: 892,
      completionRate: 68
    });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview stats={stats} courses={courses} users={users} />;
      case 'courses':
        return <CourseManagement courses={courses} />;
      case 'users':
        return <UserManagement users={users} />;
      case 'analytics':
        return <AnalyticsDashboard />; // Removed unused stats prop
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardOverview stats={stats} courses={courses} users={users} />;
    }
  };

  return (
    <div className={`admin-dashboard ${theme}`}>
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <div className="admin-avatar">A</div>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 Course Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 User Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </nav>
      </div>

      <div className="admin-main">
        <header className="admin-toolbar">
          <h1>Admin Dashboard</h1>
          <div className="toolbar-actions">
            <button className="btn-primary">+ New Course</button>
            <div className="admin-search">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
        </header>

        <main className="admin-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// PropTypes for main component
AdminDashboard.propTypes = {
  // Add any props if this component receives any
};

// Sub-components with PropTypes

const DashboardOverview = ({ stats, courses, users }) => (
  <div className="overview-grid">
    <div className="stats-grid">
      <StatCard title="Total Users" value={stats.totalUsers} icon="👥" trend="+12%" />
      <StatCard title="Total Courses" value={stats.totalCourses} icon="📚" trend="+2" />
      <StatCard title="Active Users" value={stats.activeUsers} icon="🔥" trend="+8%" />
      <StatCard title="Completion Rate" value={`${stats.completionRate}%`} icon="✅" trend="+5%" />
    </div>

    <div className="overview-charts">
      <div className="chart-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {users.slice(0, 5).map(user => (
            <div key={user.id} className="activity-item">
              <span className="user-avatar">{user.name.charAt(0)}</span>
              <div className="activity-info">
                <p><strong>{user.name}</strong> completed a chapter</p>
                <small>{user.lastActive}</small>
              </div>
              <span className="progress-badge">{user.progress}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <h3>Course Performance</h3>
        <div className="course-performance">
          {courses.map(course => (
            <div key={course.id} className="performance-item">
              <span className="course-title">{course.title}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{course.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

DashboardOverview.propTypes = {
  stats: PropTypes.shape({
    totalUsers: PropTypes.number,
    totalCourses: PropTypes.number,
    activeUsers: PropTypes.number,
    completionRate: PropTypes.number
  }).isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    progress: PropTypes.number
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    progress: PropTypes.number,
    lastActive: PropTypes.string
  })).isRequired
};

const StatCard = ({ title, value, icon, trend }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
    <div className="stat-trend positive">{trend}</div>
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  trend: PropTypes.string.isRequired
};

const CourseManagement = ({ courses }) => (
  <div className="management-section">
    <div className="section-header">
      <h2>Course Management</h2>
      <button className="btn-primary">+ Add New Course</button>
    </div>
    
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Students</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>
                <div className="course-info">
                  <span className="course-icon">📚</span>
                  {course.title}
                </div>
              </td>
              <td>{course.students}</td>
              <td>
                <div className="progress-cell">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span>{course.progress}%</span>
                </div>
              </td>
              <td>
                <span className={`status-badge ${course.status}`}>
                  {course.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

CourseManagement.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    students: PropTypes.number,
    progress: PropTypes.number,
    status: PropTypes.string
  })).isRequired
};

const UserManagement = ({ users }) => (
  <div className="management-section">
    <div className="section-header">
      <h2>User Management</h2>
      <button className="btn-primary">Export Data</button>
    </div>
    
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Progress</th>
            <th>Last Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <span className="user-avatar">{user.name.charAt(0)}</span>
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <div className="progress-cell">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${user.progress}%` }}
                    ></div>
                  </div>
                  <span>{user.progress}%</span>
                </div>
              </td>
              <td>{user.lastActive}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn-edit">View</button>
                  <button className="btn-delete">Message</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

UserManagement.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    progress: PropTypes.number,
    lastActive: PropTypes.string
  })).isRequired
};

const AnalyticsDashboard = () => (
  <div className="analytics-section">
    <h2>Analytics Dashboard</h2>
    <div className="analytics-grid">
      <div className="analytics-card">
        <h3>User Growth</h3>
        <div className="chart-placeholder">
          📈 Chart: User growth over time
        </div>
      </div>
      <div className="analytics-card">
        <h3>Course Popularity</h3>
        <div className="chart-placeholder">
          🥧 Chart: Course enrollment distribution
        </div>
      </div>
      <div className="analytics-card">
        <h3>Completion Rates</h3>
        <div className="chart-placeholder">
          📊 Chart: Completion rates by course
        </div>
      </div>
      <div className="analytics-card">
        <h3>User Engagement</h3>
        <div className="chart-placeholder">
          🔥 Chart: Daily active users
        </div>
      </div>
    </div>
  </div>
);

AnalyticsDashboard.propTypes = {
  // No props needed for this component
};

const AdminSettings = () => (
  <div className="settings-section">
    <h2>Admin Settings</h2>
    <div className="settings-grid">
      <div className="setting-card">
        <h3>General Settings</h3>
        <div className="setting-item">
          <label>Platform Name</label>
          <input type="text" defaultValue="WebTutorial" />
        </div>
        <div className="setting-item">
          <label>Default Theme</label>
          <select>
            <option>Light</option>
            <option>Dark</option>
            <option>Blue</option>
          </select>
        </div>
      </div>
      
      <div className="setting-card">
        <h3>Course Settings</h3>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />Allow user notes
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />Show progress tracking
          </label>
        </div>
      </div>
    </div>
  </div>
);

AdminSettings.propTypes = {
  // No props needed for this component
};

export default AdminDashboard;