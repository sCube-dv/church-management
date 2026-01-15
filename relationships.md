# Relacionamentos do Sistema de Gerenciamento de Igreja

## **1. User ↔ Member (Um-para-Muitos)**
```
User (1) ──→ (N) Member
```
- **Tipo**: Um-para-Muitos (One-to-Many)
- **Descrição**: Um usuário (admin/gerenciador) pode gerenciar múltiplos membros da igreja
- **Foreign Key**: `id_user` em `tb_members`
- **Caso de uso**: Rastrear qual usuário criou/gerencia cada membro, permitindo auditoria e controle de acesso por gerenciador

---

## **2. Member ↔ Finance (Um-para-Muitos)**
```
Member (1) ──→ (N) Finance
```
- **Tipo**: Um-para-Muitos (One-to-Many)
- **Descrição**: Um membro pode registrar múltiplos lançamentos financeiros (dízimos, ofertas, missões)
- **Foreign Key**: `id_member` em `tb_finances`
- **Caso de uso**: Rastrear quanto cada membro contribuiu ao longo do tempo, com histórico de todas as contribuições

---

## **3. Member ↔ Ministry (Um-para-Muitos)**
```
Member (1) ──→ (N) Ministry
```
- **Tipo**: Um-para-Muitos (One-to-Many)
- **Descrição**: Um membro pode ser líder de múltiplos ministérios
- **Foreign Key**: `id_member` em `tb_ministries`
- **Caso de uso**: Estruturar liderança dos ministérios - um membro lidera um ou mais ministérios na igreja (música, louvor, educação, etc.)

---

## **4. Member ↔ Event (Muitos-para-Muitos)**
```
Member (N) ←→ (N) Event
        ↓
     Presence (Tabela de Junção)
```
- **Tipo**: Muitos-para-Muitos (Many-to-Many)
- **Descrição**: Múltiplos membros podem participar de múltiplos eventos, e múltiplos eventos podem ter múltiplos membros
- **Tabela de Junção**: `tb_presences` (conecta Member e Event)
- **Foreign Keys**: 
  - `id_member` em `tb_presences`
  - `id_event` em `tb_presences`
- **Caso de uso**: Registrar presença dos membros em eventos (cultos, retiros, conferências, etc.), com data e observações

---

## **Resumo Visual do Esquema**

```
┌─────────────────────────────────────────────────────────┐
│                        User                             │
│   (id_user, username, password, email, role, ...)       │
└──────────────────┬──────────────────────────────────────┘
                   │ 1:N
                   ↓
┌─────────────────────────────────────────────────────────┐
│                        Member                           │
│  (id_member, name, cpf, birth_date, status, id_user, .)│
└──┬──────────────────┬──────────────────────┬────────────┘
   │                  │                      │
   │ 1:N              │ 1:N                  │ N:N
   ↓                  ↓                      ↓
Finance          Ministry              Presence
(lançamentos)   (lideranças)       (tabela junção)
                                         ↓
                                      Event
                                   (eventos)
```

---

## **Fluxo de Dados Prático**

1. **Novo usuário (admin) criado** → Pode gerenciar membros da igreja
2. **Novo membro cadastrado** → Vinculado a um usuário (gerenciador), pode registrar finanças e liderar ministérios
3. **Evento criado** → Membros podem ser marcados como presentes via `Presence`
4. **Contribuição financeira** → Registrada e vinculada ao membro específico
5. **Liderança de ministério** → Um membro é associado a um ministério como líder

---

## **Implementação Sequelize**

### User - Member
```javascript
User.hasMany(Member, { foreignKey: 'id_user' });
Member.belongsTo(User, { foreignKey: 'id_user' });
```

### Member - Finance
```javascript
Member.hasMany(Finance, { foreignKey: 'id_member' });
Finance.belongsTo(Member, { foreignKey: 'id_member' });
```

### Member - Ministry
```javascript
Member.hasMany(Ministry, { foreignKey: 'id_member' });
Ministry.belongsTo(Member, { foreignKey: 'id_member' });
```

### Member - Event (via Presence)
```javascript
Member.belongsToMany(Event, { through: Presence, foreignKey: 'id_member' });
Event.belongsToMany(Member, { through: Presence, foreignKey: 'id_event' });
```
