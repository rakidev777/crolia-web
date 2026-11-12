"use client";
import { useEffect, useState } from "react";

const BRAND = "#c51f32";
const BRAND_DARK = "#7a1120";
const BRAND_DARK2 = "#2a0a0e";
const INK = "#1c1917";
const MUTED = "#6b645e";
const LINE = "#e8e2da";
const BG = "#faf8f6";
const OK = "#15803d";
const WA_LINK = "https://wa.me/5491168556257?text=" + encodeURIComponent("Hola! Te paso el contenido de la jornada de fotos y videos");
const EMAIL = "ignaciofferrari@gmail.com";

type Foto = {
  id: string;
  titulo: string;
  por_que: string;
  tips: string[];
  img: string;
};

const FOTOS: Foto[] = [
  {
    id: "retrato",
    titulo: "Retrato de un bombero",
    por_que: "Para portadas de posts, placas con texto encima, y la apertura del video institucional.",
    tips: [
      "Plano medio, uniforme prolijo, fondo del cuartel.",
      "Mirada directa a cámara, expresión seria o levemente sonriente.",
      "Dejá espacio libre arriba o a un costado para superponer texto después.",
    ],
    img: "/bvgs-ref/ref-retrato.jpg",
  },
  {
    id: "mantenimiento",
    titulo: "Equipo trabajando (mantenimiento)",
    por_que: "Explica en qué se usa el aporte: se ve el trabajo real, no un discurso.",
    tips: [
      "Alguien revisando una herramienta, limpiando equipo, chequeando una unidad.",
      "De cerca, que se vean las manos y el detalle del objeto.",
      "Mejor pedir que sigan haciendo la tarea mientras sacás la foto, sin pose.",
    ],
    img: "/bvgs-ref/ref-mantenimiento.jpg",
  },
  {
    id: "unidad",
    titulo: "Unidad y equipamiento",
    por_que: "Transmite capacidad operativa real.",
    tips: [
      "El camión limpio, de frente o 3/4, con el logo visible.",
      "Un detalle de herramientas o equipos en buen estado.",
    ],
    img: "/bvgs-ref/ref-unidad.jpg",
  },
  {
    id: "cuartel",
    titulo: "El cuartel por fuera",
    por_que: "Ubica, le da identidad institucional a todo lo demás.",
    tips: [
      "Frente completo, de día. Si hay bandera o cartel institucional, que entre en cuadro.",
      "Una segunda toma al atardecer da variedad para alternar.",
    ],
    img: "/bvgs-ref/ref-cuartel.jpg",
  },
  {
    id: "capacitacion",
    titulo: "Capacitación en acción",
    por_que: "Lo más dinámico que vas a conseguir; sirve para varios formatos.",
    tips: [
      "Varias tomas desde distintos ángulos: de lejos para contexto, de cerca para el detalle.",
      "Una desde arriba o un lugar alto, si es seguro, da una toma muy visual.",
    ],
    img: "/bvgs-ref/ref-capacitacion.jpg",
  },
  {
    id: "detalle",
    titulo: "Detalle humano",
    por_que: "Genera identificación emocional; funciona mejor que cualquier texto.",
    tips: [
      "Manos preparando guantes, acomodando una manguera, atando un casco.",
      "Acoplando dos tramos de manguera, con buenos guantes puestos, de cerca.",
      "No hace falta que se vea la cara, el detalle solo ya cuenta algo.",
    ],
    img: "/bvgs-ref/ref-detalle.jpg",
  },
];

type Reel = {
  titulo: string;
  dur: string;
  tag: string;
  donde: string;
  quien: string;
  vestimenta: string;
  fondo: string;
  texto: string;
  planos: string;
  comoGrabar: string;
};

