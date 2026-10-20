# AUREON ONE — Autonomous Media OS

## Visão
Receber uma intenção em linguagem natural e executar o ciclo de produção de mídia com rastreabilidade, supervisão e controle de custos.

## Fluxo
Comando -> plano -> pesquisa e fontes -> validação factual -> roteiro -> mídia licenciada/original -> narração -> montagem -> legendas -> thumbnail -> QA -> aprovação -> agendamento/publicação por API oficial -> métricas -> experimentos.

## Agentes
- Orquestrador: decompõe comandos, define dependências e acompanha execuções.
- Radar: encontra temas usando fontes/APIs autorizadas.
- Pesquisador: coleta fontes, datas e evidências.
- Editor-chefe: confere fatos, riscos e originalidade.
- Roteirista: cria formatos curtos e longos.
- Diretor audiovisual: define cenas, ritmo, estilo e assets.
- Voz e vídeo: integra provedores externos, com custos e licenças.
- Controle de qualidade: verifica render, duração, áudio, legendas e duplicidade.
- Publicador: agenda e envia via integrações oficiais, com escopos e limites.
- Analista: coleta métricas e sugere testes; não promete viralização.

## Arquitetura proposta
Frontend responsivo (GitHub Pages possível); Supabase Auth/Postgres/Storage/RLS; backend de orquestração com fila persistente, workers e FFmpeg; provedores de LLM/TTS/imagem/vídeo; APIs oficiais das redes.

## Entidades principais
users, workspaces, channels, content_ideas, sources, production_jobs, job_steps, assets, approvals, publications, analytics_snapshots, usage_events, provider_credentials.

## Segurança e operação
Segredos apenas no backend; isolamento por workspace e RLS; consentimento de publicação; limite diário e mensal de gastos; idempotência; retry com backoff; trilha de auditoria; botão de pausa; revisão humana para alegações sensíveis; respeito a direitos autorais, privacidade e políticas das plataformas.

## Etapas
1. Autenticação + dados persistentes + painel e fila.
2. Orquestrador e geração de roteiros com pesquisa e fontes.
3. Geração e renderização de vídeo com QA e exportação.
4. Integrações de postagem e analytics.
5. Multi-canal, idiomas, custos e SaaS.

## Critério de pronto da primeira entrega
Usuário cria uma pauta, o backend salva um job, o orquestrador gera um roteiro com fontes, registra etapas e erros, e o usuário aprova ou rejeita no celular. Nenhuma etapa simulada será exibida como execução real.

## Estado
Especificação e protótipo inicial; os agentes e integrações ainda precisam ser implementados.
