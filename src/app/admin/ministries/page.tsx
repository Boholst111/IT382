import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddMinistryDialog, ArchiveMinistryButton, EditMinistryDialog } from "./client-components";

export default async function MinistriesPage() {
  const supabase = createClient();
  const { data: ministries } = await supabase.from('ministries').select('*').eq('is_archived', false).order('name', { ascending: true });

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Ministries</h1>
        <AddMinistryDialog />
      </div>

      <Card className="border-0 shadow-sm mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="font-semibold text-neutral-600 py-4 px-6 rounded-tl-lg">Ministry Name</TableHead>
                <TableHead className="font-semibold text-neutral-600">Leader</TableHead>
                <TableHead className="font-semibold text-neutral-600">Created At</TableHead>
                <TableHead className="font-semibold text-neutral-600 text-right px-6 rounded-tr-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ministries && ministries.length > 0 ? ministries.map((m) => (
                <TableRow key={m.id} className="hover:bg-neutral-50/50">
                  <TableCell className="font-bold text-neutral-900 py-3 px-6">{m.name}</TableCell>
                  <TableCell className="text-neutral-500">{m.leader || "TBD"}</TableCell>
                  <TableCell className="text-neutral-500">{new Date(m.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right px-6 flex justify-end gap-2">
                    <EditMinistryDialog ministry={m} />
                    <ArchiveMinistryButton id={m.id} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                   <TableCell colSpan={4} className="py-8 text-center text-neutral-500">No ministries added yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
