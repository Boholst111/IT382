import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon, CalendarIcon, DollarSignIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = createClient();

  const { count: membersCount } = await supabase.from('members').select('*', { count: 'exact', head: true });
  const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
  const { data: recentMembers } = await supabase.from('members').select('name, status').order('created_at', { ascending: false }).limit(5);
  const { data: finances } = await supabase.from('finances').select('amount').filter('type', 'neq', 'expense');
  const totalDonations = finances?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

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
            <DollarSignIcon className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">${totalDonations.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-neutral-900">Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-neutral-400 bg-neutral-50/50 rounded-xl m-6 mt-0">
            [Chart Area - Attendance Data]
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
