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
  linkEjemplo?: string;
};

const SUGERENCIA_QUIEN = "No tiene que ser una persona en particular ni seguir un rol fijo — lo importante es que se exprese con soltura y hable cómodo frente a cámara. Como sugerencia: ";

const REELS: Reel[] = [
  {
    titulo: "\"Detrás de cada salida\"",
    dur: "20-25s",
    tag: "Gancho emocional",
    donde: "Destacamento 1, frente al camión o a una pared con el logo bien visible.",
    quien: SUGERENCIA_QUIEN + "alguien con experiencia real en salidas, para que las imágenes le salgan naturales al hablar.",
    vestimenta: "Uniforme de trabajo, prolijo. NO el equipo completo de emergencia ni casco.",
    fondo: "Parado frente al camión o la pared del cuartel, que se lea el logo si entra en cuadro. Luz de día, sin gente ni autos circulando atrás.",
    texto: "Detrás de cada salida hay una familia que nos llama, un vecino que no sabe qué hacer, un animal que quedó atrapado, todos necesitan de nuestra ayuda.\n\nY detrás de nosotros, para poder llegar, hace falta equipamiento en condiciones, para cuidarte y cuidarnos, unidades que funcionen y gente capacitada que sepa cómo actuar en el momento justo.\n\nEso no se sostiene solo. Se sostiene con vecinos como vos.\n\nSumate como Colaborador Oficial de Bomberos Voluntarios de San Miguel. El link está en la bio.",
    planos: "Mientras se repite el texto en los distintos ángulos, en alguna toma dejá que la mirada baje un segundo o se desvíe al costado al decir \"eso no se sostiene solo\" — mirar fijo a cámara todo el tiempo se siente impostado.",
    comoGrabar: "La voz se graba en vivo mientras pasa una acción real, no se dobla después. Como la frase es larga, repetila completa 2-3 veces, cada vez sobre algo distinto: una vez caminando hacia la cámara con el camión de fondo; otra mientras se pone o se ajusta el equipo de protección, mirando a cámara de a ratos; y si se puede, una tercera sosteniendo el micrófono con una pértiga/selfie stick para un plano más dinámico. Elegís la mejor en edición, o cortás entre ellas.",
    linkEjemplo: "https://www.instagram.com/reels/DfiP3tSu-BA/",
  },
  {
    titulo: "\"¿Cuántas veces salimos este año?\"",
    dur: "25-30s",
    tag: "Datos reales · necesita números de BVGS antes de grabar",
    donde: "Cuartel Central, con unidades o equipamiento visible de fondo.",
    quien: SUGERENCIA_QUIEN + "alguien con buena dicción, porque tiene bastantes números y conviene que no se trabe.",
    vestimenta: "Uniforme de trabajo, prolijo.",
    fondo: "Frente al camión o al box de equipamiento, bien iluminado.",
    texto: "Desde enero de 2026, nuestro cuartel de bomberos voluntarios recibió [X] llamados de emergencia.\n[X] accidentes. [X] incendios. [X] rescates de animales. [X] emergencias especiales. [sumar las categorías reales que tengamos].\n\nCada una de esas [X] veces, ahí estuvimos para ayudarte. Las 24 horas, los 365 días del año.\n\nPara mejorar nuestro servicio y estar cada vez más preparados necesitamos que te sumes como Colaborador Oficial. Tu aporte mensual hace posible que nos capacitemos y podamos mantener nuestros materiales y unidades móviles.\n\nSumate como Colaborador Oficial. No nos des la espalda y ayudanos a que la próxima vez que escuches la sirena, seas vos quien también está ayudando a esa familia que necesita ayuda.",
    planos: "Mientras se dice cada número, cortar a una imagen relacionada: accidentes → unidad lista para salir; incendios → equipo de incendio; rescate de animales → algo relacionado (aunque sea de archivo); emergencias especiales → equipo especial. Cuantas más tomas de apoyo por categoría, mejor se arma el corte.",
    comoGrabar: "⚠️ Antes de filmar esta, necesitamos los números reales: total de llamados desde enero 2026 y el desglose por tipo (accidentes, incendios, animales, especiales, lo que tengan registrado). Grabarlo con las X sin completar no sirve — un número inventado o aproximado en un video institucional resta credibilidad si alguien lo cuestiona. Una vez con los datos, como el texto es largo conviene partirlo en 2-3 bloques y grabar cada uno en vivo sobre una acción distinta: los números generales con el camión saliendo a un servicio o de fondo; \"para mejorar nuestro servicio...\" mientras se revisa o guarda equipamiento, mirando a cámara; y el cierre (\"no nos des la espalda\") caminando hacia la cámara. Grabando por bloques, en vivo, no hace falta repetir el monólogo entero cada vez.",
    linkEjemplo: "https://www.instagram.com/reel/DffanncRhc2/",
  },
  {
    titulo: "\"Nosotros nunca decimos que no\" (sketch)",
    dur: "35-45s",
    tag: "Sketch · varias escenas, se edita todo intercalado",
    donde: "Escena 1: una calle o la puerta de una casa cualquiera de San Miguel (lejos del cuartel). Escenas 2 y 3: el puesto de guardia o teléfono del cuartel. Escena 4: la entrada del box, con el camión.",
    quien: SUGERENCIA_QUIEN + "para la escena 1, dos personas con ganas de actuar un poco (puede ser un bombero vestido de calle, para que no se note el giro hasta el final, y otro haciendo de vecino que dice \"no, gracias\"). Para las escenas 2-4, quien se sienta cómodo diciendo la frase clave a cámara.",
    vestimenta: "Escena 1: ropa de calle normal para los dos (ni uniforme ni nada que los identifique como bomberos todavía). Escenas 2-4: uniforme de trabajo.",
    fondo: "Escena 1: cualquier calle o puerta reconocible de San Miguel. Escenas 2-3: el puesto de guardia/teléfono del cuartel. Escena 4: el box con el camión saliendo.",
    texto: "Escena 1: Un bombero (vestido de calle) tocando timbre casa por casa, pidiendo colaborar con $5.000 por mes. Un vecino abre la puerta, lo mira y dice: \"No, gracias\" — y cierra. (O alguien caminando se lo intenta interceptar y sigue caminando.)\n\nEscena 2 (corte): Sonido de teléfono. Alguien atiende en el cuartel: \"Bomberos Voluntarios, buenas tardes.\" Del otro lado, gritando: \"¡Se está prendiendo fuego mi casa, vengan urgente!\"\n\nEscena 3: El bombero que atendió, mirando a cámara, serio: \"Nosotros nunca te vamos a decir que no.\"\n\nEscena 4: El camión saliendo del cuartel, sirena a todo volumen.\n\nCierre, texto en pantalla: \"Nosotros nunca decimos que no. Esta vez, necesitamos que no nos des la espalda.\" → Sumate como Colaborador Oficial.",
    planos: "Escena 1 necesita 2-3 intentos para que el \"no, gracias\" se vea natural y no leído — probar la toma caminando (el vecino lo esquiva sin frenar) y la toma parado en la puerta, y quedarse con la que salga más creíble. Escena 2 es solo audio + un plano del teléfono o de la mano atendiendo, no hace falta que se vea la cara de quien llama.",
    comoGrabar: "Es un sketch de varias escenas cortas que se editan intercaladas — grabá cada escena por separado, con el audio real del momento (no doblado después), y repetila las veces que haga falta hasta que la actuación salga creíble (sobre todo la del \"no, gracias\"). La frase clave, \"Nosotros nunca te vamos a decir que no\", grabala en vivo al menos 2 veces actuando la escena: una parado serio mirando a cámara, y otra caminando hacia la cámara justo después de colgar el teléfono, para tener opciones de cuál usar en el cierre.",
    linkEjemplo: "https://www.instagram.com/reel/DffanncRhc2/",
  },
  {
    titulo: "\"Ya somos 30 colaboradores\"",
    dur: "20-25s",
    tag: "Prueba social",
    donde: "Destacamento 2.",
    quien: SUGERENCIA_QUIEN + "alguien con tono cercano y relajado, sin impostar — este guion funciona mejor charlado que leído.",
    vestimenta: "Uniforme de trabajo.",
    fondo: "Frente al destacamento o dentro del box, con algo de equipamiento visible.",
    texto: "Ya somos 30 colaboradores oficiales que mensualmente apoyan a nuestro cuartel de bomberos voluntarios. Treinta vecinos que dijeron \"esto me importa\" y se sumaron con un aporte mensual.\n\nNo importa el monto. Importa que estés.\n\nCon lo que aportás, compramos equipos, mantenemos los vehículos y seguimos capacitándonos. Y todos los meses participás por un sorteo entre los colaboradores que decidieron sumarse a esta causa.\n\nAyudanos a seguir ayudando a nuestra comunidad. No nos des la espalda.\n\nSumate acá 👇",
    planos: "Cortar a tomas de equipamiento o mantenimiento mientras dice \"compramos equipos, mantenemos los vehículos\", y a una toma del cuartel o del grupo mientras dice \"ayudanos a seguir ayudando a nuestra comunidad\".",
    comoGrabar: "Grabá la voz en vivo mientras hace algo, no parado fijo todo el video. Repetí el texto completo 2-3 veces, cada vez sobre una acción distinta: caminando por el cuartel mirando a cámara; haciendo mantenimiento o revisando equipamiento mientras habla de a ratos a cámara; y cerca del camión o la unidad. La sonrisa natural al decir \"no importa el monto, importa que estés\" sale mejor si la dice haciendo algo, no parado fijo — este es el más amigable de todos.",
    linkEjemplo: "https://www.facebook.com/reel/1053952053844300",
  },
  {
    titulo: "\"Por qué me sumé\" (testimonio)",
    dur: "15-20s",
    tag: "Testimonio · necesita un colaborador real",
    donde: "Fuera de cualquier cuartel — en su casa, su local, o la calle. Que sea un vecino distinto al del otro testimonio, para no repetir cara.",
    quien: SUGERENCIA_QUIEN + "un vecino o colaborador real, no un bombero — alguien que ya se sumó y se sienta cómodo contándolo con sus propias palabras.",
    vestimenta: "Ropa de calle normal, la que tenga puesta.",
    fondo: "Un lugar cotidiano reconocible de San Miguel. Que NO sea el cuartel.",
    texto: "Yo me sumé como Colaborador Oficial hace [tiempo]. No porque tenga plata de sobra, sino porque un día pensé: si algún día les toca venir a mi casa, quiero que puedan llegar bien equipados.\n\nEs un aporte chico todos los meses. Y la verdad, ni lo siento.\n\nSi todavía no te sumaste, hacelo. El cuartel es de todos nosotros.",
    planos: "Cierre con texto en pantalla: \"Sumate como Colaborador Oficial\" + el link.",
    comoGrabar: "Antes de grabar, preguntale a la persona hace cuánto tiempo es colaborador para completar el \"[tiempo]\" con un dato real (\"hace 8 meses\", \"desde marzo\") — suena mucho más genuino que dejarlo genérico. Grabá la voz en vivo mientras camina por su casa o su local haciendo algo cotidiano, no parada fija mirando a cámara todo el video — se siente mucho más natural. Repetí el texto completo 2 veces, desde ángulos distintos (de frente y 3/4), para tener opciones en edición.",
  },
  {
    titulo: "\"Cuando nos necesitás, estamos\"",
    dur: "20-25s",
    tag: "Apertura / hook",
    donde: "Cuartel Central",
    quien: SUGERENCIA_QUIEN + "el jefe de cuartel o alguien con antigüedad, por la presencia que da, pero no es excluyente.",
    vestimenta: "Uniforme de trabajo (chomba o campera institucional), NO el equipo completo de emergencia ni casco. Prolijo, sin manchas.",
    fondo: "Parado a 1-1,5m de la pared del cuartel o frente al camión, de forma que se lea el logo si entra en cuadro. Nada de autos pasando atrás ni gente circulando.",
    texto: "Cuando alguien de San Miguel nos necesita, tenemos que estar preparados. Somos bomberos voluntarios — nadie de nosotros cobra un sueldo por esto. Para eso hacen falta capacitación, equipamiento y unidades en condiciones. Hoy te invitamos a ser parte: con un aporte mensual podés ayudar a sostener nuestro cuartel. Sumate como Colaborador Oficial. El enlace está en nuestro perfil.",
    planos: "Primer plano de un bombero · preparación del equipo · camión en el cuartel · cierre mirando a cámara.",
    comoGrabar: "Grabá la voz en vivo mientras pasa una acción real, no la dobles después. Repetí el texto completo 2-3 veces, cada vez sobre algo distinto: una vez caminando hacia el camión mientras habla; otra ajustándose el equipo o cerrando un bolso de guardia, mirando a cámara de a ratos; y si se puede, una con el micrófono en una pértiga para un plano más dinámico.",
  },
  {
    titulo: "\"¿Para qué sirve tu aporte?\"",
    dur: "25-35s",
    tag: "Explicativo",
    donde: "Destacamento 1 (o el que tenga el taller/zona de mantenimiento más prolija)",
    quien: SUGERENCIA_QUIEN + "quien habitualmente hace el mantenimiento o maneja la unidad, para que hable de algo que conoce bien.",
    vestimenta: "Uniforme de trabajo. Si está haciendo la tarea mientras habla, mejor: guantes puestos, manga arremangada.",
    fondo: "Dentro del box/garage, con la unidad o la mesa de herramientas de fondo, bien iluminado (luz del garage encendida + puerta abierta si hay luz natural).",
    texto: "Detrás de cada salida hay mucho trabajo previo: revisar equipos, mantener las unidades y capacitarnos. Somos bomberos voluntarios, no cobramos un sueldo por estar acá — por eso tu aporte mensual ayuda a sostener ese trabajo cotidiano. Queremos sumar a más vecinos a esta red de colaboración. Entrá al enlace y elegí el aporte que esté a tu alcance.",
    planos: "Revisión de mangueras, herramientas, mantenimiento de unidad, práctica de capacitación. Solo necesidades reales.",
    comoGrabar: "La voz se graba en vivo mientras hace la tarea de mantenimiento — no se graba aparte para doblarla después, se nota mucho. Si la frase es larga, repetila completa 2 veces, siempre mientras sigue trabajando (revisando una manguera, ajustando una herramienta), mirando a cámara de a ratos. Después, aparte y en silencio, podés filmar las mismas manos haciendo la tarea desde otro ángulo (de cerca, desde arriba) como toma de repuesto para tapar un corte — pero la toma principal, con la voz, siempre se graba en vivo.",
  },
  {
    titulo: "\"San Miguel se suma\"",
    dur: "15-20s",
    tag: "Comunidad · usa los 3 locales",
    donde: "Una persona en el Cuartel Central, una en Destacamento 1, una en Destacamento 2 (se edita como si fuera la misma escena).",
    quien: SUGERENCIA_QUIEN + "tres personas distintas, una por ubicación. Pueden ser bomberos, un comerciante o un vecino.",
    vestimenta: "Cada uno con su ropa habitual en ese lugar (uniforme si es bombero, ropa normal si es vecino/comerciante). No hace falta que combinen entre sí.",
    fondo: "Cada uno frente al cartel o entrada de su propio local, para que se note que son lugares distintos.",
    texto: "Una frase cada uno: \"Yo quiero ayudar a nuestros bomberos\" / \"En mi comercio difundimos la campaña\" / \"Vos también podés sumarte\". Cierre: bomberos en cuadro, texto en pantalla \"Colaborador Oficial · el link está en nuestra bio\".",
    planos: "Tres personas, cada una mirando a cámara en su propio lugar; cierre con bomberos.",
    comoGrabar: "Cada persona grabá su frase en vivo, 2 veces: una caminando hacia la cámara mientras la dice, y otra parada frente a su local o cartel. El movimiento de caminar ayuda a que el corte entre las tres personas no se sienta repetitivo.",
  },
  {
    titulo: "\"Un día en el cuartel\"",
    dur: "20-30s",
    tag: "Detrás de escena",
    donde: "Destacamento 2",
    quien: SUGERENCIA_QUIEN + "2 o 3 bomberos jóvenes, en grupo, mejor que uno solo hablando.",
    vestimenta: "Uniforme de trabajo, prolijo y parejo entre todos (que no haya uno con el uniforme completo y otro de particular).",
    fondo: "Recorrido caminando dentro del cuartel: entrada, zona de equipos, patio. No hace falta que sea estático, puede ser cámara en mano siguiendo a la persona.",
    texto: "Ser bombero no es solamente salir ante una emergencia. También es prepararse, revisar los equipos y entrenar para responder de la mejor manera — todo esto, sin cobrar un sueldo, porque somos voluntarios. Ayudanos a sostener todo ese trabajo. Sumate como Colaborador Oficial.",
    planos: "Preparación de equipo, orden del material, práctica, revisión de unidad, saludo del equipo al cierre.",
    comoGrabar: "La voz se graba en vivo mientras el grupo camina y hace cosas reales (ordenar equipo, revisar una unidad) — no se dobla después. Cámara en mano (sin trípode) siguiendo al grupo. Grabá el recorrido completo una vez con el audio puesto, y si querés variar el ángulo, repetilo entero una vez más (de nuevo con audio en vivo, no solo imagen muda) para tener dos opciones completas.",
  },
  {
    titulo: "\"Un vecino invita a otro\"",
    dur: "15-20s",
    tag: "Testimonio",
    donde: "Fuera de cualquier cuartel — en la calle, un comercio, o la casa de la persona.",
    quien: SUGERENCIA_QUIEN + "un vecino o colaborador real (no un bombero), alguien que ya se sumó al programa.",
    vestimenta: "Ropa de calle normal, la que tenga puesta. Cuanto más natural, mejor.",
    fondo: "Un lugar cotidiano reconocible de San Miguel (la puerta de su casa, su local, una plaza). Que NO sea el cuartel, para que se note que es un vecino cualquiera, no alguien de adentro.",
    texto: "Yo ya conocí la campaña de Colaboradores Oficiales y quiero invitarte a que la conozcas. Cada persona puede ayudar según sus posibilidades. Entrá al enlace, mirá cómo funciona y compartilo con alguien de San Miguel.",
    planos: "Vecino o colaborador en un lugar cotidiano, mirando a cámara; cierre con el link en pantalla.",
    comoGrabar: "Grabá la voz en vivo mientras camina por el lugar que elijan (su casa, su local), no parado fijo todo el video — se siente más natural con algo de movimiento cotidiano. Repetí el texto completo 2 veces, desde ángulos distintos (de frente y 3/4), para tener opciones si en el medio hay un error o una duda.",
  },
  {
    titulo: "\"¿Sos vecino de San Miguel?\"",
    dur: "12-18s",
    tag: "Gancho rápido",
    donde: "Cuartel Central, en la vereda o entrada (afuera, no adentro del box).",
    quien: SUGERENCIA_QUIEN + "alguien joven y con energía, para que el gancho inicial pegue fuerte.",
    vestimenta: "Uniforme de trabajo, prolijo.",
    fondo: "De pie en la entrada, con el cartel o el frente del cuartel detrás, bien iluminado de día.",
    texto: "¿Sos vecino de San Miguel? Entonces ya sabés que acá estamos, las 24 horas, los 365 días — como bomberos voluntarios, sin cobrar un sueldo por eso. Lo que quizás no sabías es que podés ser parte con un aporte mensual, sosteniendo el equipamiento y la capacitación de tu cuartel. Sumate como Colaborador Oficial, el link está en nuestra bio.",
    planos: "Arranca con la pregunta a cámara bien cerca (primer plano, genera el gancho); corte a equipo/camión mientras sigue hablando; cierre de nuevo a cámara para el \"sumate\".",
    comoGrabar: "El arranque (la pregunta) grabalo en vivo, primer plano bien cerca, quieto — ahí no conviene moverse, tiene que pegar fuerte. Para el cierre ('Sumate como Colaborador Oficial'), grabalo en vivo caminando hacia la cámara desde la entrada del cuartel, para variar el plano — las dos tomas llevan audio real grabado en el momento, no doblado después.",
  },
];

