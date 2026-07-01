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

    if (status === "sending") return;

    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const website = String(formData.get("website") || "");

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message, website }),
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
        maxLength={80}
        className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-300"
      />

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
        minLength={5}
        maxLength={1000}
        placeholder="Escribe tu comentario, error encontrado o sugerencia"
        className="min-h-32 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-300"
      />

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-2xl bg-white px-5 py-4 font-bold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar sugerencia"}
      </button>

      {status === "sent" && (
        <p className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-200">
          Gracias. Tu sugerencia fue enviada para revisión.
        </p>
      )}

      {status === "error" && (
        <p className="rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-200">
          No se pudo enviar la sugerencia. Intenta nuevamente.
        </p>
      )}
    </form>
  );
}