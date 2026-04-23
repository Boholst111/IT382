'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { PlusIcon, PencilIcon, ArchiveIcon, BookOpenIcon } from "lucide-react"
import { addMinistry, updateMinistry, archiveMinistry } from "../actions"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MinistryManagement({ ministries }: { ministries: any[] }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingMinistry, setEditingMinistry] = useState<any>(null)
  const [pending, setPending] = useState(false)

  async function handleAdd(formData: FormData) {
    setPending(true)
    try {
      await addMinistry(formData)
      toast.success("Ministry added successfully")
      setIsAddOpen(false)
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(err.message)
    } finally {
      setPending(false)
    }
  }

  async function handleUpdate(formData: FormData) {
    setPending(true)
    try {
      const id = formData.get('id') as string
      const name = formData.get('name') as string
      const description = formData.get('description') as string
      await updateMinistry(id, { name, description })
      toast.success("Ministry updated")
      setEditingMinistry(null)
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(err.message)
    } finally {
      setPending(false)
    }
  }

  async function handleArchive(id: string) {
    if (!confirm("Are you sure you want to archive this ministry? It will no longer be available for new members.")) return
    try {
      await archiveMinistry(id)
      toast.success("Ministry archived")
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      toast.error(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BookOpenIcon className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Church Ministries</h3>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold px-4" />}>
            <div className="flex items-center">
              <PlusIcon className="w-4 h-4 mr-2" /> Add Ministry
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Ministry</DialogTitle>
            </DialogHeader>
            <form action={handleAdd} className="space-y-4 py-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Ministry Name</Label>
                <Input id="name" name="name" placeholder="e.g. Youth Ministry" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Description</Label>
                <Input id="description" name="description" placeholder="Short description" />
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" disabled={pending} className="w-full bg-blue-600 font-bold">
                  {pending ? "Creating..." : "Save Ministry"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border border-neutral-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="px-6 py-4 font-bold text-neutral-600">Name</TableHead>
                <TableHead className="px-6 py-4 font-bold text-neutral-600">Description</TableHead>
                <TableHead className="px-6 py-4 text-right font-bold text-neutral-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ministries && ministries.length > 0 ? ministries.map((m) => (
                <TableRow key={m.id} className="hover:bg-neutral-50 transition-colors">
                  <TableCell className="px-6 py-4 font-bold text-neutral-900">{m.name}</TableCell>
                  <TableCell className="px-6 py-4 text-neutral-500 text-sm">{m.description || "-"}</TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-600"
                        onClick={() => setEditingMinistry(m)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-amber-600"
                        onClick={() => handleArchive(m.id)}
                      >
                        <ArchiveIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} className="px-6 py-12 text-center text-neutral-400">
                    No active ministries recorded.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingMinistry} onOpenChange={() => setEditingMinistry(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Ministry</DialogTitle>
          </DialogHeader>
          {editingMinistry && (
            <form action={handleUpdate} className="space-y-4 py-4">
              <input type="hidden" name="id" value={editingMinistry.id} />
              <div className="space-y-1.5">
                <Label htmlFor="edit-name" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Ministry Name</Label>
                <Input id="edit-name" name="name" defaultValue={editingMinistry.name} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-description" className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Description</Label>
                <Input id="edit-description" name="description" defaultValue={editingMinistry.description} />
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" disabled={pending} className="w-full bg-blue-600 font-bold">
                  {pending ? "Saving..." : "Update Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
