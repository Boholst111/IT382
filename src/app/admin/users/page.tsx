import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RoleSelector } from "./client-components";

export default async function UsersPage() {
  const supabase = createClient();
  const { data: users } = await supabase.from('users').select('*').order('email', { ascending: true });

  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">User Access Management</h1>
      
      <Card className="border-0 shadow-sm mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="font-semibold text-neutral-600 py-4 px-6 rounded-tl-lg">Email</TableHead>
                <TableHead className="font-semibold text-neutral-600">Current Role</TableHead>
                <TableHead className="font-semibold text-neutral-600 text-right px-6 rounded-tr-lg">Modify Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users && users.length > 0 ? users.map((u) => (
                <TableRow key={u.id} className="hover:bg-neutral-50/50">
                  <TableCell className="font-medium text-neutral-900 py-3 px-6">{u.email}</TableCell>
                  <TableCell>
                     <span className={`text-xs px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-neutral-100 text-neutral-600'}`}>
                        {u.role}
                     </span>
                  </TableCell>
                  <TableCell className="flex justify-end pr-6 py-2">
                    <RoleSelector userId={u.id} currentRole={u.role || 'viewer'} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                   <TableCell colSpan={3} className="py-8 text-center text-neutral-500">No users found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <p className="mt-4 text-xs text-neutral-500 italic px-4">Caution: Changing a user to &apos;admin&apos; grants them full control over the system.</p>
    </>
  );
}
