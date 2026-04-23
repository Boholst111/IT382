import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddMemberDialog, ArchiveMemberButton, EditMemberDialog } from "./client-components";
import { ExportPDFButton } from "./export-pdf-button";

export default async function MembersPage() {
  const supabase = createClient();
  const { data: members } = await supabase.from('members').select('*').eq('is_archived', false).order('created_at', { ascending: false });
  const { data: ministries } = await supabase.from('ministries').select('name').order('name', { ascending: true });
  const { data: cms } = await supabase.from('cms').select('church_name').eq('id', 'main').maybeSingle();

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Members</h1>
        <div className="flex gap-2">
           <ExportPDFButton data={members || []} churchName={cms?.church_name || "Mahayahay FM"} />
           <AddMemberDialog ministries={ministries || []} />
        </div>
      </div>

      <Card className="border-0 shadow-sm mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="font-semibold text-neutral-600 py-4 px-6 rounded-tl-lg">Name</TableHead>
                <TableHead className="font-semibold text-neutral-600">Contact</TableHead>
                <TableHead className="font-semibold text-neutral-600">Ministry</TableHead>
                <TableHead className="font-semibold text-neutral-600">Status</TableHead>
                <TableHead className="font-semibold text-neutral-600 text-right px-6 rounded-tr-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members && members.length > 0 ? members.map((member) => (
                <TableRow key={member.id} className="hover:bg-neutral-50/50">
                  <TableCell className="font-medium text-neutral-900 py-3 px-6">{member.name}</TableCell>
                  <TableCell className="text-neutral-500">{member.contact || "-"}</TableCell>
                  <TableCell className="text-neutral-500">{member.ministry || "-"}</TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full ${member.status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-600'}`}>
                       {member.status || "Unknown"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right px-6 flex justify-end gap-2">
                    <EditMemberDialog member={member} ministries={ministries || []} />
                    <ArchiveMemberButton id={member.id} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                   <TableCell colSpan={5} className="py-8 text-center text-neutral-500">No members found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
