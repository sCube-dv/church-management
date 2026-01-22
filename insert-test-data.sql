-- ==========================================
-- INSERÇÃO DE DADOS DE TESTE
-- Sistema de Gerenciamento de Igrejas
-- Seguir a ordem de dependências!
-- ==========================================

-- COMANDO PARA RODAR ESSE SCRIPT NO DOCKER:
--> docker exec mysql_api_church_mngt mysql -u dev -pdev@123 db_church_mngt < insert-test-data.sql

-- ==========================================
-- 1. CRIAR USUÁRIOS (SEM DEPENDÊNCIAS)
-- ==========================================
-- IMPORTANTE: As senhas devem ser hasheadas com bcryptjs!
-- Use o script npm run db-sync para criar o superusuário automaticamente

INSERT INTO
    tb_users (
        id_user,
        username,
        password,
        email,
        role,
        is_active,
        createdAt,
        updatedAt
    )
VALUES
    -- Senha: admin@123 (hasheada com bcryptjs)
    (
        '550e8400-e29b-41d4-a716-446655440001',
        'admin',
        '$2a$10$YourHashedPasswordHere1',
        'admin@church.com',
        'admin',
        true,
        NOW(),
        NOW()
    ),
    -- Senha: senha123 (hasheada com bcryptjs)
    (
        '550e8400-e29b-41d4-a716-446655440002',
        'gerenciador1',
        '$2a$10$YourHashedPasswordHere2',
        'gerenciador1@church.com',
        'member',
        true,
        NOW(),
        NOW()
    ),
    -- Senha: senha123 (hasheada com bcryptjs)
    (
        '550e8400-e29b-41d4-a716-446655440003',
        'gerenciador2',
        '$2a$10$YourHashedPasswordHere3',
        'gerenciador2@church.com',
        'member',
        true,
        NOW(),
        NOW()
    ),
    -- Senha: guest123 (hasheada com bcryptjs)
    (
        '550e8400-e29b-41d4-a716-446655440004',
        'visitante',
        '$2a$10$YourHashedPasswordHere4',
        'visitante@church.com',
        'guest',
        true,
        NOW(),
        NOW()
    );

-- ==========================================
-- 2. CRIAR MEMBROS (DEPENDE DE USERS)
-- ==========================================

INSERT INTO
    tb_members (
        id_member,
        name,
        cpf,
        birth_date,
        baptism_date,
        phone,
        status,
        id_user,
        createdAt,
        updatedAt
    )
