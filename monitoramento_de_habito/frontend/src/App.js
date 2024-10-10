import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Habits from './components/Habits';
import { AuthProvider } from './context/AuthContext';
import LoginSignUp from './LoginSignUp';
import Dashboard from './Dashboard';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/login" element={<LoginSignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
