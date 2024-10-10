const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Certifique-se de que o caminho está correto
const router = express.Router();

const UserController = require('./controllers/UserController');

router.get('/user/profile', UserController.getProfile); // Rota para pegar o perfil do usuário
router.get('/habits', UserController.getHabits); // Rota para pegar hábitos

// Rota para cadastro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });

        console.log('Tentando salvar o usuário:', user); // Log antes de salvar

        await user.save();

        console.log('Usuário salvo com sucesso:', user); // Log após salvar
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar o usuário:', error); // Log de erro
        res.status(400).json({ error: 'Erro ao criar o usuário' });
    }
});

// Rota para login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        // Geração do token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

module.exports = router;
