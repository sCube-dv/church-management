import { Member, Ministry, Finance, Event, Presence, User } from "../models/index.js";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Script de Seed - Popula o banco de dados com dados iniciais
 * Ordem de inserção respeitando dependências de Foreign Keys:
 * 1. Users (independente)
 * 2. Members (depende de Users)
 * 3. Events (independente)
 * 4. Ministries (depende de Members)
 * 5. Finances (depende de Members)
 * 6. Presences (depende de Members + Events)
 */

console.log('🌱 Iniciando seed do banco de dados...\n');

// ==========================================
// FUNÇÃO AUXILIAR: Hash de senha
// ==========================================
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

// ==========================================
// 1. CRIAR USUÁRIOS (SEM DEPENDÊNCIAS)
// ==========================================
console.log('👤 Criando usuários...');

const users = [
    {
        id_user: '550e8400-e29b-41d4-a716-446655440001',
        username: 'admin',
        password: hashPassword('admin@123'),
        email: 'admin@church.com',
        role: 'admin',
        is_active: true
    },
    {
        id_user: '550e8400-e29b-41d4-a716-446655440002',
        username: 'gerenciador1',
        password: hashPassword('senha123'),
        email: 'gerenciador1@church.com',
        role: 'member',
        is_active: true
    },
    {
        id_user: '550e8400-e29b-41d4-a716-446655440003',
        username: 'gerenciador2',
        password: hashPassword('senha123'),
        email: 'gerenciador2@church.com',
        role: 'member',
        is_active: true
    },
    {
        id_user: '550e8400-e29b-41d4-a716-446655440004',
        username: 'visitante',
        password: hashPassword('guest123'),
        email: 'visitante@church.com',
        role: 'guest',
        is_active: true
    }
];

try {
    for (const userData of users) {
        const existingUser = await User.findOne({ where: { email: userData.email } });
        if (!existingUser) {
            await User.create(userData);
            console.log(`  ✓ Usuário criado: ${userData.username} (${userData.role})`);
        } else {
            console.log(`  ⊙ Usuário já existe: ${userData.username}`);
        }
    }
    console.log(`✅ ${users.length} usuários processados\n`);
} catch (error) {
    console.error('❌ Erro ao criar usuários:', error.message);
    process.exit(1);
}

// ==========================================
// 2. CRIAR MEMBROS (DEPENDE DE USERS)
// ==========================================
console.log('👥 Criando membros...');

const members = [
    {
        id_member: '660e8400-e29b-41d4-a716-446655440001',
        name: 'João Silva',
        cpf: '12345678901',
        birth_date: '1990-05-15',
        baptism_date: '2010-06-20',
        phone: '11999999999',
        status: 'active',
        id_user: '550e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_member: '660e8400-e29b-41d4-a716-446655440002',
        name: 'Maria Santos',
        cpf: '12345678902',
        birth_date: '1988-03-22',
        baptism_date: '2008-07-15',
        phone: '11988888888',
        status: 'active',
        id_user: '550e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_member: '660e8400-e29b-41d4-a716-446655440003',
        name: 'Pedro Oliveira',
        cpf: '12345678903',
        birth_date: '1995-11-30',
        baptism_date: '2015-12-25',
        phone: '11977777777',
        status: 'active',
        id_user: '550e8400-e29b-41d4-a716-446655440002'
    },
    {
        id_member: '660e8400-e29b-41d4-a716-446655440004',
        name: 'Ana Costa',
        cpf: '12345678904',
        birth_date: '1992-07-08',
        baptism_date: '2012-08-10',
        phone: '11966666666',
        status: 'active',
        id_user: '550e8400-e29b-41d4-a716-446655440002'
    },
    {
        id_member: '660e8400-e29b-41d4-a716-446655440005',
        name: 'Carlos Ferreira',
        cpf: '12345678905',
        birth_date: '1987-01-14',
        baptism_date: '2007-02-18',
        phone: '11955555555',
        status: 'visitor',
        id_user: '550e8400-e29b-41d4-a716-446655440003'
    },
    {
        id_member: '660e8400-e29b-41d4-a716-446655440006',
        name: 'Juliana Almeida',
        cpf: '12345678906',
        birth_date: '1993-09-25',
        baptism_date: null,
        phone: '11944444444',
        status: 'visitor',
        id_user: '550e8400-e29b-41d4-a716-446655440004'
    },
    {
        id_member: '660e8400-e29b-41d4-a716-446655440007',
        name: 'Roberto Lima',
        cpf: '12345678907',
        birth_date: '1985-12-03',
        baptism_date: '2005-01-15',
        phone: '11933333333',
        status: 'inactive',
        id_user: '550e8400-e29b-41d4-a716-446655440003'
    }
];

