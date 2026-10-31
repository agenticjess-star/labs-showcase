-- Labs showcase + ListenLife tables. Run in the Supabase SQL editor of the
-- project the user picks (do NOT run against LocalCheck_B2 unless the user
-- explicitly picks it for labs). Neon is dropped; these tables replace it.
create table if not exists public.projects (
  id bigint generated always as identity primary key,
  name text not null unique,
  slug text not null unique,
  description text not null default '',
  language text not null default '',
  status text not null default 'Check pending',
  github_url text not null,
  live_url text,
  image_url text,
  created_at timestamptz not null default now()
);
create table if not exists public.listenlife_users (
  id bigint generated always as identity primary key,
  password_hash text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.listenlife_sessions (
  id bigint generated always as identity primary key,
  user_id bigint not null references public.listenlife_users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create table if not exists public.listenlife_datasets (
  id bigint generated always as identity primary key,
  user_id bigint not null references public.listenlife_users(id) on delete cascade,
  name text not null default 'default',
  data jsonb not null,
  updated_at timestamptz not null default now(),
  unique(user_id, name)
);
