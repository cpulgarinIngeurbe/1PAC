import { Tarea, TreeNode } from '@/types/programacion'

export function buildTaskTree(tareas: Tarea[]): TreeNode[] {
  const tree: TreeNode[] = []
  const taskMap = new Map<number, TreeNode>()

  tareas.forEach((tarea) => {
    const node: TreeNode = {
      ...tarea,
      children: [],
      expanded: true,
    }
    taskMap.set(tarea.taskId, node)
  })

  tareas.forEach((tarea) => {
    const node = taskMap.get(tarea.taskId)!
    if (tarea.parent === null || tarea.parent === 0) {
      tree.push(node)
    } else {
      const parent = taskMap.get(tarea.parent)
      if (parent) {
        parent.children ??= []
        parent.children.push(node)
      }
    }
  })

  return tree
}

export function flattenTree(tree: TreeNode[]): TreeNode[] {
  const result: TreeNode[] = []

  const traverse = (node: TreeNode) => {
    result.push(node)
    if (node.expanded && node.children) {
      node.children.forEach(traverse)
    }
  }

  tree.forEach(traverse)
  return result
}

export function searchTree(tree: TreeNode[], query: string): TreeNode[] {
  const results: Set<TreeNode> = new Set()
  const lowerQuery = query.toLowerCase()

  const traverse = (node: TreeNode, includeParents = false): boolean => {
    const matches = node.nombre.toLowerCase().includes(lowerQuery)

    if (matches || includeParents) {
      results.add(node)
      if (node.children) {
        node.children.forEach((child) => traverse(child, matches))
      }
      return true
    } else if (node.children) {
      let found = false
      node.children.forEach((child) => {
        if (traverse(child, false)) {
          found = true
        }
      })
      if (found) {
        results.add(node)
      }
      return found
    }
    return false
  }

  tree.forEach((node) => traverse(node))
  return Array.from(results)
}

export function expandToDepth(tree: TreeNode[], depth: number): void {
  const traverse = (node: TreeNode, currentDepth: number) => {
    node.expanded = currentDepth < depth
    if (node.children) {
      node.children.forEach((child) => traverse(child, currentDepth + 1))
    }
  }

  tree.forEach((node) => traverse(node, 0))
}
