import React, { useState } from 'react';
import BlogManagement from './BlogManagement'; // Blog management component

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('blogs');

  return (
    <div className="AdminDashboard container mt-5">
      <h2>Admin Dashboard - Manage Content</h2>
      <hr/>
      <div className="btn-group mb-4">
      </div>

      {/* Only include the BlogManagement functionality */}
      {activeTab === 'blogs' && <BlogManagement />}
    </div>
  );
};

export default AdminDashboard;
