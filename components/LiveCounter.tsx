import React, { useState, useEffect } from 'react';
import './LiveCounter.css';

const LiveCounter = ({ initialCount }) => {
    const [count, setCount] = useState(initialCount.toString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => {
                const number = parseInt(prevCount, 10) + 1;
                return number.toString();
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const countDigits = String(count).split('').map((digit, index) => (
        <span key={index} className="digit">
            {digit}
        </span>
    ));

    return (
        <div className="live-counter">
            <div className="label">Live Sign-Ups</div>
            <div className="count">
                {countDigits}
            </div>
        </div>
    );
};

export default LiveCounter;
