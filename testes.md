# Roteiro de Testes — Etapas 4 e 5

## Pré-requisitos

- Docker rodando: `docker compose up -d`
- Seed executado: `npx prisma db seed`
- App rodando: `npm run dev`
- NEXT_PUBLIC_API_URL=/api configurado no `.env.local` ✓ (já feito)

---

## 1. Autenticação (base para todos os testes admin)

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 1.1 | Acesse `/admin` e faça login com usuário/senha do `.env.local` | Redireciona para `/admin/selecao-paginas` |
| 1.2 | Faça login com senha errada | Mensagem "Usuário ou senha inválidos." sem redirecionar |
| 1.3 | Acesse `GET /api/admin/animais` sem token (ex: via curl/Insomnia sem header) | Retorna 401 `{ "mensagem": "Não autorizado." }` |

---

## 2. Cadastrar animal (POST /api/admin/animais)

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 2.1 | No painel admin, vá em Adoção → Adicionar. Preencha todos os campos e salve **sem foto** | Animal criado, `imagemUrl: null` no banco (verificar no pgAdmin em `localhost:5050`) |
| 2.2 | Cadastre um animal **com foto** (após configurar Cloudinary no `.env.local`) | `imagemUrl` salvo com URL do Cloudinary; foto visível no pgAdmin |
| 2.3 | Tente salvar com campos obrigatórios em branco | Mensagem de erro de validação no formulário, sem chamada à API |
| 2.4 | Via Insomnia: `POST /api/admin/animais` sem o campo `nome` no body | Retorna 400 `{ "sucesso": false, "mensagem": "Todos os campos obrigatórios..." }` |

---

## 3. Listar animais (GET /api/admin/animais)

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 3.1 | Acesse o painel de edição de animais (`/admin/adocao/editar`) | Lista os animais cadastrados (não mais mock/localStorage) |
| 3.2 | Via browser: `GET /api/admin/animais` com token no header | JSON com `{ sucesso: true, animais: [...] }` |
| 3.3 | Com banco vazio (antes de qualquer cadastro) | Lista retorna array vazio, painel exibe estado vazio |

---

## 4. Buscar animal por ID (GET /api/admin/animais/[id])

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 4.1 | Clique em "Editar" em um animal cadastrado | Formulário carrega com dados preenchidos |
| 4.2 | Via Insomnia: `GET /api/admin/animais/<id-valido>` | Retorna animal com todos os campos |
| 4.3 | Via Insomnia: `GET /api/admin/animais/id-inexistente` | Retorna 404 `{ "sucesso": false, "mensagem": "Animal não encontrado." }` |

---

## 5. Editar animal (PUT /api/admin/animais/[id])

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 5.1 | Edite o nome de um animal e salve **sem trocar a foto** | Nome atualizado no banco; `imagemUrl` permanece o mesmo |
| 5.2 | Edite um animal e selecione uma nova foto (com Cloudinary configurado) | Nova URL do Cloudinary no banco; URL antiga removida do Cloudinary |
| 5.3 | Via Insomnia: `PUT /api/admin/animais/<id>` com body faltando campo obrigatório | Retorna 400 com mensagem de erro |
| 5.4 | Via Insomnia: `PUT /api/admin/animais/id-inexistente` | Retorna 404 |

---

## 6. Remover animal (DELETE /api/admin/animais/[id])

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 6.1 | Na tela de edição, clique em "Remover" e confirme | Animal removido; redireciona para lista; animal não aparece mais |
| 6.2 | Via Insomnia: `DELETE /api/admin/animais/<id-valido>` | Retorna 200 `{ "sucesso": true, "mensagem": "Animal removido com sucesso." }` |
| 6.3 | Via Insomnia: `DELETE /api/admin/animais/id-inexistente` | Retorna 404 |

---

## 7. Página pública de adoção (GET /api/animais)

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 7.1 | Acesse `/adocao` sem estar logado | Página carrega, exibe os animais do banco (não mais mock) |
| 7.2 | `GET /api/animais` via browser (sem token) | Retorna JSON com lista de animais — **rota pública, sem autenticação** |
| 7.3 | Cadastre um animal no admin e recarregue `/adocao` | Novo animal aparece na vitrine |
| 7.4 | Use o filtro de espécie (Gato / Cão / Outros) | Exibe apenas os animais da espécie selecionada |
| 7.5 | Remova todos os animais no admin e acesse `/adocao` | Exibe mensagem "Nenhum animal encontrado." |

---

## 8. Fluxo completo de ponta a ponta

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 8.1 | Login → Cadastrar animal com foto → Acessar `/adocao` | Animal com imagem aparece na vitrine pública |
| 8.2 | Login → Editar nome do animal → Recarregar `/adocao` | Nome atualizado na vitrine |
| 8.3 | Login → Remover animal → Recarregar `/adocao` | Animal some da vitrine |

---

## Como verificar no banco (pgAdmin) — Etapa 4

1. Acesse `localhost:5050`
2. Login: `admin@gaapo.com` / `gaapo`
3. Navegue até: Servers → gaapo → Databases → gaapo → Schemas → public → Tables → `Animal`
4. Clique com botão direito → **View/Edit Data → All Rows**

---
---

# Roteiro de Testes — Etapa 5 (CRUD de Eventos)

> Os pré-requisitos são os mesmos da Etapa 4 (Docker, seed, `npm run dev`).
> Para os testes via Insomnia, use o token obtido em `POST /api/admin/login` no header `Authorization: Bearer <token>`.

---

