'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { addMinistry, deleteMinistry } from "./actions"
import { toast } from "sonner"
import { Trash2Icon } from "lucide-react"

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

export function DeleteMinistryButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Delete ministry?")) return
    try {
      await deleteMinistry(id)
      toast.success("Ministry removed")
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
