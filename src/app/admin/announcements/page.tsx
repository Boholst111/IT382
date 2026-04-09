import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddAnnouncementDialog, DeleteAnnouncementButton } from "./client-components";

export default async function AnnouncementsPage() {
  const supabase = createClient();
  const { data: announcements } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Announcements</h1>
        <AddAnnouncementDialog />
      </div>

      <Card className="border-0 shadow-sm mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="font-semibold text-neutral-600 py-4 px-6 rounded-tl-lg">Title</TableHead>
                <TableHead className="font-semibold text-neutral-600">Category</TableHead>
                <TableHead className="font-semibold text-neutral-600">Content</TableHead>
                <TableHead className="font-semibold text-neutral-600">Expiration</TableHead>
                <TableHead className="font-semibold text-neutral-600 text-right px-6 rounded-tr-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements && announcements.length > 0 ? announcements.map((ann) => (
                <TableRow key={ann.id} className="hover:bg-neutral-50/50">
                  <TableCell className="font-bold text-neutral-900 py-3 px-6">{ann.title}</TableCell>
                  <TableCell>
                     <span className={`text-xs px-2 py-1 rounded-full ${ann.category === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {ann.category}
                     </span>
                  </TableCell>
                  <TableCell className="text-neutral-500 max-w-xs truncate">{ann.content}</TableCell>
                  <TableCell className="text-neutral-500">
                    {ann.expiration_date ? new Date(ann.expiration_date).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <DeleteAnnouncementButton id={ann.id} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                   <TableCell colSpan={5} className="py-8 text-center text-neutral-500">No announcements found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
