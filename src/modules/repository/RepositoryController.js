const RepositoryService = require('./RepositoryService');
const { getActorById } = require('../actors/ActorRepository');



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
        const owner = getActorById(repository.owner);
        const languages = JSON.parse(repository.languages).map(lang => lang.language);
        const responseData = {
          id: repository.id,
          assignable_users: repository.assignable_users,
          code_of_conduct: repository.code_of_conduct,
          created_at: repository.created_at,
          database_id: repository.database_id,
          default_branch: repository.default_branch,
          delete_branch_on_merge: repository.delete_branch_on_merge,
          description: repository.description,
          disk_usage: repository.disk_usage,
          forks: repository.forks,
          has_issues_enabled: repository.has_issues_enabled,
          has_projects_enabled: repository.has_projects_enabled,
          has_wiki_enabled: repository.has_wiki_enabled,
          homepage_url: repository.homepage_url,
          is_archived: repository.is_archived,
          is_blank_issues_enabled: repository.is_blank_issues_enabled,
          is_disabled: repository.is_disabled,
          is_empty: repository.is_empty,
          is_fork: repository.is_fork,
          is_in_organization: repository.is_in_organization,
          is_locked: repository.is_locked,
          is_mirror: repository.is_mirror,
          is_private: repository.is_private,
          is_security_policy_enabled: repository.is_security_policy_enabled,
          is_template: repository.is_template,
          is_user_configuration_repository: repository.is_user_configuration_repository,
          issues: repository.issues,
          labels: repository.labels,
          languages: languages.join(", "),
          license_info: repository.license_info,
          mentionable_users: repository.mentionable_users,
          merge_commit_allowed: repository.merge_commit_allowed,
          milestones: repository.milestones,
          name: repository.name,
          name_with_owner: repository.name_with_owner,
          open_graph_image_url: repository.open_graph_image_url,
          owner: { ...owner }, // Usar o objeto do proprietário retornado pela função getActorById
          primary_language: repository.primary_language,
          pushed_at: repository.pushed_at,
          pull_requests: repository.pull_requests,
          rebase_merge_allowed: repository.rebase_merge_allowed,
          releases: repository.releases,
          repository_topics: repository.repository_topics,
          squash_merge_allowed: repository.squash_merge_allowed,
          stargazers: repository.stargazers,
          tags: repository.tags,
          updated_at: repository.updated_at,
          url: repository.url,
          uses_custom_open_graph_image: repository.uses_custom_open_graph_image,
          vulnerability_alerts: repository.vulnerability_alerts,
          watchers: repository.watchers
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
