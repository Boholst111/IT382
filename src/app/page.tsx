import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPinIcon, 
  ClockIcon, 
  HeartIcon, 
  UsersIcon, 
  BookOpenIcon, 
  SettingsIcon, 
  GlobeIcon 
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

import { Notification } from "@/components/Notification";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  const supabase = createClient();

  // Fetch upcoming events
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq('is_archived', false)
    .limit(3)
    .order("date", { ascending: true });

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .eq('is_archived', false)
    .or(`expiration_date.is.null,expiration_date.gt.${new Date().toISOString()}`)
    .limit(2)
    .order("created_at", { ascending: false });

  const { data: cms } = await supabase.from('cms').select('*').eq('id', 'main').maybeSingle();

  return (
    <main className="min-h-screen bg-neutral-50 overflow-hidden relative">
      <Suspense fallback={null}>
        <Notification />
      </Suspense>

      {cms?.is_maintenance_mode ? (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-1000 relative z-[100]">
          <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20">
            <SettingsIcon className="w-12 h-12 text-white animate-spin-slow" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">Under Maintenance</h1>
          <p className="text-neutral-400 max-w-md text-lg font-medium">
            {cms?.church_name || "Mahayahay Church"} is currently updating our systems. <br /> We&apos;ll be back shortly!
          </p>
          <div className="mt-12">
             <Link href="/login" className="text-blue-500 hover:text-blue-400 font-bold underline decoration-2 underline-offset-8 transition-all">Admin Access</Link>
          </div>
        </div>
      ) : (
        <>
          {/* Dynamic Nav Bar */}
          <nav className="absolute top-0 w-full flex items-center justify-between px-8 py-6 z-50">
        <div className="font-black text-2xl tracking-tighter text-blue-900 bg-white/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/50 shadow-sm flex items-center gap-2">
          {cms?.church_name?.split(' ')[0] || "Mahayahay"} <span className="text-blue-600 font-medium">FM</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="bg-white/70 backdrop-blur-md border border-white/50 text-blue-900 hover:bg-white hover:text-blue-700 rounded-full font-bold transition-all px-6">Sign In</Button>
          </Link>
          {cms?.is_prayer_enabled && (
            <Link href="#prayer">
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 font-bold px-6">Prayer Request</Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center min-h-[750px] justify-center overflow-visible">
        {/* Immersive Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-br from-blue-100 via-white to-emerald-50 rounded-b-[120px] -z-10 blur-3xl opacity-70"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-[120px] animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] -z-10 pointer-events-none"></div>

        {/* Floating Decorative Icons */}
        <div className="absolute top-40 left-[10%] animate-float hidden lg:block opacity-20">
          <HeartIcon className="w-12 h-12 text-blue-600 rotate-12" />
        </div>
        <div className="absolute bottom-40 right-[15%] animate-float-delayed hidden lg:block opacity-20">
          <UsersIcon className="w-16 h-16 text-indigo-600 -rotate-12" />
        </div>
        <div className="absolute top-60 right-[10%] animate-pulse hidden lg:block opacity-20">
          <GlobeIcon className="w-10 h-10 text-emerald-600" />
        </div>

        {/* Community Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-blue-100 shadow-xl shadow-blue-100/50 mb-10 animate-in slide-in-from-top-6 duration-1000 group cursor-default">
          <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-ping"></span>
          <span className="text-xs font-black text-blue-900 uppercase tracking-[0.3em]">Welcome to our Community</span>
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-neutral-950 mb-10 drop-shadow-2xl leading-[0.82] animate-in slide-in-from-bottom-16 duration-1000 ease-out">
          {(cms?.hero_title || "Welcome Home").split(' ').slice(0, 2).join(' ')} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-indigo-600 to-blue-500 py-2 inline-block">{(cms?.hero_title || "Welcome Home").split(' ').slice(2).join(' ')}</span>
        </h1>
        
        <p className="max-w-4xl text-xl md:text-3xl text-neutral-600 font-medium mb-16 leading-relaxed opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          {cms?.hero_subtitle || "Experience faith, fellowship, and love in our weekly gatherings."}
        </p>

        <div className="flex gap-8 flex-wrap justify-center animate-in fade-in duration-1000 delay-800">
          <Link href="#schedule">
            <Button size="lg" className="rounded-[2rem] h-20 px-12 text-2xl bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-200 font-black transform transition-all hover:scale-110 active:scale-95 group">
              Join Us This Sunday
              <div className="absolute inset-0 bg-white/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>
          </Link>
          <Link href="#news">
            <Button size="lg" variant="outline" className="rounded-[2rem] h-20 px-12 text-2xl bg-white/90 backdrop-blur-md border-2 border-blue-100 text-blue-900 hover:bg-blue-50 font-black transform transition-all hover:scale-110 active:scale-95 shadow-xl shadow-neutral-100">
              Latest Updates
            </Button>
          </Link>
        </div>
      </section>

      {/* Service Schedule */}
      <section id="schedule" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-neutral-900 mb-4 tracking-tighter">Join Us for Worship</h2>
            <p className="text-lg text-neutral-500 font-medium">Experience faith, fellowship, and love in our weekly gatherings.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sunday Service", time: "9:00 AM & 11:00 AM", delay: "0", icon: ClockIcon, color: "text-blue-600", bg: "bg-blue-100" },
              { title: "Midweek Prayer", time: "Wednesdays at 7:00 PM", delay: "100", icon: HeartIcon, color: "text-emerald-600", bg: "bg-emerald-100" },
              { title: "Youth Group", time: "Fridays at 6:30 PM", delay: "200", icon: UsersIcon, color: "text-indigo-600", bg: "bg-indigo-100" }
            ].map((schedule, i) => (
              <Card key={i} className="border-0 shadow-xl shadow-neutral-100/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[2rem]">
                <CardContent className="p-10 flex flex-col items-center text-center">
                  <div className={`p-6 rounded-3xl ${schedule.bg} mb-6`}>
                    <schedule.icon className={`w-10 h-10 ${schedule.color}`} />
                  </div>
                  <h3 className="font-black text-2xl text-neutral-900 mb-2">{schedule.title}</h3>
                  <p className="text-neutral-500 font-bold">{schedule.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About & Mission */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[4rem] p-12 lg:p-24 text-white relative shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-5 rounded-bl-[150px]"></div>
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <HeartIcon className="w-16 h-16 text-blue-300 mb-8" />
                <h2 className="text-5xl font-black mb-8 tracking-tighter leading-tight">{cms?.mission_title}</h2>
                <p className="text-xl text-blue-100 font-medium leading-relaxed mb-10 opacity-90">
                  {cms?.mission_content}
                </p>
                <div className="space-y-5">
                  <div className="flex items-center gap-4 text-blue-200 font-bold">
                    <div className="p-2 bg-blue-800 rounded-lg"><BookOpenIcon className="w-5 h-5 text-blue-400" /></div>
                    <span>Biblical Teaching & Discipleship</span>
                  </div>
                  <div className="flex items-center gap-4 text-blue-200 font-bold">
                    <div className="p-2 bg-blue-800 rounded-lg"><UsersIcon className="w-5 h-5 text-blue-400" /></div>
                    <span>Authentic Community Connection</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-black mb-6 tracking-tight">Meet Pastor {cms?.pastor_name}</h3>
                <p className="text-blue-100 mb-8 leading-relaxed italic text-lg font-medium opacity-90">
                  &quot;{cms?.pastor_message}&quot;
                </p>
                <p className="font-black text-white text-lg tracking-widest uppercase">— Lead Pastor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Announcements */}
      <section id="news" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20">

            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-end mb-10">
                <h2 className="text-4xl font-black tracking-tighter text-neutral-900">Upcoming Events</h2>
              </div>
              <div className="space-y-8">
                {events && events.length > 0 ? events.map((ev) => (
                  <Card key={ev.id} className="border-0 shadow-xl shadow-neutral-200/40 rounded-[2.5rem] overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-0 flex">
                      <div className="bg-gradient-to-b from-indigo-600 to-blue-600 w-28 flex-shrink-0 flex flex-col items-center justify-center p-6 text-white group-hover:from-indigo-700 group-hover:to-blue-700 transition-colors">
                        <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-4xl font-black mt-1">{new Date(ev.date).getDate()}</span>
                      </div>
                      <div className="p-8 flex-1">
                        <h4 className="font-black text-xl text-neutral-900 mb-3 tracking-tight">{ev.title}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-neutral-500 font-bold text-sm">
                            <ClockIcon className="w-4 h-4 text-indigo-500" />
                            <span>{new Date(ev.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-500 font-bold text-sm">
                            <MapPinIcon className="w-4 h-4 text-indigo-500" />
                            <span>{ev.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <p className="text-neutral-400 font-medium italic">No upcoming events right now.</p>
                )}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <div className="flex justify-between items-end mb-10">
                <h2 className="text-4xl font-black tracking-tighter text-neutral-900">Announcements</h2>
              </div>
              <div className="space-y-8">
                {announcements && announcements.length > 0 ? announcements.map((ann) => (
                  <Card key={ann.id} className="border-0 shadow-lg shadow-blue-100/50 bg-white rounded-[2.5rem] p-2">
                    <CardContent className="p-8">
                      <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                        {ann.category}
                      </div>
                      <h4 className="font-black text-xl text-neutral-900 mb-3 tracking-tight">{ann.title}</h4>
                      <p className="text-neutral-600 font-medium leading-relaxed line-clamp-3">{ann.content}</p>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="border-0 shadow-lg bg-blue-600 text-white rounded-[2.5rem]">
                    <CardContent className="p-10 text-center">
                      <h4 className="font-black text-2xl mb-3 tracking-tight">Stay Connected!</h4>
                      <p className="opacity-90 font-medium">Visit us this Sunday or follow our portal to stay informed with our community updates.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      {cms?.is_prayer_enabled && (
        <section id="prayer" className="py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-black mb-8 text-neutral-900 tracking-tighter leading-tight">How can we pray for you?</h2>
            <p className="text-xl text-neutral-500 mb-12 font-medium max-w-xl mx-auto">Our prayer team considers it a privilege to bring your requests before God.</p>
            <form className="max-w-xl mx-auto space-y-8 text-left bg-neutral-50 p-10 rounded-[3rem] shadow-xl shadow-neutral-100 border border-neutral-100" action="/api/prayer" method="POST">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-black uppercase tracking-widest text-neutral-400">Name (Optional)</label>
                <input id="name" name="name" type="text" className="w-full px-6 py-4 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all bg-white font-bold" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-black uppercase tracking-widest text-neutral-400">Your Prayer Request</label>
                <textarea id="message" name="message" rows={4} className="w-full px-6 py-4 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all bg-white font-bold" placeholder="How can we stand in faith with you?" required></textarea>
              </div>
              <Button type="submit" className="w-full rounded-2xl h-16 text-xl font-black bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-200 transform transition-all active:scale-95 uppercase tracking-widest">Submit Request</Button>
            </form>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-20 px-8 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <div className="space-y-8">
            <h4 className="text-white font-black text-3xl tracking-tighter leading-none">{cms?.church_name || "Mahayahay FM"}</h4>
            <div className="space-y-4 font-bold">
              <p className="flex items-center gap-3"><MapPinIcon className="w-5 h-5 text-blue-500" /> {cms?.contact_address || "123 Church Street, City"}</p>
              <p className="flex items-center gap-3"><HeartIcon className="w-5 h-5 text-blue-500" /> {cms?.contact_email || "contact@mahayahay.com"}</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest opacity-50">Navigation</h4>
            <ul className="space-y-4 font-bold text-lg">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home Timeline</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Admin Portal</Link></li>
              {cms?.is_prayer_enabled && <li><Link href="#prayer" className="hover:text-blue-400 transition-colors">Submit Prayer</Link></li>}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest opacity-50">Community</h4>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-14 h-14 rounded-2xl bg-neutral-800 hover:bg-blue-600 border border-neutral-700 flex items-center justify-center cursor-pointer transition-all hover:-translate-y-2 shadow-2xl group">
                   <GlobeIcon className="w-6 h-6 text-neutral-500 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-neutral-800 text-center text-xs font-black tracking-[0.4em] uppercase opacity-30">
          © {new Date().getFullYear()} {cms?.church_name} • Faith & Community
        </div>
      </footer>
        </>
      )}
    </main>
  );
}
