'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface FieldProps {
  label: React.ReactNode
  name: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function Field({
  label,
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-gray-700 font-medium">{label}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className="border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
