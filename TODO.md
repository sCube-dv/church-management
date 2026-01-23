# TODO - Church Management

## Banco de Dados
- [ ] Corrigir o script de seed com dados iniciais a fim de criar um banco de dados funcional

## API
- [x] Implementar autenticação de usuários (JWT)
- [ ] Gerenciar rotas/endpoints que necessitam de autenticação
- [ ] Adicionar validações nos controllers

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
    - [ ] Listar todos os membros por tipo de usuário (role)  

### Eventos
    - [ ] Cadastrar novo evento
    - [ ] Listar todos os eventos
    - [ ] Buscar evento por ID
    - [ ] Atualizar evento
    - [ ] Deletar evento (soft delete)
    - [ ] Ativar evento
    - [ ] Deletar evento permanentemente (hard delete)

### Ministérios
    - [ ] Cadastrar novo ministério
    - [ ] Listar todos os ministérios
    - [ ] Buscar ministério por ID
    - [ ] Atualizar ministério
    - [ ] Deletar ministério (soft delete)
    - [ ] Ativar ministério
    - [ ] Listar membros por ministério

### Finanças
    - [ ] Cadastrar nova finança
    - [ ] Listar todas as finanças
    - [ ] Buscar finança por ID
    - [ ] Atualizar finança
    - [ ] Deletar finança (soft delete)
    - [ ] Ativar finança
    - [ ] Listar membros por tipo de contribuição financeira (type)

### Controle de presença
    - [ ] Cadastrar nova presença
    - [ ] Listar todas as presenças
    - [ ] Buscar presença por ID
    - [ ] Atualizar presença
    - [ ] Deletar presença (soft delete)
    - [ ] Ativar presença
    - [ ] Listar membros por evento

## Testes
- [ x ] Testes de integração com banco de dados
- [ ] Testes de API endpoints

## Segurança
- [ x ] Validar senhas no ambiente (.env)
- [ x ] Adicionar CORS
- [ x ] Autenticação de usuários (JWT)

