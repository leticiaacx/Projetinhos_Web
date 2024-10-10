// src/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('/api/user/profile');
            setProfile(response.data);
        } catch (error) {
            console.error('Erro ao buscar perfil do usuário:', error);
        }
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
        <div>
            <h2>Configurar Perfil</h2>
            <input
                type="text"
                placeholder="Nome de Usuário"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Senha"
                value={profile.password}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
            <button onClick={handleProfileUpdate}>Atualizar Perfil</button>
        </div>
    );
};

export default Profile;
