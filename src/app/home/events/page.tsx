import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const supabase = createClient();

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  const upcomingEvents = events?.filter(e => new Date(e.date) >= new Date()) || [];
  const pastEvents = events?.filter(e => new Date(e.date) < new Date()) || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 md:p-12 text-white shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Church Events</h1>
        <p className="mt-4 text-indigo-100 text-lg max-w-2xl">
          Join us in fellowship. Discover upcoming gatherings, services, and community activities at Mahayahay FMC.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
          <CalendarIcon className="text-indigo-600" />
          Upcoming Events
        </h2>
        <div className="grid gap-4">
          {upcomingEvents.length > 0 ? upcomingEvents.map((ev) => (
            <Card key={ev.id} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="flex flex-col md:flex-row">
                <div className="bg-indigo-50/50 md:w-48 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-indigo-100 group-hover:bg-indigo-100/50 transition-colors">
                  <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">
                    {new Date(ev.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-4xl font-black text-indigo-950">
                    {new Date(ev.date).getDate()}
                  </span>
                  <span className="text-sm font-medium text-indigo-700 mt-1">
                    {new Date(ev.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{ev.title}</h3>
                  <p className="text-neutral-600 mb-4">{ev.description}</p>
                  <div className="flex items-center text-neutral-500 text-sm mt-auto">
                    <MapPinIcon className="w-4 h-4 mr-1 text-indigo-400" />
                    {ev.location}
                  </div>
                </CardContent>
              </div>
            </Card>
          )) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-neutral-100">
              <CalendarIcon className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 font-medium">No upcoming events scheduled at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {pastEvents.length > 0 && (
        <div className="space-y-6 pt-12 border-t border-neutral-200">
           <h2 className="text-xl font-bold text-neutral-500">Past Events</h2>
           <div className="grid md:grid-cols-2 gap-4 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
              {pastEvents.map((ev) => (
                 <Card key={ev.id} className="border-0 shadow-sm bg-neutral-50">
                    <CardContent className="p-6">
                        <div className="text-sm font-bold text-neutral-400 mb-1">{new Date(ev.date).toLocaleDateString()}</div>
                        <h3 className="font-bold text-neutral-700">{ev.title}</h3>
                    </CardContent>
                 </Card>
              ))}
           </div>
        </div>
      )}
    </div>
  )
}
