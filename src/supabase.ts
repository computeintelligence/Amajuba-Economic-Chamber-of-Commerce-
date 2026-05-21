import { createClient, type Session, type User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const storageBucket = (import.meta.env.VITE_SUPABASE_STORAGE_BUCKET as string) || 'registrations';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are not defined. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const bucketName = storageBucket;

export const signUp = (email: string, password: string) =>
  supabase.auth.signUp({ email, password });

export const signIn = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

export const signInWithGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/registration`,
    },
  });

export const signOut = () =>
  supabase.auth.signOut();

export const getSession = () =>
  supabase.auth.getSession();

export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) =>
  supabase.auth.onAuthStateChange((event, session) => callback(event, session));
