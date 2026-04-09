import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, BellIcon, MapPinIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = createClient();

  const { data: announcements, error: annError } = await supabase.from('announcements').select('*').order('created_at', { ascending: false }).limit(5);
  const { data: events, error: evError } = await supabase.from('events').select('*').order('date', { ascending: true }).limit(5);

  console.log('HOME DATA:', { announcements, annError, events, evError });

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
       {/* Hero Section */}
       <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-[2rem] p-10 md:p-14 text-white shadow-2xl">
         <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20" />
         <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-20" />
         <div className="relative z-10 max-w-2xl">
           <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-sm font-semibold tracking-wider mb-6">
             PORTAL
           </span>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
             Welcome Back to Mahayahay
           </h1>
           <p className="text-blue-100 text-lg md:text-xl font-light leading-relaxed">
             Here is what is happening in our community. Stay updated with the latest announcements and upcoming events.
           </p>
         </div>
       </div>

       <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
         {/* Announcements Column */}
         <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-neutral-800">
              <div className="p-2 bg-blue-100 rounded-xl">
                 <BellIcon className="w-5 h-5 text-blue-600" />
              </div>
              Latest Announcements
            </h2>
            <div className="space-y-4">
              {announcements && announcements.length > 0 ? announcements.map((ann) => (
                <Card key={ann.id} className="border-0 shadow-md shadow-neutral-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                   <CardContent className="p-6 relative">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                      <div className="flex justify-between items-start mb-3">
                         <h4 className="font-bold text-neutral-900 text-lg">{ann.title}</h4>
                         <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{ann.category}</span>
                      </div>
                      <p className="text-neutral-600 text-sm leading-relaxed">{ann.content}</p>
                      <div className="mt-4 text-xs font-medium text-neutral-400 flex items-center gap-1">
                         <CalendarIcon className="w-3 h-3" />
                         Posted {new Date(ann.created_at).toLocaleDateString()}
                      </div>
                   </CardContent>
                </Card>
              )) : (
                <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-neutral-200">
                  <p className="text-neutral-500 font-medium">No new announcements today.</p>
                </div>
              )}
            </div>
         </section>

         {/* Events Column */}
         <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-neutral-800">
              <div className="p-2 bg-indigo-100 rounded-xl">
                 <CalendarIcon className="w-5 h-5 text-indigo-600" />
              </div>
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {events && events.length > 0 ? events.map((ev) => (
                <Card key={ev.id} className="border-0 shadow-md shadow-neutral-200/50 hover:shadow-lg transition-shadow overflow-hidden">
                   <div className="flex items-stretch">
                      <div className="w-24 bg-gradient-to-b from-indigo-50 to-white border-r border-indigo-100 p-4 flex flex-col items-center justify-center shrink-0">
                         <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</span>
                         <span className="text-3xl font-black text-indigo-900 my-1">{new Date(ev.date).getDate()}</span>
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col justify-center">
                         <h4 className="font-bold text-neutral-900 text-lg mb-1">{ev.title}</h4>
                         <p className="text-indigo-600/80 font-medium text-sm flex items-center gap-1.5 line-clamp-1">
                             <MapPinIcon className="w-4 h-4" />
                             {ev.location}
                         </p>
                      </CardContent>
                   </div>
                </Card>
              )) : (
                <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-neutral-200">
                  <p className="text-neutral-500 font-medium">No upcoming events are scheduled.</p>
                </div>
              )}
            </div>
         </section>
       </div>
    </div>
  );
}
