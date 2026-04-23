'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateCMS } from "./cms-actions"
import { toast } from "sonner"
import { LayoutIcon, SparklesIcon, TargetIcon, UserIcon } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CMSManagement({ data }: { data: any }) {
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      await updateCMS(formData)
      toast.success("Landing page updated successfully!")
    } catch (err: unknown) {
      toast.error((err as Error).message)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-blue-600 text-white p-10 rounded-[3rem] shadow-2xl shadow-blue-200/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <SparklesIcon className="w-3.5 h-3.5" />
            Landing Page Editor
          </div>
          <h2 className="text-4xl font-black tracking-tight">Content Management</h2>
          <p className="text-blue-100 font-medium mt-2 max-w-md">Design and refine your church&apos;s public presence directly from this hub.</p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <div className="grid gap-8">
          <Card className="border-0 shadow-2xl shadow-neutral-200/40 rounded-[3rem] overflow-hidden border border-neutral-100">
            <CardHeader className="px-10 pt-10 pb-6 flex flex-row items-center gap-4 bg-neutral-50/50">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
                <LayoutIcon className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-black text-neutral-900 tracking-tight">Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="px-10 pb-10 space-y-6 pt-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-neutral-700">Main Headline</Label>
                <Input name="hero_title" defaultValue={data?.hero_title} className="h-12 rounded-xl border-neutral-200 focus:ring-blue-500" placeholder="Welcome to Mahayahay..." />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-neutral-700">Sub-headline Description</Label>
                <Textarea name="hero_subtitle" defaultValue={data?.hero_subtitle} className="min-h-[120px] rounded-2xl border-neutral-200 focus:ring-blue-500" placeholder="Experience faith and fellowship..." />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl shadow-neutral-200/40 rounded-[3rem] overflow-hidden border border-neutral-100">
            <CardHeader className="px-10 pt-10 pb-6 flex flex-row items-center gap-4 bg-neutral-50/50">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
                <TargetIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-black text-neutral-900 tracking-tight">Mission & Vision</CardTitle>
            </CardHeader>
            <CardContent className="px-10 pb-10 space-y-6 pt-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-neutral-700">Section Title</Label>
                <Input name="mission_title" defaultValue={data?.mission_title} className="h-12 rounded-xl border-neutral-200 focus:ring-emerald-500" placeholder="Our Mission & Vision" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-neutral-700">Core Content</Label>
                <Textarea name="mission_content" defaultValue={data?.mission_content} className="min-h-[150px] rounded-2xl border-neutral-200 focus:ring-emerald-500" placeholder="Join us in our mission..." />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl shadow-neutral-200/40 rounded-[3rem] overflow-hidden border border-neutral-100">
            <CardHeader className="px-10 pt-10 pb-6 flex flex-row items-center gap-4 bg-neutral-50/50">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
                <UserIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle className="text-2xl font-black text-neutral-900 tracking-tight">Leadership</CardTitle>
            </CardHeader>
            <CardContent className="px-10 pb-10 space-y-6 pt-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-neutral-700">Pastor Name</Label>
                <Input name="pastor_name" defaultValue={data?.pastor_name} className="h-12 rounded-xl border-neutral-200 focus:ring-indigo-500" placeholder="Esidore Ayaton" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-bold text-neutral-700">Pastor&apos;s Welcome Message</Label>
                <Textarea name="pastor_message" defaultValue={data?.pastor_message} className="min-h-[150px] rounded-2xl border-neutral-200 focus:ring-indigo-500" placeholder="A personal message from our leader..." />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="h-16 px-12 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-xl font-black shadow-xl shadow-blue-200 transform transition-all hover:scale-105 active:scale-95" disabled={pending}>
              {pending ? "Publishing Updates..." : "Save All CMS Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
