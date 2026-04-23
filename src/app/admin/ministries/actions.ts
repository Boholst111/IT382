'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateMinistry(id: string, data: Record<string, unknown>) {
  const supabase = createClient()
  const { error } = await supabase.from('ministries').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/ministries')
}

export async function addMinistry(formData: FormData) {
  const supabase = createClient()
  const data = {
    name: formData.get('name') as string,
    leader: formData.get('leader') as string,
  }
  const { error } = await supabase.from('ministries').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/ministries')
}

export async function archiveMinistry(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('ministries').update({ is_archived: true }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/ministries')
}
