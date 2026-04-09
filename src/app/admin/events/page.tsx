import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddEventDialog, DeleteEventButton } from "./client-components";

export default async function EventsPage() {
  const supabase = createClient();
  const { data: events } = await supabase.from('events').select('*').order('date', { ascending: true });

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Events</h1>
        <AddEventDialog />
      </div>

      <Card className="border-0 shadow-sm mt-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="font-semibold text-neutral-600 py-4 px-6 rounded-tl-lg">Title</TableHead>
                <TableHead className="font-semibold text-neutral-600">Date & Time</TableHead>
                <TableHead className="font-semibold text-neutral-600">Location</TableHead>
                <TableHead className="font-semibold text-neutral-600">Ministry</TableHead>
                <TableHead className="font-semibold text-neutral-600 text-right px-6 rounded-tr-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events && events.length > 0 ? events.map((event) => (
                <TableRow key={event.id} className="hover:bg-neutral-50/50">
                  <TableCell className="font-medium text-neutral-900 py-3 px-6">{event.title}</TableCell>
                  <TableCell className="text-neutral-500">
                    {event.date ? new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : "-"}
                  </TableCell>
                  <TableCell className="text-neutral-500">{event.location || "-"}</TableCell>
                  <TableCell className="text-neutral-500">{event.ministry || "General"}</TableCell>
                  <TableCell className="text-right px-6">
                    <DeleteEventButton id={event.id} />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                   <TableCell colSpan={5} className="py-8 text-center text-neutral-500">No events scheduled.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