const REELS: Reel[] = [
  {
    titulo: "\"Cuando nos necesitás, estamos\"",
    dur: "20-25s",
    tag: "Apertura / hook",
    donde: "Cuartel Central",
    quien: "Jefe de cuartel o un bombero con antigüedad, el que tenga más presencia en cámara.",
    vestimenta: "Uniforme de trabajo (chomba o campera institucional), NO el equipo completo de emergencia ni casco. Prolijo, sin manchas.",
    fondo: "Parado a 1-1,5m de la pared del cuartel o frente al camión, de forma que se lea el logo si entra en cuadro. Nada de autos pasando atrás ni gente circulando.",
    texto: "Cuando alguien de San Miguel nos necesita, tenemos que estar preparados. Para eso hacen falta capacitación, equipamiento y unidades en condiciones. Hoy te invitamos a ser parte: con un aporte mensual podés ayudar a sostener nuestro cuartel. Sumate como Colaborador Oficial. El enlace está en nuestro perfil.",
    planos: "Primer plano de un bombero · preparación del equipo · camión en el cuartel · cierre mirando a cámara.",
    comoGrabar: "Es un plano estático, no hace falta moverse. Repetí el texto completo 3 veces: 1) de frente, a 1,5m, quieto; 2) un primer plano más cerrado (desde el pecho), quieto; 3) la misma frase pero empezando de perfil y girando la cabeza hacia cámara a mitad de frase. Son recursos para poder cortar entre planos en la edición sin que se note el salto.",
  },
  {
    titulo: "\"¿Para qué sirve tu aporte?\"",
    dur: "25-35s",
    tag: "Explicativo",
    donde: "Destacamento 1 (o el que tenga el taller/zona de mantenimiento más prolija)",
    quien: "Quien habitualmente hace el mantenimiento o maneja la unidad.",
    vestimenta: "Uniforme de trabajo. Si está haciendo la tarea mientras habla, mejor: guantes puestos, manga arremangada.",
    fondo: "Dentro del box/garage, con la unidad o la mesa de herramientas de fondo, bien iluminado (luz del garage encendida + puerta abierta si hay luz natural).",
    texto: "Detrás de cada salida hay mucho trabajo previo: revisar equipos, mantener las unidades y capacitarnos. Tu aporte mensual ayuda a sostener ese trabajo cotidiano. Queremos sumar a más vecinos a esta red de colaboración. Entrá al enlace y elegí el aporte que esté a tu alcance.",
    planos: "Revisión de mangueras, herramientas, mantenimiento de unidad, práctica de capacitación. Solo necesidades reales.",
    comoGrabar: "Si la persona está haciendo la tarea mientras habla, grabá el audio completo una vez así, mirando de a ratos a cámara. Después, en silencio (sin hablar), repetí la MISMA tarea desde 2-3 ángulos más: de cerca a las manos, desde arriba, y desde el costado. Esas tomas mudas se superponen en edición tapando los cortes mientras sigue sonando el audio original — por eso no importa que en esas repeticiones no hable, lo que importa es que las manos hagan lo mismo.",
  },
  {
    titulo: "\"San Miguel se suma\"",
    dur: "15-20s",
    tag: "Comunidad · usa los 3 locales",
    donde: "Una persona en el Cuartel Central, una en Destacamento 1, una en Destacamento 2 (se edita como si fuera la misma escena).",
    quien: "Tres personas distintas, una por ubicación. Pueden ser bomberos, un comerciante o un vecino.",
    vestimenta: "Cada uno con su ropa habitual en ese lugar (uniforme si es bombero, ropa normal si es vecino/comerciante). No hace falta que combinen entre sí.",
    fondo: "Cada uno frente al cartel o entrada de su propio local, para que se note que son lugares distintos.",
    texto: "Una frase cada uno: \"Yo quiero ayudar a nuestros bomberos\" / \"En mi comercio difundimos la campaña\" / \"Vos también podés sumarte\". Cierre: bomberos en cuadro, texto en pantalla \"Colaborador Oficial · el link está en nuestra bio\".",
    planos: "Tres personas, cada una mirando a cámara en su propio lugar; cierre con bomberos.",
    comoGrabar: "Cada persona grabá su frase 2 veces: una estática mirando a cámara, y otra caminando hacia la cámara mientras la dice (un ligero movimiento ayuda a que el corte entre las tres personas no se sienta repetitivo, ya que las tres van a hablar paradas de la misma forma si no se varía algo).",
  },
  {
    titulo: "\"Un día en el cuartel\"",
    dur: "20-30s",
    tag: "Detrás de escena",
    donde: "Destacamento 2",
    quien: "2 o 3 bomberos jóvenes, en grupo, mejor que uno solo hablando.",
    vestimenta: "Uniforme de trabajo, prolijo y parejo entre todos (que no haya uno con el uniforme completo y otro de particular).",
    fondo: "Recorrido caminando dentro del cuartel: entrada, zona de equipos, patio. No hace falta que sea estático, puede ser cámara en mano siguiendo a la persona.",
    texto: "Ser bombero no es solamente salir ante una emergencia. También es prepararse, revisar los equipos y entrenar para responder de la mejor manera. Ayudanos a sostener todo ese trabajo. Sumate como Colaborador Oficial.",
    planos: "Preparación de equipo, orden del material, práctica, revisión de unidad, saludo del equipo al cierre.",
    comoGrabar: "Este es en movimiento todo el tiempo: cámara en mano (sin trípode) siguiendo al grupo mientras camina por el cuartel. Grabá el recorrido completo una vez con el audio puesto. Repetí el mismo recorrido 1-2 veces más, sin que hablen, desde otro ángulo (yendo delante del grupo, o cruzándote y grabando desde atrás) — esas tomas mudas sirven de repuesto para tapar cualquier corte en edición.",
  },
  {
    titulo: "\"Un vecino invita a otro\"",
    dur: "15-20s",
    tag: "Testimonio",
    donde: "Fuera de cualquier cuartel — en la calle, un comercio, o la casa de la persona.",
    quien: "Un vecino o colaborador real (no un bombero), alguien que ya se sumó al programa.",
    vestimenta: "Ropa de calle normal, la que tenga puesta. Cuanto más natural, mejor.",
    fondo: "Un lugar cotidiano reconocible de San Miguel (la puerta de su casa, su local, una plaza). Que NO sea el cuartel, para que se note que es un vecino cualquiera, no alguien de adentro.",
    texto: "Yo ya conocí la campaña de Colaboradores Oficiales y quiero invitarte a que la conozcas. Cada persona puede ayudar según sus posibilidades. Entrá al enlace, mirá cómo funciona y compartilo con alguien de San Miguel.",
    planos: "Vecino o colaborador en un lugar cotidiano, mirando a cámara; cierre con el link en pantalla.",
    comoGrabar: "Grabalo parado, quieto, en 2 tomas: una de frente a cámara y otra levemente de costado (3/4), repitiendo el texto completo en las dos. Da opciones para elegir la toma si en el medio hay un error, una duda o un silencio raro al hablar.",
  },
  {
    titulo: "\"¿Sos vecino de San Miguel?\"",
    dur: "12-18s",
    tag: "Gancho rápido",
    donde: "Cuartel Central, en la vereda o entrada (afuera, no adentro del box).",
    quien: "Un bombero joven, con buena cámara, para que el gancho inicial tenga energía.",
    vestimenta: "Uniforme de trabajo, prolijo.",
    fondo: "De pie en la entrada, con el cartel o el frente del cuartel detrás, bien iluminado de día.",
    texto: "¿Sos vecino de San Miguel? Entonces ya sabés que acá estamos, las 24 horas, los 365 días. Lo que quizás no sabías es que podés ser parte con un aporte mensual, sosteniendo el equipamiento y la capacitación de tu cuartel. Sumate como Colaborador Oficial, el link está en nuestra bio.",
    planos: "Arranca con la pregunta a cámara bien cerca (primer plano, genera el gancho); corte a equipo/camión mientras sigue hablando; cierre de nuevo a cámara para el \"sumate\".",
    comoGrabar: "El arranque (la pregunta) grabalo quieto, primer plano bien cerca — ahí no conviene moverse, tiene que pegar fuerte. Para la frase de cierre ('Sumate como Colaborador Oficial'), grabala 2 veces: una quieta en el mismo lugar, y otra caminando hacia la cámara desde la entrada del cuartel — así en edición podés elegir el cierre con más movimiento si el estático queda soso.",
  },
  {
    titulo: "\"Detrás de cada salida\"",
    dur: "20-25s",
    tag: "Gancho emocional",
    donde: "Destacamento 1, frente al camión o a una pared con el logo bien visible.",
    quien: "Bombero con buena presencia en cámara, preferentemente alguien con experiencia real en salidas.",
    vestimenta: "Uniforme de trabajo, prolijo. NO el equipo completo de emergencia ni casco.",
    fondo: "Parado frente al camión o la pared del cuartel, que se lea el logo si entra en cuadro. Luz de día, sin gente ni autos circulando atrás.",
    texto: "Detrás de cada salida hay una familia que nos llama, un vecino que no sabe qué hacer, un animal que quedó atrapado, todos necesitan de nuestra ayuda.\n\nY detrás de nosotros, para poder llegar, hace falta equipamiento en condiciones, para cuidarte y cuidarnos, unidades que funcionen y gente capacitada que sepa cómo actuar en el momento justo.\n\nEso no se sostiene solo. Se sostiene con vecinos como vos.\n\nSumate como Colaborador Oficial de Bomberos de San Miguel. El link está en la bio.",
    planos: "Mientras se repite el texto en los distintos ángulos, en alguna toma dejá que la mirada baje un segundo o se desvíe al costado al decir \"eso no se sostiene solo\" — mirar fijo a cámara todo el tiempo se siente impostado.",
    comoGrabar: "Es la frase más larga de todas, así que conviene grabarla completa (sin cortar en el medio) al menos 3 veces: 1) de frente, quieto, a 1,5m; 2) un plano más cerrado desde el pecho, quieto; 3) caminando despacio hacia la cámara mientras la dice, arrancando a unos 3 metros. Si en algún intento se traba o duda, no importa — quedan las otras dos para elegir en edición, y además podés cortar entre los tres planos a mitad de frase sin que se note el salto de audio.",
  },
  {
    titulo: "\"¿Cuántas veces salimos este año?\"",
    dur: "25-30s",
    tag: "Datos reales · necesita números de BVGS antes de grabar",
    donde: "Cuartel Central, con unidades o equipamiento visible de fondo.",
    quien: "Bombero de pie, tono informativo pero cercano, no acartonado.",
    vestimenta: "Uniforme de trabajo, prolijo.",
    fondo: "Frente al camión o al box de equipamiento, bien iluminado.",
    texto: "Desde enero de 2026, nuestro cuartel de bomberos recibió [X] llamados de emergencia.\n[X] accidentes. [X] incendios. [X] rescates de animales. [X] emergencias especiales. [sumar las categorías reales que tengamos].\n\nCada una de esas [X] veces, ahí estuvimos para ayudarte. Las 24 horas, los 365 días del año.\n\nPara mejorar nuestro servicio y estar cada vez más preparados necesitamos que te sumes como Colaborador Oficial. Tu aporte mensual hace posible que nos capacitemos y podamos mantener nuestros materiales y unidades móviles.\n\nSumate como Colaborador Oficial. No nos des la espalda y ayudanos a que la próxima vez que escuches la sirena, seas vos quien también está ayudando a esa familia que necesita ayuda.",
    planos: "Mientras se dice cada número, cortar a una imagen relacionada: accidentes → unidad lista para salir; incendios → equipo de incendio; rescate de animales → algo relacionado (aunque sea de archivo); emergencias especiales → equipo especial. Cuantas más tomas de apoyo por categoría, mejor se arma el corte.",
    comoGrabar: "⚠️ Antes de filmar esta, necesitamos los números reales: total de llamados desde enero 2026 y el desglose por tipo (accidentes, incendios, animales, especiales, lo que tengan registrado). Grabarlo con las X sin completar no sirve — un número inventado o aproximado en un video institucional resta credibilidad si alguien lo cuestiona. Una vez con los datos reales, grabá el texto completo 2-3 veces desde ángulos distintos (de frente quieto, 3/4 quieto, y una vez caminando) igual que en los demás guiones, para tener margen en la edición.",
  },
  {
    titulo: "\"Nosotros nunca decimos que no\" (sketch)",
    dur: "35-45s",
    tag: "Sketch · varias escenas, se edita todo intercalado",
    donde: "Escena 1: una calle o la puerta de una casa cualquiera de San Miguel (lejos del cuartel). Escenas 2 y 3: el puesto de guardia o teléfono del cuartel. Escena 4: la entrada del box, con el camión.",
    quien: "Escena 1: alguien haciendo de 'vecino que pide colaboración' puerta a puerta (puede ser un bombero vestido de calle, para que no se note el giro hasta el final) y otro bombero actuando de vecino que dice \"no, gracias\". Escenas 2-4: el bombero que atiende el llamado.",
    vestimenta: "Escena 1: ropa de calle normal para los dos (ni uniforme ni nada que los identifique como bomberos todavía). Escenas 2-4: uniforme de trabajo.",
    fondo: "Escena 1: cualquier calle o puerta reconocible de San Miguel. Escenas 2-3: el puesto de guardia/teléfono del cuartel. Escena 4: el box con el camión saliendo.",
    texto: "Escena 1: Un bombero (vestido de calle) tocando timbre casa por casa, pidiendo colaborar con $5.000 por mes. Un vecino abre la puerta, lo mira y dice: \"No, gracias\" — y cierra. (O alguien caminando se lo intenta interceptar y sigue caminando.)\n\nEscena 2 (corte): Sonido de teléfono. Alguien atiende en el cuartel: \"Bomberos, buenas tardes.\" Del otro lado, gritando: \"¡Se está prendiendo fuego mi casa, vengan urgente!\"\n\nEscena 3: El bombero que atendió, mirando a cámara, serio: \"Nosotros nunca te vamos a decir que no.\"\n\nEscena 4: El camión saliendo del cuartel, sirena a todo volumen.\n\nCierre, texto en pantalla: \"Nosotros nunca decimos que no. Esta vez, necesitamos que no nos des la espalda.\" → Sumate como Colaborador Oficial.",
    planos: "Escena 1 necesita 2-3 intentos para que el \"no, gracias\" se vea natural y no leído — probar la toma caminando (el vecino lo esquiva sin frenar) y la toma parado en la puerta, y quedarse con la que salga más creíble. Escena 2 es solo audio + un plano del teléfono o de la mano atendiendo, no hace falta que se vea la cara de quien llama.",
    comoGrabar: "Esta NO es \"una persona habla a cámara\": es un sketch de varias escenas cortas que se editan intercaladas, así que grabá cada escena por separado y repetila las veces que haga falta hasta que la actuación salga creíble (sobre todo la del \"no, gracias\"). La frase clave, \"Nosotros nunca te vamos a decir que no\", es la más importante del video — grabala al menos 3 veces: parado quieto de frente, en un primer plano más cerrado, y una vez caminando hacia la cámara, para tener opciones de cuál usar en el cierre. El audio del teléfono y el grito de \"se está prendiendo fuego mi casa\" se puede grabar aparte y mezclarlo después, no hace falta sincronizarlo en vivo.",
  },
  {
    titulo: "\"Ya somos 30 colaboradores\"",
    dur: "20-25s",
    tag: "Prueba social",
    donde: "Destacamento 2.",
    quien: "Un bombero joven, tono cercano y relajado, sin impostar.",
    vestimenta: "Uniforme de trabajo.",
    fondo: "Frente al destacamento o dentro del box, con algo de equipamiento visible.",
    texto: "Ya somos 30 colaboradores oficiales que mensualmente apoyan a nuestro cuartel de bomberos voluntarios. Treinta vecinos que dijeron \"esto me importa\" y se sumaron con un aporte mensual.\n\nNo importa el monto. Importa que estés.\n\nCon lo que aportás, compramos equipos, mantenemos los vehículos y seguimos capacitándonos. Y todos los meses participás por un sorteo entre los colaboradores que decidieron sumarse a esta causa.\n\nAyudanos a seguir ayudando a nuestra comunidad. No nos des la espalda.\n\nSumate acá 👇",
    planos: "Cortar a tomas de equipamiento o mantenimiento mientras dice \"compramos equipos, mantenemos los vehículos\", y a una toma del cuartel o del grupo mientras dice \"ayudanos a seguir ayudando a nuestra comunidad\".",
    comoGrabar: "Grabá el texto completo 3 veces desde ángulos distintos: de frente quieto, 3/4 quieto, y una vez caminando lentamente de costado frente a cámara (de costado, no hacia adelante, para variar el tipo de movimiento respecto a los otros reels). Dejá que se le note una sonrisa natural al decir \"no importa el monto, importa que estés\" — no hace falta tono serio todo el video, este es el más amigable de todos.",
  },
  {
    titulo: "\"Por qué me sumé\" (testimonio)",
    dur: "15-20s",
    tag: "Testimonio · necesita un colaborador real",
    donde: "Fuera de cualquier cuartel — en su casa, su local, o la calle. Que sea un vecino distinto al del otro testimonio, para no repetir cara.",
    quien: "Un vecino o colaborador real, no un bombero.",
    vestimenta: "Ropa de calle normal, la que tenga puesta.",
    fondo: "Un lugar cotidiano reconocible de San Miguel. Que NO sea el cuartel.",
    texto: "Yo me sumé como Colaborador Oficial hace [tiempo]. No porque tenga plata de sobra, sino porque un día pensé: si algún día les toca venir a mi casa, quiero que puedan llegar bien equipados.\n\nEs un aporte chico todos los meses. Y la verdad, ni lo siento.\n\nSi todavía no te sumaste, hacelo. El cuartel es de todos nosotros.",
    planos: "Cierre con texto en pantalla: \"Sumate como Colaborador Oficial\" + el link.",
    comoGrabar: "Antes de grabar, preguntale a la persona hace cuánto tiempo es colaborador para completar el \"[tiempo]\" con un dato real (\"hace 8 meses\", \"desde marzo\") — suena mucho más genuino que dejarlo genérico. Grabalo parado, quieto, 2 veces: una de frente y otra 3/4, repitiendo el texto completo las dos veces. Si a la persona le sale natural, una tercera toma caminando por el lugar mientras habla le suma espontaneidad, pero no es obligatoria — mejor dos tomas quietas bien hechas que una caminando forzada.",
  },
];

