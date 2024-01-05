import React from 'react';
import BarChart from '../../../components/BarChart';
import DonutChart from '../../../components/DonutChart';
import LiveCounter from '../../../components/LiveCounter';
import SingleBarChart from '../../../components/SingleBarChart';
import HackathonStats from '../../../components/HackathonStats';
import UniversityTreemap from '../../../components/UniversityTreemap';
import SignupBrushChart from '../../../components/BrushChart';

import '../../../components/Leaderboard.css';

const Leaderboard = () => {

const raceData = [
    { label: 'Black', value: 50, color: '#121A6A' },
    { label: 'Asian', value: 30, color: '#2848BA' },
    { label: 'Hispanic', value: 20, color: '#87A2FC' },
    { label: 'White', value: 20, color: '#B1CCFF' },
    { label: 'Other', value: 20, color: '#000000' },
  ];

const genderData = [
    { label: 'Male', value: 50, color: '#121A6A' },
    { label: 'Female', value: 30, color: '#2848BA' },
    { label: 'Other', value: 20, color: '#87A2FC' },
  ];

const hacksAttendedData = [
    { label: '0', value: 50, color: '#121A6A' },
    { label: '1-3', value: 30, color: '#2848BA' },
    { label: '4-6', value: 20, color: '#87A2FC' },
    { label: '7-9', value: 20, color: '#B1CCFF' },
    { label: '10+', value: 20, color: '#000000' },
  ];

const workshopData = [
    { name: 'Team Building', registered: 200, checkedIn: 150 },
    { name: 'Beginner', registered: 250, checkedIn: 190 },
    { name: 'Resume Building', registered: 250, checkedIn: 190 },
    { name: 'Intro to Git', registered: 250, checkedIn: 190 },
    { name: 'Idea Generation', registered: 250, checkedIn: 190 },
        { name: 'Explainable AI', registered: 250, checkedIn: 190 },
            { name: 'Intro to Django', registered: 250, checkedIn: 190 },

    { name: 'Research ', registered: 250, checkedIn: 190 },
    { name: 'Docker Basics', registered: 250, checkedIn: 190 },
    { name: 'Twilio ', registered: 250, checkedIn: 190 },
    { name: 'HTML & CSS', registered: 250, checkedIn: 190 },
    { name: 'Intro to React', registered: 250, checkedIn: 190 },


// TODO - configure workshop db


  ];

const tShirtData = [
  { category: 'XS', value: 50 },
  { category: 'S', value: 100 },
  { category: 'M', value: 200 },
  { category: 'L', value: 300 },
  { category: 'XL', value: 80 },

];

const dietaryData = [
  { category: 'None', value: 500 },
  { category: 'Vegan', value: 100 },
  { category: 'Gluten', value: 200 },
  { category: 'Lactose', value: 300 },
  { category: 'Nut', value: 80 },
  { category: 'Halal', value: 80 },
  { category: 'Other', value: 80 },

// not yet figured out - should other value be an array - should that somehow be displayed in the donut chat
];


const universityData = {
  name: 'hackathon',
  children: [
    { name: 'University of Virginia', value: 1000 },
    { name: 'George Mason', value: 700 },
    { name: 'Virginia Tech', value: 500 },
    { name: 'Rutgers', value: 200 },
    { name: 'Duke', value: 10 },
    { name: 'Harvard', value: 300 },
    { name: 'George Washington', value: 300 },
    { name: 'Princeton', value: 300 },
// make sure to add a school field to application
  ],
};

const hackathonSignupData = [
  // dates have to be in 'YYYY-MM-DD' format
  { date: '2021-09-01', signups: 200 },
  { date: '2021-09-02', signups: 250 },
  { date: '2021-09-03', signups: 250 },
  { date: '2021-09-04', signups: 270 },
  { date: '2021-09-05', signups: 250 },
  { date: '2021-09-06', signups: 290 },
  { date: '2021-09-07', signups: 350 },
  { date: '2021-09-08', signups: 360 },
  { date: '2021-09-09', signups: 370 },
  { date: '2021-09-10', signups: 400 },

// pull from real time stats when configured
];




    return (
        <div className="leaderboard-container">
             <div className="header">
                            <h1 className="heading-1">Statistics</h1>
                            <LiveCounter initialCount={1456} />
                        </div>


            <div className="chart-container">
            <div>
                                              <HackathonStats />
                                            </div>

                            <div className="chart">
                                <h2 className="heading-2">Race</h2>
                                <DonutChart data={raceData} />
                            </div>
                            <div className="chart">
                                <h2 className="heading-2">Gender</h2>
                                <DonutChart data={genderData} />
                            </div>
                            <div className="chart">
                                <h2 className="heading-2">Hackathons Attended</h2>
                                <DonutChart data={hacksAttendedData} />
                            </div>


            </div>

            <div className="chart-container">
                         <div className="chart">
                            <h2 className="heading-2">Workshop Metrics</h2>
                                 <BarChart data={workshopData} xAxisLength={1000} />
                         </div>
                         <div className="chart">
                                         <h2 className="heading-2">T-Shirt Data</h2>
                                              <SingleBarChart data={tShirtData} xAxisLength={300} />

                                      </div>
                          <div className="chart">
                                                      <h2 className="heading-2">Dietary Restrictions</h2>
                                                           <SingleBarChart data={dietaryData} xAxisLength={500} />

                                                   </div>

                        </div>

             <div className="chart-container">
                     <div className="chart">
                     <h2 className="heading-2">Hacker Universities</h2>
                        <UniversityTreemap data={universityData} xAxisLength={1000} />
                        </div>

                     <div className="chart">
                     <h2 className="heading-2">Signups Timeline</h2>
                        <SignupBrushChart data={hackathonSignupData} xAxisLength={800} />
                       </div>

              </div>


        </div>
    );
};

export default Leaderboard;
