# Como rodar o GAAPO

## Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## Primeira vez rodando (clone ou nova branch)

Siga todos os passos abaixo na ordem.

---

### 1. Instale as dependências

```bash
npm install
```

> Sempre rode isso ao trocar de branch — novos pacotes podem ter sido adicionados.

---

### 2. Configure as variáveis de ambiente

Crie o arquivo `.env.local` copiando o exemplo:

**Mac/Linux:**
```bash
cp .env.example .env.local
```

**Windows:**
```bash
copy .env.example .env.local
```

O `.env.local` deve ficar assim (pode copiar direto):

```env
# Banco de dados (Docker local)
DATABASE_URL="postgresql://gaapo:gaapo@localhost:5433/gaapo"

# JWT
JWT_SECRET=gaapo_dev_secret_mude_em_producao
JWT_EXPIRES_IN=7d

# Cloudinary (preencher quando chegar na Etapa 4 - upload de imagens)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Admin (credenciais usadas pelo seed para criar o usuário inicial no banco)
ADMIN_USER=admin
ADMIN_PASSWORD=admin123

# Frontend aponta para a própria API
# Manter comentado por padrão — só descomentar para testar rotas da API
# NEXT_PUBLIC_API_URL=/api
```

---

### 3. Suba o banco de dados

Certifique-se de que o **Docker Desktop está aberto e rodando**, depois execute:

```bash
docker compose up -d
```

Isso sobe dois containers:
- **Postgres** acessível pelo host na porta `5433`
- **pgAdmin** (interface visual) em `http://localhost:5050`

---

### 4. Configure o banco de dados

Com o Docker rodando, execute os três comandos abaixo:

```bash
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
```

| Comando | O que faz |
|---------|-----------|
| `generate` | Gera os tipos TypeScript a partir do schema do banco |
| `migrate deploy` | Cria todas as tabelas no banco |
| `db seed` | Cria o usuário admin com as credenciais do `.env.local` |

---

### 5. Rode o projeto

```bash
npm run dev
```

Acesse `http://localhost:3000`.

---

### 6. Teste o login do painel admin

1. Acesse `http://localhost:3000/admin`
2. Entre com as credenciais que você definiu no `.env.local` (`ADMIN_USER` e `ADMIN_PASSWORD`)
3. Se o login redirecionar para o painel, tudo está funcionando

> **Atenção:** neste momento o painel ainda usa dados locais (localStorage) para as demais telas. O login é a única funcionalidade conectada ao banco real por enquanto.

---

## Visualizando os dados no pgAdmin

Abra `http://localhost:5050` e faça login com:

| Campo | Valor |
|-------|-------|
| Email | `admin@gaapo.com` |
| Senha | `gaapo` |

### Conectando ao banco

Na primeira vez, clique em **Add New Server** e preencha:

| Campo | Valor |
|-------|-------|
| Name | GAAPO |
| Host | `postgres` |
| Port | `5432` |
| Username | `gaapo` |
| Password | `gaapo` |

> **Por que o host é `postgres` e a porta é `5432` aqui?** O pgAdmin se comunica com o Postgres *dentro* da rede Docker, onde o container se chama `postgres` e escuta na porta padrão `5432`. A porta `5433` é só para acessar de fora do Docker (pela sua máquina ou pelo `DATABASE_URL`).

### Vendo e editando dados de uma tabela

Na árvore lateral, navegue até:

```
Servers → GAAPO → Databases → gaapo → Schemas → public → Tables
```

Clique com o **botão direito** na tabela desejada → **View/Edit Data → All Rows**.

Isso abre uma grade onde você pode ver, editar e deletar linhas. Para salvar alterações feitas na grade, clique no ícone de **disquete** (Save Data Changes) na barra acima.

### Rodando SQL manualmente

Vá em **Tools → Query Tool** e escreva a query desejada. Exemplo:

```sql
SELECT * FROM "Administrador";
```

> Os nomes de tabela precisam de aspas duplas porque começam com letra maiúscula (case-sensitive no Postgres).

---

## Rodando depois da primeira vez

Se o Docker já foi configurado antes, basta:

```bash
docker compose up -d   # sobe o banco (se estiver parado)
npm run dev            # roda o projeto
```

Após um `git pull` com novas migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

---

## Parar os containers

```bash
docker compose down
```

Para parar **e apagar todos os dados** do banco (útil para resetar o ambiente):

```bash
docker compose down -v
```
