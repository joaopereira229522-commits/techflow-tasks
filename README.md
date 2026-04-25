# TechFlow Task — Sistema de Gerenciamento de Tarefas (Protótipo)

Este repositório contém um protótipo simples de um sistema de gerenciamento de tarefas, desenvolvido como parte da atividade de Engenharia de Software da TechFlow Solutions (exercício fictício).

**Objetivo:** Fornecer um backend mínimo que permita criar, listar, atualizar e remover tarefas — servindo como base para evolução seguindo metodologias ágeis.

**Escopo inicial:**
- API REST básica para CRUD de tarefas (endpoints em `src/routes.js`).
- Armazenamento em memória (arquivo `src/tasks.js`) para demonstração.
- Testes automatizados com `jest` + `supertest`.
- Pipeline CI básico em GitHub Actions para rodar os testes.

**Metodologia:** Scrum/Kanban leve — planejamento por iterações curtas, quadro Kanban (A Fazer / Em Progresso / Concluído) e commits atômicos com mensagens descritivas.

**Como rodar localmente**
1. Abra um terminal no diretório do projeto:

```powershell
cd c:\Users\Desktop\OneDrive\Documentos\Projeto soft_eng\techflow_task
```

2. Instale dependências:

```powershell
npm install
```

3. Inicie o servidor:

```powershell
npm start
```

O servidor ouvirá por padrão na porta `3000`.

**Testes**
- Execute `npm test` para rodar os testes definidos em `test/`.

**Endpoints principais**
- `GET /tasks` — lista todas as tarefas.
- `POST /tasks` — cria uma tarefa (JSON com `title`, `description`, ...).
- `GET /tasks/:id` — obtém tarefa por id.
- `PUT /tasks/:id` — atualiza tarefa.
- `DELETE /tasks/:id` — remove tarefa.

**Controle de Qualidade (CI)**
Há um workflow em `.github/workflows/nodejs-ci.yml` que executa `npm install` e `npm test` em pushes/PRs para `main` ou `master`.

**Planejamento / Kanban**
Use a aba Projects do GitHub para criar um quadro Kanban com as colunas: A Fazer, Em Progresso, Concluído. Cada cartão deve referenciar uma issue ou pull request.

**Simulação de alteração de escopo**
Uma alteração de escopo foi simulada e documentada em `CHANGELOG.md` — ela explica a justificativa e as mudanças feitas.

---

Se quiser, eu posso:
- Rodar `npm install` e `npm test` aqui no terminal.
- Inicializar um repositório git local com commits de exemplo.
- Gerar um template para issues e PRs.
# techflow-tasks
Sistema de gerenciamento de tarefas ágil

## Mudança de Escopo

Durante o desenvolvimento do projeto, foi identificada a necessidade de incluir um sistema de priorização de tarefas.

### Justificativa
A startup de logística lida com diferentes níveis de urgência em suas operações. Algumas tarefas precisam ser executadas imediatamente, enquanto outras podem ser realizadas posteriormente. 

Sem um sistema de prioridade, a equipe pode acabar focando em tarefas menos importantes, prejudicando o desempenho geral.

### Alterações realizadas
- Inclusão do campo "prioridade" nas tarefas (baixa, média e alta)
- Atualização das rotas da API para suportar o novo campo
- Ajustes na estrutura de dados
- Criação de novas tarefas no Kanban relacionadas à funcionalidade

### Impacto no projeto
A mudança melhorou a organização do fluxo de trabalho, permitindo que tarefas críticas sejam tratadas com mais atenção.
