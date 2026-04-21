# CHANGELOG

## Simulação de alteração de escopo

- Data: 2026-04-21
- Descrição: O cliente solicitou que o sistema, inicialmente planejado como um CRUD mínimo para demonstração, passe a incluir um campo de `priority` e a possibilitar filtragem por prioridade no futuro.
- Justificativa: Priorizar tarefas críticas é um requisito do cliente de logística; incluir o campo desde o início facilita priorização e futuras métricas de desempenho.
- Ações realizadas nesta simulação:
  - Atualizado o modelo em memória (`src/tasks.js`) para armazenar `priority` com valor padrão `normal`.
  - Documentei a alteração no `CHANGELOG.md` e no `README.md`.
  - Planejamento: criar uma issue `Adicionar filtro por priority` e movê-la para o quadro Kanban como `A Fazer`.

Observação: Esta é uma simulação para demonstrar gestão de mudanças. Em um repositório real, a alteração teria sido acompanhada por uma issue, um branch da feature, e um PR com revisão de código.