try {
    for (const memberData of members) {
        const existingMember = await Member.findOne({ where: { cpf: memberData.cpf } });
        if (!existingMember) {
            await Member.create(memberData);
            console.log(`  ✓ Membro criado: ${memberData.name} (${memberData.status})`);
        } else {
            console.log(`  ⊙ Membro já existe: ${memberData.name}`);
        }
    }
    console.log(`✅ ${members.length} membros processados\n`);
} catch (error) {
    console.error('❌ Erro ao criar membros:', error.message);
    process.exit(1);
}

// ==========================================
// 3. CRIAR EVENTOS (INDEPENDENTE)
// ==========================================
console.log('📅 Criando eventos...');

const events = [
    {
        id_event: '770e8400-e29b-41d4-a716-446655440001',
        title: 'Culto Domingo Manhã',
        event_date: '2026-01-26 10:00:00',
        description: 'Culto principal do domingo de manhã com louvor e pregação'
    },
    {
        id_event: '770e8400-e29b-41d4-a716-446655440002',
        title: 'Culto Quarta-feira',
        event_date: '2026-01-29 19:30:00',
        description: 'Estudo bíblico e oração de quarta-feira'
    },
    {
        id_event: '770e8400-e29b-41d4-a716-446655440003',
        title: 'Retiro Espiritual',
        event_date: '2026-02-15 08:00:00',
        description: 'Retiro espiritual anual da igreja'
    },
    {
        id_event: '770e8400-e29b-41d4-a716-446655440004',
        title: 'Culto Domingo Noite',
        event_date: '2026-01-26 18:00:00',
        description: 'Culto noturno do domingo com foco em jovens'
    },
    {
        id_event: '770e8400-e29b-41d4-a716-446655440005',
        title: 'Escola Bíblica Dominical',
        event_date: '2026-01-26 09:00:00',
        description: 'Aulas de estudo bíblico por faixa etária'
    },
    {
        id_event: '770e8400-e29b-41d4-a716-446655440006',
        title: 'Vigília de Oração',
        event_date: '2026-02-01 22:00:00',
        description: 'Noite de oração e intercessão'
    }
];

try {
    for (const eventData of events) {
        const existingEvent = await Event.findOne({ where: { id_event: eventData.id_event } });
        if (!existingEvent) {
            await Event.create(eventData);
            console.log(`  ✓ Evento criado: ${eventData.title}`);
        } else {
            console.log(`  ⊙ Evento já existe: ${eventData.title}`);
        }
    }
    console.log(`✅ ${events.length} eventos processados\n`);
} catch (error) {
    console.error('❌ Erro ao criar eventos:', error.message);
    process.exit(1);
}

// ==========================================
// 4. CRIAR MINISTÉRIOS (DEPENDE DE MEMBERS)
// ==========================================
console.log('⛪ Criando ministérios...');

const ministries = [
    {
        id_ministry: '880e8400-e29b-41d4-a716-446655440001',
        name: 'Ministério de Louvor e Adoração',
        description: 'Responsável pela música, louvor e adoração nos cultos',
        id_member: '660e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_ministry: '880e8400-e29b-41d4-a716-446655440002',
        name: 'Ministério Infantil',
        description: 'Cuidado e ensino das crianças durante os cultos',
        id_member: '660e8400-e29b-41d4-a716-446655440002'
    },
    {
        id_ministry: '880e8400-e29b-41d4-a716-446655440003',
        name: 'Ministério de Visitação',
        description: 'Visitas aos membros, enfermos e necessitados',
        id_member: '660e8400-e29b-41d4-a716-446655440003'
    },
    {
        id_ministry: '880e8400-e29b-41d4-a716-446655440004',
        name: 'Ministério de Intercessão',
        description: 'Oração e intercessão pela igreja e comunidade',
        id_member: '660e8400-e29b-41d4-a716-446655440004'
    },
    {
        id_ministry: '880e8400-e29b-41d4-a716-446655440005',
        name: 'Ministério de Mídia',
        description: 'Transmissão online, som e projeção dos cultos',
        id_member: '660e8400-e29b-41d4-a716-446655440003'
    },
    {
        id_ministry: '880e8400-e29b-41d4-a716-446655440006',
        name: 'Ministério de Recepção',
        description: 'Acolhimento e recepção de visitantes',
        id_member: '660e8400-e29b-41d4-a716-446655440002'
    }
];

