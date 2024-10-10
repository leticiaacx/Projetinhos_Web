import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginSignUp from './LoginSignUp';
import Dashboard from './Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<LoginSignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
