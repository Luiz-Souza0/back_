// // utils/hashGenerator.js
// const bcrypt = require('bcrypt');
// const fs = require('fs');
// const path = require('path');

// const password = 'LauraElevato'; // troque pela senha desejada
// const usersFilePath = path.join(__dirname, './Mock/Login.json');

// bcrypt.hash(password, 10, (err, hash) => {
//   if (err) throw err;

//   // Lê o arquivo JSON atual
//   fs.readFile(usersFilePath, 'utf-8', (err, data) => {
//     if (err) {
//       console.error('Erro ao ler o arquivo:', err);
//       return;
//     }

//     let currentData = [];
//     try {
//       currentData = JSON.parse(data);
//     } catch (parseErr) {
//       console.error('Erro ao parsear JSON:', parseErr);
//       return;
//     }

//     // Adiciona um usuário novo com a senha criptografada
//     currentData.push({
//       username: 'admin',
//       password: hash,
//     });

//     // Salva no arquivo
//     fs.writeFile(usersFilePath, JSON.stringify(currentData, null, 2), (err) => {
//       if (err) {
//         console.error('Erro ao salvar o arquivo:', err);
//         return;
//       }

//       console.log('Usuário criado com senha criptografada.');
//       console.log('Hash gerado:', hash);
//     });
//   });
// });
