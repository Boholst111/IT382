import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteRequestButton } from "./client-components";

export default async function PrayerRequestsPage() {
  const supabase = createClient();
  const { data: requests } = await supabase.from('prayer_requests').select('*').order('created_at', { ascending: false });

  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Prayer Requests</h1>
      
      <Card className="border-0 shadow-sm mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="font-semibold text-neutral-600 py-4 px-6 rounded-tl-lg">Sender</TableHead>
                <TableHead className="font-semibold text-neutral-600">Message</TableHead>
                <TableHead className="font-semibold text-neutral-600">Received</TableHead>
                <TableHead className="font-semibold text-neutral-600 text-right px-6 rounded-tr-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests && requests.length > 0 ? requests.map((r) => (
                <TableRow key={r.id} className="hover:bg-neutral-50/50">
                  <TableCell className="font-bold text-neutral-900 py-3 px-6">{r.name || "Anonymous"}</TableCell>
                  <TableCell className="text-neutral-600 max-w-lg">{r.message}</TableCell>
                  <TableCell className="text-neutral-500 text-xs">{new Date(r.created_at).toLocaleString()}</TableCell>
                  <TableCell className="text-right px-6">
                    <DeleteRequestButton id={r.id} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                   <TableCell colSpan={4} className="py-8 text-center text-neutral-500">No prayer requests received yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
