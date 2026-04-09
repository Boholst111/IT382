'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error.message)
    return redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  // Fetch updated user to ensure session is current
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
     // Check role from public.users
     const { data: userProfile, error: profileError } = await supabase
       .from('users')
       .select('role')
       .eq('id', user.id)
       .single();
     
     if (profileError) {
       console.error('Error fetching user profile:', profileError.message);
       // Default to home if profile fetch fails
       return redirect('/home')
     }

     if (userProfile?.role === 'admin') {
        return redirect('/admin/dashboard')
     }
  }

  return redirect('/home')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signupData, error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup error:', error.message)
    return redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  // If email confirmation is off, the user might be signed in immediately
  if (signupData.user && signupData.session) {
     return redirect('/home')
  }

  return redirect('/login?message=Account created! Please check your email for confirmation link.')
}