## 9. Cadastrar evento (POST /api/admin/eventos)

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 9.1 | No painel admin, vá em Eventos → Adicionar. Preencha todos os campos e salve **sem foto** | Evento criado; `imagemUrl: null` no banco (verificar na tabela `Evento` do pgAdmin) |
| 9.2 | Cadastre um evento **com foto** (Cloudinary configurado) | `imagemUrl` salvo com URL do Cloudinary; foto aparece no pgAdmin |
| 9.3 | Tente salvar com o campo **Nome** em branco | Mensagem de erro de validação no formulário, sem chamada à API |
| 9.4 | Tente salvar com o campo **Data** em branco | Mensagem de erro de validação no formulário, sem chamada à API |
| 9.5 | Via Insomnia: `POST /api/admin/eventos` sem o campo `horario` no body | Retorna 400 `{ "sucesso": false, "mensagem": "Todos os campos obrigatórios..." }` |
| 9.6 | Via Insomnia: `POST /api/admin/eventos` sem token no header | Retorna 401 `{ "mensagem": "Não autorizado." }` |

---

## 10. Listar eventos (GET /api/admin/eventos)

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 10.1 | Acesse o painel de edição de eventos (`/admin/eventos/editar`) | Lista os eventos do banco ordenados por data (não mais localStorage) |
| 10.2 | Via Insomnia: `GET /api/admin/eventos` com token | JSON com `{ sucesso: true, eventos: [...] }` ordenados por data crescente |
| 10.3 | Com banco de eventos vazio | Lista retorna array vazio; painel exibe estado "Nenhum evento cadastrado" |

---

## 11. Buscar evento por ID (GET /api/admin/eventos/[id])

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 11.1 | Clique em um evento na lista de edição | Formulário de edição carrega com todos os dados preenchidos corretamente |
| 11.2 | Via Insomnia: `GET /api/admin/eventos/<id-valido>` com token | Retorna objeto com todos os campos do evento |
| 11.3 | Via Insomnia: `GET /api/admin/eventos/id-que-nao-existe` com token | Retorna 404 `{ "sucesso": false, "mensagem": "Evento não encontrado." }` |

---

## 12. Editar evento (PUT /api/admin/eventos/[id])

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 12.1 | Edite o nome e o local de um evento e salve **sem trocar a foto** | Dados atualizados no banco; `imagemUrl` permanece o mesmo |
| 12.2 | Edite um evento, selecione uma nova foto e salve (Cloudinary configurado) | Nova URL do Cloudinary no banco; URL antiga removida do Cloudinary |
| 12.3 | Altere apenas a data de um evento | Data atualizada corretamente; demais campos intactos |
| 12.4 | Via Insomnia: `PUT /api/admin/eventos/<id>` sem o campo `local` no body | Retorna 400 com mensagem de erro |
| 12.5 | Via Insomnia: `PUT /api/admin/eventos/id-inexistente` com token | Retorna 404 `{ "sucesso": false, "mensagem": "Evento não encontrado." }` |

---

## 13. Remover evento (DELETE /api/admin/eventos/[id])

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 13.1 | Na tela de edição, clique em "Remover" e confirme no modal | Evento removido; redireciona para a lista; evento não aparece mais |
| 13.2 | Na tela de edição, clique em "Remover" e cancele no modal | Nada acontece; evento permanece no banco |
| 13.3 | Via Insomnia: `DELETE /api/admin/eventos/<id-valido>` com token | Retorna 200 `{ "sucesso": true, "mensagem": "Evento removido com sucesso." }` |
| 13.4 | Via Insomnia: `DELETE /api/admin/eventos/id-inexistente` com token | Retorna 404 `{ "sucesso": false, "mensagem": "Evento não encontrado." }` |

---

## 14. Página pública de eventos (GET /api/eventos)

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 14.1 | Acesse `/eventos` sem estar logado | Página carrega e exibe os eventos do banco (não mais estática) |
| 14.2 | `GET /api/eventos` via browser (sem token) | Retorna JSON com lista de eventos — **rota pública, sem autenticação** |
| 14.3 | Verifique a **ordem** dos eventos na página | Eventos aparecem ordenados por data crescente (mais próximos primeiro) |
| 14.4 | Cadastre um evento no admin e recarregue `/eventos` | Novo evento aparece na vitrine pública |
| 14.5 | Remova todos os eventos no admin e acesse `/eventos` | Exibe mensagem "Nenhum evento cadastrado no momento." |
| 14.6 | Evento com foto: verifique a exibição na página pública | Imagem do Cloudinary renderiza corretamente no card |
| 14.7 | Evento sem foto: verifique a exibição na página pública | Card exibe o placeholder cinza "Sem imagem" no lugar da foto |

---

## 15. Fluxo completo de ponta a ponta — Eventos

| # | Ação | Resultado esperado |
|---|------|-------------------|
| 15.1 | Login → Cadastrar evento com foto → Acessar `/eventos` | Evento com imagem aparece na vitrine pública |
| 15.2 | Login → Editar data e local do evento → Recarregar `/eventos` | Dados atualizados refletem na vitrine |
| 15.3 | Login → Remover evento → Recarregar `/eventos` | Evento some da vitrine pública |
| 15.4 | Cadastrar dois eventos com datas diferentes → Acessar `/eventos` | Evento de data mais próxima aparece primeiro |

---

## Como verificar no banco (pgAdmin) — Etapa 5

1. Acesse `localhost:5050`
2. Login: `admin@gaapo.com` / `gaapo`
3. Navegue até: Servers → gaapo → Databases → gaapo → Schemas → public → Tables → `Evento`
4. Clique com botão direito → **View/Edit Data → All Rows**
