const RepositoryService = require('./RepositoryService');

class RepositoryController {
  constructor(repositoryService) {
    this.repositoryService = repositoryService;
  }

  searchRepositories(req, res) {
    const { nome, pagina, por_pagina } = req.query;
 
    // Verificar se o parâmetro 'nome' está presente
    if (!nome) {
      res.status(400).json({ mensagem: 'O parâmetro "nome" é obrigatório' });
      return;
    }
    // Verificar se o parâmetro 'nome' está presente e atende aos requisitos de comprimento mínimo
    if (nome.length < 3) {
      res.status(400).json({ mensagem: 'O parâmetro "nome" deve ter no mínimo 3 caracteres' });
      return;
    }

    // Verificar se o parâmetro 'pagina' está presente e é um número inteiro maior que zero
    const parsedPagina = parseInt(pagina);
    if (pagina && (!parsedPagina || parsedPagina < 1)) {
      res.status(400).json({ mensagem: 'O parâmetro "pagina" deve ser um número inteiro maior que zero' });
      return;
    }

    // Verificar se o parâmetro 'por_pagina' está presente e atende aos requisitos de valor mínimo e máximo
    const parsedPorPagina = parseInt(por_pagina);
    if (por_pagina && (!parsedPorPagina || parsedPorPagina < 1 || parsedPorPagina > 25)) {
      res.status(400).json({ mensagem: 'O parâmetro "por_pagina" deve ser um número inteiro entre 1 e 25' });
      return;
    }

    try {
      const resultadosPaginados = this.repositoryService.searchRepositoriesByName(nome, parsedPagina, parsedPorPagina);
      res.json(resultadosPaginados);
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }

  getRepositoryById(req, res) {
    const id = req.params.repoId;

    try {
      const repository = this.repositoryService.getRepositoryById(id);
      if (repository) {
        const { id, name, description, stargazers, forks, url } = repository;
        const responseData = {
          id,
          name,
          description,
          stargazers,
          forks,
          url,
        };
        res.json(responseData);
      } else {
        res.status(404).json({ mensagem: 'Repositório não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ mensagem: error.message });
    }
  }
}
module.exports = RepositoryController;
