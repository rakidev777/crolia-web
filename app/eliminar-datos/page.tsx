export const metadata = { title: "Eliminar mis datos — Crolia" }

export default function EliminarDatosPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px", fontFamily: "sans-serif", lineHeight: 1.7, color: "#222" }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Solicitud de eliminación de datos</h1>
      <p style={{ color: "#666", marginBottom: 40 }}>Última actualización: junio de 2025</p>

      <p>Si querés que eliminemos tus datos personales de nuestros sistemas, envianos un email a <a href="mailto:rakidev777@gmail.com" style={{ color: "#8B5E3C" }}>rakidev777@gmail.com</a> con el asunto <strong>"Eliminar mis datos"</strong>.</p>

      <p>Procesaremos tu solicitud en un plazo máximo de 30 días hábiles y te confirmaremos la eliminación por email.</p>

      <h2 style={{ fontSize: 20, marginTop: 32 }}>¿Qué datos se eliminan?</h2>
      <ul>
        <li>Historial de conversaciones con nuestros agentes</li>
        <li>Datos de contacto proporcionados</li>
        <li>Cualquier otro dato personal asociado a tu cuenta</li>
      </ul>
    </main>
  )
}
