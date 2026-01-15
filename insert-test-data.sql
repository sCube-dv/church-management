-- ==========================================
-- INSERÇÃO DE DADOS DE TESTE
-- Seguir a ordem de dependências!
-- ==========================================

-- COMANDO PARA RODAR ESSE SCRIPT NO DOCKER:
--> docker exec mysql_api_church_mngt mysql -u dev -pdev@123 db_church_mngt < insert-test-data.sql

-- 1. CRIAR USUÁRIOS (SEM DEPENDÊNCIAS)
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
VALUES (
        '550e8400-e29b-41d4-a716-446655440001',
        'admin',
        'admin@123',
        'admin@church.com',
        'admin',
        true,
        NOW(),
        NOW()
    ),
    (
        '550e8400-e29b-41d4-a716-446655440002',
        'gerenciador1',
        'senha123',
        'gerenciador1@church.com',
        'member',
        true,
        NOW(),
        NOW()
    ),
    (
        '550e8400-e29b-41d4-a716-446655440003',
        'gerenciador2',
        'senha123',
        'gerenciador2@church.com',
        'member',
        true,
        NOW(),
        NOW()
    );

-- 2. CRIAR MEMBROS (DEPENDE DE USERS)
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
    );

-- 3. CRIAR EVENTOS (INDEPENDENTE)
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
        '2026-01-19 10:00:00',
        'Culto principal do domingo de manhã',
        NOW(),
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440002',
        'Culto Quarta-feira',
        '2026-01-22 19:30:00',
        'Estudo bíblico de quarta-feira',
        NOW(),
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440003',
        'Retiro Anual',
        '2026-02-15 08:00:00',
        'Retiro espiritual anual da igreja',
        NOW(),
        NOW()
    ),
    (
        '770e8400-e29b-41d4-a716-446655440004',
        'Culto Domingo Noite',
        '2026-01-19 18:00:00',
        'Culto noturno do domingo',
        NOW(),
        NOW()
    );

-- 4. CRIAR MINISTÉRIOS (DEPENDE DE MEMBERS)
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
        'Ministério de Louvor',
        'Responsável pelas músicas e adoração',
        '660e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440002',
        'Ministério Infantil',
        'Cuidado das crianças durante cultos',
        '660e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440003',
        'Ministério de Visitação',
        'Visitas aos membros e necessitados',
        '660e8400-e29b-41d4-a716-446655440003',
        NOW(),
        NOW()
    ),
    (
        '880e8400-e29b-41d4-a716-446655440004',
        'Ministério de Oração',
        'Intercessão e oração da igreja',
        '660e8400-e29b-41d4-a716-446655440004',
        NOW(),
        NOW()
    );

-- 5. CRIAR LANÇAMENTOS FINANCEIROS (DEPENDE DE MEMBERS)
INSERT INTO
    tb_finances (
        id_finance,
        amount,
        type,
        finance_date,
        description,
        id_member,
        createdAt,
        updatedAt
    )
VALUES
    -- Contribuições de João Silva
    (
        '990e8400-e29b-41d4-a716-446655440001',
        150.00,
        'tithe',
        '2026-01-12',
        'Dízimo semanal',
        '660e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        '990e8400-e29b-41d4-a716-446655440002',
        50.00,
        'offering',
        '2026-01-12',
        'Oferta para missões',
        '660e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    -- Contribuições de Maria Santos
    (
        '990e8400-e29b-41d4-a716-446655440003',
        100.00,
        'tithe',
        '2026-01-12',
        'Dízimo semanal',
        '660e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    ),
    (
        '990e8400-e29b-41d4-a716-446655440004',
        25.00,
        'offering',
        '2026-01-15',
        'Oferta especial',
        '660e8400-e29b-41d4-a716-446655440002',
        NOW(),
        NOW()
    ),
    -- Contribuições de Pedro Oliveira
    (
        '990e8400-e29b-41d4-a716-446655440005',
        200.00,
        'tithe',
        '2026-01-12',
        'Dízimo semanal',
        '660e8400-e29b-41d4-a716-446655440003',
        NOW(),
        NOW()
    ),
    -- Contribuições de Ana Costa
    (
        '990e8400-e29b-41d4-a716-446655440006',
        75.00,
        'tithe',
        '2026-01-12',
        'Dízimo semanal',
        '660e8400-e29b-41d4-a716-446655440004',
        NOW(),
        NOW()
    ),
    -- Contribuições de Carlos Ferreira
    (
        '990e8400-e29b-41d4-a716-446655440007',
        50.00,
        'tithe',
        '2026-01-12',
        'Dízimo semanal',
        '660e8400-e29b-41d4-a716-446655440005',
        NOW(),
        NOW()
    );

-- 6. CRIAR REGISTROS DE PRESENÇA (DEPENDE DE MEMBERS + EVENTS) - ÚLTIMO!
-- Culto Domingo Manhã - 19/01/2026
INSERT INTO
    tb_presences (
        id_presence,
        presence_date,
        status,
        id_member,
        id_event,
        createdAt,
        updatedAt
    )
VALUES (
        'aaa0e8400-e29b-41d4-a716-446655440001',
        '2026-01-19 10:15:00',
        'present',
        '660e8400-e29b-41d4-a716-446655440001',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        'aaa0e8400-e29b-41d4-a716-446655440002',
        '2026-01-19 10:12:00',
        'present',
        '660e8400-e29b-41d4-a716-446655440002',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        'aaa0e8400-e29b-41d4-a716-446655440003',
        '2026-01-19 10:05:00',
        'present',
        '660e8400-e29b-41d4-a716-446655440003',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        'aaa0e8400-e29b-41d4-a716-446655440004',
        '2026-01-19 10:20:00',
        'late',
        '660e8400-e29b-41d4-a716-446655440004',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),
    (
        'aaa0e8400-e29b-41d4-a716-446655440005',
        NULL,
        'absent',
        '660e8400-e29b-41d4-a716-446655440005',
        '770e8400-e29b-41d4-a716-446655440001',
        NOW(),
        NOW()
    ),

-- Culto Quarta-feira - 22/01/2026
(
    'aaa0e8400-e29b-41d4-a716-446655440006',
    '2026-01-22 19:35:00',
    'present',
    '660e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440002',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440007',
    '2026-01-22 19:30:00',
    'present',
    '660e8400-e29b-41d4-a716-446655440002',
    '770e8400-e29b-41d4-a716-446655440002',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440008',
    NULL,
    'absent',
    '660e8400-e29b-41d4-a716-446655440003',
    '770e8400-e29b-41d4-a716-446655440002',
    NOW(),
    NOW()
),

-- Culto Domingo Noite - 19/01/2026
(
    'aaa0e8400-e29b-41d4-a716-446655440009',
    '2026-01-19 18:10:00',
    'present',
    '660e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440004',
    NOW(),
    NOW()
),
(
    'aaa0e8400-e29b-41d4-a716-446655440010',
    '2026-01-19 18:15:00',
    'present',
    '660e8400-e29b-41d4-a716-446655440003',
    '770e8400-e29b-41d4-a716-446655440004',
    NOW(),
    NOW()
);

-- ==========================================
-- FIM DOS INSERTS DE TESTE
-- ==========================================

