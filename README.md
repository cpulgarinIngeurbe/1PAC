# PAC - Visualizador de Programaciones

**Plataforma de gestión colaborativa de contratistas de obra**

Este es el MVP (Producto Mínimo Viable) de PAC, diseñado para demostrar la viabilidad técnica de visualizar programaciones de Microsoft Project (.mpp) en una aplicación web moderna.

## 🎯 Objetivo del MVP

Responder: **¿Es posible visualizar un .mpp con calidad comercial sin backend propio?**

✅ Árbol jerárquico expandible  
✅ Diagrama de Gantt interactivo  
✅ Panel de detalles de tareas  
✅ Ruta crítica marcada  
✅ 100% React + TypeScript + TailwindCSS  

## 🚀 Inicio Rápido

```bash
# Instalar
npm install --legacy-peer-deps

# Desarrollo
npm run dev

# Build
npm run build
```

Abre `http://localhost:3000`

## 🏗️ Arquitectura

**Frontend:** React 18 + Vite + TypeScript + TailwindCSS  
**Datos:** JSON en `/data/schedules/` (GitHub como BD)  
**Hosting:** GitHub Pages  
**CI/CD:** GitHub Actions (próximo: conversor .mpp → JSON)  

## 📊 Características

- **Árbol de tareas:** Expandible, searchable, con iconografía
- **Gantt:** SVG nativo, barras de progreso, ruta crítica, línea de hoy
- **Detalles:** Panel lateral con info completa de tarea seleccionada
- **Responsive:** Optimizado para 1920 a 1280px y tablets
- **Animaciones:** Suaves con Framer Motion
- **Color:** #A3C610 (verde corporativo Ingeurbe)

## 📁 Estructura

```
src/
├── components/       # UI reutilizable
│   ├── Button, Card, Drawer, TreeView, GanttChart
├── pages/           # Pantalla principal
├── services/        # Lógica de datos
├── types/           # TypeScript
└── styles/          # CSS global
data/schedules/      # JSON de programaciones
```

## 📈 Ejemplo de JSON

```json
{
  "nombre": "Proyecto Torre 1",
  "tareas": [
    {
      "id": "1",
      "taskId": 1,
      "nombre": "Proyecto Torre 1",
      "inicio": "2024-08-01",
      "fin": "2025-02-28",
      "outlineLevel": 1,
      "avance": 0,
      "critical": false
    }
  ]
}
```

## 🔄 Próximas Fases

1. **Conversor Java:** .mpp → JSON automático (GitHub Actions)
2. **Autenticación:** Por usuario/organización
3. **Base de datos:** Supabase (cuando escale)
4. **PAC Logic:** Cálculo de cumplimiento

## 📝 Licencia

MIT - Ingeurbe 2024
