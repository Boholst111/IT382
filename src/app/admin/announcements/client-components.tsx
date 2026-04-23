'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addAnnouncement, archiveAnnouncement, updateAnnouncement } from "../actions"
import { toast } from "sonner"
import { ArchiveIcon, PencilIcon } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditAnnouncementDialog({ announcement }: { announcement: any }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    const data = {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      content: formData.get('content') as string,
      expiration_date: formData.get('expiration_date') as string || null,
    }
    try {
      await updateAnnouncement(announcement.id, data)
      toast.success("Announcement updated!")
      setOpen(false)
    } catch (err: unknown) {
      toast.error((err as Error).message)
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50" title="Edit">
          <PencilIcon className="w-4 h-4" />
        </Button>
      } />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Announcement</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={announcement.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={announcement.category || "General"}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Ministry">Ministry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={announcement.content} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiration_date">Expiration Date (Optional)</Label>
            <Input id="expiration_date" name="expiration_date" type="date" defaultValue={announcement.expiration_date} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Update Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function AddAnnouncementDialog() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      await addAnnouncement(formData)
      toast.success("Announcement published!")
      setOpen(false)
    } catch (err: unknown) {
      toast.error((err as Error).message)
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
        Create Announcement
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Announcement</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Urgent Update" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue="General">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Ministry">Ministry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" placeholder="Details of the announcement..." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiration_date">Expiration Date (Optional)</Label>
            <Input id="expiration_date" name="expiration_date" type="date" />
            <p className="text-xs text-neutral-500 italic">Automatically hides after this date.</p>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Publishing..." : "Publish Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ArchiveAnnouncementButton({ id }: { id: string }) {
  async function handleArchive() {
    if (!confirm("Archive this announcement?")) return
    try {
      await archiveAnnouncement(id)
      toast.success("Announcement archived")
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }
  return (
    <Button variant="ghost" size="icon" onClick={handleArchive} className="text-amber-600 hover:bg-amber-50" title="Archive">
      <ArchiveIcon className="w-4 h-4" />
    </Button>
  )
}
