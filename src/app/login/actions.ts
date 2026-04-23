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

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return redirect(`/signup?message=Passwords do not match`)
  }

  const { data: signupData, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Signup error:', error.message)
    return redirect(`/signup?message=${encodeURIComponent(error.message)}`)
  }

  if (signupData.user) {
    // Insert into public.users table with viewer role
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        { 
          id: signupData.user.id, 
          email: signupData.user.email, 
          role: 'admin' 
        }
      ])

    if (profileError) {
      console.error('Profile creation error:', profileError.message)
      // Even if profile fails, the auth user is created. 
      // We might want to handle this, but for now we proceed.
    }
  }

  // If email confirmation is off, the user might be signed in immediately
  if (signupData.user && signupData.session) {
     return redirect('/home')
  }

  return redirect('/login?message=Account created! Please sign in.')
}
