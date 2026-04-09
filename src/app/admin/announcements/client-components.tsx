'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addAnnouncement, deleteAnnouncement } from "../actions"
import { toast } from "sonner"
import { Trash2Icon } from "lucide-react"

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

export function DeleteAnnouncementButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Delete announcement?")) return
    try {
      await deleteAnnouncement(id)
      toast.success("Announcement removed")
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }
  return (
    <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-500">
      <Trash2Icon className="w-4 h-4" />
    </Button>
  )
}
