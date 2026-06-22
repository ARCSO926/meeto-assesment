// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lzlmgwjanhillabreusr.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6bG1nd2phbmhpbGxhYnJldXNyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDk5MDU5MiwiZXhwIjoyMDk2NTY2NTkyfQ.cnQF50OWdZYA68_uRgQ8G4LzTAIGmw142OQUjs_dP4M'

export const supabase = createClient(supabaseUrl, supabaseKey)