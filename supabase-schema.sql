-- Execute este script no SQL Editor do seu projeto Supabase
-- https://supabase.com/ → Seu Projeto → SQL Editor

-- Cria a tabela principal de leads
create table if not exists leads (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamp with time zone default timezone('utc'::text, now()) not null,
  profile     text not null,  -- 'investor' | 'buyer' | 'curious'
  name        text,
  whatsapp    text,
  email       text,
  answers     jsonb not null  -- Respostas brutas do Exame Socrático
);

-- Desabilita RLS para o MVP (INSERT via chave anon pública)
alter table leads disable row level security;

-- Índice para ordenar por perfil e data no dashboard
create index if not exists leads_profile_idx on leads (profile);
create index if not exists leads_created_at_idx on leads (created_at desc);
