import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' })
      },
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const url = new URL(request.url)
  const isAuthPage = url.pathname.startsWith('/login') || url.pathname.startsWith('/signup')

  if (!user && !isAuthPage && (url.pathname.startsWith('/admin') || url.pathname.startsWith('/home'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user) {
    const { data: userData, error: userError } = await supabase.from('users').select('role').eq('id', user.id).single();
    if (userError) {
      console.error('MIDDLEWARE USER FETCH ERROR:', userError);
    }
    const role = userData?.role || 'viewer';
    console.log('MIDDLEWARE LOG:', { path: url.pathname, email: user.email, role });

    if (isAuthPage || url.pathname === '/') {
       return NextResponse.redirect(new URL(role === 'admin' ? '/admin/dashboard' : '/home', request.url))
    }
    
    // Redirect admin away from portal home to dashboard if they land there
    if (url.pathname === '/home' && role === 'admin') {
       return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // Check specific role routes (e.g. admin restricted)
    if (url.pathname.startsWith('/admin')) {
      if (role !== 'admin') {
         return NextResponse.redirect(new URL('/home', request.url))
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
