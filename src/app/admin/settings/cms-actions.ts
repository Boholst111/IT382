'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCMS(formData: FormData) {
  const supabase = createClient()
  
  const updates: Record<string, unknown> = {}
  
  // List of all possible fields
  const fields = [
    'hero_title', 'hero_subtitle', 'mission_title', 'mission_content',
    'pastor_name', 'pastor_message', 'church_name', 'contact_email',
    'contact_phone', 'contact_address', 'is_prayer_enabled',
    'is_maintenance_mode', 'auto_verify_users'
  ]

  fields.forEach(field => {
    const value = formData.get(field)
    if (value !== null) {
      if (field.startsWith('is_') || field === 'auto_verify_users') {
        updates[field] = value === 'true'
      } else {
        updates[field] = value as string
      }
    }
  })

  if (Object.keys(updates).length === 0) return;

  const { error } = await supabase.from('cms').update(updates).eq('id', 'main')
  if (error) throw new Error(error.message)
  revalidatePath('/admin/cms')
  revalidatePath('/')
}
