# PAC - Visualizador de Programaciones

Visualizador automático para explorar programaciones de Microsoft Project.

---

## 🚀 **Flujo 100% Automático**

### **Paso 1️⃣: Sube tu .mpp a GitHub**

1. Ve a: https://github.com/cpulgarinIngeurbe/1PAC
2. Abre la carpeta `incoming/`
3. Click: **"Add file" → "Upload files"**
4. Arrastra tu `.mpp`
5. Click: **"Commit changes"**

### **Paso 2️⃣: GitHub Actions convierte y deploya automáticamente**

✅ Se ejecuta automáticamente:
1. **Conversión**: Detecta tu `.mpp` → Convierte a JSON (MPXJ)
2. **Indexación**: Actualiza `index.json` automáticamente
3. **Deploy**: Despliega a GitHub Pages automáticamente

⏱️ **Tiempo total:** ~2-3 minutos

### **Paso 3️⃣: Recarga y visualiza**

1. Abre: https://cpulgarinIngeurbe.github.io/1PAC/
2. **Recarga la página** (Ctrl+F5) después de 2-3 minutos
3. Tu programación aparece automáticamente
4. ¡Explora el árbol jerárquico y Gantt! 📊

### **Para eliminar una programación:**

1. Ve a GitHub → `Code` → `public/data/schedules/`
2. Elimina el archivo `.json` que quieras
3. Commit automático → Deploy automático
4. **Recarga la página** → Desaparece automáticamente

---

## ✨ **Lo especial**

✅ **Totalmente automático** - No necesitas hacer nada más después de subir
✅ **Sin servidor propio** - Todo funciona desde GitHub
✅ **Sin instalar nada** - Solo navegador web
✅ **En tiempo real** - Los cambios se ven inmediatamente

---

## 📋 **¿Qué necesitas?**

- ✅ Tu archivo `.mpp`
- ✅ Navegador web
- ✅ Cuenta de GitHub (para subir)

---

## 📊 **Características**

- Árbol jerárquico expandible
- Diagrama de Gantt interactivo
- Detalles de tareas en panel lateral
- Ruta crítica marcada (tareas críticas)
- Búsqueda de tareas
- Responsive design

---

## 🔧 **Stack**

- React 18 + TypeScript (Frontend)
- Java 17 + MPXJ 13 (Conversor)
- GitHub Actions (CI/CD)
- Vite (Build)
- TailwindCSS (Estilos)

---

## ❓ **Preguntas frecuentes**

**¿Dónde subo el .mpp?**
→ Carpeta `incoming/` en el repositorio

**¿Cuánto tarda en convertirse?**
→ 2-3 minutos (GitHub Actions automático)

**¿Cómo sé que se convirtió?**
→ Ve a "Actions" en GitHub, verás el workflow ejecutándose

**¿Necesito hacer algo especial?**
→ No, solo sube y recarga la página después de 2-3 minutos

**¿Se pierden los datos antiguos?**
→ No, puedes tener múltiples .mpp subidos (múltiples programaciones)

---

## 📝 **Licencia**

MIT - Ingeurbe 2024
