import { useState, useEffect } from 'react'
import { Programacion } from './types/programacion'
import { VisualizadorProgramaciones } from './pages/VisualizadorProgramaciones'
import { MPPUploader } from './components/MPPUploader'
import { Plus } from 'lucide-react'

function App() {
  const [programaciones, setProgramaciones] = useState<Programacion[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploader, setShowUploader] = useState(false)

  useEffect(() => {
    loadProgramaciones()
  }, [])

  const loadProgramaciones = async () => {
    try {
      setLoading(true)
      const basePath = import.meta.env.BASE_URL
      const indexUrl = `${basePath}data/schedules/index.json`
      console.log('Cargando desde:', indexUrl)

      const response = await fetch(indexUrl)
      if (response.ok) {
        const data = await response.json()
        setProgramaciones(Array.isArray(data) ? data : [data])
        console.log('✓ Programaciones cargadas:', data)
      } else {
        console.log('No hay programaciones aún (404 es normal)')
        setProgramaciones([])
      }
    } catch (error) {
      console.log('Sin programaciones aún -', (error as Error).message)
      setProgramaciones([])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text()

      if (file.name.endsWith('.json')) {
        const data = JSON.parse(text)
        // Agregar a la lista local (en la próxima carga desde GitHub lo tendrá)
        const newProgram = Array.isArray(data) ? data[0] : data
        setProgramaciones((prev) => [...prev, newProgram])
        alert('✓ Archivo cargado. Después de que GitHub procese, se verá automáticamente.')
        setShowUploader(false)
      } else if (file.name.endsWith('.mpp')) {
        alert(
          'Archivo .mpp detectado.\n\n' +
          'Próximos pasos:\n' +
          '1. Sube este .mpp a la carpeta "incoming" en GitHub\n' +
          '2. GitHub Actions lo convertirá automáticamente a JSON\n' +
          '3. Aparecerá aquí en 2-3 minutos\n\n' +
          'No necesitas hacer nada más.'
        )
      }
    } catch (error) {
      alert('Error: ' + (error as Error).message)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando programaciones...</p>
        </div>
      </div>
    )
  }

  if (programaciones.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto pt-20 px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PAC - Visualizador de Programaciones
            </h1>
            <p className="text-xl text-gray-600">
              Sube tu archivo .mpp para comenzar
            </p>
          </div>

          <MPPUploader onUpload={handleFileUpload} />

          <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <ol className="space-y-4 text-gray-600">
              <li className="flex gap-3">
                <span className="font-bold text-brand-500 text-lg">1</span>
                <div>
                  <p className="font-medium text-gray-900">Sube tu .mpp a GitHub</p>
                  <p className="text-sm">Ve a <code className="bg-gray-100 px-2 py-1 rounded">incoming/</code> en el repositorio y sube tu archivo</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-500 text-lg">2</span>
                <div>
                  <p className="font-medium text-gray-900">GitHub Actions lo convierte automáticamente</p>
                  <p className="text-sm">Se transforma a JSON en 2-3 minutos (sin hacer nada más)</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-500 text-lg">3</span>
                <div>
                  <p className="font-medium text-gray-900">Recarga esta página</p>
                  <p className="text-sm">Tu programación aparecerá automáticamente en la lista</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-brand-500 text-lg">4</span>
                <div>
                  <p className="font-medium text-gray-900">Explora y visualiza</p>
                  <p className="text-sm">Árbol jerárquico, Gantt interactivo, detalles de tareas</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">💡 Tip</h3>
            <p className="text-blue-800 text-sm">
              Los cambios en <code className="bg-blue-100 px-2 py-1 rounded">incoming/</code> se detectan automáticamente.
              Solo recarga esta página después de 2-3 minutos para ver tu programación.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <VisualizadorProgramaciones programaciones={programaciones} />

      {!showUploader && (
        <button
          onClick={() => setShowUploader(true)}
          className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-brand-500 text-white rounded-lg shadow-lg hover:bg-brand-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Agregar programación
        </button>
      )}

      {showUploader && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Agregar programación</h2>
              <button
                onClick={() => setShowUploader(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <MPPUploader onUpload={handleFileUpload} />
            <button
              onClick={() => setShowUploader(false)}
              className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
