import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { registerUser, loginUser } from '../services/api';

const Auth = () => {
    const { setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isLogin, setIsLogin] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isLogin
                ? await loginUser(formData)
                : await registerUser(formData);
            setUser(response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Switch to Register' : 'Switch to Login'}
                </button>
            </form>
        </div>
    );
};

export default Auth;
