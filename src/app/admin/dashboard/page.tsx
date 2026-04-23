import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon, CalendarIcon, WalletIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = createClient();

  const { count: membersCount } = await supabase.from('members').select('*', { count: 'exact', head: true });
  const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
  const { data: recentMembers } = await supabase.from('members').select('name, status').order('created_at', { ascending: false }).limit(5);
  const { data: finances } = await supabase.from('finances').select('amount, type');
  const totalDonations = finances?.filter(f => f.type !== 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Total Members</CardTitle>
            <UsersIcon className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{membersCount || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Upcoming Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{eventsCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-500">Total Giving</CardTitle>
            <WalletIcon className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">₱{totalDonations.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-neutral-900">Financial Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-6">
              {[
                { label: 'Tithes', amount: finances?.filter(f => f.type === 'tithe').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0, color: 'bg-blue-500' },
                { label: 'Donations', amount: finances?.filter(f => f.type === 'donation').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0, color: 'bg-emerald-500' },
                { label: 'Expenses', amount: finances?.filter(f => f.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0) || 0, color: 'bg-red-500' },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-neutral-600">{item.label}</span>
                    <span className="text-neutral-900">₱{item.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`} 
                      style={{ width: `${Math.min(100, (item.amount / (totalDonations || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-neutral-100">
                <p className="text-xs text-neutral-400 font-medium italic">Percentages are relative to total income (Tithes + Donations).</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-neutral-900">Recent Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMembers && recentMembers.length > 0 ? recentMembers.map((member, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="font-medium text-neutral-900">{member.name}</div>
                  <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{member.status}</div>
                </div>
              )) : (
                <div className="text-neutral-500 text-sm">No members added yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
