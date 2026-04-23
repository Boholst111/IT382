'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// --- MEMBER ACTIONS ---
export async function updateMember(id: string, data: Record<string, unknown>) {
  const supabase = createClient()
  const { error } = await supabase.from('members').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/members')
}

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

export async function archiveMember(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('members').update({ is_archived: true }).eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/members')
}

// --- EVENT ACTIONS ---
export async function updateEvent(id: string, data: Record<string, unknown>) {
  const supabase = createClient()
  const { error } = await supabase.from('events').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/events')
  revalidatePath('/')
}

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

export async function archiveEvent(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('events').update({ is_archived: true }).eq('id', id)
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
export async function updateAnnouncement(id: string, data: Record<string, unknown>) {
  const supabase = createClient()
  const { error } = await supabase.from('announcements').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

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

export async function archiveAnnouncement(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('announcements').update({ is_archived: true }).eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/announcements')
  revalidatePath('/')
}

// --- MINISTRY ACTIONS ---
export async function addMinistry(formData: FormData) {
  const supabase = createClient()
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  }

  const { error } = await supabase.from('ministries').insert([data])
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/settings')
  revalidatePath('/admin/members')
}

export async function updateMinistry(id: string, data: Record<string, unknown>) {
  const supabase = createClient()
  const { error } = await supabase.from('ministries').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/settings')
  revalidatePath('/admin/members')
}

export async function archiveMinistry(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('ministries').update({ is_archived: true }).eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/admin/settings')
  revalidatePath('/admin/members')
}
