"use client";

import { useState } from "react";

export function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message }),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setName("");
    setMessage("");
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Tu nombre, opcional"
        className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-300"
      />

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
        minLength={5}
        maxLength={1000}
        placeholder="Escribe tu comentario o sugerencia"
        className="min-h-32 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-300"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-2xl bg-white px-5 py-4 font-bold text-slate-950 transition hover:bg-slate-200 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar sugerencia"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-cyan-300">
          Gracias. Tu sugerencia fue enviada.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-300">
          No se pudo enviar la sugerencia. Intenta nuevamente.
        </p>
      )}
    </form>
  );
}