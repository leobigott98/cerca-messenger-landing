import { supabasePublic } from "@/lib/supabase";
import { FeedbackForm } from "./FeedbackForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cerca Messenger - Mensajería offline para emergencias y zonas sin internet",
  description: "CERCA Messenger es una aplicación Android experimental que permite el intercambio de mensajes entre teléfonos cercanos incluso cuando no hay conexión a internet, red móvil o infraestructura disponible.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};


async function getDownloadCount() {
  const { data } = await supabasePublic
    .from("app_metrics")
    .select("downloads")
    .eq("id", "cerca-apk")
    .single();

  return data?.downloads ?? 0;
}

export default async function HomePage() {
  const downloads = await getDownloadCount();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-4xl flex-col gap-10 px-5 py-8 sm:py-12">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <p className="mb-3 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
            Mensajería offline para emergencias y zonas sin internet
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            CERCA Messenger
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-300">
            CERCA Messenger es una aplicación Android experimental diseñada para
            permitir el intercambio de mensajes entre teléfonos cercanos incluso
            cuando no hay conexión a internet, red móvil o infraestructura
            disponible.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/api/download"
              className="rounded-2xl bg-cyan-400 px-5 py-4 text-center font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Descargar APK
            </a>

            <a
              href="#uso"
              className="rounded-2xl border border-white/15 px-5 py-4 text-center font-semibold text-white transition hover:bg-white/10"
            >
              Ver instrucciones
            </a>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            Descargas registradas:{" "}
            <span className="font-semibold text-white">{downloads}</span>
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <InfoCard
            title="Offline"
            text="Permite comunicación entre dispositivos cercanos sin depender de internet."
          />
          <InfoCard
            title="Android"
            text="Distribuida como APK para instalación directa en teléfonos compatibles."
          />
          <InfoCard
            title="Experimental"
            text="Proyecto académico en fase de pruebas, no sustituye canales oficiales."
          />
        </section>

        <ContentSection title="¿De qué trata el proyecto?">
          <p>
            CERCA Messenger nace como parte de un proyecto de investigación sobre
            mensajería móvil offline y redes tolerantes a retrasos. Su objetivo
            es explorar cómo los teléfonos Android pueden ayudarse entre sí para
            transportar mensajes en escenarios donde la conectividad tradicional
            falla, como emergencias, zonas congestionadas, comunidades aisladas o
            lugares con infraestructura limitada.
          </p>

          <p>
            La aplicación busca que un mensaje pueda pasar de un dispositivo a
            otro mediante encuentros cercanos. Cuando un teléfono con mensajes se
            encuentra con otro, puede compartir información y reenviar mensajes
            pendientes según las reglas del protocolo.
          </p>
        </ContentSection>

        <ContentSection title="¿Cómo funciona?">
          <p>
            La app utiliza comunicación cercana entre dispositivos Android para
            descubrir otros teléfonos próximos, establecer conexiones y transferir
            mensajes. Cada teléfono actúa como un nodo de la red: puede crear,
            recibir, almacenar y reenviar mensajes.
          </p>

          <p>
            Cuando un dispositivo tiene conexión a internet, también puede
            intentar sincronizar información con la nube, permitiendo respaldo o
            intercambio adicional cuando la conectividad esté disponible.
          </p>

          <ul className="list-inside list-disc space-y-2 text-slate-300">
            <li>Los teléfonos descubren otros dispositivos cercanos.</li>
            <li>Se conectan entre sí sin requerir una red Wi-Fi tradicional.</li>
            <li>Los mensajes pueden almacenarse localmente.</li>
            <li>Los mensajes pueden reenviarse entre nodos cercanos.</li>
            <li>Si hay internet, se puede intentar sincronizar con la nube.</li>
          </ul>
        </ContentSection>

        <ContentSection id="uso" title="Instrucciones de uso">
          <ol className="list-inside list-decimal space-y-3 text-slate-300">
            <li>Descarga el APK desde esta página.</li>
            <li>Instala la aplicación en tu teléfono Android.</li>
            <li>
              Si Android muestra una advertencia, habilita la instalación desde
              fuentes externas solo si confías en esta página.
            </li>
            <li>Abre la app y concede los permisos solicitados.</li>
            <li>Agrega o detecta otros dispositivos cercanos.</li>
            <li>Escribe un mensaje y envíalo.</li>
            <li>
              Mantén la app abierta o activa durante las pruebas para mejorar la
              detección y transferencia.
            </li>
          </ol>
        </ContentSection>

        <ContentSection title="Permisos requeridos">
          <p>
            La app puede solicitar permisos relacionados con Bluetooth, ubicación
            cercana, Wi-Fi o notificaciones, dependiendo de la versión de Android.
            Estos permisos son necesarios para descubrir dispositivos próximos,
            establecer conexiones y mantener la comunicación local.
          </p>
        </ContentSection>

        <ContentSection title="Limitaciones conocidas">
          <ul className="list-inside list-disc space-y-2 text-slate-300">
            <li>La app está en fase experimental y puede presentar errores.</li>
            <li>La entrega de mensajes no está garantizada.</li>
            <li>
              El alcance depende del dispositivo, el entorno físico, permisos,
              batería y condiciones de radio.
            </li>
            <li>
              Algunos fabricantes de Android limitan procesos en segundo plano.
            </li>
            <li>
              No debe usarse como único medio de comunicación en una emergencia
              real.
            </li>
            <li>
              La sincronización con la nube depende de tener conexión a internet.
            </li>
          </ul>
        </ContentSection>

        <ContentSection title="Aviso legal y privacidad">
          <p>
            CERCA Messenger es una aplicación experimental desarrollada con fines
            académicos y de investigación. Se ofrece “tal como está”, sin garantía
            de disponibilidad, funcionamiento continuo, entrega de mensajes o
            adecuación para situaciones críticas.
          </p>

          <p>
            La aplicación no sustituye servicios de emergencia, redes oficiales,
            sistemas de protección civil ni canales institucionales de
            comunicación. En caso de emergencia, utiliza siempre los canales
            oficiales disponibles.
          </p>

          <p>
            Al instalar el APK, aceptas que se trata de una versión de prueba. No
            instales la aplicación si no confías en el origen del archivo o si no
            comprendes los riesgos de instalar aplicaciones fuera de Google Play.
          </p>

          <p>
            Esta página registra únicamente el número de descargas y las
            sugerencias enviadas voluntariamente mediante el formulario. No se
            requiere crear cuenta.
          </p>
        </ContentSection>

        <ContentSection title="Créditos">
          <p>
            Proyecto desarrollado por estudiantes de Ingeniería de Sistemas de la Universidad Metropolitana, Caracas, Venezuela, como
            parte de su trabajo de investigación en Ingeniería de Sistemas. Para más información, utiliza el formulario de la sección de comentarios.
          </p>

          <p>
            Agradecimientos a los tutores, profesores, colaboradores y personas
            que participaron en pruebas de campo, revisión técnica e ideas para
            mejorar la aplicación.
          </p>
        </ContentSection>

        <ContentSection title="Historial de cambios">
          <div className="space-y-4">
            <VersionItem
              version="v0.3.0"
              date="Julio 2026"
              items={[
                "Mejoras en descubrimiento de nodos cercanos.",
                "Ajustes en conexiones múltiples entre dispositivos.",
                "Sincronización con la nube cuando hay internet.",
                "Preparación para pruebas de campo.",
              ]}
            />

            <VersionItem
              version="v0.2.0"
              date="Junio 2026"
              items={[
                "Mejoras en almacenamiento local de mensajes.",
                "Pruebas iniciales de mensajería offline.",
                "Ajustes en el flujo de permisos.",
              ]}
            />

            <VersionItem
              version="v0.1.0"
              date="Versión inicial"
              items={[
                "Primera versión funcional del prototipo.",
                "Envío básico de mensajes entre dispositivos cercanos.",
              ]}
            />
          </div>
        </ContentSection>

        <ContentSection title="Comentarios y sugerencias">
          <p>
            Puedes enviar errores encontrados, ideas de mejora o resultados de
            tus pruebas. No incluyas información sensible, contraseñas, datos
            bancarios ni información privada de terceros.
          </p>

          <FeedbackForm />

          <p className="mt-3 text-sm text-slate-400">
            Las sugerencias se guardan para revisión. No se publican
            automáticamente.
          </p>
        </ContentSection>

        <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
          CERCA Messenger · Proyecto académico experimental · Android APK
        </footer>
      </section>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </article>
  );
}

function ContentSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 leading-7 text-slate-300"
    >
      <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function VersionItem({
  version,
  date,
  items,
}: {
  version: string;
  date: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-bold text-white">{version}</h3>
        <p className="text-sm text-slate-400">{date}</p>
      </div>

      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}