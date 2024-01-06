import React from 'react';
import './HackathonStats.css';

const HackathonStats = () => {
  // Dummy data for hackathon stats
  // will have to pull from db when set up
  const statsData = [
    { label: 'Hackers Checked In', value: '635' },
    { label: 'Total Users', value: '2420' },
    { label: 'Verified Users', value: '2390' },
    { label: 'Submitted Users', value: '2150' },
    { label: 'Admitted Users', value: '1980' },
    { label: 'Waitlisted Users', value: '140' },
    { label: 'Rejected Users', value: '300' },
    { label: 'Confirmed Hackers', value: '985' },
    { label: 'Declined Hackers', value: '50' },
    { label: 'Hackers Needing Reimbursement', value: '50' },
    { label: 'Confirmed Bus Riders', value: '50' },
    { label: 'Confirmed Plane Riders', value: '50' },
    { label: 'Confirmed Car Drivers', value: '50' },
    { label: 'Total Reimbursement Amount (Estimated)', value: '$5000' },
    { label: 'Total Reimbursement Amount (Estimated - Confirmed Only)', value: '$4340' },

  ];

  return (
    <div className="hackathon-stats-container">
      {statsData.map((stat, index) => (
        <div key={index} className="hackathon-stats-item">
          <span className="hackathon-stats-label">{stat.label}:</span>
          <span className="hackathon-stats-value">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default HackathonStats;