try {
    for (const ministryData of ministries) {
        const existingMinistry = await Ministry.findOne({ where: { id_ministry: ministryData.id_ministry } });
        if (!existingMinistry) {
            await Ministry.create(ministryData);
            console.log(`  ✓ Ministério criado: ${ministryData.name}`);
        } else {
            console.log(`  ⊙ Ministério já existe: ${ministryData.name}`);
        }
    }
    console.log(`✅ ${ministries.length} ministérios processados\n`);
} catch (error) {
    console.error('❌ Erro ao criar ministérios:', error.message);
    process.exit(1);
}

// ==========================================
// 5. CRIAR FINANÇAS (DEPENDE DE MEMBERS)
// ==========================================
console.log('💰 Criando lançamentos financeiros...');

const finances = [
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440001',
        amount: 150.00,
        receipt_date: '2026-01-22 10:30:00',
        type: 'tithe',
        payment_method: 'pix',
        id_member: '660e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440002',
        amount: 50.00,
        receipt_date: '2026-01-22 10:30:00',
        type: 'offering',
        payment_method: 'cash',
        id_member: '660e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440003',
        amount: 100.00,
        receipt_date: '2026-01-22 10:15:00',
        type: 'tithe',
        payment_method: 'debit_card',
        id_member: '660e8400-e29b-41d4-a716-446655440002'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440004',
        amount: 25.00,
        receipt_date: '2026-01-22 10:15:00',
        type: 'missions',
        payment_method: 'cash',
        id_member: '660e8400-e29b-41d4-a716-446655440002'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440005',
        amount: 200.00,
        receipt_date: '2026-01-22 10:00:00',
        type: 'tithe',
        payment_method: 'bank_transfer',
        id_member: '660e8400-e29b-41d4-a716-446655440003'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440006',
        amount: 100.00,
        receipt_date: '2026-01-22 10:00:00',
        type: 'offering',
        payment_method: 'pix',
        id_member: '660e8400-e29b-41d4-a716-446655440003'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440007',
        amount: 75.00,
        receipt_date: '2026-01-22 09:45:00',
        type: 'tithe',
        payment_method: 'credit_card',
        id_member: '660e8400-e29b-41d4-a716-446655440004'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440008',
        amount: 30.00,
        receipt_date: '2026-01-22 09:45:00',
        type: 'missions',
        payment_method: 'cash',
        id_member: '660e8400-e29b-41d4-a716-446655440004'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440009',
        amount: 50.00,
        receipt_date: '2026-01-22 11:00:00',
        type: 'tithe',
        payment_method: 'cash',
        id_member: '660e8400-e29b-41d4-a716-446655440005'
    },
    {
        id_launch: '990e8400-e29b-41d4-a716-446655440010',
        amount: 20.00,
        receipt_date: '2026-01-22 10:20:00',
        type: 'offering',
        payment_method: 'cash',
        id_member: '660e8400-e29b-41d4-a716-446655440006'
    }
];

try {
    for (const financeData of finances) {
        const existingFinance = await Finance.findOne({ where: { id_launch: financeData.id_launch } });
        if (!existingFinance) {
            await Finance.create(financeData);
            console.log(`  ✓ Lançamento criado: R$ ${financeData.amount.toFixed(2)} (${financeData.type})`);
        } else {
            console.log(`  ⊙ Lançamento já existe: R$ ${financeData.amount.toFixed(2)}`);
        }
    }
    console.log(`✅ ${finances.length} lançamentos financeiros processados\n`);
} catch (error) {
    console.error('❌ Erro ao criar lançamentos financeiros:', error.message);
    process.exit(1);
}

// ==========================================
// 6. CRIAR PRESENÇAS (DEPENDE DE MEMBERS + EVENTS)
// ==========================================
console.log('✅ Criando registros de presença...');

