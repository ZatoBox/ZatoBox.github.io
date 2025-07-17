# 📧 Configuración EmailJS para ZatoBox Guestbook

## 🚀 Configuración con Gmail

### 1. Crear cuenta en EmailJS
- Ve a [EmailJS.com](https://www.emailjs.com/)
- Regístrate con tu cuenta de **Gmail**
- Verifica tu cuenta de email

### 2. Configurar Gmail en EmailJS
- En el dashboard, ve a "Email Services"
- Agrega tu cuenta de **Gmail** (zatobox@gmail.com)
- Guarda el ID del servicio (ej: `service_zatobox`)
- Los mensajes se enviarán a: zatobox@gmail.com y alcolabs.exe@gmail.com

### 3. Crear template de email
- Ve a "Email Templates"
- Crea un nuevo template llamado `template_guestbook`
- Usa este contenido:

```html
Subject: 📖 Nuevo mensaje en el Guestbook de ZatoBox - {{from_name}}

Hola ZatoBox Team! 🚀

Has recibido un nuevo mensaje en el guestbook:

👤 Nombre: {{from_name}}
📧 Email: {{from_email}}
💬 Mensaje: {{message}}

---
Enviado desde el Guestbook de ZatoBox
🌍 https://zatobox.com
```

### 4. Obtener tu clave pública
- Ve a "Account" → "API Keys"
- Copia tu "Public Key"

### 5. Actualizar el código
En `index.html`, reemplaza `YOUR_PUBLIC_KEY_HERE` con tu clave pública:

```javascript
emailjs.init("TU_CLAVE_PUBLICA_AQUI");
```

### 6. ¡Listo!
- Todos los mensajes del guestbook llegarán a:
  - `zatobox@gmail.com`
  - `alcolabs.exe@gmail.com`
- No necesitas configuración adicional

## 📋 Variables del Template

El template usa estas variables:
- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente  
- `{{message}}` - Mensaje del guestbook
- `{{subject}}` - Asunto del email

## 🔧 Fallback con localStorage

Si EmailJS no está configurado, el sistema tiene un fallback que:

1. **Guarda los mensajes** en el navegador (localStorage)
2. **Muestra confirmación** al usuario
3. **Proporciona instrucciones** para contacto manual

### Ver mensajes guardados
En la consola del navegador, ejecuta:
```javascript
viewGuestbookMessages()  // Ver todos los mensajes
clearGuestbookMessages() // Limpiar mensajes
```

### Exportar mensajes
Los mensajes se guardan en formato JSON y puedes copiarlos desde la consola.

## 🔧 Configuración Avanzada

### Personalizar el template
Puedes personalizar el template con HTML, CSS y variables adicionales.

### Configurar notificaciones
- Ve a "Account" → "Notifications"
- Configura alertas por email cuando recibas mensajes

### Límites gratuitos
- EmailJS Free: 200 emails/mes
- EmailJS Starter: 1,000 emails/mes ($15/mes)
- EmailJS Pro: 10,000 emails/mes ($35/mes)

## 🛠️ Troubleshooting

### Error: "EmailJS not defined"
- Verifica que la librería esté cargada correctamente
- Revisa la consola del navegador

### Error: "Service not found"
- Verifica el ID del servicio en EmailJS
- Asegúrate de que el servicio esté activo

### Error: "Template not found"
- Verifica el ID del template
- Asegúrate de que el template esté publicado

## 📞 Soporte

- EmailJS Docs: https://www.emailjs.com/docs/
- ZatoBox Support: zatobox@gmail.com
- Alcolabs Support: alcolabs.exe@gmail.com 