'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function Notification() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const message = searchParams.get('message')
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (message) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        // Remove message from URL
        const params = new URLSearchParams(searchParams.toString())
        params.delete('message')
        const query = params.toString() ? `?${params.toString()}` : ''
        router.replace(`${pathname}${query}`, { scroll: false })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message, router, pathname, searchParams])

  if (!show || !message) return null

  return (
    <div className="fixed top-8 right-8 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-medium animate-in slide-in-from-top-4 fade-in out-fade-out duration-300">
      {message}
    </div>
  )
}
