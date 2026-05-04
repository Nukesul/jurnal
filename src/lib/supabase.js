import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://srpsgoblmuxzdhqtcifh.supabase.co';
const supabaseAnonKey = 'sb_publishable_BzS69Y3rQaFmhuwfmKAtEA_Jl4u3x8W';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);