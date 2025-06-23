const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const usersFilePath = path.join(__dirname, '../Mock/Login.json');
const SECRET_KEY = 'LuizAndressaEnossaFuturaFamilia';

router.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(usersFilePath, 'utf-8', async (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler os dados de usuário.' });

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login bem-sucedido!', token });
  });
});

module.exports = router;
