import { createClient } from "@supabase/supabase-js"

export const supabaseUrl = 'https://mrniqahwkvvomtiacjkl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybmlxYWh3a3Z2b210aWFjamtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTEwMDgsImV4cCI6MjA2MjA4NzAwOH0.9LB1ct0TcaTgfw_H5vu-XihrWd0sNYfWyFsZY9NQJ64'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;