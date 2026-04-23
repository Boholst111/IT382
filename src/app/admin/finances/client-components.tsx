'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addFinance } from "../actions"
import { toast } from "sonner"

export function AddFinanceDialog() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    try {
      await addFinance(formData)
      toast.success("Transaction recorded")
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
        Add Record
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record New Transaction</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Transaction Type</Label>
            <Select name="type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tithe">Tithe</SelectItem>
                <SelectItem value="donation">Donation</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" placeholder="Monthly Utilities, Weekly Offering, etc." />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function FinanceTimeFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentFilter = searchParams.get('range') || 'all'
  const [isPending, startTransition] = useTransition()

  const handleFilterChange = (value: string | null) => {
    if (!value) return;
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'all') {
        params.delete('range')
      } else {
        params.set('range', value)
      }
      router.push(`?${params.toString()}`)
    })
  }

  return (
    <Select value={currentFilter} onValueChange={handleFilterChange} disabled={isPending}>
      <SelectTrigger className="w-[180px] bg-white border-neutral-200">
        <SelectValue placeholder="Time Range" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Records</SelectItem>
        <SelectItem value="weekly">This Week</SelectItem>
        <SelectItem value="monthly">This Month</SelectItem>
        <SelectItem value="yearly">This Year</SelectItem>
      </SelectContent>
    </Select>
  )
}
