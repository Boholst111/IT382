import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestoreButton, PermanentDeleteButton } from "./client-components";
import { 
  ArchiveIcon, 
  Settings2Icon, 
  ShieldAlertIcon, 
  ChurchIcon, 
  GlobeIcon, 
  LayoutIcon,
  BellRingIcon,
  UserCheckIcon,
  BookOpenIcon,
} from "lucide-react";
import { SettingsForm } from "./settings-form";
import { MinistryManagement } from "./ministry-management";
import { CMSManagement } from "./cms-management";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const supabase = createClient();

  // Fetch archived items
  const { data: archivedMembers } = await supabase.from('members').select('*').eq('is_archived', true);
  const { data: archivedEvents } = await supabase.from('events').select('*').eq('is_archived', true);
  const { data: archivedAnnouncements } = await supabase.from('announcements').select('*').eq('is_archived', true);
  const { data: archivedMinistries } = await supabase.from('ministries').select('*').eq('is_archived', true);

  // Fetch CMS/System Settings
  const { data: cms } = await supabase.from('cms').select('*').eq('id', 'main').maybeSingle();

  // Fetch Active Ministries
  const { data: ministries } = await supabase.from('ministries').select('*').eq('is_archived', false).order('name', { ascending: true });

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-8">
        <h1 className="text-4xl font-black text-neutral-900 tracking-tight flex items-center gap-3">
          <Settings2Icon className="w-10 h-10 text-blue-600" />
          Admin Settings
        </h1>
        <p className="text-neutral-500 mt-2 text-lg font-medium">
          Manage your church identity, service groups, and system preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full flex flex-col">
        <TabsList className="w-full justify-start bg-neutral-100 p-1 rounded-xl mb-8 border border-neutral-200 overflow-x-auto">
          <TabsTrigger value="general" className="flex-1 md:flex-none items-center gap-2 px-6 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all font-bold text-sm">
            <ChurchIcon className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="cms" className="flex-1 md:flex-none items-center gap-2 px-6 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all font-bold text-sm">
            <LayoutIcon className="w-4 h-4" />
            Landing Page
          </TabsTrigger>
          <TabsTrigger value="ministries" className="flex-1 md:flex-none items-center gap-2 px-6 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all font-bold text-sm">
            <BookOpenIcon className="w-4 h-4" />
            Ministries
          </TabsTrigger>
          <TabsTrigger value="archive" className="flex-1 md:flex-none items-center gap-2 px-6 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all font-bold text-sm">
            <ArchiveIcon className="w-4 h-4" />
            Archive
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1 md:flex-none items-center gap-2 px-6 py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all font-bold text-sm">
             <ShieldAlertIcon className="w-4 h-4" />
             Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="outline-none">
          <SettingsForm data={cms} />
        </TabsContent>

        <TabsContent value="cms" className="outline-none">
          <CMSManagement data={cms} />
        </TabsContent>

        <TabsContent value="ministries" className="outline-none">
          <MinistryManagement ministries={ministries || []} />
        </TabsContent>

        <TabsContent value="archive" className="space-y-10 outline-none">
           <div className="bg-neutral-900 text-white p-10 rounded-3xl flex flex-col md:flex-row gap-8 items-center shadow-xl">
             <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
               <ArchiveIcon className="w-10 h-10 text-blue-400" />
             </div>
             <div>
               <h3 className="text-2xl font-bold tracking-tight">System Archive</h3>
               <p className="text-neutral-400 font-medium mt-1">Manage deleted records and system cleanup.</p>
             </div>
           </div>

           <div className="space-y-10">
             <ArchiveSection title="Church Members" items={archivedMembers} table="members" nameField="name" icon={UserCheckIcon} />
             <ArchiveSection title="Public Events" items={archivedEvents} table="events" nameField="title" icon={GlobeIcon} />
             <ArchiveSection title="Announcements" items={archivedAnnouncements} table="announcements" nameField="title" icon={BellRingIcon} />
             <ArchiveSection title="Ministries" items={archivedMinistries} table="ministries" nameField="name" icon={BookOpenIcon} />
           </div>
        </TabsContent>

        <TabsContent value="security" className="py-20 text-center bg-white rounded-3xl border border-neutral-200">
           <ShieldAlertIcon className="w-16 h-16 text-neutral-200 mx-auto mb-4" />
           <h2 className="text-2xl font-bold text-neutral-900">Security Module</h2>
           <p className="text-neutral-500 max-w-sm mx-auto mt-2">Audit logs and advanced security settings are currently in development.</p>
           <Button variant="outline" className="mt-8 rounded-lg px-8 border-neutral-200">Notify me when ready</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArchiveSection({ title, items, table, nameField, icon: Icon }: { title: string, items: any[] | null, table: string, nameField: string, icon: any }) {
  return (
    <Card className="border-0 shadow-2xl shadow-neutral-200/40 rounded-[3rem] overflow-hidden border border-neutral-100">
      <CardHeader className="px-10 pt-10 pb-6 flex flex-row items-center justify-between bg-neutral-50/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-neutral-100">
            <Icon className="w-6 h-6 text-neutral-800" />
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-neutral-900 tracking-tight">{title}</CardTitle>
            <p className="text-sm text-neutral-500 font-medium">Archived items from this category.</p>
          </div>
        </div>
        <div className="bg-white border border-neutral-200 text-neutral-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter">
          {items?.length || 0} Records
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-neutral-50/30">
            <TableRow className="border-b border-neutral-100/50">
              <TableHead className="px-10 py-5 font-black text-neutral-400 uppercase text-[11px] tracking-[0.2em]">Item Identifier</TableHead>
              <TableHead className="px-10 py-5 font-black text-neutral-400 uppercase text-[11px] tracking-[0.2em]">Archived Timestamp</TableHead>
              <TableHead className="px-10 py-5 text-right font-black text-neutral-400 uppercase text-[11px] tracking-[0.2em]">Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items && items.length > 0 ? items.map((item) => (
              <TableRow key={item.id} className="border-b border-neutral-50/50 hover:bg-neutral-50/40 transition-all group">
                <TableCell className="px-10 py-6 font-bold text-neutral-900 truncate max-w-[450px]">
                  {item[nameField] || "System Record"}
                </TableCell>
                <TableCell className="px-10 py-6 text-neutral-400 font-medium">
                  {item.updated_at ? new Date(item.updated_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently"}
                </TableCell>
                <TableCell className="px-10 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
                    <RestoreButton table={table} id={item.id} />
                    <PermanentDeleteButton table={table} id={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3} className="px-10 py-20 text-center text-neutral-300 font-medium italic text-lg">
                  Archive repository is empty for this section.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
