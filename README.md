# Teste Técnico

Monorepo com **backend** (NestJS) e **frontend** (Next.js) para gestão de pedidos, produtos e custos.

## Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** 9+

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/maurocoimbra/teste-tecnico.git
   cd teste-tecnico
   ```

2. Instale as dependências na raiz do projeto (instala backend e frontend via workspaces):

   ```bash
   npm install
   ```

## Executando o projeto

### Desenvolvimento (backend + frontend)

Na raiz do projeto:

```bash
npm run dev
```

Isso sobe:

- **Backend** em [http://localhost:3001](http://localhost:3001)
- **Frontend** em [http://localhost:3000](http://localhost:3000)

Abra o navegador em **http://localhost:3000** para usar a aplicação.

### Apenas backend ou apenas frontend

- Só backend:

  ```bash
  npm run dev:backend
  ```

- Só frontend:

  ```bash
  npm run dev:frontend
  ```

  O frontend espera o backend em `http://localhost:3001` (ou na URL definida em `NEXT_PUBLIC_API_URL`).

## Build para produção

Na raiz do projeto:

```bash
npm run build
```

Isso gera o build do backend e do frontend. Para rodar em produção:

- **Backend:** `cd backend && npm run start:prod` (usa `node dist/main`)
- **Frontend:** `cd frontend && npm run start` (usa o build do Next.js)

## Estrutura do projeto

| Pasta      | Stack    | Porta padrão |
|-----------|----------|----------------|
| `backend/`  | NestJS   | 3001          |
| `frontend/` | Next.js  | 3000          |

O backend expõe APIs para **pedidos**, **produtos**, **custos de produtos** e **dashboard**. O frontend consome essas APIs e exibe a interface.
