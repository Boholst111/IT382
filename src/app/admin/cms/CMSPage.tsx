'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateCMS } from "./actions"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CMSPage({ data }: { data: any }) {
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Content Management (CMS)</h1>
      <p className="text-neutral-500">Edit the public landing page content directly from here.</p>

      <form action={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hero Title</Label>
                <Input name="hero_title" defaultValue={data?.hero_title} />
              </div>
              <div className="space-y-2">
                <Label>Hero Subtitle</Label>
                <Textarea name="hero_subtitle" defaultValue={data?.hero_subtitle} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Mission & Vision</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mission Title</Label>
                <Input name="mission_title" defaultValue={data?.mission_title} />
              </div>
              <div className="space-y-2">
                <Label>Mission Content</Label>
                <Textarea name="mission_content" defaultValue={data?.mission_content} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Leadership Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pastor Name</Label>
                <Input name="pastor_name" defaultValue={data?.pastor_name} />
              </div>
              <div className="space-y-2">
                <Label>Pastor Message</Label>
                <Textarea name="pastor_message" defaultValue={data?.pastor_message} />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-blue-600 h-12 text-lg" disabled={pending}>
             {pending ? "Saving Changes..." : "Save All Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
