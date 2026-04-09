import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const formData = await request.formData();
  
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!message) {
    return NextResponse.redirect(new URL("/?message=Message is required", request.url));
  }

  const { error } = await supabase.from("prayer_requests").insert([
    { name, message }
  ]);

  if (error) {
    console.error("Error inserting prayer request:", error);
    return NextResponse.redirect(new URL("/?message=Something went wrong. Please try again.", request.url));
  }

  return NextResponse.redirect(new URL("/?message=Your prayer request has been submitted. God bless!", request.url));
}
