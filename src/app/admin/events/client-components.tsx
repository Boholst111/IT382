'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { addEvent, archiveEvent, updateEvent } from "../actions"
import { toast } from "sonner"
import { ArchiveIcon, PencilIcon } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditEventDialog({ event, ministries }: { event: any, ministries: any[] }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [ministry, setMinistry] = useState(event.ministry || "General")

  async function handleSubmit(formData: FormData) {
    setPending(true)
    const data = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      ministry: ministry,
      description: formData.get('description') as string,
    }
    try {
      await updateEvent(event.id, data)
      toast.success("Event updated!")
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
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" name="title" defaultValue={event.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date & Time</Label>
            <Input id="date" name="date" type="datetime-local" defaultValue={event.date ? new Date(event.date).toISOString().slice(0, 16) : ''} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue={event.location} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ministry">Ministry Assigned</Label>
            <Select value={ministry} onValueChange={(val) => setMinistry(val || "General")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Ministry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                {ministries.map((m) => (
                  <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" name="description" defaultValue={event.description} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddEventDialog({ ministries }: { ministries: any[] }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [ministry, setMinistry] = useState("General")

  async function handleSubmit(formData: FormData) {
    setPending(true)
    formData.set('ministry', ministry)
    try {
      await addEvent(formData)
      toast.success("Event created!")
      setOpen(false)
      setMinistry("General")
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
            <Select value={ministry} onValueChange={(val) => setMinistry(val || "General")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Ministry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                {ministries.map((m) => (
                  <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export function ArchiveEventButton({ id }: { id: string }) {
  async function handleArchive() {
    if (!confirm("Archive this event?")) return
    try {
      await archiveEvent(id)
      toast.success("Event archived")
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
