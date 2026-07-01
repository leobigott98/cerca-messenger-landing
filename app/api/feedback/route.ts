import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

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

    const { error } = await supabaseAdmin.from("feedback").insert({
      name: name || null,
      message,
      approved: false,
    });

    if (error) {
      return NextResponse.json(
        { error: "No se pudo guardar la sugerencia." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Solicitud inválida." },
      { status: 400 }
    );
  }
}