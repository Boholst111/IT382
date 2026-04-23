import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UsersIcon, CalendarIcon, WalletIcon, MegaphoneIcon, LayoutDashboardIcon, LogOutIcon, HeartIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single();

  if (userData?.role !== "admin") {
    redirect("/home");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboardIcon },
    { name: "Members", href: "/admin/members", icon: UsersIcon },
    { name: "Events", href: "/admin/events", icon: CalendarIcon },
    { name: "Finances", href: "/admin/finances", icon: WalletIcon },
    { name: "Announcements", href: "/admin/announcements", icon: MegaphoneIcon },
    { name: "User Management", href: "/admin/users", icon: UsersIcon },
    { name: "Prayer Requests", href: "/admin/requests", icon: HeartIcon },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex bg-neutral-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-neutral-800 hidden md:flex flex-col text-white">
        <div className="p-6 border-b border-neutral-800">
          <Link href="/" className="font-bold text-xl tracking-tight">Mahayahay <span className="text-blue-500 font-light">Admin</span></Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-400 hover:bg-white/5 hover:text-white transition-all font-medium group"
            >
              <item.icon className="w-5 h-5 text-neutral-600 group-hover:text-blue-400 transition-colors" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-800">
            <form action="/auth/signout" method="post">
                <Button type="submit" variant="ghost" className="w-full justify-start text-neutral-400 hover:text-red-400 hover:bg-white/5 px-3">
                    <LogOutIcon className="w-5 h-5 mr-3" />
                    Sign Out
                </Button>
            </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between px-8 z-10 md:hidden text-white">
             <Link href="/" className="font-bold text-lg">Mahayahay <span className="text-blue-500 font-light">Admin</span></Link>
             <form action="/auth/signout" method="post">
                 <button type="submit" className="text-neutral-400"><LogOutIcon className="w-5 h-5"/></button>
             </form>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {children}
            </div>
        </div>
      </main>
    </div>
  );
}
