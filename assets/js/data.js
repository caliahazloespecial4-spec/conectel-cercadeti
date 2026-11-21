/* Textos, guías y preguntas frecuentes editables. */
window.CONECTEL_DATA = {
  categorias: [
    {id:'internet', titulo:'No tengo internet', texto:'Sin conexión, cortes o router sin señal.', icono:'wifi', area:'Soporte técnico', tipo:'averia'},
    {id:'lento', titulo:'Mi internet está lento', texto:'Problemas de velocidad o conexión Wi-Fi.', icono:'alert', area:'Soporte técnico', tipo:'averia'},
    {id:'tv', titulo:'Problemas con mi TV', texto:'Canales, señal o reprogramación.', icono:'tv', area:'Soporte técnico / TV', tipo:'averia'},
    {id:'pagos', titulo:'Pagos y recibos', texto:'Consultar montos, comprobantes o vencimientos.', icono:'receipt', area:'Atención administrativa', tipo:'consulta'},
    {id:'planes', titulo:'Planes y contrataciones', texto:'Precios, velocidad, instalación y cobertura.', icono:'grid', area:'Asesoría comercial', tipo:'consulta'},
    {id:'especializada', titulo:'Atención especializada', texto:'Úsala si la atención general no resolvió tu problema o no te atendieron correctamente.', icono:'headphones', area:'Atención especializada · 960 737 675', tipo:'averia'},
    {id:'otros', titulo:'Otra consulta o solicitud', texto:'Cambios, sugerencias y orientación general.', icono:'message', area:'Atención al cliente', tipo:'consulta'}
  ],
  pasosInternet: [
    'Verifica que el router esté conectado a la corriente y encendido.',
    'Observa las luces Power, PON y LOS del router. Si LOS está roja o parpadea, comunícalo en tu reporte.',
    'Revisa si el problema sucede en un solo equipo o en todos.',
    'Si es seguro hacerlo, reinicia el router una sola vez y espera unos minutos.',
    'Si continúa el problema, registra tu avería con los datos y la zona.'
  ],
  preguntas: [
    {q:'¿Dónde reporto una avería?', a:'Ingresa a «Reportar avería», selecciona el problema y describe lo sucedido. Rellena el formulario y se abrirá el WhatsApp de atención general con el texto preparado. Debes pulsar Enviar en el chat. Si ya solicitaste ayuda y no recibiste una solución satisfactoria, usa Atención especializada.'},
    {q:'¿Qué significan las luces del router?', a:'Power indica energía. PON suele mostrar el estado de la conexión óptica. Una luz LOS roja o parpadeante puede indicar pérdida de señal. Los indicadores pueden variar según el modelo.'},
    {q:'¿Por qué mi Wi-Fi se siente lento?', a:'La velocidad puede variar por distancia al router, paredes, interferencias y número de dispositivos. Prueba acercarte al equipo y comparar las bandas de 2.4 GHz y 5 GHz si tu router las admite.'},
    {q:'¿Cómo vuelvo a buscar los canales de TV?', a:'Desde el menú de tu televisor, entra a configuración de canales y utiliza la función de búsqueda automática compatible con tu instalación. Los pasos cambian según la marca de TV.'},
    {q:'¿Puedo pagar desde esta aplicación?', a:'No se realizan cobros dentro de la app. Puedes preparar un reporte de pago y elegir una imagen de comprobante. La foto se previsualiza, pero debes adjuntarla manualmente después de abrir el chat de WhatsApp. Conectel verifica el pago.'},
    {q:'¿Cómo reviso una solicitud?', a:'Con la conexión central activada, «Mis solicitudes» muestra tu historial y el estado actualizado por Conectel. En modo demo, se conserva solo en el navegador.'},
    {q:'¿Cómo sé si hay cobertura?', a:'Ingresa a «Planes y cobertura», selecciona tu localidad y solicita confirmación al equipo comercial. La ubicación por sí sola no confirma disponibilidad.'}
  ]
};
