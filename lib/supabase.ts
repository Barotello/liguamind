
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wgykbkgtcsvzdfphpxsu.supabase.co'
// PLACEHOLDER: Please replace with your actual supabase anon key
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndneWtia2d0Y3N2emRmcGhweHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDg1MDMsImV4cCI6MjA4NTI4NDUwM30.8P8bV30IPfCWpu4MqcAUAYxd_AwR1r3UAYX94ynDZYg'

export const supabase = createClient(supabaseUrl, supabaseKey)