const presences = [
    // Culto Domingo Manhã
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440001',
        presence_date: '2026-01-26 10:15:00',
        observation: 'Chegou no horário',
        id_member: '660e8400-e29b-41d4-a716-446655440001',
        id_event: '770e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440002',
        presence_date: '2026-01-26 10:12:00',
        observation: null,
        id_member: '660e8400-e29b-41d4-a716-446655440002',
        id_event: '770e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440003',
        presence_date: '2026-01-26 10:05:00',
        observation: 'Chegou cedo para ajudar na organização',
        id_member: '660e8400-e29b-41d4-a716-446655440003',
        id_event: '770e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440004',
        presence_date: '2026-01-26 10:25:00',
        observation: 'Chegou atrasado',
        id_member: '660e8400-e29b-41d4-a716-446655440004',
        id_event: '770e8400-e29b-41d4-a716-446655440001'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440005',
        presence_date: '2026-01-26 10:30:00',
        observation: 'Primeira visita',
        id_member: '660e8400-e29b-41d4-a716-446655440006',
        id_event: '770e8400-e29b-41d4-a716-446655440001'
    },
    // Escola Bíblica Dominical
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440006',
        presence_date: '2026-01-26 09:05:00',
        observation: 'Participou da classe de adultos',
        id_member: '660e8400-e29b-41d4-a716-446655440001',
        id_event: '770e8400-e29b-41d4-a716-446655440005'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440007',
        presence_date: '2026-01-26 09:00:00',
        observation: 'Ajudou na classe infantil',
        id_member: '660e8400-e29b-41d4-a716-446655440002',
        id_event: '770e8400-e29b-41d4-a716-446655440005'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440008',
        presence_date: '2026-01-26 09:10:00',
        observation: null,
        id_member: '660e8400-e29b-41d4-a716-446655440003',
        id_event: '770e8400-e29b-41d4-a716-446655440005'
    },
    // Culto Quarta-feira
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440009',
        presence_date: '2026-01-29 19:35:00',
        observation: null,
        id_member: '660e8400-e29b-41d4-a716-446655440001',
        id_event: '770e8400-e29b-41d4-a716-446655440002'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440010',
        presence_date: '2026-01-29 19:30:00',
        observation: 'Chegou no horário',
        id_member: '660e8400-e29b-41d4-a716-446655440002',
        id_event: '770e8400-e29b-41d4-a716-446655440002'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440011',
        presence_date: '2026-01-29 19:40:00',
        observation: null,
        id_member: '660e8400-e29b-41d4-a716-446655440004',
        id_event: '770e8400-e29b-41d4-a716-446655440002'
    },
    // Culto Domingo Noite
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440012',
        presence_date: '2026-01-26 18:10:00',
        observation: 'Participou do louvor',
        id_member: '660e8400-e29b-41d4-a716-446655440001',
        id_event: '770e8400-e29b-41d4-a716-446655440004'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440013',
        presence_date: '2026-01-26 18:15:00',
        observation: null,
        id_member: '660e8400-e29b-41d4-a716-446655440003',
        id_event: '770e8400-e29b-41d4-a716-446655440004'
    },
    {
        id_presence: 'aaa0e8400-e29b-41d4-a716-446655440014',
        presence_date: '2026-01-26 18:05:00',
        observation: 'Ajudou na organização',
        id_member: '660e8400-e29b-41d4-a716-446655440004',
        id_event: '770e8400-e29b-41d4-a716-446655440004'
    }
];

try {
    for (const presenceData of presences) {
        const existingPresence = await Presence.findOne({ where: { id_presence: presenceData.id_presence } });
        if (!existingPresence) {
            await Presence.create(presenceData);
            console.log(`  ✓ Presença registrada`);
        } else {
            console.log(`  ⊙ Presença já existe`);
        }
    }
    console.log(`✅ ${presences.length} registros de presença processados\n`);
} catch (error) {
    console.error('❌ Erro ao criar registros de presença:', error.message);
    process.exit(1);
}

// ==========================================
// RESUMO FINAL
// ==========================================
console.log('═══════════════════════════════════════════════════');
console.log('🎉 Seed concluído com sucesso!');
console.log('═══════════════════════════════════════════════════');
console.log(`📊 Resumo:`);
console.log(`   • ${users.length} usuários`);
console.log(`   • ${members.length} membros`);
console.log(`   • ${events.length} eventos`);
console.log(`   • ${ministries.length} ministérios`);
console.log(`   • ${finances.length} lançamentos financeiros`);
console.log(`   • ${presences.length} registros de presença`);
console.log('═══════════════════════════════════════════════════\n');

process.exit(0);
