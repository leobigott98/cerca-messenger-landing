import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const apkUrl = process.env.APK_DOWNLOAD_URL;

  if (!apkUrl) {
    return NextResponse.json(
      { error: "APK_DOWNLOAD_URL no está configurado." },
      { status: 500 }
    );
  }

  const { error } = await supabaseAdmin.rpc("increment_download_count", {
    metric_id: "cerca-apk",
  });

  if (error) {
    console.error("Download counter error:", error);
  }

  const response = NextResponse.redirect(apkUrl, 302);

  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}