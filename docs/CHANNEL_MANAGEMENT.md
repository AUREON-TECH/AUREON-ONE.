# Central de Canais — especificação

Objetivo: gerenciar todas as marcas, canais e contas de publicação em um único PWA mobile-first.

## Estrutura
- Workspace -> marca/canal editorial -> contas por plataforma (YouTube, TikTok, Instagram) -> séries -> vídeos -> publicações.
- Um canal editorial pode ter múltiplas contas, idiomas e formatos.
- Cada conta armazena identificador público, plataforma, país, idioma, status de conexão e permissões; tokens OAuth cifrados exclusivamente no backend.

## Painel agregado
- Filtros por período, marca, canal, plataforma, idioma.
- Visualizações, seguidores, retenção, engajamento, receita confirmada/estimada, custos e lucro líquido.
- Comparação entre canais e alertas sobre resultados e falhas de publicação.
- Nunca exibir métricas fictícias como se fossem reais.

## Operações
- Cadastro manual de canais e contas.
- Conexão OAuth oficial quando implementada e permitida.
- Fila de produção por canal, calendário, revisão e aprovação.
- Publicação via APIs oficiais e análise dos resultados.
- Controle de orçamento, limites, funções e auditoria por canal.
- Não coletar senhas de redes sociais no app.

## Experiência mobile
- Lista de canais com pesquisa, filtro e cartões compactos.
- Visão geral agregada e detalhe por canal.
- Botão de comando por voz/texto; execução em servidor, com notificações.
- PWA instalável, rápido, responsivo, acessível e tolerante a quedas de conexão.

## Estado
Requisito de produto registrado; conexões e métricas reais dependem de implementação e autorização.
