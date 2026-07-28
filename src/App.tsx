import { useState } from 'react'
import { Programacion } from './types/programacion'
import { VisualizadorProgramaciones } from './pages/VisualizadorProgramaciones'
import { MPPUploader } from './components/MPPUploader'

function App() {
  const [programacion, setProgramacion] = useState<Programacion | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (file: File) => {
    setLoading(true)
    try {
      // Leer el archivo como texto
      const text = await file.text()

      // Intentar parsearlo como JSON
      if (file.name.endsWith('.json')) {
        const data = JSON.parse(text)
        setProgramacion(data)
      } else if (file.name.endsWith('.mpp')) {
        alert(
          'Archivo .mpp detectado.\n\n' +
          'Próximos pasos:\n' +
          '1. El archivo se ha subido\n' +
          '2. Necesita conversor Java para convertir a JSON\n' +
          '3. GitHub Actions procesará automáticamente\n\n' +
          'Por ahora, sube un archivo JSON generado desde el conversor.'
        )
      }
    } catch (error) {
      alert('Error al procesar el archivo: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {programacion ? (
        <>
          <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                {programacion.nombre || 'PAC - Visualizador'}
              </h1>
              <button
                onClick={() => setProgramacion(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cargar otro archivo
              </button>
            </div>
          </div>
          <VisualizadorProgramaciones
            programaciones={[programacion]}
          />
        </>
      ) : (
        <div className="max-w-2xl mx-auto pt-20 px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PAC - Visualizador de Programaciones
            </h1>
            <p className="text-xl text-gray-600">
              Sube tu archivo .mpp o JSON para visualizar la programación
            </p>
          </div>
          <MPPUploader onUpload={handleFileUpload} isLoading={loading} />

          <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <ol className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="font-bold text-brand-500">1.</span>
                <span>Sube un archivo .mpp o JSON con tu programación</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-500">2.</span>
                <span>Visualiza el árbol jerárquico de tareas</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-500">3.</span>
                <span>Explora el diagrama de Gantt interactivo</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-500">4.</span>
                <span>Haz click en tareas para ver detalles</span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
