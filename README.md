# 🏘️ Sistema de Gerenciamento de Igrejas

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
- `bcrypt` - Hash de senhas
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
   Edite os arquivos com suas credenciais. Importante: configure as credenciais do superusuário em `.env`:
   ```env
   SUPERUSER_EMAIL=seu-email@church.com
   SUPERUSER_USERNAME=seu-usuario
   SUPERUSER_PASSWORD=sua-senha-forte
   ```

4. **Inicie o banco de dados**
   ```bash
   docker compose up -d
   ```

5. **Sincronize o banco de dados**
   ```bash
   npm run db-sync
   ```
   Isso irá:
   - Criar as tabelas do banco de dados
   - Criar automaticamente o superusuário com as credenciais do `.env`

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
├── controllers/     # Controladores (lógica das rotas)
├── helpers/         # Funções auxiliares (sincronização BD)
├── middlewares/     # Middlewares Express
├── models/          # Modelos Sequelize
├── routes/          # Rotas API
└── services/        # Serviços (lógica de negócio)
```

### Camadas da Arquitetura

- **Services** - Contém a lógica de negócio (CRUD, validações)
- **Controllers** - Recebem requisições e chamam os services
- **Models** - Definem a estrutura dos dados
- **Routes** - Definem os endpoints da API

## 📁 Arquivos de Configuração

```
compose.yml         # Configuração Docker (não versionada)
compose.example.yml # Exemplo de configuração
.env               # Variáveis de ambiente (não versionada)
.env.example       # Exemplo de variáveis
server.js          # Ponto de entrada
```

## 📖 Modelos de Dados

- **User** - Usuários do sistema (admin, member, guest) com autenticação
- **Member** - Membros da igreja
- **Ministry** - Ministérios
- **Finance** - Finanças
- **Event** - Eventos
- **Presence** - Presença em eventos

### Relacionamentos

```
User (1) ──→ (N) Member
Member (1) ──→ (N) Finance
Member (1) ──→ (N) Ministry
Member (N) ←→ (N) Event (via Presence)
```

Para mais detalhes sobre os relacionamentos, consulte [relationships.md](relationships.md)

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Autenticação via JWT
- Variáveis sensíveis em `.env`
- `compose.yml` no `.gitignore`
- Validação de email em usuários
- Sistema de roles (admin, member, guest)
- Superusuário criado automaticamente na sincronização do BD

## 📝 Licença

MIT - Veja o arquivo [LICENSE](LICENSE) para mais detalhes

## 👤 Autor

Samuel Santos

## 📞 Suporte

Para reportar bugs ou sugerir features, abra uma [issue](https://github.com/sCube-dv/church-management/issues)
