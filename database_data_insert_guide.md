# 📊 Guia de Inserção de Dados no Banco de Dados

> **Documentação técnica sobre a ordem correta de povoamento das tabelas do sistema de gerenciamento de igrejas**

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Sequência de Povoamento](#sequência-de-povoamento)
3. [Ordem Resumida](#ordem-resumida)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Notas Importantes](#notas-importantes)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Este documento descreve a **ordem correta** para inserir dados nas tabelas do banco de dados, respeitando as **dependências de chaves estrangeiras** (Foreign Keys).

### ⚠️ Por que a ordem importa?

O MySQL/Sequelize **não permite** inserir registros que referenciem chaves estrangeiras inexistentes. Por exemplo:
- ❌ Não é possível criar um `Member` sem um `User` válido
- ❌ Não é possível criar uma `Presence` sem um `Member` e um `Event` válidos

### 🔑 Conceitos Importantes

- **UUID()**: Gera um identificador único universal para cada registro
- **Chave Estrangeira (FK)**: Campo que referencia a chave primária de outra tabela
- **Dependência**: Tabela que precisa de dados de outra tabela antes de ser populada

---

## 📝 Sequência de Povoamento

### 1️⃣ **tb_users** (Independente)

**Prioridade**: PRIMEIRA  
**Dependências**: Nenhuma  
**Motivo**: Base do sistema - todos os membros precisam de um usuário gerenciador

```sql
INSERT INTO tb_users (id_user, username, password, email, role, is_active)
VALUES (
    UUID(), 
    'admin', 
    '$2a$10$XYZ...', -- Senha hasheada com bcryptjs
    'admin@church.com', 
    'admin', 
    true
);
```

**Campos**:
- `id_user`: UUID gerado automaticamente
- `username`: Nome de usuário único
- `password`: **Deve ser hasheado com bcryptjs** (nunca texto plano!)
- `email`: Email único e válido
- `role`: `'admin'`, `'member'` ou `'guest'`
- `is_active`: `true` ou `false`

**⚠️ Importante**: 
- O superusuário é criado automaticamente pelo script `npm run db-sync`
- Senhas devem ser hasheadas antes da inserção

---

### 2️⃣ **tb_members** (Depende de: tb_users)

**Prioridade**: SEGUNDA  
**Dependências**: `id_user` → `tb_users.id_user`  
**Motivo**: Cada membro deve ter um usuário responsável

```sql
INSERT INTO tb_members (id_member, name, cpf, birth_date, phone, status, id_user)
VALUES (
    UUID(), 
    'João Silva', 
    '12345678901', 
    '1990-05-15', 
    '11999999999', 
    'active', 
    'uuid-do-usuario-existente' -- Deve existir em tb_users
);
```

**Campos**:
- `id_member`: UUID gerado automaticamente
- `name`: Nome completo do membro
- `cpf`: CPF sem formatação (apenas números)
- `birth_date`: Data no formato `YYYY-MM-DD`
- `phone`: Telefone (apenas números)
- `status`: `'active'`, `'inactive'` ou `'visitor'`
- `id_user`: **FK** - UUID de um usuário existente

**⚠️ Validações**:
- CPF deve ter exatamente 11 dígitos
- Email deve ser único (se fornecido)

---

### 3️⃣ **tb_events** (Independente)

**Prioridade**: TERCEIRA (pode ser paralelo a tb_members)  
**Dependências**: Nenhuma  
**Motivo**: Eventos são independentes e podem ser criados a qualquer momento

```sql
INSERT INTO tb_events (id_event, title, event_date, description)
VALUES (
    UUID(), 
    'Culto de Domingo', 
    '2026-01-26 10:00:00', 
    'Culto principal de adoração e pregação'
);
```

**Campos**:
- `id_event`: UUID gerado automaticamente
- `title`: Título do evento
- `event_date`: Data e hora no formato `YYYY-MM-DD HH:MM:SS`
- `description`: Descrição detalhada (opcional)

**💡 Dica**: Crie eventos recorrentes (cultos semanais) com datas diferentes

---

### 4️⃣ **tb_ministries** (Depende de: tb_members)

**Prioridade**: QUARTA  
**Dependências**: `id_member` → `tb_members.id_member`  
**Motivo**: Todo ministério precisa de um líder (membro)

```sql
INSERT INTO tb_ministries (id_ministry, name, description, id_member)
VALUES (
    UUID(), 
    'Ministério de Louvor', 
    'Responsável pela música e adoração nos cultos', 
    'uuid-do-membro-lider' -- Deve existir em tb_members
);
```

**Campos**:
- `id_ministry`: UUID gerado automaticamente
- `name`: Nome do ministério
- `description`: Descrição das atividades
- `id_member`: **FK** - UUID do membro líder

**💡 Exemplos de ministérios**:
- Louvor e Adoração
- Intercessão
- Crianças
- Jovens
- Mídia
- Recepção

---

### 5️⃣ **tb_finances** (Depende de: tb_members)

**Prioridade**: QUINTA  
**Dependências**: `id_member` → `tb_members.id_member`  
**Motivo**: Registros financeiros são vinculados a membros

```sql
INSERT INTO tb_finances (id_finance, amount, type, date, description, id_member)
VALUES (
    UUID(), 
    150.00, 
    'tithe', 
    '2026-01-22', 
    'Dízimo referente a janeiro/2026', 
    'uuid-do-membro' -- Deve existir em tb_members
);
```

**Campos**:
- `id_finance`: UUID gerado automaticamente
- `amount`: Valor decimal (ex: `100.00`)
- `type`: `'tithe'` (dízimo), `'offering'` (oferta), `'donation'` (doação)
- `date`: Data no formato `YYYY-MM-DD`
- `description`: Descrição do lançamento
- `id_member`: **FK** - UUID do membro doador

**💰 Tipos de lançamento**:
- `tithe`: Dízimo (10% da renda)
- `offering`: Oferta voluntária
- `donation`: Doação específica

---

### 6️⃣ **tb_presences** (Depende de: tb_members + tb_events)

**Prioridade**: ÚLTIMA  
**Dependências**: 
- `id_member` → `tb_members.id_member`
- `id_event` → `tb_events.id_event`  
**Motivo**: Tabela de junção N:N entre membros e eventos

```sql
INSERT INTO tb_presences (id_presence, presence_date, status, id_member, id_event)
VALUES (
    UUID(), 
    '2026-01-26 10:15:00', 
    'present', 
    'uuid-do-membro',  -- Deve existir em tb_members
    'uuid-do-evento'   -- Deve existir em tb_events
);
```

**Campos**:
- `id_presence`: UUID gerado automaticamente
- `presence_date`: Data/hora do registro de presença
- `status`: `'present'` (presente), `'absent'` (ausente), `'justified'` (justificado)
- `id_member`: **FK** - UUID do membro
- `id_event`: **FK** - UUID do evento

**📊 Status de presença**:
- `present`: Membro presente no evento
- `absent`: Membro ausente
- `justified`: Ausência justificada

---

## 🔄 Ordem Resumida de Inserção

```
┌─────────────────────────────────────────────┐
│  ORDEM DE INSERÇÃO (Respeitar sequência!)  │
└─────────────────────────────────────────────┘

1. 👤 tb_users        ← Base (sem dependências)
   │
   ├─→ 2. 👥 tb_members      ← Depende de users
   │      │
   │      ├─→ 4. ⛪ tb_ministries  ← Depende de members
   │      │
   │      ├─→ 5. 💰 tb_finances    ← Depende de members
   │      │
   │      └─→ 6. ✅ tb_presences   ← Depende de members + events
   │
   └─→ 3. 📅 tb_events       ← Independente (paralelo)
          │
          └─→ 6. ✅ tb_presences   ← Depende de members + events
```

### 📌 Resumo Visual

| Ordem | Tabela | Dependências | Pode Inserir Após |
|-------|--------|--------------|-------------------|
| 1️⃣ | `tb_users` | Nenhuma | Imediatamente |
| 2️⃣ | `tb_members` | `tb_users` | Inserir usuários |
| 3️⃣ | `tb_events` | Nenhuma | Imediatamente (paralelo) |
| 4️⃣ | `tb_ministries` | `tb_members` | Inserir membros |
| 5️⃣ | `tb_finances` | `tb_members` | Inserir membros |
| 6️⃣ | `tb_presences` | `tb_members` + `tb_events` | Inserir membros E eventos |

---

## 💡 Exemplos Práticos

### Exemplo Completo: Inserindo um Novo Membro com Dados Relacionados

```sql
-- 1. Criar usuário gerenciador
INSERT INTO tb_users (id_user, username, password, email, role, is_active)
VALUES (
    '550e8400-e29b-41d4-a716-446655440001', 
    'maria.santos', 
    '$2a$10$abcd...', 
    'maria@church.com', 
    'member', 
    true
);

-- 2. Criar membro vinculado ao usuário
INSERT INTO tb_members (id_member, name, cpf, birth_date, phone, status, id_user)
VALUES (
    '550e8400-e29b-41d4-a716-446655440002',
    'Maria Santos',
    '98765432100',
    '1985-03-20',
    '11988887777',
    'active',
    '550e8400-e29b-41d4-a716-446655440001' -- Referencia o usuário criado acima
);

-- 3. Criar evento
INSERT INTO tb_events (id_event, title, event_date, description)
VALUES (
    '550e8400-e29b-41d4-a716-446655440003',
    'Culto de Quarta-feira',
    '2026-01-28 19:30:00',
    'Culto de oração e estudo bíblico'
);

-- 4. Registrar dízimo do membro
INSERT INTO tb_finances (id_finance, amount, type, date, description, id_member)
VALUES (
    '550e8400-e29b-41d4-a716-446655440004',
    200.00,
    'tithe',
    '2026-01-22',
    'Dízimo de janeiro',
    '550e8400-e29b-41d4-a716-446655440002' -- Referencia o membro
);

-- 5. Registrar presença no evento
INSERT INTO tb_presences (id_presence, presence_date, status, id_member, id_event)
VALUES (
    '550e8400-e29b-41d4-a716-446655440005',
    '2026-01-28 19:35:00',
    'present',
    '550e8400-e29b-41d4-a716-446655440002', -- Referencia o membro
    '550e8400-e29b-41d4-a716-446655440003'  -- Referencia o evento
);
```

---

## ⚠️ Notas Importantes

### 🔐 Segurança

1. **Senhas**: NUNCA insira senhas em texto plano
   ```javascript
   // Use bcryptjs para hashear senhas
   const bcrypt = require('bcryptjs');
   const hashedPassword = bcrypt.hashSync('senha123', 10);
   ```

2. **Dados Sensíveis**: Não versione arquivos SQL com dados reais de produção

### 🎯 Boas Práticas

1. **Use UUIDs**: Sempre use `UUID()` para gerar IDs únicos
2. **Valide CPFs**: Certifique-se de que CPFs são válidos antes de inserir
3. **Datas**: Use formato ISO `YYYY-MM-DD HH:MM:SS`
4. **Transações**: Para múltiplas inserções, use transações SQL:
   ```sql
   START TRANSACTION;
   -- suas inserções aqui
   COMMIT;
   ```

### 📦 Script de Dados de Teste

O projeto já inclui um arquivo com dados de exemplo:
- **Arquivo**: `insert-test-data.sql`
- **Uso**: Execute após sincronizar o banco com `npm run db-sync`

```bash
# Executar script de teste
mysql -u root -p church_db < insert-test-data.sql
```

---

## 🔧 Troubleshooting

### Erro: "Cannot add or update a child row: a foreign key constraint fails"

**Causa**: Tentativa de inserir registro com FK inexistente

**Solução**:
1. Verifique se o registro pai existe
2. Confirme que o UUID está correto
3. Respeite a ordem de inserção

```sql
-- Verificar se usuário existe antes de criar membro
SELECT * FROM tb_users WHERE id_user = 'uuid-aqui';
```

### Erro: "Duplicate entry for key 'PRIMARY'"

**Causa**: Tentativa de inserir UUID duplicado

**Solução**: Use `UUID()` ao invés de UUIDs fixos

```sql
-- ❌ Errado
INSERT INTO tb_users (id_user, ...) VALUES ('123', ...);

-- ✅ Correto
INSERT INTO tb_users (id_user, ...) VALUES (UUID(), ...);
```

### Erro: "Data truncated for column 'cpf'"

**Causa**: CPF com formatação (pontos/hífens)

**Solução**: Remova formatação, use apenas números

```sql
-- ❌ Errado
'123.456.789-01'

-- ✅ Correto
'12345678901'
```

---

## 📚 Referências

- [README.md](README.md) - Documentação principal do projeto
- [TODO.md](TODO.md) - Tarefas e planejamento
- [relationships.md](relationships.md) - Detalhes dos relacionamentos entre tabelas
- [insert-test-data.sql](insert-test-data.sql) - Script com dados de exemplo

---

**Última atualização**: 2026-01-22  
**Versão**: 1.0.0