const FINAL_ITEMS = [
  "Al menos 2 reels grabados (completo + espontáneo)",
  "3-4 tomas sueltas para historias",
  "Permiso verbal de las personas identificables",
  "Todo guardado en una carpeta, ordenado",
];

const STORAGE_KEY = "bvgs_pedido_redes_1_v2";

type Pestana = "reels" | "fotos";
const PESTANAS: { id: Pestana; label: string }[] = [
  { id: "reels", label: "Reels" },
  { id: "fotos", label: "Fotos" },
];

export default function PedidoRedes1() {
  const [fotosChecked, setFotosChecked] = useState<boolean[]>(() => FOTOS.map(() => false));
  const [reelsChecked, setReelsChecked] = useState<boolean[]>(() => REELS.map(() => false));
  const [finalChecked, setFinalChecked] = useState<boolean[]>(() => FINAL_ITEMS.map(() => false));
  const [loaded, setLoaded] = useState(false);
  const [pestana, setPestana] = useState<Pestana>("reels");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fotos) setFotosChecked(parsed.fotos);
        if (parsed.reels) setReelsChecked(parsed.reels);
        if (parsed.final) setFinalChecked(parsed.final);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ fotos: fotosChecked, reels: reelsChecked, final: finalChecked }));
    } catch {}
  }, [fotosChecked, reelsChecked, finalChecked, loaded]);

  const totalItems = FOTOS.length + REELS.length + FINAL_ITEMS.length;
  const done = fotosChecked.filter(Boolean).length + reelsChecked.filter(Boolean).length + finalChecked.filter(Boolean).length;

  function toggleFoto(i: number) {
    setFotosChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
  }

  function toggleReel(i: number) {
    setReelsChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
  }

  function toggleFinal(i: number) {
    setFinalChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
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
            Propuestas de guiones para filmaciones
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", maxWidth: 560, margin: 0 }}>
            Contenido para redes sociales: guiones de reels y ejemplos de cómo encuadrar cada foto. Tildá lo
            que vas completando, y cuando termines mandanos todo el contenido.
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
            {done} / {totalItems} listo
          </span>
        </div>

        {/* PESTAÑAS */}
        <div style={{ display: "flex", gap: 8, margin: "18px 0 6px", borderBottom: `1px solid ${LINE}` }}>
          {PESTANAS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPestana(p.id)}
              style={{
                fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.95rem",
                padding: "10px 18px", border: "none", background: "none", cursor: "pointer",
                color: pestana === p.id ? BRAND : MUTED,
                borderBottom: pestana === p.id ? `2px solid ${BRAND}` : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* FOTOS */}
        <section style={{ padding: "36px 0", display: pestana === "fotos" ? "block" : "none" }}>
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
                        checked={fotosChecked[i]}
                        onChange={() => toggleFoto(i)}
                        style={{ marginTop: 4, width: 17, height: 17, accentColor: BRAND, flexShrink: 0 }}
                      />
                      <div>
                        <div style={{
                          fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1rem", marginBottom: 4,
                          textDecoration: fotosChecked[i] ? "line-through" : "none", color: fotosChecked[i] ? MUTED : INK,
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
        <section style={{ padding: "16px 0 36px", display: pestana === "reels" ? "block" : "none" }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.4rem", margin: "20px 0 6px" }}>
            Reels / videos cortos
          </h2>
          <p style={{ color: MUTED, fontSize: "0.9rem", margin: "0 0 16px" }}>
            Cada reel tiene asignado un local distinto (Cuartel Central, Destacamento 1, Destacamento 2) a
            propósito, para que no quede todo grabado en el mismo lugar.
          </p>

          <div style={{ background: "#eef6ff", border: "1px solid #bcdcff", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: 4 }}>🎥 Así se graba la voz en off (importante, leé esto)</div>
            <div style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6 }}>
              La voz en off <strong>NO</strong> es grabar el audio solo y después tapar con un video mudo — eso es
              muy difícil de sincronizar bien y se nota. Es al revés: se filma una acción real (el camión
              saliendo a un servicio, un bombero vistiéndose, apagando un incendio de auto, un rescate de
              animal, un incendio de una casa/estructura, o una capacitación armada para que lo parezca) y la
              persona dice el guion <strong>en ese mismo momento</strong>, mientras se filma — el audio queda grabado
              junto con la escena, en vivo.
              <br /><br />
              Si la frase es larga, no hace falta decirla toda sobre una sola acción: se puede repetir
              completa <strong>2 o 3 veces</strong>, cada vez sobre algo distinto — caminando hacia la cámara con el
              camión de fondo, mostrando el equipo de protección mientras habla, guardando un material y
              mirando a cámara a mitad de frase, o incluso sosteniendo el micrófono con una pértiga/selfie
              stick para un plano que llame más la atención. Todas son la MISMA frase, grabada en vivo sobre
              acciones distintas — en edición se elige la mejor, o se corta entre ellas. Cada guion de abajo
              tiene su propio recuadro "Cómo grabar" con ideas concretas de qué acción filmar en cada caso.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {REELS.map((r, i) => (
              <div key={r.titulo} style={{ background: "white", border: `1px solid ${LINE}`, borderRadius: 12, padding: "16px 18px" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 6 }}>
                  <input
                    type="checkbox"
                    checked={reelsChecked[i]}
                    onChange={() => toggleReel(i)}
                    style={{ marginTop: 3, width: 17, height: 17, accentColor: BRAND, flexShrink: 0 }}
                  />
                  <div style={{
                    fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1rem",
                    textDecoration: reelsChecked[i] ? "line-through" : "none", color: reelsChecked[i] ? MUTED : INK,
                  }}>
                    {r.titulo}
                  </div>
                </label>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: BRAND, border: `1px solid ${BRAND}`, borderRadius: 999, padding: "2px 8px" }}>{r.dur}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: MUTED, border: `1px solid ${LINE}`, borderRadius: 999, padding: "2px 8px" }}>{r.tag}</span>
                  {r.linkEjemplo && (
                    <a href={r.linkEjemplo} target="_blank" rel="noreferrer" style={{
                      fontSize: "0.68rem", color: "white", background: BRAND, borderRadius: 999,
                      padding: "2px 10px", textDecoration: "none", fontWeight: 700,
                    }}>
                      ▶ Ver ejemplo real
                    </a>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                  <div style={{ background: BG, borderRadius: 8, padding: "9px 11px" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 2 }}>📍 Dónde</div>
                    <div style={{ fontSize: "0.78rem" }}>{r.donde}</div>
                  </div>
                  <div style={{ background: BG, borderRadius: 8, padding: "9px 11px" }}>
                    <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 2 }}>🧑 Quién (sugerencia, no obligatorio)</div>
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
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 4 }}>🎬 Tomas extra (de repuesto, por si falta cubrir algo en edición)</div>
                <div style={{ fontSize: "0.8rem", color: "#555", background: BG, borderRadius: 8, padding: "9px 11px", marginBottom: 8 }}>{r.planos}</div>
                <div style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.03em", color: MUTED, marginBottom: 4 }}>🎥 Cómo grabar la voz en off para esta escena</div>
                <div style={{ fontSize: "0.8rem", color: "#444", background: "#eef6ff", border: "1px solid #d8ecff", borderRadius: 8, padding: "9px 11px" }}>{r.comoGrabar}</div>
              </div>
            ))}
          </div>
        </section>

        {/* STOCK EXTRA */}
        <section style={{ padding: "16px 0 36px", borderTop: `1px solid ${LINE}`, display: pestana === "fotos" ? "block" : "none" }}>
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

        {/* CHECKLIST FINAL */}
        <section style={{ padding: "16px 0 24px", borderTop: `1px solid ${LINE}` }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.4rem", margin: "20px 0 14px" }}>
            Antes de mandarlo, repasá esto
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FINAL_ITEMS.map((item, i) => (
              <label key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", background: "white", border: `1px solid ${LINE}`, borderRadius: 10, padding: "10px 12px" }}>
                <input
                  type="checkbox"
                  checked={finalChecked[i]}
                  onChange={() => toggleFinal(i)}
                  style={{ marginTop: 2, width: 17, height: 17, accentColor: BRAND, flexShrink: 0 }}
                />
                <span style={{ fontSize: "0.85rem", textDecoration: finalChecked[i] ? "line-through" : "none", color: finalChecked[i] ? MUTED : INK }}>
                  {item}
                </span>
              </label>
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
