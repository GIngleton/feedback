import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large indigo">
          <i className="large material-icons teal-text">mode_edit</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
