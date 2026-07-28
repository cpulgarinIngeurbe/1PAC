import { ChevronRight } from 'lucide-react'
import { TreeNode } from '@/types/programacion'

interface TreeViewProps {
  tree: TreeNode[]
  selectedId?: string
  onSelect: (node: TreeNode) => void
  onToggle: (nodeId: string) => void
}

export function TreeView({ tree, selectedId, onSelect, onToggle }: TreeViewProps) {
  const TreeItem = ({ node, level = 0 }: { node: TreeNode; level?: number }) => {
    const hasChildren = node.children && node.children.length > 0
    const isSelected = selectedId === node.id

    return (
      <div key={node.id}>
        <div
          onClick={() => onSelect(node)}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg transition-colors ${
            isSelected
              ? 'bg-brand-100 text-brand-700 font-medium'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggle(node.id)
              }}
              className="p-0 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${node.expanded ? 'rotate-90' : ''}`}
              />
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          <span className="text-sm truncate flex-1">{node.nombre}</span>
          {node.critical && (
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded font-medium">
              Crítica
            </span>
          )}
        </div>

        {node.expanded &&
          node.children &&
          node.children.map((child) => <TreeItem key={child.id} node={child} level={level + 1} />)}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {tree.map((node) => (
        <TreeItem key={node.id} node={node} />
      ))}
    </div>
  )
}
