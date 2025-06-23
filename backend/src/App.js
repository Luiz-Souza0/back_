const express = require('express');
const cors = require('cors');
const PosChaves = require('./Routes/PosChaves');
const PreChaves = require('./Routes/PreChaves');
const SegObra = require('./Routes/SegOb');
const Parcelas = require('./Routes/Parcelas');
const Login = require('./Routes/Login');

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(PosChaves);
app.use(PreChaves);
app.use(Parcelas);
app.use(SegObra);
app.use(Login);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
