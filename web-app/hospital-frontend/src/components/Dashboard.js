import React, { useState } from 'react';
import './Dashboard.css'; // Importing the CSS file for styling
import {
  Home, User, DollarSign, HeartPulse, FileText, FlaskConical, Scan, Bell, Settings, LogOut, Menu, Search, X
} from 'lucide-react';
import {
  FaUserInjured, FaCalendarAlt, FaFileInvoiceDollar, FaHeartbeat, FaUserMd, FaBed, FaChartLine, FaUsers, FaHospital, FaCalendarCheck, FaFolderOpen, FaCog, FaSignOutAlt, FaSearch
} from 'react-icons/fa'; // Importing Font Awesome icons

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard'); // State for active sidebar item

  // Mock data for the dashboard statistics
  const dashboardData = {
    date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    stats: [
      { icon: <FaUsers />, title: 'Total Patients', count: 3, percentage: '+12% from last month', color: '#4CAF50', iconBg: '#e8f5e9' },
      { icon: <FaCalendarCheck />, title: 'Today\'s Appointments', count: 0, percentage: '+5 from yesterday', color: '#2196F3', iconBg: '#e3f2fd' },
      { icon: <FaChartLine />, title: 'Active Visits', count: 1, color: '#FFC107', iconBg: '#fffde7' },
      { icon: <FaBed />, title: 'Available Rooms', count: 2, color: '#9C27B0', iconBg: '#f3e5f5' },
      { icon: <FaUserMd />, title: 'Staff Members', count: 3, color: '#00BCD4', iconBg: '#e0f7fa' },
      { icon: <FaFileInvoiceDollar />, title: 'Revenue (Today)', count: '$1,600', percentage: '+8.2% from yesterday', color: '#FF5722', iconBg: '#fbe9e7' },
    ],
    recentAppointments: [
      { name: 'John Doe', date: '1/10/2025, 12:00 PM', status: 'Scheduled' },
      { name: 'Sarah Johnson', date: '1/10/2025, 4:30 PM', status: 'Scheduled' },
      { name: 'Michael Brown', date: '1/11/2025, 11:15 AM', status: 'Completed' },
    ],
    departmentStatus: [
      { name: 'Emergency', patients: 12, status: 'High' },
      { name: 'Cardiology', patients: 8, status: 'Normal' },
      { name: 'Pediatrics', patients: 15, status: 'Normal' },
      { name: 'Radiology', patients: 6, status: 'Low' },
    ]
  };

  // Sidebar navigation items
  const sidebarNavItems = [
    { name: 'Dashboard', icon: <FaHospital />, label: 'Dashboard' },
    { name: 'Patients', icon: <FaUserInjured />, label: 'Patients' },
    { name: 'Appointments', icon: <FaCalendarAlt />, label: 'Appointments' },
    { name: 'Radiology Results', icon: Scan, label: 'Radiology Results' }, // Updated icon for Radiology Results
    { name: 'Medical Records', icon: FileText, label: 'Medical Records' }, // Updated icon for Medical Records
    { name: 'Vitals', icon: HeartPulse, label: 'Vitals' }, // Updated icon for Vitals
    { name: 'Lab Tests', icon: FlaskConical, label: 'Lab Tests' }, // Updated icon for Lab Tests
    { name: 'Billing', icon: <FaFileInvoiceDollar />, label: 'Billing' },
    { name: 'Reports', icon: <FaChartLine />, label: 'Reports' },
    { name: 'Settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="https://placehold.co/40x40/6366F1/FFFFFF?text=MC" alt="MediCare Logo" className="sidebar-logo" />
          <span className="sidebar-app-name">MediCare</span>
          <span className="sidebar-system-name">Hospital System</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {sidebarNavItems.map((item) => (
              <li key={item.name} className={activeMenuItem === item.name ? 'active' : ''} onClick={() => setActiveMenuItem(item.name)}>
                {item.icon}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Header */}
        <header className="main-header">
          <h1 className="header-title">{activeMenuItem}</h1>
          <p className="header-date">{dashboardData.date}</p>
          <div className="header-right">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>
            <div className="user-profile">
              <img src="https://placehold.co/40x40/8B5CF6/FFFFFF?text=DR" alt="Dr. Admin" className="user-avatar" />
              <div className="user-info">
                <span className="user-name">Dr. Admin</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="dashboard-stats-grid">
            {dashboardData.stats.map((item, index) => (
              <div className="stat-card" key={index} style={{ borderLeft: `5px solid ${item.color}` }}>
                <div className="stat-icon-wrapper" style={{ backgroundColor: item.iconBg, color: item.color }}>
                  {item.icon}
                </div>
                <div className="stat-info">
                  <p className="stat-title">{item.title}</p>
                  <h3 className="stat-count">{item.count}</h3>
                  {item.percentage && <p className="stat-percentage" style={{ color: item.color }}>{item.percentage}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-sections-grid">
            {/* Recent Appointments Section */}
            <div className="section-card">
              <h3 className="section-title">Recent Appointments</h3>
              <ul className="appointment-list">
                {dashboardData.recentAppointments.map((appointment, index) => (
                  <li key={index} className="appointment-item">
                    <div className="appointment-details">
                      <span className="appointment-name">{appointment.name}</span>
                      <span className="appointment-date">{appointment.date}</span>
                    </div>
                    <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Department Status Section */}
            <div className="section-card">
              <h3 className="section-title">Department Status</h3>
              <ul className="department-list">
                {dashboardData.departmentStatus.map((dept, index) => (
                  <li key={index} className="department-item">
                    <div className="department-details">
                      <span className="department-name">{dept.name}</span>
                      <span className="department-patients">{dept.patients} active patients</span>
                    </div>
                    <span className={`department-status-badge ${dept.status.toLowerCase()}`}>
                      {dept.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
