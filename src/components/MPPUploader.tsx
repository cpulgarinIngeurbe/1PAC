import { useState } from 'react'
import { Upload } from 'lucide-react'

interface MPPUploaderProps {
  onUpload: (file: File) => void
  isLoading?: boolean
}

export function MPPUploader({ onUpload, isLoading }: MPPUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files[0]?.name.endsWith('.mpp')) {
      onUpload(files[0])
    } else {
      alert('Por favor, sube un archivo .mpp')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-brand-500 bg-brand-50'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400'
      }`}
    >
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Sube tu archivo .mpp
      </h3>
      <p className="text-gray-600 mb-4">
        Arrastra y suelta tu archivo aquí o haz clic para seleccionar
      </p>
      <input
        type="file"
        accept=".mpp"
        onChange={handleFileSelect}
        disabled={isLoading}
        className="hidden"
        id="mpp-input"
      />
      <label
        htmlFor="mpp-input"
        className="inline-block px-6 py-2 bg-brand-500 text-white rounded-lg font-medium cursor-pointer hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Procesando...' : 'Seleccionar archivo'}
      </label>
    </div>
  )
}
