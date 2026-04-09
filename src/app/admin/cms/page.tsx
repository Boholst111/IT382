import { createClient } from "@/lib/supabase/server";
import CMSPage from "./CMSPage";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from('cms').select('*').eq('id', 'main').single();

  return <CMSPage data={data} />;
}
