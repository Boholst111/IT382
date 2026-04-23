import { signup } from '@/app/login/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function SignupPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-4">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md text-sm font-medium text-neutral-600 hover:text-neutral-900 bg-white shadow-sm border border-neutral-200 flex items-center transition-all"
      >
         &larr; Back to Home
      </Link>

      <Card className="w-full max-w-md shadow-2xl border-0 shadow-blue-100/50">
         <CardHeader className="space-y-1 mb-2 mt-4">
            <CardTitle className="text-3xl font-bold text-center text-neutral-900">Create Account</CardTitle>
            <CardDescription className="text-center text-neutral-500">
               Join the Mahayahay FM community today
            </CardDescription>
         </CardHeader>
         <CardContent>
            <form className="flex-1 flex flex-col w-full justify-center gap-5 text-foreground" action={signup}>
               <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                  className="bg-neutral-50/50"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                  className="bg-neutral-50/50"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                  className="bg-neutral-50/50"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  />
               </div>
               {searchParams?.message && (
                  <div className="p-3 bg-blue-50 border border-blue-100 text-blue-800 text-center text-sm rounded-lg">
                  {searchParams.message}
                  </div>
               )}
               <div className="pt-2 flex flex-col gap-3">
                 <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-md">
                    Sign Up
                 </Button>
               </div>
               <p className="text-center text-sm text-neutral-500">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline font-medium">
                     Sign In
                  </Link>
               </p>
            </form>
         </CardContent>
      </Card>
      
      <p className="text-neutral-400 text-sm mt-8 text-center">
         Mahayahay Free Methodist Church Management System &copy; {new Date().getFullYear()}
      </p>
    </div>
  )
}
