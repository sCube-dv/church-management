# TODO - Church Management

## Banco de Dados
- [ ] Corrigir o script de seed com dados iniciais a fim de criar um banco de dados funcional

## API
- [x] Implementar autenticação de usuários (JWT)
- [x] Gerenciar rotas/endpoints que necessitam de autenticação
- [x] Adicionar validações nos controllers

## Features
### Usuários (perfis)
- [x] Login de usuário [superusuário admin é criado automaticamente]
- [x] Cadastrar novo usuário
- [x] Listar todos os usuários
- [x] Buscar usuário por ID
- [x] Atualizar usuário 
- [x] Deletar usuário (soft delete)
- [x] Ativar usuário
- [x] Deletar usuário permanentemente (hard delete)
- [ ] Listar todos os usuários mesmo os com status inativo
- [ ] Melhorar o gerenciamento das permissões de cada tipo de usuário de acordo com o tipo de usuário (role)

### Membros
- [x] Cadastrar novo membro
- [x] Listar todos os membros
- [x] Buscar membro por ID
- [x] Atualizar membro
- [x] Deletar membro (soft delete)
- [x] Ativar membro
- [x] Listar todos os membros por tipo de usuário (role)  

### Eventos
- [x] Cadastrar novo evento [requer autenticação]
- [x] Listar todos os eventos
- [x] Buscar evento por ID
- [x] Atualizar evento [requer autenticação]
- [x] Deletar evento (soft delete) [requer autenticação]
- [x] Ativar evento [requer autenticação]
- [x] Deletar evento permanentemente (hard delete) [requer autenticação]

### Ministérios
- [x] Cadastrar novo ministério
- [x] Listar todos os ministérios
- [x] Buscar ministério por ID
- [x] Atualizar ministério
- [x] Deletar ministério (soft delete)
- [x] Ativar ministério
- [x] Deletar ministério permanentemente (hard delete)
- [ ] Listar membros por ministério

### Finanças
- [x] Cadastrar novo lançamento financeiro
- [x] Listar todos os lançamentos financeiros
- [x] Buscar lançamento financeiro por ID
- [x] Atualizar lançamento financeiro
- [x] Deletar lançamento financeiro (soft delete)
- [x] Ativar lançamento financeiro
- [x] Deletar lançamento financeiro permanentemente (hard delete)
- [ ] Listar membros por tipo de contribuição financeira (type)

### Controle de presença
- [x] Cadastrar nova presença
- [x] Listar todas as presenças
- [x] Buscar presença por ID
- [x] Atualizar presença
- [x] Deletar presença (soft delete)
- [x] Ativar presença
- [x] Deletar presença permanentemente (hard)
- [ ] Listar presenças por evento
- [ ] Listar presenças por membro
- [ ] Listar presenças por data

## Testes
- [ x ] Testes de integração com banco de dados
- [ ] Testes de API endpoints

## Segurança
- [ x ] Validar senhas no ambiente (.env)
- [ x ] Adicionar CORS
- [ x ] Autenticação de usuários (JWT)

