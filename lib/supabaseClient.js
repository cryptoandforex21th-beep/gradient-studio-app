import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gtvrbqzuctdwqssgrqxo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Od7_I4mEu0qP6PXvWhaC1A_sCzzFLQZ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
