'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function restoreItem(table: string, id: string) {
  const supabase = createClient()
  const { error } = await supabase.from(table).update({ is_archived: false }).eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath(`/admin/${table === 'prayer_requests' ? 'requests' : table}`)
  revalidatePath('/admin/settings')
  revalidatePath('/')
}

export async function permanentlyDeleteItem(table: string, id: string) {
  const supabase = createClient()
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/settings')
}
