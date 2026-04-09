'use client'

import { deletePrayerRequest } from "./actions"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"

export function DeleteRequestButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Remove this prayer request?")) return
    try {
      await deletePrayerRequest(id)
      toast.success("Request removed")
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
