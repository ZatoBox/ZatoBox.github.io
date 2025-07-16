# 📁 Estructura del Proyecto ZatoBox

## Organización de Carpetas

```
zatobox/
├── index.html              # Página principal
├── styles.css              # Estilos retro
├── script.js               # JavaScript interactivo
├── README.md               # Documentación principal
├── STRUCTURE.md            # Este archivo
└── images/                 # Carpeta de imágenes
    ├── Frame 48095649 2.png    # Logo principal de ZatoBox
    └── [otras imágenes...]     # Futuras imágenes del proyecto
```

## 📂 Descripción de Carpetas

### `/images/`
- **Propósito**: Almacenar todas las imágenes del proyecto
- **Contenido**: Logos, iconos, GIFs, y cualquier recurso visual
- **Formato**: PNG, JPG, GIF, SVG
- **Nomenclatura**: Usar nombres descriptivos en minúsculas con guiones

### Archivos Principales
- **`index.html`**: Estructura HTML de la página
- **`styles.css`**: Estilos CSS con efectos retro
- **`script.js`**: Funcionalidades JavaScript y easter eggs
- **`README.md`**: Documentación completa del proyecto

## 🎨 Gestión de Imágenes

### Convenciones de Nomenclatura
- Usar nombres descriptivos: `logo-zatobox.png`, `icon-bitcoin.svg`
- Evitar espacios: usar guiones o guiones bajos
- Incluir dimensiones si es relevante: `banner-1200x600.png`

### Optimización
- Comprimir imágenes para web
- Usar formatos apropiados (PNG para logos, JPG para fotos)
- Considerar diferentes resoluciones para responsive design

## 🔗 Referencias en el Código

### HTML
```html
<img src="images/logo-zatobox.png" alt="ZatoBox Logo">
```

### CSS
```css
background-image: url('images/background.png');
```

### JavaScript
```javascript
// Cargar imágenes dinámicamente
const img = new Image();
img.src = 'images/dynamic-content.png';
```

## 📋 Checklist para Nuevas Imágenes

- [ ] Guardar en la carpeta `/images/`
- [ ] Usar nombre descriptivo
- [ ] Optimizar para web
- [ ] Actualizar referencias en el código
- [ ] Verificar que se carga correctamente

## 🚀 Despliegue

Al subir el proyecto a un servidor web, asegúrate de:
1. Mantener la estructura de carpetas
2. Verificar que las rutas relativas funcionen
3. Comprobar que todas las imágenes se cargan correctamente

---

*Esta estructura mantiene el proyecto organizado y facilita el mantenimiento.* 