# PAC - Visualizador de Programaciones

Visualizador web para explorar programaciones de Microsoft Project con interfaz moderna.

## 🚀 Flujo completo

```
Tu .mpp
  ↓
Sube a /incoming en GitHub
  ↓
GitHub Actions detecta cambio
  ↓
Conversor Java (MPXJ) transforma .mpp → JSON
  ↓
JSON se guarda en /public/data/schedules/
  ↓
GitHub Pages actualiza la app
  ↓
¡Visualiza tu programación!
```

---

## 📤 1. Sube tu .mpp

### Opción A: GitHub Web (recomendado, sin necesidad de Git)

1. Ve a https://github.com/cpulgarinIngeurbe/1PAC
2. Abre carpeta `incoming/`
3. Click "Add file" → "Upload files"
4. Arrastra tu archivo `.mpp`
5. Click "Commit changes"

### Opción B: Git CLI

```bash
git clone https://github.com/cpulgarinIngeurbe/1PAC.git
cd 1PAC
cp tu-proyecto.mpp incoming/
git add incoming/tu-proyecto.mpp
git commit -m "add: Agregar programación"
git push
```

---

## ⏱️ 2. Espera a que se convierta

1. Ve a la pestaña **Actions** en GitHub
2. Espera a que termine el workflow "Convertir .mpp a JSON"
3. Debe mostrar ✅ (verde)

**Tiempo:** ~2-3 minutos

---

## 👁️ 3. Visualiza tu programación

1. Abre https://cpulgarinIngeurbe.github.io/1PAC/
2. Haz click en "Cargar archivo"
3. Busca tu archivo `.json` en el repositorio:
   - Ruta: `public/data/schedules/tu-proyecto.json`
4. Descárgalo y súbelo a la app
5. ¡Explora tu Gantt! 📊

---

## ✨ Características

- ✅ Árbol jerárquico expandible
- ✅ Diagrama de Gantt interactivo  
- ✅ Panel de detalles de tareas
- ✅ Ruta crítica marcada
- ✅ Conversión automática .mpp → JSON
- ✅ Totalmente en GitHub (sin servidor local)

---

## 🔧 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Converter:** Java 17 + MPXJ 13
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

---

## 📋 Requisitos

**Para el uploader:**
- Ninguno (todo es web-based)

**Para el conversor (ejecuta automáticamente en GitHub):**
- Java 17 ✅ (instalado en GitHub Actions)
- Maven ✅ (instalado en GitHub Actions)

---

## 🐛 Solución de problemas

### El workflow falla
- Ve a **Actions** → Haz click en el workflow fallido
- Lee el log rojo para ver el error
- Problemas comunes:
  - Archivo `.mpp` corrupto
  - Nombre con espacios (usa guiones: `mi-proyecto.mpp`)

### El JSON no aparece
- Verifica que el workflow terminó correctamente (✅)
- Espera 1-2 minutos más
- Refresca la página

### ¿Mi .mpp no se detecta?
- Verifica que está en la carpeta `incoming/`
- El nombre debe terminar en `.mpp` (minúscula)
- No debe haber espacios en el nombre

---

## 📊 Desarrollo local

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:3000
npm run build        # Build para producción
npm run type-check   # Verificar tipos
```

---

## 📝 Próximos pasos

- [ ] Agregar autenticación
- [ ] Integrar con Microsoft Project Online
- [ ] Dashboards de progreso
- [ ] Notificaciones de cambios

---

## 📖 Documentación

- [Cómo subir .mpp](incoming/README.md) - Instrucciones detalladas
- [GitHub Actions](https://docs.github.com/en/actions) - Documentación oficial

---

## 📝 Licencia

MIT - Ingeurbe 2024
