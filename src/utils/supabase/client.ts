// utils/supabase/client.ts
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../../../types_db' // Adjust path as needed

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}