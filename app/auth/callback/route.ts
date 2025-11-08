import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const supabase = createClient();
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return new Response(JSON.stringify({ error: "Missing code parameter" }), {
      status: 400,
    });
  }
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
  console.log("Callback data:", data);
  return NextResponse.redirect(requestUrl.origin);
}
