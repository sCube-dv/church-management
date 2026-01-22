# TODO - Church Management

## Sequência de Povoamento das Tabelas

### 1️⃣ **tb_users** (Independente)
```
INSERT INTO tb_users (id_user, username, password, email, role, is_active)
VALUES (UUID(), 'admin', 'senha_hash', 'admin@church.com', 'admin', true)
```
- **Por quê**: Usuários não dependem de nada. São a base do sistema.
- **Antes de**: Tudo que tem `id_user` como chave estrangeira

---

### 2️⃣ **tb_members** (Depende de: tb_users)
```
INSERT INTO tb_members (id_member, name, cpf, birth_date, phone, status, id_user)
VALUES (UUID(), 'João Silva', '12345678901', '1990-05-15', '11999999999', 'active', <id_user>)
```
- **Por quê**: Cada membro precisa ser vinculado a um usuário (gerenciador)
- **Dependência**: `id_user` deve existir em tb_users
- **Antes de**: Finança, Ministério, Presença

---

### 3️⃣ **tb_events** (Independente)
```
INSERT INTO tb_events (id_event, title, event_date, description)
VALUES (UUID(), 'Culto Domingo', '2026-01-19 10:00:00', 'Culto principal')
```
- **Por quê**: Eventos podem ser criados independentemente
- **Antes de**: Registrar presença em `tb_presences`

---

### 4️⃣ **tb_ministries** (Depende de: tb_members)
```
INSERT INTO tb_ministries (id_ministry, name, description, id_member)
VALUES (UUID(), 'Louvor', 'Ministério de louvor e adoração', <id_member>)
```
- **Por quê**: Precisa de um membro como líder
- **Dependência**: `id_member` deve existir em tb_members

---

### 5️⃣ **tb_finances** (Depende de: tb_members)
```
INSERT INTO tb_finances (id_finance, amount, type, date, description, id_member)
VALUES (UUID(), 100.00, 'tithe', '2026-01-15', 'Dízimo', <id_member>)
```
- **Por quê**: Cada lançamento financeiro é de um membro
- **Dependência**: `id_member` deve existir em tb_members

---

### 6️⃣ **tb_presences** (Depende de: tb_members + tb_events)
```
INSERT INTO tb_presences (id_presence, presence_date, status, id_member, id_event)
VALUES (UUID(), '2026-01-19 10:15:00', 'present', <id_member>, <id_event>)
```
- **Por quê**: Tabela de junção entre membros e eventos
- **Dependências**: 
  - `id_member` deve existir em tb_members
  - `id_event` deve existir em tb_events
- **Por último**: Pois depende de duas outras tabelas

---

## Ordem Resumida de Inserção

```
1. tb_users        ← Base (sem dependências)
   ↓
2. tb_members      ← Depende de users
   ↓
3. tb_events       ← Independente, cria em paralelo
   ↓
4. tb_ministries   ← Depende de members
   ↓
5. tb_finances     ← Depende de members
   ↓
6. tb_presences    ← Depende de members + events (ÚLTIMO)
```

---

## Banco de Dados
- [ ] Corrigir criação automática do database no MySQL
- [ ] Validar schema das tabelas
- [ ] Criar migrations para versionamento
- [ ] Implementar script de seed com dados iniciais

## API
- [ ] Implementar autenticação de usuários (JWT)
- [ ] Adicionar validações nos controllers

## 

## Features
- [ ] CRUD de usuários (perfis)
- [ ] CRUD de membros
- [ ] Gerenciamento de ministérios
- [ ] Controle de presença
- [ ] Gestão financeira
- [ ] Agendamento de eventos

---
# IMPLEMENTAÇÕES EXTRAS
---

## Testes
- [ ] Testes unitários dos controllers
- [ ] Testes de integração com banco de dados
- [ ] Testes de API endpoints

## Segurança
- [ ] Validar senhas no ambiente (.env)
- [ ] Adicionar CORS
- [] Rate limiting
- [ ] Validação de entrada (sanitização)

## Deploy
- [ ] Configurar produção
- [ ] CI/CD pipeline
- [ ] Documentação de deployment
