export function isValidSvgDataUri(input: string): boolean {
  if (!input || typeof input !== 'string') return false

  const trimmed = input.trim()

  // Verificar el formato básico
  if (!trimmed.startsWith('data:image/svg+xml')) return false

  // Verificar que tenga contenido después del header
  const parts = trimmed.split(',')
  if (parts.length < 2 || !parts[1]) return false

  return true
}
