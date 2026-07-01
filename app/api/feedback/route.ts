import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const website = typeof body.website === "string" ? body.website.trim() : "";

    // Honeypot anti-spam: este campo no lo debe llenar una persona real.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { error: "El mensaje es demasiado corto." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "El mensaje es demasiado largo." },
        { status: 400 }
      );
    }

    if (name.length > 80) {
      return NextResponse.json(
        { error: "El nombre es demasiado largo." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("feedback").insert({
      name: name || null,
      message,
      approved: false,
    });

    if (error) {
      console.error("Feedback insert error:", error);

      return NextResponse.json(
        { error: "No se pudo guardar la sugerencia." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Feedback request error:", error);

    return NextResponse.json(
      { error: "Solicitud inválida." },
      { status: 400 }
    );
  }
}