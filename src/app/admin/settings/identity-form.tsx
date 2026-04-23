'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateCMS } from "./cms-actions"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChurchIdentityForm({ data }: { data: any }) {
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      await updateCMS(formData)
      toast.success("Church identity updated!")
    } catch (err: unknown) {
      toast.error((err as Error).message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-bold text-neutral-700">Church Name</Label>
          <Input name="church_name" defaultValue={data?.church_name || "Mahayahay Free Methodist"} className="bg-neutral-50 h-12 rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-100 transition-all" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-bold text-neutral-700">Contact Email</Label>
          <Input name="contact_email" type="email" defaultValue={data?.contact_email || "contact@mahayahay.com"} className="bg-neutral-50 h-12 rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-100 transition-all" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-bold text-neutral-700">Contact Phone</Label>
          <Input name="contact_phone" defaultValue={data?.contact_phone || ""} className="bg-neutral-50 h-12 rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-100 transition-all" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-bold text-neutral-700">Physical Address</Label>
          <Input name="contact_address" defaultValue={data?.contact_address || ""} className="bg-neutral-50 h-12 rounded-xl border-neutral-200 focus:ring-2 focus:ring-blue-100 transition-all" />
        </div>
        
        {/* Hidden fields to preserve existing CMS data when updating from settings */}
        <input type="hidden" name="hero_title" defaultValue={data?.hero_title} />
        <input type="hidden" name="hero_subtitle" defaultValue={data?.hero_subtitle} />
        <input type="hidden" name="mission_title" defaultValue={data?.mission_title} />
        <input type="hidden" name="mission_content" defaultValue={data?.mission_content} />
        <input type="hidden" name="pastor_name" defaultValue={data?.pastor_name} />
        <input type="hidden" name="pastor_message" defaultValue={data?.pastor_message} />
      </div>
      <Button type="submit" disabled={pending} className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-xl shadow-lg shadow-blue-100 font-bold transition-all transform active:scale-95">
        {pending ? "Saving..." : "Update Identity"}
      </Button>
    </form>
  )
}
