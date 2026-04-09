'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deletePrayerRequest(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('prayer_requests').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/requests')
}
