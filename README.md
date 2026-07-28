# PAC - Visualizador de Programaciones

Visualizador web para explorar programaciones de Microsoft Project (.mpp) con interfaz moderna.

## 🚀 Inicio Rápido

```bash
# Instalar
npm install --legacy-peer-deps

# Desarrollo
npm run dev

# Build para producción
npm run build
```

## 📤 ¿Cómo usar?

1. **Abre la aplicación** (http://localhost:3000)
2. **Sube un archivo .mpp o JSON** con tu programación
3. **Explora** el árbol de tareas y el Gantt interactivo
4. **Haz click** en cualquier tarea para ver detalles

## 📋 Formatos soportados

### JSON (Recomendado - para visualizar ahora)
```json
{
  "nombre": "Mi Proyecto",
  "tareas": [
    {
      "id": "1",
      "taskId": 1,
      "nombre": "Tarea 1",
      "inicio": "2024-08-01",
      "fin": "2024-08-15",
      "outlineLevel": 1,
      "avance": 50,
      "critical": false
    }
  ]
}
```

### .mpp (próximo paso - necesita conversor Java)
El conversor Java con MPXJ transformará automáticamente .mpp → JSON.

## ✨ Características

- ✅ Árbol jerárquico expandible
- ✅ Diagrama de Gantt interactivo
- ✅ Panel de detalles de tareas
- ✅ Ruta crítica marcada
- ✅ Responsive design
- ✅ Sin backend requerido

## 🔧 Tech Stack

- React 18 + TypeScript
- Vite 5 (bundler)
- TailwindCSS 3
- Framer Motion (animaciones)
- Lucide React (iconografía)

## 📊 Próximos pasos

1. Crear conversor Java (MPXJ) para .mpp → JSON
2. Automatizar con GitHub Actions
3. Agregar autenticación
4. Integrar con Supabase (si es necesario)

## 📝 Licencia

MIT - Ingeurbe 2024
