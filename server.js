const express = require('express');
const app = express();
const fs = require('fs');
 // Definir rota para o arquivo YAML do Swagger
app.get('/swagger', (req, res) => {
  try {
    // Ler arquivo YAML
    const yamlFile = fs.readFileSync('./swagger.yaml', 'utf8');
    // Definir resposta HTTP com o conteúdo do arquivo YAML do Swagger
    res.set('Content-Type', 'application/x-yaml; charset=utf-8');
    res.send(yamlFile);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro interno do servidor');
  }
});
 // Inicializar servidor
const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}...`));