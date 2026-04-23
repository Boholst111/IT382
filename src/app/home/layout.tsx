import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: cms } = await supabase.from('cms').select('*').eq('id', 'main').maybeSingle();

  // Maintenance Mode (Portal Access)
  if (cms?.is_maintenance_mode) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-black text-xl text-blue-900 tracking-tighter">
            {cms?.church_name?.split(' ')[0] || "Mahayahay"} <span className="text-blue-600 font-medium text-xs">PORTAL</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/home" className="text-sm font-bold text-neutral-500 hover:text-blue-600 transition-colors">Overview</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-neutral-400 hidden md:block uppercase tracking-widest">{user?.email?.split('@')[0]}</span>
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="outline" className="h-9 px-6 rounded-full border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-bold">Sign Out</Button>
          </form>
        </div>
      </header>
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="py-12 text-center text-xs font-black text-neutral-300 uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} {cms?.church_name || "Mahayahay FM"}
      </footer>
    </div>
  );
}
