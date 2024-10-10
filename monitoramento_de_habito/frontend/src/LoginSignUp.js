import React, { useState } from 'react';
import './LoginSignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Usando o hook corretamente

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/register';
        const data = { username, password };

        try {
            const response = await axios.post(url, data);
            if (isLogin) {
                localStorage.setItem('token', response.data.token); // Armazenando o token
                navigate('/dashboard'); // Navega para o dashboard
            } else {
                alert('Cadastro realizado com sucesso! Agora faça login.');
                setIsLogin(true);
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data.error || 'Ocorreu um erro');
        }
    };

    return (
        <div className="login-signup-container">
            <div className="overlay"></div>
            <h1 className="main-title">Sistema de Monitoramento de Hábitos Saudáveis</h1>
            <p className="welcome-message">Bem-vindo</p>
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Cadastre-se'}</button>
                    <p>
                        {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                        <span className="pointer" onClick={toggleForm}>
                            {isLogin ? 'Cadastre-se' : 'Login'}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginSignUp;
