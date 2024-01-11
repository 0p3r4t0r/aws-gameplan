import { createClient } from '@supabase/supabase-js'
import { Database } from './__generated__/database.types'

const supabaseUrl = 'https://sevkfiwgfmvhzporafnm.supabase.co'
const supabasePublicKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldmtmaXdnZm12aHpwb3JhZm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4OTU4NTEsImV4cCI6MjAyMDQ3MTg1MX0.QnGG98u012ykwMzz9x7cjQC7TSJawJ9w41iqVUIrERs'
export const supabase = createClient<Database>(supabaseUrl, supabasePublicKey)
