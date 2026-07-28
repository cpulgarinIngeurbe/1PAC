import { useState, useEffect } from 'react'
import { VisualizadorProgramaciones } from './pages/VisualizadorProgramaciones'
import { Programacion } from './types/programacion'

function App() {
  const [programaciones, setProgramaciones] = useState<Programacion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgramaciones()
  }, [])

  const loadProgramaciones = async () => {
    try {
      setLoading(true)
      const basePath = import.meta.env.BASE_URL
      const url = `${basePath}data/schedules/index.json`
      console.log('Loading from:', url)
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        console.log('Loaded programaciones:', data)
        setProgramaciones(data)
      } else {
        console.error('Failed to load:', response.status)
      }
    } catch (error) {
      console.error('Error loading programaciones:', error)
    } finally {
      setLoading(false)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <VisualizadorProgramaciones programaciones={programaciones} />
    </div>
  )
}

export default App
