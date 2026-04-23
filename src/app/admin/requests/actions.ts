'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function archivePrayerRequest(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('prayer_requests').update({ is_archived: true }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/requests')
}
