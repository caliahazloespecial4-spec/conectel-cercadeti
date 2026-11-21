/* EDITA ESTE ARCHIVO PARA PERSONALIZAR TU APP. NO COLOQUES CONTRASEÑAS NI CLAVES API AQUÍ. */
window.CONECTEL_CONFIG = {
  nombre: 'Conectel',
  supabase: { url: '', publishableKey: '' }, // Configura en Supabase: Project URL y anon/publishable key. NUNCA service_role.
  eslogan: 'Tu conexión perfecta, ahora',
  whatsapp: '51968447790', // Formato internacional, p. ej. 51XXXXXXXXX. Vacío = botón deshabilitado.
  telefono: '968447790', // Atención general, llamadas, WhatsApp, Yape y reporte de pagos.
  canales: { general: '51968447790', especializado: '51960737675' }, // Destinatarios de alertas oficiales (API de Meta requerida).
  correo: '', // Correo oficial de soporte, si aplica.
  direccion: 'La Unión, Piura',
  horario: 'Consulta los horarios vigentes con Conectel',
  zonas: ['La Unión', 'La Arena', 'Vice', 'San Clemente', 'Bellavista', 'Bernal', 'Otra localidad'],
  planes: [
    { id:'p100', nombre:'Fibra 100', velocidad:'100 Mbps', precio:'S/ 49.90', descripcion:'Para navegar, estudiar y conectarte.' },
    { id:'p300', nombre:'Fibra 300', velocidad:'300 Mbps', precio:'S/ 79.90', descripcion:'Ideal para videollamadas, trabajo y streaming.', destacado:true },
    { id:'p600', nombre:'Fibra 600', velocidad:'600 Mbps', precio:'S/ 109.90', descripcion:'Más velocidad para hogares conectados.' },
    { id:'p1000', nombre:'Fibra 1000', velocidad:'1000 Mbps', precio:'S/ 149.90', descripcion:'Alternativa empresarial de alto rendimiento.' }
  ],
  avisoPlanes: 'Precios referenciales del material de trabajo. Verifica cobertura, vigencia, condiciones y disponibilidad con Conectel antes de contratar.',
  pago: { instrucciones: 'Consulta con Conectel los medios de pago y los datos oficiales antes de realizar un abono.', enlace: '' },
  atencion: { tiempoEstimado: 'El tiempo de respuesta depende de la evaluación del equipo de Conectel.' }
};
