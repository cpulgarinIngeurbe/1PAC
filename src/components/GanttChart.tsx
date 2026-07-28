import { useMemo } from 'react'
import { TreeNode } from '@/types/programacion'

interface GanttChartProps {
  tasks: TreeNode[]
  selectedId?: string
  onSelectTask: (task: TreeNode) => void
}

export function GanttChart({ tasks, selectedId, onSelectTask }: GanttChartProps) {
  const { startDate, endDate, pixelPerDay } = useMemo(() => {
    let start = new Date(2099, 0, 1)
    let end = new Date(1900, 0, 1)

    tasks.forEach((task) => {
      if (task.inicio) {
        const d = new Date(task.inicio)
        if (d < start) start = d
      }
      if (task.fin) {
        const d = new Date(task.fin)
        if (d > end) end = d
      }
    })

    if (start > end) {
      start = new Date()
      end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000)
    }

    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const pixelPerDay = Math.max(1, 60 / (daysDiff || 1))

    return { startDate: start, endDate: end, pixelPerDay }
  }, [tasks])

  const today = new Date()
  const todayPixels =
    ((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * pixelPerDay

  const getTaskBar = (task: TreeNode) => {
    if (!task.inicio || !task.fin) return null

    const start = new Date(task.inicio)
    const end = new Date(task.fin)

    const offsetDays = (start.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    const durationDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

    const x = offsetDays * pixelPerDay
    const width = durationDays * pixelPerDay

    return {
      x: Math.max(0, x),
      width: Math.max(1, width),
      completion: (task.avance || 0) / 100,
    }
  }

  const chartWidth = ((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * pixelPerDay

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-auto flex-1">
      <svg
        width={Math.max(800, chartWidth + 100)}
        height={Math.max(400, tasks.length * 32 + 100)}
        className="bg-white"
      >
        {/* Grid y headers */}
        <defs>
          <pattern id="grid" width="50" height="1" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0" fill="none" stroke="#f0f0f0" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Línea de hoy */}
        {todayPixels > 0 && todayPixels < chartWidth && (
          <>
            <line
              x1={todayPixels}
              y1="0"
              x2={todayPixels}
              y2={tasks.length * 32 + 50}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text x={todayPixels + 5} y="20" fontSize="12" fill="#ef4444" fontWeight="bold">
              Hoy
            </text>
          </>
        )}

        {/* Barras de tareas */}
        {tasks.map((task, index) => {
          const bar = getTaskBar(task)
          const isSelected = selectedId === task.id
          const y = index * 32 + 50

          if (!bar) {
            return (
              <text
                key={task.id}
                x="10"
                y={y + 18}
                fontSize="12"
                fill="#999"
                textAnchor="start"
              >
                Sin fechas
              </text>
            )
          }

          return (
            <g key={task.id} onClick={() => onSelectTask(task)} style={{ cursor: 'pointer' }}>
              {/* Fondo de la fila */}
              <rect
                x="0"
                y={y}
                width={chartWidth + 100}
                height="32"
                fill={isSelected ? '#f0fdf4' : 'transparent'}
                onClick={() => onSelectTask(task)}
              />

              {/* Barra de progreso */}
              <rect
                x={bar.x}
                y={y + 8}
                width={bar.width}
                height="16"
                fill={task.critical ? '#ef4444' : '#a3c610'}
                opacity={0.3}
                rx="2"
              />

              {/* Barra de progreso completado */}
              {bar.completion > 0 && (
                <rect
                  x={bar.x}
                  y={y + 8}
                  width={bar.width * bar.completion}
                  height="16"
                  fill={task.critical ? '#ef4444' : '#a3c610'}
                  rx="2"
                />
              )}

              {/* Borde de la barra */}
              <rect
                x={bar.x}
                y={y + 8}
                width={bar.width}
                height="16"
                fill="none"
                stroke={isSelected ? '#a3c610' : '#999'}
                strokeWidth="1"
                rx="2"
              />

              {/* Porcentaje de avance (si existe) */}
              {task.avance && task.avance > 0 && (
                <text
                  x={bar.x + bar.width / 2}
                  y={y + 18}
                  fontSize="10"
                  fill="#fff"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {task.avance}%
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
