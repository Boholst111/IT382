import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UsersIcon, CalendarIcon, DollarSignIcon, MegaphoneIcon, BookOpenIcon, LayoutDashboardIcon, LogOutIcon, HeartIcon } from "lucide-react";
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
    { name: "Finances", href: "/admin/finances", icon: DollarSignIcon },
    { name: "Announcements", href: "/admin/announcements", icon: MegaphoneIcon },
    { name: "Ministries", href: "/admin/ministries", icon: BookOpenIcon },
    { name: "User Management", href: "/admin/users", icon: UsersIcon },
    { name: "Landing Page CMS", href: "/admin/cms", icon: LayoutDashboardIcon },
    { name: "Prayer Requests", href: "/admin/requests", icon: HeartIcon },
  ];

  return (
    <div className="flex bg-neutral-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-neutral-100">
          <Link href="/" className="font-bold text-xl text-blue-900 tracking-tight">Mahayahay <span className="text-blue-600 font-light">Admin</span></Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-600 hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium"
            >
              <item.icon className="w-5 h-5 text-neutral-400" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-neutral-100">
            <form action="/auth/signout" method="post">
                <Button type="submit" variant="ghost" className="w-full justify-start text-neutral-600 hover:text-red-600 hover:bg-red-50 px-3">
                    <LogOutIcon className="w-5 h-5 mr-3" />
                    Sign Out
                </Button>
            </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-8 z-10 md:hidden">
             <Link href="/" className="font-bold text-lg text-blue-900">Mahayahay <span className="text-blue-600 font-light">Admin</span></Link>
             <form action="/auth/signout" method="post">
                 <button type="submit" className="text-neutral-500"><LogOutIcon className="w-5 h-5"/></button>
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
