# 📤 Carpeta de entrada para .mpp

**Aquí subes tus archivos .mpp**

## 🚀 Cómo funciona

1. **Sube tu archivo .mpp** a esta carpeta en GitHub
2. **GitHub Actions** detecta automáticamente el cambio
3. **Convierte** el .mpp a JSON
4. **Guardalo** en `public/data/schedules/`
5. **Visualízalo** inmediatamente en la app

## 📋 Pasos

### Opción 1: GitHub Web UI (más fácil)

1. Abre https://github.com/cpulgarinIngeurbe/1PAC
2. Navega a la carpeta `incoming/`
3. Click en "Add file" → "Upload files"
4. Arrastra tu `.mpp`
5. Commit
6. GitHub Actions se ejecuta automáticamente ✅

### Opción 2: Git CLI

```bash
git clone https://github.com/cpulgarinIngeurbe/1PAC.git
cd 1PAC
cp mi-proyecto.mpp incoming/
git add incoming/mi-proyecto.mpp
git commit -m "add: Agregar programación de mi proyecto"
git push
```

## ⏱️ Tiempo de procesamiento

- **Detección:** ~1-2 minutos
- **Conversión:** ~30 segundos
- **Visualización:** Inmediata después

## ✅ Verificar

1. Ve a la pestaña "Actions" en GitHub
2. Busca el workflow "Convertir .mpp a JSON"
3. Si es verde ✅, la conversión fue exitosa
4. Si es roja ❌, revisa el log del error

## 📊 Ver resultado

Después de subir:
1. Abre la app: https://cpulgarinIngeurbe.github.io/1PAC/
2. Haz clic en "Cargar archivo"
3. Sube el `.json` generado
4. ¡Visualiza tu programación! 🎉
