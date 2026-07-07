import { supabaseAdmin } from "@/lib/supabase";
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getDownloadCount() {
  const { data, error } = await supabaseAdmin
    .from("app_metrics")
    .select("downloads")
    .eq("id", "cerca-apk")
    .single();

  if (error) {
    console.error("Download count read error:", error);
    return 0;
  }

  return data?.downloads ?? 0;
}

export default async function HomePage() {
  const downloads = await getDownloadCount();

  const apkVersion = process.env.APK_VERSION || "0.4.2";
  const releaseDate = process.env.APK_RELEASE_DATE || "Julio 2026";
  const apkSha256 = process.env.APK_SHA256 || "Pendiente de publicar";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 sm:py-10">
        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-cyan-400/10 p-6 shadow-2xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
                Mensajería offline entre teléfonos cercanos
              </p>

              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
                CERCA Messenger
              </h1>

              <p className="mt-4 text-lg leading-8 text-slate-300">
                Aplicación Android experimental para enviar mensajes entre
                dispositivos cercanos incluso cuando no hay internet, datos
                móviles o infraestructura de red disponible.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/api/download"
                  className="rounded-2xl bg-cyan-400 px-5 py-4 text-center font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  Descargar APK v{apkVersion}
                  </a>

                <a
                  href="#empezar"
                  className="rounded-2xl border border-white/15 px-5 py-4 text-center font-bold text-white transition hover:bg-white/10"
                >
                  Cómo empezar
                </a>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Esta app es experimental. No sustituye llamadas de emergencia,
                servicios oficiales ni canales institucionales.
              </p>
            </div>

            <DownloadCounter downloads={downloads} />
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <InfoCard
            icon="📡"
            title="Sin internet"
            text="Usa comunicación cercana entre teléfonos Android compatibles."
          />
          <InfoCard
            icon="🔐"
            title="Contactos por QR"
            text="Los contactos se agregan escaneando códigos QR con información pública."
          />
          <InfoCard
            icon="🔁"
            title="Reenvío por hops"
            text="Los mensajes pueden viajar de teléfono en teléfono hasta llegar al destino."
          />
        </section>

        <ContentSection title="¿De qué trata el proyecto?">
          <p>
            CERCA Messenger es un prototipo académico de mensajería offline para
            dispositivos Android. Su objetivo es explorar cómo varios teléfonos
            pueden formar una red oportunista y ayudarse entre sí a transportar
            mensajes cuando la conectividad tradicional no está disponible.
          </p>

          <p>
            Cada teléfono funciona como un nodo: puede crear mensajes, recibirlos,
            almacenarlos temporalmente y reenviarlos a otros dispositivos cercanos.
            La idea es útil para estudiar escenarios como emergencias, zonas con
            baja cobertura, eventos masivos, comunidades aisladas o fallas de
            infraestructura.
          </p>

          <p>
            La aplicación está basada en el <strong>Context and Energy-aware Routing for Crisis Ad hoc messaging Protocol</strong> o <strong>Protocolo CERCA</strong>, un protocolo de enrutamiento oportunista diseñado por estudiantes de la UNIMET para redes ad hoc en situaciones de crisis. CERCA permite que los mensajes se transmitan de manera eficiente y confiable a través de múltiples saltos (hops) entre nodos, optimizando el uso de energía y el contexto de la red.
          </p>
        </ContentSection>

        <ContentSection id="empezar" title="Cómo empezar a enviar mensajes">
          <div className="grid gap-4 md:grid-cols-2">
            <StepCard
              number="1"
              title="Instala la app"
              text="Descarga el APK desde esta página, instálalo en tu Android y concede los permisos solicitados."
            />
            <StepCard
              number="2"
              title="Agrega contactos por QR"
              text="Cada usuario debe mostrar su QR desde la app. La otra persona lo escanea para agregarlo como contacto. IMPORTANTE: ambos teléfonos deben escanear el QR del otro para que puedan enviarse mensajes."
            />
            <StepCard
              number="3"
              title="Guarda el contacto"
              text="Después de escanear el QR, agrega un nombre o identificador que corresponda a la persona correcta."
            />
            <StepCard
              number="4"
              title="Escribe y envía"
              text="Selecciona el contacto, escribe el mensaje y toca enviar. La app intentará entregarlo directamente o reenviarlo cuando encuentre otros nodos."
            />
          </div>

          <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <h3 className="font-bold text-cyan-100">
              Importante sobre los QR
            </h3>
            <p className="mt-2 text-slate-300">
              <strong> Ambos contactos deben escanear el QR del otro para que puedan enviarse mensajes. </strong>
              El QR es la forma recomendada de agregar contactos porque permite
              intercambiar la información pública necesaria para identificar al
              destinatario y preparar el envío seguro de mensajes. No compartas
              capturas de QR en lugares públicos si no quieres que desconocidos
              intenten agregarte.
            </p>
          </div>

          <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <h3 className="font-bold text-cyan-100">
              Sección de Crisis
            </h3>
            <p className="mt-2 text-slate-300">
              La app incluye una sección de crisis que permite enviar mensajes a cualquier nodo, sin necesidad de agregar por QR. Estos mensajes actúan como broadcast y se envían a todos los nodos cercanos. Úsala solo en situaciones de emergencia o cuando sea necesario difundir información crítica.
            </p>
          </div>

          <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5">
            <h3 className="font-bold text-cyan-100">
              Configuración de la app
            </h3>
            <p className="mt-2 text-slate-300">
              La app permite configurar el tiempo de espera para descubrimiento de nodos. El valor predeterminado es de <strong>5 segundos,</strong> pero puedes ajustarlo según tus necesidades. Un tiempo más corto puede aumentar la probabilidad de encontrar otros dispositivos, mientras que un tiempo más largo puede ahorrar batería.
            </p>
          </div>
        </ContentSection>

        <ContentSection title="Cómo funciona por debajo">
          <p>
            La app usa Nearby Connections API de Google, una API peer-to-peer que
            permite descubrir, conectar e intercambiar datos con dispositivos
            cercanos sin depender de internet. Nearby abstrae detalles de
            tecnologías como Bluetooth y Wi-Fi para que la aplicación pueda
            concentrarse en descubrir dispositivos y transferir información.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <MiniFlow title="1. Descubrimiento" text="Los teléfonos anuncian su presencia y buscan otros dispositivos cercanos." />
            <MiniFlow title="2. Conexión" text="Cuando dos nodos se detectan, intentan establecer una conexión local." />
            <MiniFlow title="3. Intercambio" text="Los nodos comparan mensajes pendientes y transfieren los que correspondan." />
          </div>

          <p className="mt-5">
            Si el destinatario está cerca, el mensaje puede entregarse
            directamente. Si no lo está, el mensaje puede quedar guardado y pasar
            por otros dispositivos. A cada salto entre teléfonos se le llama{" "}
            <strong>hop</strong>. Por ejemplo, si A entrega a B, y luego B
            entrega a C, el mensaje llegó a C en dos hops.
          </p>

          <p>
            Mientras menor sea la cantidad de hops, más directa fue la entrega.
            Sin embargo, permitir varios hops puede aumentar la probabilidad de
            entrega cuando los usuarios se mueven y se encuentran en momentos
            distintos.
          </p>
        </ContentSection>

        <ContentSection title="Seguridad y privacidad">
          <div className="space-y-5">
            <SecurityItem
              title="Agregado de contactos"
              text="Los contactos se agregan mediante QR. Esto reduce errores al escribir identificadores y ayuda a asociar cada contacto con su información pública."
            />

            <SecurityItem
              title="Identidad del destinatario"
              text="Antes de enviar mensajes sensibles, verifica presencialmente que el QR corresponde a la persona correcta. Escanear un QR equivocado puede hacer que agregues a otra persona."
            />

            <SecurityItem
              title="Cifrado"
              text="El diseño de la app contempla el uso de claves para proteger el contenido de los mensajes. En términos simples, el mensaje se prepara para que solo el destinatario previsto pueda leerlo."
            />

            <SecurityItem
              title="Mensajes reenviados"
              text="Como los mensajes pueden pasar por otros teléfonos, los nodos intermedios pueden ayudar a transportar el paquete, pero no deberían poder leer el contenido si el cifrado está activo correctamente."
            />

            <SecurityItem
              title="Metadatos"
              text="Aunque el contenido esté protegido, pueden existir metadatos técnicos como fecha, identificadores, tamaño del mensaje, estado de entrega o número de hops."
            />

            <SecurityItem
              title="Instalación del APK"
              text="Android puede mostrar advertencias porque el APK no se instala desde Google Play. Instálalo solo desde esta página oficial del proyecto y verifica la versión publicada."
            />

            <SecurityItem
              title="Limitación importante"
              text="Esta es una versión experimental. No debe considerarse una herramienta certificada para comunicaciones críticas, médicas, policiales, militares o de emergencia."
            />
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900 p-5">
            <h3 className="font-bold text-white">Verificación del APK</h3>
            <p className="mt-2 break-words text-sm text-slate-300">
              Versión: <strong>v{apkVersion}</strong>
              <br />
              Fecha: <strong>{releaseDate}</strong>
              <br />
              SHA-256: <code className="text-cyan-200">{apkSha256}</code>
            </p>
          </div>
        </ContentSection>

        <ContentSection title="Instrucciones de uso">
          <ol className="list-inside list-decimal space-y-3 text-slate-300">
            <li>Descarga el APK desde esta página.</li>
            <li>Instala la aplicación en tu teléfono Android.</li>
            <li>Abre la app y concede los permisos requeridos.</li>
            <li>Abre la sección de contactos.</li>
            <li>Muestra tu QR o escanea el QR de otra persona.</li>
            <li>Selecciona el contacto agregado.</li>
            <li>Escribe un mensaje y presiona enviar.</li>
            <li>
              Mantén la app abierta durante las pruebas para mejorar la detección
              de dispositivos cercanos.
            </li>
            <li>
              Revisa el estado del mensaje, incluyendo si fue enviado,
              pendiente, recibido o reenviado mediante hops.
            </li>
          </ol>
        </ContentSection>

        <ContentSection title="Permisos requeridos">
          <p>
            Según la versión de Android, la app puede solicitar permisos de
            Bluetooth, Wi-Fi, ubicación cercana, notificaciones o ejecución en
            segundo plano. Estos permisos se usan para descubrir dispositivos
            próximos, establecer conexiones locales, enviar mensajes y avisar
            sobre eventos importantes dentro de la app.
          </p>
        </ContentSection>

        <ContentSection title="Limitaciones conocidas">
          <ul className="list-inside list-disc space-y-2 text-slate-300">
            <li>La entrega de mensajes no está garantizada.</li>
            <li>La app depende de que existan otros dispositivos cercanos.</li>
            <li>
              El alcance varía según el teléfono, el entorno, obstáculos,
              interferencias y batería.
            </li>
            <li>
              Algunos fabricantes limitan procesos en segundo plano, lo que puede
              afectar el descubrimiento y el envío.
            </li>
            <li>
              Si no hay encuentros entre nodos, los mensajes pueden permanecer
              pendientes.
            </li>
            <li>
              Más hops pueden ayudar a entregar mensajes, pero también pueden
              aumentar latencia, consumo y complejidad.
            </li>
            <li>
              No debe usarse como único medio de comunicación en emergencias
              reales.
            </li>
          </ul>
        </ContentSection>

        <ContentSection title="Aviso legal y privacidad">
          <p>
            CERCA Messenger es una aplicación experimental desarrollada con fines
            académicos y de investigación. Se entrega “tal como está”, sin
            garantía de disponibilidad, funcionamiento continuo, entrega de
            mensajes, seguridad absoluta o adecuación para situaciones críticas.
          </p>

          <p>
            Esta aplicación no sustituye servicios de emergencia, organismos de
            protección civil, redes oficiales ni canales institucionales de
            comunicación. En caso de emergencia, utiliza siempre los canales
            oficiales disponibles.
          </p>

          <p>
            Esta página registra el número de descargas y las sugerencias
            enviadas voluntariamente mediante el formulario. No se requiere
            registro. No incluyas información sensible, contraseñas, datos
            bancarios ni información privada de terceros en el formulario.
          </p>

          <p>
            Al descargar e instalar el APK, aceptas que se trata de una versión
            de prueba. Instala la app solo si confías en el origen del archivo y
            comprendes los riesgos de instalar aplicaciones fuera de Google Play.
          </p>
        </ContentSection>

        <ContentSection title="Créditos">
          <p>
            Proyecto desarrollado por estudiante de la Universidad Metropolitana (UNIMET) en Caracas, Venezuela,
            como parte de su trabajo de investigación en Ingeniería de Sistemas. Para más información, contáctenos a través del formulario de sugerencias al final de la página.
          </p>

          <p>
            Agradecimientos a tutores, profesores, colaboradores y personas que
            participaron en pruebas, revisión técnica e ideas para mejorar la
            aplicación.
          </p>

          <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
            Nota de transparencia: esta landing page fue elaborada con apoyo de
            inteligencia artificial y revisada/adaptada para el proyecto CERCA
            Messenger.
          </p>
        </ContentSection>

        <ContentSection title="Historial de cambios">
          <div className="space-y-4">
            <VersionItem
              version="v0.4.2"
              date="Julio 2026"
              items={[
                "Corrección de bugs en sincronización con la nube",
              ]}
            />

            <VersionItem
              version="v0.4.1"
              date="Julio 2026"
              items={[
                "Corrección de bugs en sincronización con la nube",
                "Corrección de bugs en distribución de ACKs",
                "Corrección de bugs en número de copias",
                "Corrección de bugs en descubrimiento de nodos y reenvío"
              ]}
            />

            <VersionItem
              version="v0.4.0"
              date="Julio 2026"
              items={[
                "Sincronización con la nube",
                "Mensajes tipo broadcast para situaciones de emergencia",
                "Traducción a varios idiomas",
                "Mejoras en la interfaz de usuario y experiencia de usuario",
              ]}
            />


            <VersionItem
              version="v0.3.0"
              date="Junio 2026"
              items={[
                "Agregado de contactos mediante códigos QR.",
                "Mejoras en descubrimiento y conexión con dispositivos cercanos.",
                "Visualización de estados de mensajes y hops.",
                "Ajustes de seguridad para identificación de contactos.",
                "Preparación para distribución pública del APK.",
              ]}
            />

            <VersionItem
              version="v0.2.0"
              date="Junio 2026"
              items={[
                "Almacenamiento local de mensajes.",
                "Pruebas iniciales de mensajería offline.",
                "Ajustes en permisos y conexión entre dispositivos.",
              ]}
            />

            <VersionItem
              version="v0.1.0"
              date="Versión inicial"
              items={[
                "Primer prototipo funcional.",
                "Envío básico de mensajes entre dispositivos cercanos.",
              ]}
            />
          </div>
        </ContentSection>

        <ContentSection title="Comentarios y sugerencias">
          <p>
            Puedes reportar errores, resultados de pruebas, problemas de
            instalación o ideas de mejora. Las sugerencias se guardan para
            revisión y no se publican automáticamente.
          </p>

          <FeedbackForm />
        </ContentSection>

        <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-500">
          CERCA Messenger · Proyecto académico experimental · APK Android ·
          Landing page elaborada con apoyo de inteligencia artificial
        </footer>
      </section>
    </main>
  );
}

function DownloadCounter({ downloads }: { downloads: number }) {
  return (
    <aside className="rounded-[2rem] border border-cyan-300/20 bg-slate-950/70 p-6 text-center shadow-xl lg:min-w-72">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">
        Descargas
      </p>

      <div className="mt-4 rounded-3xl bg-white px-6 py-6 text-slate-950">
        <p className="text-5xl font-black tabular-nums sm:text-6xl">
          {downloads.toLocaleString("es-VE")}
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          clics registrados en el APK
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-400">
        Este contador registra clics de descarga. No equivale necesariamente a
        instalaciones completadas.
      </p>
    </aside>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-3xl">{icon}</p>
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
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
      className="rounded-[2rem] border border-white/10 bg-white/5 p-6 leading-7 text-slate-300 shadow-xl"
    >
      <h2 className="mb-4 text-2xl font-black text-white">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 font-black text-slate-950">
          {number}
        </span>

        <div>
          <h3 className="font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
        </div>
      </div>
    </article>
  );
}

function MiniFlow({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
      <h3 className="font-bold text-cyan-100">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </article>
  );
}

function SecurityItem({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
      <h3 className="font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </article>
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
    <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
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