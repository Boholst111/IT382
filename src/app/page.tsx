import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon, ClockIcon, HeartIcon, UsersIcon, BookOpenIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function LandingPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  // Fetch upcoming events
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .limit(3)
    .order("date", { ascending: true });

  const { data: announcements } = await supabase
    .from("announcements")
    .select("*")
    .or(`expiration_date.is.null,expiration_date.gt.${new Date().toISOString()}`)
    .limit(2)
    .order("created_at", { ascending: false });

  const { data: cms } = await supabase.from('cms').select('*').eq('id', 'main').single();

  return (
    <main className="min-h-screen bg-neutral-50 overflow-hidden">
      {searchParams?.message && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl font-medium animate-in slide-in-from-top-4 fade-in duration-300">
          {searchParams.message}
        </div>
      )}
      {/* Dynamic Nav Bar */}
      <nav className="absolute top-0 w-full flex items-center justify-between px-8 py-6 z-50">
        <div className="font-bold text-2xl tracking-tighter text-blue-900 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 shadow-sm">
          Mahayahay <span className="text-blue-600 font-light">FM</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="bg-white/70 backdrop-blur-md border border-white/50 text-blue-900 hover:bg-white hover:text-blue-700 rounded-full font-semibold transition-all">Sign In</Button>
          </Link>
          <Link href="#prayer">
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">Prayer Request</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-br from-blue-100 via-indigo-50 to-emerald-50 rounded-b-[100px] -z-10 blur-3xl opacity-60"></div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 mb-6 drop-shadow-sm">
          {cms?.hero_title?.split(' ')[0]} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{cms?.hero_title?.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="max-w-2xl text-xl md:text-2xl text-neutral-600 font-light mb-10 leading-relaxed">
          {cms?.hero_subtitle}
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="#schedule">
            <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200">
              Visit Us This Sunday
            </Button>
          </Link>
          <Link href="#news">
            <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg bg-white/50 backdrop-blur-sm border-blue-200 text-blue-800 hover:bg-indigo-50">
              Latest News &amp; Events
            </Button>
          </Link>
        </div>
      </section>

      {/* Service Schedule */}
      <section id="schedule" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">Join Us for Worship</h2>
            <p className="text-lg text-neutral-600">Experience faith, fellowship, and love in our weekly gatherings.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sunday Service", time: "9:00 AM & 11:00 AM", delay: "0", icon: ClockIcon, color: "text-blue-600", bg: "bg-blue-100" },
              { title: "Midweek Prayer", time: "Wednesdays at 7:00 PM", delay: "100", icon: HeartIcon, color: "text-emerald-600", bg: "bg-emerald-100" },
              { title: "Youth Group", time: "Fridays at 6:30 PM", delay: "200", icon: UsersIcon, color: "text-indigo-600", bg: "bg-indigo-100" }
            ].map((schedule, i) => (
              <Card key={i} className="border-0 shadow-lg shadow-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${schedule.bg}`}>
                    <schedule.icon className={`w-8 h-8 ${schedule.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-neutral-900">{schedule.title}</h3>
                    <p className="text-neutral-500 mt-1">{schedule.time}</p>
                  </div>
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
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[3rem] p-10 lg:p-20 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-bl-[100px]"></div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <HeartIcon className="w-12 h-12 text-blue-300 mb-6" />
                <h2 className="text-4xl font-bold mb-6">{cms?.mission_title}</h2>
                <p className="text-xl text-blue-100 font-light leading-relaxed mb-8">
                  {cms?.mission_content}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-blue-200">
                    <BookOpenIcon className="w-6 h-6 text-indigo-400" />
                    <span>Biblical Teaching & Discipleship</span>
                  </div>
                  <div className="flex items-center gap-4 text-blue-200">
                    <UsersIcon className="w-6 h-6 text-indigo-400" />
                    <span>Authentic Community Connection</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
                <h3 className="text-2xl font-bold mb-4">Meet Pastor {cms?.pastor_name}</h3>
                <p className="text-blue-200 mb-6 leading-relaxed">
                  &quot;{cms?.pastor_message}&quot;
                </p>
                <p className="font-medium text-white">â€” Lead Pastor, {cms?.pastor_name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events & Announcements */}
      <section id="news" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Upcoming Events */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Upcoming Events</h2>
                <Link href="/events" className="text-blue-600 font-medium hover:underline">View All</Link>
              </div>
              <div className="space-y-6">
                {events && events.length > 0 ? events.map((ev) => (
                  <Card key={ev.id} className="border-0 shadow-md">
                    <CardContent className="p-0 flex">
                      <div className="bg-indigo-50 w-24 flex-shrink-0 flex flex-col items-center justify-center p-4 border-r border-indigo-100 rounded-l-xl">
                        <span className="text-indigo-600 text-sm font-bold uppercase">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-3xl font-extrabold text-indigo-900">{new Date(ev.date).getDate()}</span>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-lg text-neutral-900 mb-2">{ev.title}</h4>
                        <div className="flex items-center gap-2 text-neutral-500 text-sm mb-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{new Date(ev.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-500 text-sm">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{ev.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <p className="text-neutral-500">No upcoming events right now.</p>
                )}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Announcements</h2>
              </div>
              <div className="space-y-6">
                {announcements && announcements.length > 0 ? announcements.map((ann) => (
                  <Card key={ann.id} className="border border-blue-100 shadow-sm bg-blue-50/50">
                    <CardContent className="p-6">
                      <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                        {ann.category}
                      </div>
                      <h4 className="font-bold text-lg text-neutral-900 mb-2">{ann.title}</h4>
                      <p className="text-neutral-600 line-clamp-2">{ann.content}</p>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="border border-blue-100 shadow-sm bg-blue-50/50">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-lg text-neutral-900 mb-2">Welcome!</h4>
                      <p className="text-neutral-600">Join our mailing list or visit us this Sunday to stay informed with our community.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      <section id="prayer" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-neutral-900">How can we pray for you?</h2>
          <p className="text-xl text-neutral-500 mb-10">Our prayer team considers it a privilege to bring your requests before God.</p>
          <form className="max-w-xl mx-auto space-y-6 text-left" action="/api/prayer" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-neutral-700">Name (Optional)</label>
              <input id="name" name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all bg-neutral-50" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-neutral-700">Your Request</label>
              <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all bg-neutral-50" placeholder="Please pray for..." required></textarea>
            </div>
            <Button type="submit" className="w-full rounded-xl h-14 text-lg bg-blue-600 hover:bg-blue-700">Submit Request</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Mahayahay FM</h4>
            <p>123 Church Street<br />City, ST 12345</p>
            <p className="mt-4">contact@mahayahay.com</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Login / Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-blue-600 cursor-pointer transition-colors"></div>
              <div className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-blue-400 cursor-pointer transition-colors"></div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
