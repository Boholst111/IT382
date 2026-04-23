'use client'

import { archivePrayerRequest } from "./actions"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ArchiveIcon } from "lucide-react"

export function ArchiveRequestButton({ id }: { id: string }) {
  async function handleArchive() {
    if (!confirm("Archive this prayer request?")) return
    try {
      await archivePrayerRequest(id)
      toast.success("Request archived")
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
