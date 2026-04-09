'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// --- MEMBER ACTIONS ---
export async function addMember(formData: FormData) {
  const supabase = createClient()
  const data = {
    name: formData.get('name') as string,
    contact: formData.get('contact') as string,
    ministry: formData.get('ministry') as string,
    status: formData.get('status') as string || 'Active',
    family_group: formData.get('family_group') as string,
  }

  const { error } = await supabase.from('members').insert([data])
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/members')
}

export async function deleteMember(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('members').delete().eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/members')
}

// --- EVENT ACTIONS ---
export async function addEvent(formData: FormData) {
  const supabase = createClient()
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    location: formData.get('location') as string,
    ministry: formData.get('ministry') as string,
  }

  const { error } = await supabase.from('events').insert([data])
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/events')
  revalidatePath('/')
}

export async function deleteEvent(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/events')
  revalidatePath('/')
}

// --- FINANCE ACTIONS ---
export async function addFinance(formData: FormData) {
  const supabase = createClient()
  const data = {
    type: formData.get('type') as string,
    amount: parseFloat(formData.get('amount') as string),
    date: formData.get('date') as string || new Date().toISOString(),
    description: formData.get('description') as string,
  }

  const { error } = await supabase.from('finances').insert([data])
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/finances')
}

// --- ANNOUNCEMENT ACTIONS ---
export async function addAnnouncement(formData: FormData) {
  const supabase = createClient()
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
    expiration_date: formData.get('expiration_date') as string || null,
  }

  const { error } = await supabase.from('announcements').insert([data])
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

export async function deleteAnnouncement(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('announcements').delete().eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}
