const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();
const fs = require('fs');
const yaml = require('js-yaml');

// Ler arquivo YAML
const yamlFile = fs.readFileSync('./swagger.yaml', 'utf8');
// Converter YAML para JSON
const swaggerDocument = yaml.load(yamlFile);

// Rota para exibir a interface do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicializar servidor
const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}...`));
