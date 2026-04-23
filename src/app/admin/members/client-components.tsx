'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addMember, archiveMember, updateMember } from "../actions"
import { toast } from "sonner"
import { ArchiveIcon, PencilIcon } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditMemberDialog({ member, ministries }: { member: any, ministries: any[] }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    const data = {
      name: formData.get('name') as string,
      contact: formData.get('contact') as string,
      ministry: formData.get('ministry') as string,
      status: formData.get('status') as string,
    }
    try {
      await updateMember(member.id, data)
      toast.success("Member updated!")
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
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" defaultValue={member.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Info</Label>
            <Input id="contact" name="contact" defaultValue={member.contact} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ministry">Ministry</Label>
            <Select name="ministry" defaultValue={member.ministry || "none"}>
              <SelectTrigger>
                <SelectValue placeholder="Assign Ministry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {ministries.map((m) => (
                  <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={member.status || "Active"}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Update Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddMemberDialog({ ministries }: { ministries: any[] }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      await addMember(formData)
      toast.success("Member added successfully!")
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
        Add Member
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Info</Label>
            <Input id="contact" name="contact" placeholder="Email or Phone" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ministry">Ministry</Label>
            <Select name="ministry">
              <SelectTrigger>
                <SelectValue placeholder="Assign Ministry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {ministries.map((m) => (
                  <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="Active">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Adding..." : "Save Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ArchiveMemberButton({ id }: { id: string }) {
  async function handleArchive() {
    if (!confirm("Are you sure you want to archive this member?")) return
    try {
      await archiveMember(id)
      toast.success("Member archived")
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleArchive} className="text-amber-600 hover:text-amber-700 hover:bg-amber-50" title="Archive">
      <ArchiveIcon className="w-4 h-4" />
    </Button>
  )
}
