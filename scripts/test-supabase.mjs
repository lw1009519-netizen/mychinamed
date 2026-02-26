import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://quaujopqlukbwmqeqfwn.supabase.co',
  'sb_publishable_nAti4hElWvS0j73fDQyJmA_AedYcVlB'
)

console.log('Testing Supabase connection...\n')

const { data, error } = await supabase
  .from('cities')
  .select('name_en, name_zh, slug, airport_code, hospital_count')
  .order('hospital_count', { ascending: false })

if (error) {
  console.error('Connection FAILED:', error.message)
  process.exit(1)
}

console.log(`Connected! Found ${data.length} cities:\n`)
console.table(data)