VALUES (
        '660e8400-e29b-41d4-a716-446655440001',
        'João Silva',
        '12345678901',
        '1990-05-15',
        '2010-06-20',
        '11999999999',
        'active',
        '550e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        '660e8400-e29b-41d4-a716-446655440002',
        'Maria Santos',
        '12345678902',
        '1988-03-22',
        '2008-07-15',
        '11988888888',
        'active',
        '550e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        '660e8400-e29b-41d4-a716-446655440003',
        'Pedro Oliveira',
        '12345678903',
        '1995-11-30',
        '2015-12-25',
        '11977777777',
        'active',
        '550e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    ),
    (
        '660e8400-e29b-41d4-a716-446655440004',
        'Ana Costa',
        '12345678904',
        '1992-07-08',
        '2012-08-10',
        '11966666666',
        'active',
        '550e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    ),
    (
        '660e8400-e29b-41d4-a716-446655440005',
        'Carlos Ferreira',
        '12345678905',
        '1987-01-14',
        '2007-02-18',
        '11955555555',
        'visitor',
        '550e8400-e29b-41d4-a716-446655440003',
        NOW(),
        NOW()
    ),
    (
        '660e8400-e29b-41d4-a716-446655440006',
        'Juliana Almeida',
        '12345678906',
        '1993-09-25',
        NULL,
        '11944444444',
        'visitor',
        '550e8400-e29b-41d4-a716-446655440004',
        NOW(),
        NOW()
    ),
    (
        '660e8400-e29b-41d4-a716-446655440007',
        'Roberto Lima',
        '12345678907',
        '1985-12-03',
        '2005-01-15',
        '11933333333',
        'inactive',
        '550e8400-e29b-41d4-a716-446655440003',
        NOW(),
        NOW()
    );

-- ==========================================
-- 3. CRIAR EVENTOS (INDEPENDENTE)
-- ==========================================

INSERT INTO
    tb_events (
        id_event,
        title,
        event_date,
        description,
        createdAt,
        updatedAt
    )
VALUES (
        '770e8400-e29b-41d4-a716-446655440001',
        'Culto Domingo Manhã',
        '2026-01-26 10:00:00',
        'Culto principal do domingo de manhã com louvor e pregação',
        NOW(),
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440002',
        'Culto Quarta-feira',
        '2026-01-29 19:30:00',
        'Estudo bíblico e oração de quarta-feira',
        NOW(),
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440003',
        'Retiro Espiritual',
        '2026-02-15 08:00:00',
        'Retiro espiritual anual da igreja',
        NOW(),
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440004',
        'Culto Domingo Noite',
        '2026-01-26 18:00:00',
        'Culto noturno do domingo com foco em jovens',
        NOW(),
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440005',
        'Escola Bíblica Dominical',
        '2026-01-26 09:00:00',
        'Aulas de estudo bíblico por faixa etária',
        NOW(),
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440006',
        'Vigília de Oração',
        '2026-02-01 22:00:00',
        'Noite de oração e intercessão',
        NOW(),
        NOW()
    );

-- ==========================================
-- 4. CRIAR MINISTÉRIOS (DEPENDE DE MEMBERS)
-- ==========================================

INSERT INTO
    tb_ministries (
        id_ministry,
        name,
        description,
        id_member,
        createdAt,
        updatedAt
    )
VALUES (
        '880e8400-e29b-41d4-a716-446655440001',
        'Ministério de Louvor e Adoração',
        'Responsável pela música, louvor e adoração nos cultos',
        '660e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440002',
        'Ministério Infantil',
        'Cuidado e ensino das crianças durante os cultos',
        '660e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440003',
        'Ministério de Visitação',
        'Visitas aos membros, enfermos e necessitados',
        '660e8400-e29b-41d4-a716-446655440003',
        NOW(),
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440004',
        'Ministério de Intercessão',
        'Oração e intercessão pela igreja e comunidade',
        '660e8400-e29b-41d4-a716-446655440004',
        NOW(),
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440005',
        'Ministério de Mídia',
        'Transmissão online, som e projeção dos cultos',
        '660e8400-e29b-41d4-a716-446655440003',
        NOW(),
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440006',
        'Ministério de Recepção',
        'Acolhimento e recepção de visitantes',
        '660e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    );

-- ==========================================
-- 5. CRIAR LANÇAMENTOS FINANCEIROS (DEPENDE DE MEMBERS)
-- ==========================================
-- ATENÇÃO: Estrutura atualizada conforme modelo Finance.js
-- Campos: id_launch, amount, receipt_date, type, payment_method

INSERT INTO
    tb_finances (
        id_launch,
        amount,
        receipt_date,
        type,
        payment_method,
        id_member,
        createdAt,
        updatedAt
    )
VALUES
    -- Contribuições de João Silva
    (
        '990e8400-e29b-41d4-a716-446655440001',
        150.00,
        '2026-01-22 10:30:00',
        'tithe',
        'pix',
        '660e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        '990e8400-e29b-41d4-a716-446655440002',
        50.00,
        '2026-01-22 10:30:00',
        'offering',
        'cash',
        '660e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    -- Contribuições de Maria Santos
    (
        '990e8400-e29b-41d4-a716-446655440003',
        100.00,
        '2026-01-22 10:15:00',
        'tithe',
        'debit_card',
        '660e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    ),
    (
        '990e8400-e29b-41d4-a716-446655440004',
        25.00,
        '2026-01-22 10:15:00',
        'missions',
        'cash',
        '660e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    ),
    -- Contribuições de Pedro Oliveira
    (
        '990e8400-e29b-41d4-a716-446655440005',
        200.00,
        '2026-01-22 10:00:00',
        'tithe',
        'bank_transfer',
        '660e8400-e29b-41d4-a716-446655440003',
        NOW(),
        NOW()
    ),
    (
        '990e8400-e29b-41d4-a716-446655440006',
        100.00,
        '2026-01-22 10:00:00',
        'offering',
        'pix',
        '660e8400-e29b-41d4-a716-446655440003',
        NOW(),
        NOW()
    ),
    -- Contribuições de Ana Costa
    (
        '990e8400-e29b-41d4-a716-446655440007',
        75.00,
        '2026-01-22 09:45:00',
        'tithe',
        'credit_card',
        '660e8400-e29b-41d4-a716-446655440004',
        NOW(),
        NOW()
    ),
    (
        '990e8400-e29b-41d4-a716-446655440008',
        30.00,
        '2026-01-22 09:45:00',
        'missions',
        'cash',
        '660e8400-e29b-41d4-a716-446655440004',
        NOW(),
        NOW()
    ),
    -- Contribuições de Carlos Ferreira
    (
        '990e8400-e29b-41d4-a716-446655440009',
        50.00,
        '2026-01-22 11:00:00',
        'tithe',
        'cash',
        '660e8400-e29b-41d4-a716-446655440005',
        NOW(),
        NOW()
    ),
    -- Contribuições de Juliana Almeida (visitante)
    (
        '990e8400-e29b-41d4-a716-446655440010',
        20.00,
        '2026-01-22 10:20:00',
        'offering',
        'cash',
        '660e8400-e29b-41d4-a716-446655440006',
        NOW(),
        NOW()
    );

-- ==========================================
-- 6. CRIAR REGISTROS DE PRESENÇA (DEPENDE DE MEMBERS + EVENTS)
-- ==========================================
-- ATENÇÃO: Estrutura atualizada conforme modelo Presence.js
-- Campos: id_presence, presence_date, observation
-- Removido campo 'status' (não existe mais no modelo)

-- Culto Domingo Manhã - 26/01/2026
INSERT INTO
    tb_presences (
        id_presence,
        presence_date,
        observation,
        id_member,
        id_event,
        createdAt,
        updatedAt
    )
VALUES (
        'aaa0e8400-e29b-41d4-a716-446655440001',
        '2026-01-26 10:15:00',
        'Chegou no horário',
        '660e8400-e29b-41d4-a716-446655440001',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        'aaa0e8400-e29b-41d4-a716-446655440002',
        '2026-01-26 10:12:00',
        NULL,
        '660e8400-e29b-41d4-a716-446655440002',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        'aaa0e8400-e29b-41d4-a716-446655440003',
        '2026-01-26 10:05:00',
        'Chegou cedo para ajudar na organização',
        '660e8400-e29b-41d4-a716-446655440003',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        'aaa0e8400-e29b-41d4-a716-446655440004',
        '2026-01-26 10:25:00',
        'Chegou atrasado',
        '660e8400-e29b-41d4-a716-446655440004',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        'aaa0e8400-e29b-41d4-a716-446655440005',
        '2026-01-26 10:30:00',
        'Primeira visita',
        '660e8400-e29b-41d4-a716-446655440006',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),

-- Escola Bíblica Dominical - 26/01/2026
(
    'aaa0e8400-e29b-41d4-a716-446655440006',
    '2026-01-26 09:05:00',
    'Participou da classe de adultos',
    '660e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440005',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440007',
    '2026-01-26 09:00:00',
    'Ajudou na classe infantil',
    '660e8400-e29b-41d4-a716-446655440002',
    '770e8400-e29b-41d4-a716-446655440005',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440008',
    '2026-01-26 09:10:00',
    NULL,
    '660e8400-e29b-41d4-a716-446655440003',
    '770e8400-e29b-41d4-a716-446655440005',
    NOW(),
    NOW()
),

-- Culto Quarta-feira - 29/01/2026
(
    'aaa0e8400-e29b-41d4-a716-446655440009',
    '2026-01-29 19:35:00',
    NULL,
    '660e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440002',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440010',
    '2026-01-29 19:30:00',
    'Chegou no horário',
    '660e8400-e29b-41d4-a716-446655440002',
    '770e8400-e29b-41d4-a716-446655440002',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440011',
    '2026-01-29 19:40:00',
    NULL,
    '660e8400-e29b-41d4-a716-446655440004',
    '770e8400-e29b-41d4-a716-446655440002',
    NOW(),
    NOW()
),

-- Culto Domingo Noite - 26/01/2026
(
    'aaa0e8400-e29b-41d4-a716-446655440012',
    '2026-01-26 18:10:00',
    'Participou do louvor',
    '660e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440004',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440013',
    '2026-01-26 18:15:00',
    NULL,
    '660e8400-e29b-41d4-a716-446655440003',
    '770e8400-e29b-41d4-a716-446655440004',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440014',
    '2026-01-26 18:05:00',
    'Ajudou na organização',
    '660e8400-e29b-41d4-a716-446655440004',
    '770e8400-e29b-41d4-a716-446655440004',
    NOW(),
    NOW()
);

-- ==========================================
-- FIM DOS INSERTS DE TESTE
-- ==========================================
-- Total de registros inseridos:
-- - 4 Usuários
-- - 7 Membros
-- - 6 Eventos
-- - 6 Ministérios
-- - 10 Lançamentos Financeiros
-- - 14 Registros de Presença
-- ==========================================