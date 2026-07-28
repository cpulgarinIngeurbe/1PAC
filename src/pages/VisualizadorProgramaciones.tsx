import { useState, useMemo } from 'react'
import { Programacion, TreeNode } from '@/types/programacion'
import { buildTaskTree, flattenTree } from '@/services/treeBuilder'
import { TreeView } from '@/components/TreeView'
import { GanttChart } from '@/components/GanttChart'
import { Drawer } from '@/components/Drawer'
import { Card, CardBody, CardHeader } from '@/components/Card'
import { ChevronDown } from 'lucide-react'

interface VisualizadorProgramacionesProps {
  programaciones: Programacion[]
}

export function VisualizadorProgramaciones({ programaciones }: VisualizadorProgramacionesProps) {
  const [selectedProgramacion, setSelectedProgramacion] = useState<Programacion | null>(
    programaciones[0] || null,
  )
  const [selectedTask, setSelectedTask] = useState<TreeNode | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const tree = useMemo(() => {
    if (!selectedProgramacion) return []
    return buildTaskTree(selectedProgramacion.tareas)
  }, [selectedProgramacion])

  const flatTasks = useMemo(() => {
    return flattenTree(tree)
  }, [tree])

  const handleSelectTask = (task: TreeNode) => {
    setSelectedTask(task)
    setIsDrawerOpen(true)
  }

  const handleToggleNode = (nodeId: string) => {
    const findAndToggle = (nodes: TreeNode[]): boolean => {
      for (const node of nodes) {
        if (node.id === nodeId) {
          node.expanded = !node.expanded
          return true
        }
        if (node.children && findAndToggle(node.children)) {
          return true
        }
      }
      return false
    }

    findAndToggle(tree)
    // Force re-render
    setSelectedTask(selectedTask ? { ...selectedTask } : null)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">PAC - Visualizador de Programaciones</h1>
          </div>
          <div className="flex items-center gap-2">
            {programaciones.length > 1 && (
              <div className="relative">
                <select
                  value={selectedProgramacion?.nombre || ''}
                  onChange={(e) => {
                    const prog = programaciones.find((p) => p.nombre === e.target.value)
                    setSelectedProgramacion(prog || null)
                    setSelectedTask(null)
                    setIsDrawerOpen(false)
                  }}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {programaciones.map((prog) => (
                    <option key={prog.nombre} value={prog.nombre}>
                      {prog.nombre}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Left sidebar - Tree */}
        <div className="w-80 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-900">Tareas</h2>
            </CardHeader>
            <CardBody className="overflow-y-auto">
              <input
                type="text"
                placeholder="Buscar tareas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              {tree.length > 0 ? (
                <TreeView
                  tree={tree}
                  selectedId={selectedTask?.id}
                  onSelect={handleSelectTask}
                  onToggle={handleToggleNode}
                />
              ) : (
                <div className="text-gray-500 text-sm">No hay tareas disponibles</div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Center - Gantt */}
        <div className="flex-1 flex flex-col gap-4">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <h2 className="text-lg font-bold text-gray-900">Diagrama de Gantt</h2>
            </CardHeader>
            <CardBody className="flex-1 overflow-hidden">
              <GanttChart
                tasks={flatTasks}
                selectedId={selectedTask?.id}
                onSelectTask={handleSelectTask}
              />
            </CardBody>
          </Card>
        </div>

        {/* Right sidebar - Details */}
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false)
            setSelectedTask(null)
          }}
          title="Detalles de Tarea"
          side="right"
        >
          {selectedTask ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nombre</label>
                <p className="text-gray-900 font-medium">{selectedTask.nombre}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nivel</label>
                  <p className="text-gray-900">{selectedTask.outlineLevel}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">ID</label>
                  <p className="text-gray-900 font-mono text-sm">{selectedTask.taskId}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Código WBS</label>
                <p className="text-gray-900">{selectedTask.outline || '-'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Inicio</label>
                  <p className="text-gray-900 text-sm">{formatDate(selectedTask.inicio)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Fin</label>
                  <p className="text-gray-900 text-sm">{formatDate(selectedTask.fin)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Duración</label>
                  <p className="text-gray-900">{selectedTask.duracion ? `${selectedTask.duracion}d` : '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Avance</label>
                  <p className="text-gray-900">{selectedTask.avance ? `${selectedTask.avance}%` : '-'}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Estado</label>
                <div className="flex gap-2">
                  {selectedTask.critical && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium">
                      Ruta Crítica
                    </span>
                  )}
                  {!selectedTask.critical && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                      Normal
                    </span>
                  )}
                </div>
              </div>

              {selectedTask.jsonExtra && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Datos adicionales</label>
                  <pre className="bg-gray-100 rounded p-2 text-xs overflow-auto max-h-48">
                    {JSON.stringify(selectedTask.jsonExtra, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">Selecciona una tarea para ver detalles</div>
          )}
        </Drawer>
      </div>
    </div>
  )
}
