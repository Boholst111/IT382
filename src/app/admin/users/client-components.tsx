'use client'

import { updateUserRole } from "./actions"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RoleSelector({ userId, currentRole }: { userId: string, currentRole: string }) {
  async function handleChange(newRole: string | null) {
    if (!newRole) return;
    try {
      await updateUserRole(userId, newRole)
      toast.success(`Role updated to ${newRole}`)
    } catch (err: unknown) {
      toast.error((err as Error).message)
    }
  }

  return (
    <Select defaultValue={currentRole} onValueChange={handleChange}>
      <SelectTrigger className="w-[120px] h-8 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">admin</SelectItem>
        <SelectItem value="viewer">viewer</SelectItem>
      </SelectContent>
    </Select>
  )
}
