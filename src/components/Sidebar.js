import React from 'react';
import './Sidebar.css';

import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <h1>QuizMaster</h1>
            <ul>
                <li><Link to="/login">Admin Login</Link></li>
                <li><Link to="/category">Categories</Link></li>
                <li><Link to="/quiz">Quizzes</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
