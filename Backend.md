# 🚀 Setup do Banco - Projeto Gaapo

## 🧱 1. Instalar o Docker

👉 https://www.docker.com/products/docker-desktop/

Instalar normalmente.

### ⚠️ IMPORTANTE (Windows)

Depois de instalar:
- Reiniciar o PC (às vezes necessário)
- Abrir o Docker Desktop
- Esperar aparecer: **"Docker is running"**

---

## 🐘 2. Subir o PostgreSQL pelo Docker Desktop

1. Na barra de pesquisa (parte de cima), pesquisar: `postgres`
2. Clicar em **Run**
3. Abrir **Optional Settings**

### Configurações:

**Container name:**
gaapo-postgres

**Environment variables:**

| Variable          | Value    |
|-------------------|----------|
| POSTGRES_USER     | postgres |
| POSTGRES_PASSWORD | 123456   |
| POSTGRES_DB       | gaapo    |

**Port:**
Host Port: 5432

> ⚠️ Se a porta 5432 já estiver ocupada, use `5433`

---

## 🔗 3. Conectar no projeto

Criar um arquivo `.env` na raiz do projeto com o conteúdo:

```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/gaapo"
```

> ⚠️ Se mudou a porta, trocar `5432` por `5433`

---

## 📦 4. Instalar dependências

Com o repositório clonado, rodar:

```bash
npm install
```

---

## 🧬 5. Configurar o banco (Prisma)

Gerar o client:

```bash
npx prisma generate
```

Rodar as migrations:

```bash
npx prisma migrate deploy
```

> 💡 Primeira vez rodando → `migrate deploy` &nbsp;|&nbsp; Durante desenvolvimento → `migrate dev`

---

## 👀 6. Visualizar o banco

👉 Baixar o **Beekeeper Studio** (gratuito):  
https://www.beekeeperstudio.io/get

### Conectar ao banco:

1. Clicar em **New Connection**
2. Selecionar **Import from URL**
3. Colar a URL: postgresql://postgres:123456@localhost:5432/gaapo

> ⚠️ Se mudou a porta, trocar `5432` por `5433`

4. Clicar em **Connect**

---

## ❗ Dúvidas

**QUALQUER DÚVIDA CHAMA O BIEL**