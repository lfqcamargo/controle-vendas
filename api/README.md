
# Controle de Vendas - API

API do sistema **Controle de Vendas** para gerenciar produtos, estoque e vendas de pequenas e médias empresas.

## Instalação

### Usando Docker

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lfqcamargo/controle_vendas.git
   cd controle_vendas
   ```

2. **Suba os contêineres com Docker:**
   ```bash
   docker-compose up --d
   ```

3. **Acesse a API:**
   ```
   http://localhost:3000
   ```

### Rodando Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lfqcamargo/controle_vendas.git
   cd controle_vendas
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o arquivo `.env` com suas variáveis de ambiente:**
   ```bash
   PORT=3000
   DATABASE_URL=postgresql://user:password@localhost:5432/controle_vendas
   JWT_SECRET=sua_chave_secreta
   ```

4. **Inicie o servidor em modo desenvolvimento:**
   ```bash
   npm run start:dev
   ```

5. **Acesse a API:**
   ```
   http://localhost:3000
   ```

## Scripts Principais

- `npm run start:dev`: Inicia o servidor em modo de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Verifica e corrige o código com ESLint.
- `npm run test`: Executa os testes.

## Endpoints Básicos

- **/api/produtos**:
  - `GET`: Lista todos os produtos.
  - `POST`: Cadastra um novo produto.
  - `PUT`: Atualiza um produto.
  - `DELETE`: Remove um produto.

- **/api/vendas**:
  - `POST`: Processa uma nova venda.
  - `GET`: Lista as vendas realizadas.

- **/api/clientes**:
  - `GET`: Lista todos os clientes.
  - `POST`: Cadastra um novo cliente.

## Estrutura de Pastas

```
controle_vendas/
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
├── prisma/
├── src/
├── .env
├── docker-compose.yml
├── package.json
└── README.md
```

## Tecnologias Usadas

- **Node.js** e **Express** para o backend.
- **PostgreSQL** como banco de dados.
- **Prisma ORM** para manipulação de dados.
- **JWT** para autenticação.

## Licença

Este projeto está licenciado sob a Licença MIT.
