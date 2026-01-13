# Relacionamentos do Sistema de Gerenciamento de Igreja

## **1. Member ↔ Finance (Um-para-Muitos)**
```
Member (1) ──→ (N) Finance
```
- **Tipo**: Um-para-Muitos (One-to-Many)
- **Descrição**: Um membro pode registrar múltiplos lançamentos financeiros (dízimos, ofertas, missões)
- **Foreign Key**: `id_member` em `tb_finances`
- **Caso de uso**: Rastrear quanto cada membro contribuiu ao longo do tempo, com histórico de todas as contribuições

---

## **2. Member ↔ Ministry (Um-para-Muitos)**
```
Member (1) ──→ (N) Ministry
```
- **Tipo**: Um-para-Muitos (One-to-Many)
- **Descrição**: Um membro pode ser líder de múltiplos ministérios
- **Foreign Key**: `id_member` em `tb_ministries`
- **Caso de uso**: Estruturar liderança dos ministérios - um membro lidera um ou mais ministérios na igreja (música, louvor, educação, etc.)

---

## **3. Member ↔ Event (Muitos-para-Muitos)**
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
│                        Member                           │
│  (id_member, name, cpf, birth_date, status, ...)        │
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

1. **Novo membro cadastrado** → Pode registrar finanças e liderar ministérios
2. **Evento criado** → Membros podem ser marcados como presentes via `Presence`
3. **Contribuição financeira** → Registrada e vinculada ao membro específico
4. **Liderança de ministério** → Um membro é associado a um ministério como líder

---

## **Implementação Sequelize**

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
