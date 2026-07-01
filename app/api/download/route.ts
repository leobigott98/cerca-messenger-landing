import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const apkUrl = process.env.APK_DOWNLOAD_URL;

  if (!apkUrl) {
    return NextResponse.json(
      { error: "APK_DOWNLOAD_URL no está configurado." },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("app_metrics")
    .select("downloads")
    .eq("id", "cerca-apk")
    .single();

  if (!error && data) {
    await supabaseAdmin
      .from("app_metrics")
      .update({
        downloads: data.downloads + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", "cerca-apk");
  }

  return NextResponse.redirect(apkUrl);
}