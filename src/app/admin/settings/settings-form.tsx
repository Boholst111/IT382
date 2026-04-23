'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { updateCMS } from "./cms-actions"
import { toast } from "sonner"
import { 
  GlobeIcon, 
  BellRingIcon,
  LockIcon
} from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SettingsForm({ data }: { data: any }) {
  const [pending, setPending] = useState(false)
  
  // States for toggles
  const [prayerEnabled, setPrayerEnabled] = useState(data?.is_prayer_enabled ?? true)
  const [maintenanceMode, setMaintenanceMode] = useState(data?.is_maintenance_mode ?? false)
  const [autoVerify, setAutoVerify] = useState(data?.auto_verify_users ?? false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    
    // Append toggle values manually since they are not standard inputs
    formData.append('is_prayer_enabled', String(prayerEnabled))
    formData.append('is_maintenance_mode', String(maintenanceMode))
    formData.append('auto_verify_users', String(autoVerify))

    try {
      await updateCMS(formData)
      toast.success("Settings updated successfully!")
    } catch (err: unknown) {
      toast.error((err as Error).message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Church Identity Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="bg-neutral-50 border-b border-neutral-200 p-6">
            <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <GlobeIcon className="w-5 h-5 text-blue-600" />
              Church Identity
            </h3>
            <p className="text-sm text-neutral-500 mt-1">Basic information for the landing page.</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-neutral-700">Church Name</Label>
              <Input name="church_name" defaultValue={data?.church_name} className="bg-neutral-50 border-neutral-200" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-neutral-700">Contact Email</Label>
              <Input name="contact_email" type="email" defaultValue={data?.contact_email} className="bg-neutral-50 border-neutral-200" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-neutral-700">Physical Address</Label>
              <Input name="contact_address" defaultValue={data?.contact_address} className="bg-neutral-50 border-neutral-200" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-neutral-700">Contact Phone</Label>
              <Input name="contact_phone" defaultValue={data?.contact_phone} className="bg-neutral-50 border-neutral-200" />
            </div>
          </div>
        </div>

        {/* System Preferences Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="bg-neutral-50 border-b border-neutral-200 p-6">
            <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <BellRingIcon className="w-5 h-5 text-blue-600" />
              System Controls
            </h3>
            <p className="text-sm text-neutral-500 mt-1">Manage global site behaviors.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold text-neutral-800">Prayer Requests</Label>
                <p className="text-xs text-neutral-500">Enable the public prayer form.</p>
              </div>
              <Switch checked={prayerEnabled} onCheckedChange={setPrayerEnabled} />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold text-neutral-800">Auto-Verify Users</Label>
                <p className="text-xs text-neutral-500">Auto-approve new registrations.</p>
              </div>
              <Switch checked={autoVerify} onCheckedChange={setAutoVerify} />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold text-red-700 flex items-center gap-1.5">
                  Maintenance Mode
                  <LockIcon className="w-3.5 h-3.5" />
                </Label>
                <p className="text-xs text-red-600/70">Restrict site to admins only.</p>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          disabled={pending} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-blue-100"
        >
          {pending ? "Saving..." : "Save Configuration"}
        </Button>
      </div>
    </form>
  )
}
