'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCMS(formData: FormData) {
  const supabase = createClient()
  const data = {
    hero_title: formData.get('hero_title') as string,
    hero_subtitle: formData.get('hero_subtitle') as string,
    mission_title: formData.get('mission_title') as string,
    mission_content: formData.get('mission_content') as string,
    pastor_name: formData.get('pastor_name') as string,
    pastor_message: formData.get('pastor_message') as string,
  }
  const { error } = await supabase.from('cms').update(data).eq('id', 'main')
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cms')
  revalidatePath('/')
}
