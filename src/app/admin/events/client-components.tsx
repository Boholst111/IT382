'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { addEvent, deleteEvent } from "../actions"
import { toast } from "sonner"
import { Trash2Icon } from "lucide-react"

export function AddEventDialog() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      await addEvent(formData)
      toast.success("Event created!")
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
        Create Event
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" name="title" placeholder="Sunday Fellowship" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date & Time</Label>
            <Input id="date" name="date" type="datetime-local" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" placeholder="Main Sanctuary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ministry">Ministry Assigned</Label>
            <Input id="ministry" name="ministry" placeholder="General" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" name="description" placeholder="..." />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Creating..." : "Save Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteEventButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Delete this event?")) return
    try {
      await deleteEvent(id)
      toast.success("Event deleted")
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
