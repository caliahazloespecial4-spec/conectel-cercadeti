# CONECTEL — V8: perfil simple sin contraseña

## Cómo abrirlo
Abre `index.html` (recomendado: Live Server en Visual Studio Code). `index.html` te lleva a `paginas/inicio.html`.

## Cómo funciona el saludo
- Al entrar por primera vez se muestra **¡Hola, Invitado!**.
- En `paginas/acceso.html` (Personalizar saludo), se escribe solo un nombre y se pulsa **Guardar mi nombre**.
- En adelante, el sitio mostrará **¡Hola, [nombre]!** en Inicio y Mi perfil.
- El nombre se conserva con `localStorage` del navegador, sin contraseña, cuentas ni base de datos.
- **Continuar como Invitado** borra solo el nombre visible.
- En Mi perfil se pueden guardar opcionalmente datos del contrato para rellenar formularios.

## Historial de solicitudes
Las solicitudes preparadas en Reportar avería o Pagos quedan en `localStorage` del navegador y pueden verse en Mis solicitudes. El historial no indica que la empresa haya recibido el mensaje, ni se sincroniza entre dispositivos. Para contactar se abre WhatsApp con un mensaje redactado; se debe presionar Enviar. Los comprobantes de pagos deben adjuntarse manualmente en WhatsApp.

## Carpetas
`paginas/` reúne una página HTML por sección. `assets/css/` tiene los estilos y `assets/js/shared.js` controla la personalización y formularios. Números de atención en `assets/js/config.js`.

## Nota de privacidad
El nombre visible es solo una preferencia local, no verifica la identidad del titular. En un equipo compartido, otras personas que abran el mismo navegador podrían ver la información guardada. Borrar datos del navegador puede eliminar el perfil y las solicitudes.
