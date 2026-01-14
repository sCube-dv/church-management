# church-management

Projeto Final a ser utilizado como base para avaliação da Etapa 3 do componente curricular Programação Web II do curso de Tecnologia em Análise e Desenvolvimento de Sistemas do IFMA Coelho Neto

## 📋 Descrição

Sistema de gerenciamento para igrejas, desenvolvido com Node.js, Express e MySQL. Gerencia membros, ministérios, finanças, eventos e presença.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para Node.js
- **MySQL** - Banco de dados
- **Docker** - Containerização
- **JWT** - Autenticação

## 📦 Dependências

- `express` - Framework web
- `sequelize` - ORM
- `mysql2` - Driver MySQL
- `jsonwebtoken` - Autenticação JWT
- `bcryptjs` - Hash de senhas
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Variáveis de ambiente

## 🛠️ Instalação

### Pré-requisitos

- Node.js (v16+)
- Docker e Docker Compose
- MySQL 8.0

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/sCube-dv/church-management.git
   cd church-management
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o ambiente**
   ```bash
   cp .env.example .env
   cp compose.example.yml compose.yml
   ```
   Edite os arquivos com suas credenciais.

4. **Inicie o banco de dados**
   ```bash
   docker compose up -d
   ```

5. **Sincronize o banco de dados**
   ```bash
   npm run db-sync
   ```

6. **Inicie a aplicação**
   ```bash
   npm start
   ```
   Para desenvolvimento com hot-reload:
   ```bash
   npm run dev
   ```

## 📚 Scripts Disponíveis

- `npm start` - Inicia o servidor
- `npm run dev` - Inicia em modo desenvolvimento com hot-reload
- `npm run db-sync` - Sincroniza as tabelas do banco de dados
- `npm run sync-db` - Executa o servidor e sincroniza BD
- `npm test` - Executa testes

## 🗄️ Estrutura do Projeto

```
src/
├── config/          # Configurações (banco de dados)
├── controllers/     # Controladores
├── helpers/         # Funções auxiliares
├── middlewares/     # Middlewares Express
├── models/          # Modelos Sequelize
└── routes/          # Rotas API

compose.yml         # Configuração Docker (não versionada)
compose.example.yml # Exemplo de configuração
.env               # Variáveis de ambiente (não versionada)
.env.example       # Exemplo de variáveis
server.js          # Ponto de entrada
```

## 📖 Modelos de Dados

- **Member** - Membros da igreja
- **Ministry** - Ministérios
- **Finance** - Finanças
- **Event** - Eventos
- **Presence** - Presença em eventos

## 🔒 Segurança

- Senhas hasheadas com bcryptjs
- Autenticação via JWT
- Variáveis sensíveis em `.env`
- `compose.yml` no `.gitignore`

## 📝 Licença

MIT - Veja o arquivo [LICENSE](LICENSE) para mais detalhes

## 👤 Autor

Samuel Santos

## 📞 Suporte

Para reportar bugs ou sugerir features, abra uma [issue](https://github.com/sCube-dv/church-management/issues)
