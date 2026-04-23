'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { addMinistry, archiveMinistry, updateMinistry } from "./actions"
import { toast } from "sonner"
import { ArchiveIcon, PencilIcon } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditMinistryDialog({ ministry }: { ministry: any }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    const data = {
      name: formData.get('name') as string,
      leader: formData.get('leader') as string,
    }
    try {
      await updateMinistry(ministry.id, data)
      toast.success("Ministry updated!")
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
          <DialogTitle>Edit Ministry</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ministry Name</Label>
            <Input id="name" name="name" defaultValue={ministry.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leader">Ministry Leader</Label>
            <Input id="leader" name="leader" defaultValue={ministry.leader} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Update Ministry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function AddMinistryDialog() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      await addMinistry(formData)
      toast.success("Ministry created!")
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
        Add Ministry
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Ministry</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ministry Name</Label>
            <Input id="name" name="name" placeholder="Youth Ministry, Music Team, etc." required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leader">Ministry Leader</Label>
            <Input id="leader" name="leader" placeholder="John Doe" />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Creating..." : "Save Ministry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ArchiveMinistryButton({ id }: { id: string }) {
  async function handleArchive() {
    if (!confirm("Archive this ministry?")) return
    try {
      await archiveMinistry(id)
      toast.success("Ministry archived")
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
