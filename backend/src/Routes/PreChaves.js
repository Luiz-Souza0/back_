const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataFilePath = path.join(__dirname, '../Mock/PreChaves.json');

// GET – Obter dados
router.get('/api/prechaves', (req, res) => {
  fs.readFile(dataFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler os dados.' });
    res.json(JSON.parse(data));
  });
});

// POST – Adicionar novo dado
router.post('/api/prechaves', (req, res) => {
  const newData = req.body;

  fs.readFile(dataFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler os dados.' });

    const currentData = JSON.parse(data);
    currentData.push(newData);

    fs.writeFile(dataFilePath, JSON.stringify(currentData, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar os dados.' });
      res.status(201).json(newData);
    });
  });
});

// PUT – Atualizar dado (checkbox)
router.put('/api/prechaves/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  fs.readFile(dataFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler os dados.' });

    const currentData = JSON.parse(data);
    const index = currentData.findIndex(item => item.competencia === id);

    if (index !== -1) {
      currentData[index] = { ...currentData[index], ...updatedData };

      fs.writeFile(dataFilePath, JSON.stringify(currentData, null, 2), err => {
        if (err) return res.status(500).json({ error: 'Erro ao salvar os dados.' });
        res.status(200).json(currentData[index]);
      });
    } else {
      res.status(404).json({ error: 'Dado não encontrado.' });
    }
  });
});

// DELETE – Remover dado
router.delete('/api/prechaves/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(dataFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler os dados.' });

    const currentData = JSON.parse(data);
    const novoArray = currentData.filter(item => item.competencia !== id);

    if (novoArray.length === currentData.length) {
      return res.status(404).json({ error: 'Dado não encontrado.' });
    }

    fs.writeFile(dataFilePath, JSON.stringify(novoArray, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Erro ao salvar os dados.' });
      res.status(200).json({ message: 'Dado removido com sucesso.' });
    });
  });
});

module.exports = router;
