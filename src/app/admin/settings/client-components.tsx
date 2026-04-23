'use client'

import { Button } from "@/components/ui/button"
import { restoreItem, permanentlyDeleteItem } from "./actions"
import { toast } from "sonner"
import { RotateCcwIcon, Trash2Icon } from "lucide-react"

export function RestoreButton({ table, id }: { table: string, id: string }) {
  async function handleRestore() {
    try {
      await restoreItem(table, id)
      toast.success("Item restored successfully")
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleRestore} className="text-green-600 hover:bg-green-50" title="Restore">
      <RotateCcwIcon className="w-4 h-4" />
    </Button>
  )
}

export function PermanentDeleteButton({ table, id }: { table: string, id: string }) {
  async function handleDelete() {
    if (!confirm("Are you sure you want to PERMANENTLY delete this? This cannot be undone.")) return
    try {
      await permanentlyDeleteItem(table, id)
      toast.success("Item permanently deleted")
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete} className="text-red-600 hover:bg-red-50" title="Delete Permanently">
      <Trash2Icon className="w-4 h-4" />
    </Button>
  )
}
