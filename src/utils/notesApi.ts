import { supabase } from '@/integrations/supabase/client';

export interface DbNote {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
  is_public: boolean;
}

export async function fetchNote(id: string): Promise<DbNote | null> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .gt('expires_at', new Date().toISOString())
    .single();
  if (error || !data) return null;
  return data as DbNote;
}

export async function createNote(title?: string): Promise<DbNote | null> {
  const { data, error } = await supabase
    .from('notes')
    .insert({ title: title || 'Untitled Note', content: '' })
    .select()
    .single();
  if (error || !data) return null;
  return data as DbNote;
}

export async function updateNote(id: string, fields: { title?: string; content?: string }): Promise<DbNote | null> {
  const { data, error } = await supabase
    .from('notes')
    .update(fields)
    .eq('id', id)
    .select()
    .single();
  if (error || !data) return null;
  return data as DbNote;
}

export async function deleteNoteById(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  return !error;
}
