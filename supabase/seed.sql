-- Run this in the Supabase SQL Editor

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null default 'BookOpen',
  created_at timestamptz default now()
);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('TypeScript Mastery', 45, 'FileCode'),
  ('System Design Fundamentals', 30, 'Network'),
  ('Next.js & Full Stack Dev', 60, 'Layers');