const CHECK_ITEMS = [
  "Retrato de un bombero",
  "Equipo trabajando / mantenimiento",
  "Unidad y equipamiento",
  "Cuartel por fuera (día + atardecer)",
  "Capacitación en acción",
  "Detalle humano (manos, equipo)",
  "Al menos 2 reels grabados (completo + espontáneo)",
  "3-4 tomas sueltas para historias",
  "Permiso verbal de las personas identificables",
  "Todo guardado en una carpeta, ordenado",
];

const STORAGE_KEY = "bvgs_pedido_redes_1_v1";

export default function PedidoRedes1() {
  const [checked, setChecked] = useState<boolean[]>(() => CHECK_ITEMS.map(() => false));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {}
  }, [checked, loaded]);

  const done = checked.filter(Boolean).length;

  function toggle(i: number) {
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: BG, color: INK }}>
      <header style={{
        background: `linear-gradient(145deg, ${BRAND_DARK} 0%, ${BRAND_DARK2} 100%)`,
        color: "white", padding: "40px 5% 30px",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#f3b3ba", marginBottom: 10 }}>
            Jornada de producción · BVGS
          </div>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 6vw, 2.4rem)", lineHeight: 1.1, margin: "0 0 10px" }}>
            Lo que vas a salir a filmar hoy
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", maxWidth: 560, margin: 0 }}>
            Guía con ejemplos de cómo encuadrar cada foto. Tildá lo que vas completando, y cuando termines
            mandanos todo el contenido.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "0 5% 100px" }}>

        {/* PROGRESO */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10, background: BG, borderBottom: `1px solid ${LINE}`,
          padding: "14px 0", margin: "0 -5%", paddingLeft: "5%", paddingRight: "5%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.85rem", fontWeight: 700, color: INK }}>
            Progreso de la jornada
          </span>
          <span style={{
            fontFamily: "monospace", fontSize: "0.78rem", color: OK, background: "#e9f7ee",
            borderRadius: 999, padding: "4px 12px",
          }}>
            {done} / {CHECK_ITEMS.length} listo
          </span>
        </div>

        {/* FOTOS */}
        <section style={{ padding: "36px 0" }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.4rem", margin: "0 0 6px" }}>
            Fotos imprescindibles
          </h2>
          <p style={{ color: MUTED, fontSize: "0.9rem", margin: "0 0 20px", maxWidth: 560 }}>
            Las imágenes de ejemplo son ilustrativas (generadas con IA, para mostrar el encuadre) — no son
            fotos reales de BVGS, es solo una referencia de cómo componer cada toma.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FOTOS.map((f, i) => (
              <div key={f.id} style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div style={{ flex: "0 0 160px", height: 160, background: "#eee", position: "relative" }}>
                    <img
                      src={f.img}
                      alt={`Ejemplo de encuadre: ${f.titulo}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{
                      position: "absolute", bottom: 4, left: 4, right: 4,
                      background: "rgba(0,0,0,0.6)", color: "white", fontSize: "0.56rem",
                      padding: "2px 6px", borderRadius: 4, textAlign: "center",
                    }}>
                      Ejemplo ilustrativo (IA)
                    </div>
                  </div>
                  <div style={{ flex: "1 1 220px", padding: "16px 18px" }}>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={checked[i]}
                        onChange={() => toggle(i)}
                        style={{ marginTop: 4, width: 17, height: 17, accentColor: BRAND, flexShrink: 0 }}
                      />
                      <div>
                        <div style={{
                          fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: 4,
                          textDecoration: checked[i] ? "line-through" : "none", color: checked[i] ? MUTED : INK,
                        }}>
                          {f.titulo}
                        </div>
                        <div style={{ color: MUTED, fontSize: "0.8rem", marginBottom: 8 }}>{f.por_que}</div>
                        <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.82rem", color: "#444" }}>
                          {f.tips.map((t) => <li key={t} style={{ marginBottom: 3 }}>{t}</li>)}
                        </ul>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* REELS */}
        <section style={{ padding: "16px 0 36px", borderTop: `1px solid ${LINE}` }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.4rem", margin: "20px 0 6px" }}>
            Reels / videos cortos
          </h2>
          <p style={{ color: MUTED, fontSize: "0.9rem", margin: "0 0 16px" }}>
            Grabá cada guion dos veces: una completa mirando a cámara, y otra más espontánea. Cada reel
            tiene asignado un local distinto (Cuartel Central, Destacamento 1, Destacamento 2) a propósito,
            para que no quede todo grabado en el mismo lugar.
          </p>
          <div style={{ background: "#fff8e8", border: "1px solid #f3dca0", borderRadius: 10, padding: "12px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 4 }}>⚠️ Cada reel son DOS grabaciones, no una</div>
            <div style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6 }}>
              1) La persona hablando a cámara, el audio completo. 2) Por separado, los "planos de apoyo" que
              aparecen en la sección de abajo de cada tarjeta: esas tomas se usan editadas por encima,
              tapando el corte, mientras se sigue escuchando la voz de la persona hablando. No hace falta
              que la persona esté en pantalla todo el tiempo, por eso hay que filmar esas tomas sueltas
              también, aunque no aparezcan en el guion.
            </div>
          </div>

          <div style={{ background: "#eef6ff", border: "1px solid #bcdcff", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 4 }}>🎥 Grabá cada guion en varios ángulos — "en off"</div>
            <div style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6 }}>
              No hace falta que la persona esté siempre mirando fijo a cámara con la boca sincronizada: podés
              grabar la voz diciendo el texto completo, y por separado la imagen de la persona (quieta o
              caminando) para superponer encima — eso es grabar <strong>"en off"</strong>. Para tener margen en la
              edición, repetí el texto completo de cada guion <strong>2 o 3 veces</strong>, cambiando algo cada vez:
              una vez parado y quieto, de frente; otra en un plano más cerrado (busto); y otra caminando
              despacio (hacia cámara, de costado, o alejándose, según lo que pida cada guion). Son la misma
              frase dicha varias veces desde ángulos distintos — así en edición se puede cortar entre planos
              sin que se note el salto, o descartar una toma si se traba o queda forzada. Cada guion de abajo
              tiene su propio recuadro "Cómo grabar" con el detalle para ese caso puntual.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {REELS.map((r) => (
              <div key={r.titulo} style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: 6 }}>{r.titulo}</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: BRAND, border: `1px solid ${BRAND}`, borderRadius: 999, padding: "2px 8px" }}>{r.dur}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: MUTED, border: `1px solid ${LINE}`, borderRadius: 999, padding: "2px 8px" }}>{r.tag}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                  <div style={{ background: BG, borderRadius: 8, padding: "9px 11px" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 2 }}>📍 Dónde</div>
                    <div style={{ fontSize: "0.78rem" }}>{r.donde}</div>
                  </div>
                  <div style={{ background: BG, borderRadius: 8, padding: "9px 11px" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 2 }}>🧑 Quién</div>
                    <div style={{ fontSize: "0.78rem" }}>{r.quien}</div>
                  </div>
                  <div style={{ background: BG, borderRadius: 8, padding: "9px 11px" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 2 }}>👕 Vestimenta</div>
                    <div style={{ fontSize: "0.78rem" }}>{r.vestimenta}</div>
                  </div>
                  <div style={{ background: BG, borderRadius: 8, padding: "9px 11px" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 2 }}>🖼️ Fondo</div>
                    <div style={{ fontSize: "0.78rem" }}>{r.fondo}</div>
                  </div>
                </div>

                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 4 }}>💬 Qué decir, textual</div>
                <div style={{ background: BG, border: `1px solid ${LINE}`, borderRadius: 8, padding: "12px 14px", fontSize: "0.86rem", fontStyle: "italic", marginBottom: 8, whiteSpace: "pre-line" }}>
                  {r.texto}
                </div>
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 4 }}>🎬 Grabar aparte, para tapar el corte mientras se escucha la voz</div>
                <div style={{ fontSize: "0.8rem", color: "#555", background: BG, borderRadius: 8, padding: "9px 11px", marginBottom: 8 }}>{r.planos}</div>
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 4 }}>🎥 Cómo grabar (ángulos y movimiento)</div>
                <div style={{ fontSize: "0.8rem", color: "#444", background: "#eef6ff", border: "1px solid #d8ecff", borderRadius: 8, padding: "9px 11px" }}>{r.comoGrabar}</div>
              </div>
            ))}
          </div>
        </section>

        {/* STOCK EXTRA */}
        <section style={{ padding: "16px 0 36px", borderTop: `1px solid ${LINE}` }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.4rem", margin: "20px 0 6px" }}>
            Más tomas sueltas (foto y video)
          </h2>
          <p style={{ color: MUTED, fontSize: "0.9rem", margin: "0 0 20px", maxWidth: 560 }}>
            Estas no están atadas a ningún guion puntual: aprovechá cualquier momento libre de la jornada
            para juntarlas. Sirven de repuesto para tapar cortes en cualquier reel, historia o carrusel
            futuro, cuantas más tengas, mejor.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              "Primer plano de un casco solo, apoyado sobre una mesa o banco",
              "Alguien subiendo o bajando del camión",
              "La puerta del box abriéndose o cerrándose",
              "El grupo caminando hacia la unidad, de espaldas",
              "Detalle de las luces del camión encendidas",
              "Bandera o cartel institucional flameando en el frente",
              "Alguien anotando en una planilla o pizarra de guardia",
              "Vista general del cuartel desde la vereda de enfrente",
              "Caminata lenta por el pasillo donde cuelga el equipamiento",
              "Cerrando una mochila o bolso de guardia",
              "Manos atando los cordones de las botas",
              "El camión saliendo o entrando despacio al box",
            ].map((t) => (
              <div key={t} style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 10, padding: "10px 12px", fontSize: "0.82rem" }}>
                {t}
              </div>
            ))}
          </div>
        </section>

        {/* ENVIAR CONTENIDO */}
        <section style={{
          marginTop: 10, background: `linear-gradient(145deg, ${BRAND_DARK} 0%, ${BRAND_DARK2} 100%)`,
          borderRadius: 16, padding: "28px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>📲</div>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "white", marginBottom: 10 }}>
            Cuando tengas todo filmado, mandalo
          </div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", marginBottom: 20 }}>
            Por WhatsApp o por mail, lo que te resulte más cómodo para subir los archivos.
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
              background: "#22c55e", color: "white", padding: "12px 22px", borderRadius: 10,
              textDecoration: "none", fontWeight: 700, fontSize: "0.9rem",
            }}>
              WhatsApp: 11 6855-6257
            </a>
            <a href={`mailto:${EMAIL}`} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)",
              color: "white", padding: "12px 22px", borderRadius: 10,
              textDecoration: "none", fontWeight: 700, fontSize: "0.9rem",
            }}>
              {EMAIL}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
