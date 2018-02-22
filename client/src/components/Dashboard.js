import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large indigo">
          <i className="large material-icons">mode_edit</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;