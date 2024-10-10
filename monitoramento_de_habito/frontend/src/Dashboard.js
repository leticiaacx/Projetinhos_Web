import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [selectedHabit, setSelectedHabit] = useState(null);
    const [newHabit, setNewHabit] = useState({ name: '', color: '#000000', time: '', frequency: '' });
    const [profile, setProfile] = useState({ username: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetchHabits();
        fetchUserProfile();
    }, []);

    const fetchHabits = async () => {
        try {
            const response = await axios.get('/api/habits');
            setHabits(response.data);
        } catch (error) {
            console.error('Erro ao buscar hábitos:', error);
        }
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('/api/user/profile');
            setProfile(response.data);
        } catch (error) {
            console.error('Erro ao buscar perfil do usuário:', error);
        }
    };

    const handleCreateHabit = async () => {
        if (newHabit.name) {
            try {
                const response = await axios.post('/api/habits', {
                    name: newHabit.name,
                    color: newHabit.color, // Adicionando a cor
                    time: newHabit.time,   // Adicionando o tempo
                    frequency: newHabit.frequency
                });
                fetchHabits(); // Atualiza a lista de hábitos
                setNewHabit({ name: '', color: '#000000', time: '', frequency: '' }); // Limpa o campo de entrada
                alert('Hábito criado com sucesso!'); // Mensagem de sucesso
            } catch (error) {
                console.error('Erro ao criar hábito:', error.response || error); // Logando erro
            }
        } else {
            alert('Por favor, insira um nome para o hábito.'); // Validação
        }
    };

    const handleSelectHabit = (habit) => {
        setSelectedHabit(habit);
        setNewHabit({ name: habit.name, color: habit.color, time: habit.time, frequency: habit.frequency });
    };

    const handleUpdateHabit = async () => {
        if (selectedHabit && newHabit.name) {
            try {
                await axios.put(`/api/habits/${selectedHabit._id}`, newHabit);
                fetchHabits();
                setSelectedHabit(null);
                setNewHabit({ name: '', color: '#000000', time: '', frequency: '' });
            } catch (error) {
                console.error('Erro ao atualizar hábito:', error);
            }
        }
    };

    const handleDeleteHabit = async (habitId) => {
        try {
            await axios.delete(`/api/habits/${habitId}`);
            fetchHabits();
        } catch (error) {
            console.error('Erro ao deletar hábito:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleProfileUpdate = async () => {
        try {
            await axios.put('/api/user/profile', profile);
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <h1>Dashboard</h1>
                <div className="profile-actions">
                    <button onClick={handleProfileUpdate}>Configurar Perfil</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="content">
                <h2>Bem-vindo ao seu Dashboard!</h2>
                <div className="habits-list">
                    <h3>Meus Hábitos</h3>
                    {habits.length > 0 ? (
                        <ul>
                            {habits.map((habit) => (
                                <li key={habit._id}>
                                    <div style={{ backgroundColor: habit.color }}>
                                        {habit.name} - {habit.time}
                                    </div>
                                    <button onClick={() => handleSelectHabit(habit)}>Editar</button>
                                    <button onClick={() => handleDeleteHabit(habit._id)}>Deletar</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum hábito encontrado. Crie um hábito!</p>
                    )}
                </div>

                <div className="create-habit">
                    <h3>{selectedHabit ? 'Editar Hábito' : 'Criar Hábito'}</h3>
                    <input
                        type="text"
                        placeholder="Nome do Hábito"
                        value={newHabit.name}
                        onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                    />
                    <input
                        type="color"
                        value={newHabit.color}
                        onChange={(e) => setNewHabit({ ...newHabit, color: e.target.value })}
                    />
                    <input
                        type="time"
                        value={newHabit.time}
                        onChange={(e) => setNewHabit({ ...newHabit, time: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Frequência do Hábito"
                        value={newHabit.frequency}
                        onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                    />
                    {selectedHabit ? (
                        <button onClick={handleUpdateHabit}>Atualizar Hábito</button>
                    ) : (
                        <button onClick={handleCreateHabit}>Criar Hábito</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
