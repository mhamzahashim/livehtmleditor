-- Notes table for the online notepad
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Untitled Note',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 days'),
  is_public boolean not null default true
);

-- Index for looking up notes by expiry (for cleanup)
create index idx_notes_expires_at on public.notes (expires_at);

-- Enable Row Level Security
alter table public.notes enable row level security;

-- Allow anyone to read public notes (for shared links)
create policy "Anyone can read public notes"
  on public.notes for select
  using (is_public = true and expires_at > now());

-- Allow anyone to insert notes (anonymous notepad)
create policy "Anyone can create notes"
  on public.notes for insert
  with check (true);

-- Allow anyone to update notes (anonymous notepad, matched by id)
create policy "Anyone can update notes"
  on public.notes for update
  using (true);

-- Allow anyone to delete notes
create policy "Anyone can delete notes"
  on public.notes for delete
  using (true);

-- Auto-update updated_at on changes
create or replace function public.update_notes_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger notes_updated_at
  before update on public.notes
  for each row execute function public.update_notes_updated_at();
