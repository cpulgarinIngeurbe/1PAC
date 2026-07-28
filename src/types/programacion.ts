export interface Tarea {
  id: string
  taskId: number
  parent: number | null
  outline: string | null
  outlineLevel: number
  nombre: string
  inicio: string | null
  fin: string | null
  duracion: number | null
  avance: number | null
  critical: boolean
  jsonExtra: Record<string, any> | null
}

export interface TareaPredecesora {
  id: string
  tareaId: string
  predecesora: string
  tipo: 'FS' | 'SS' | 'FF' | 'SF'
  lag: number
}

export interface Programacion {
  id?: string
  nombre: string
  archivo?: string
  fecha?: string
  version?: number
  tareas: Tarea[]
  predecesoras?: TareaPredecesora[]
}

export interface TreeNode extends Tarea {
  children?: TreeNode[]
  expanded?: boolean
}
