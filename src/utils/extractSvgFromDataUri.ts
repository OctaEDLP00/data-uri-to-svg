export function extractSvgFromDataUri(dataUri: string): string {
  if (!dataUri || typeof dataUri !== 'string') {
    throw new Error('Invalid input: dataUri must be a non-empty string')
  }

  try {
    const svgContent = dataUri.replace(/^data:image\/svg\+xml(;utf8)?,/, '')

    const decodedSvg = decodeURIComponent(svgContent)
      .replace(/^"(.*)"$/, '$1')
      .replace(/\\"/g, '"')
      .trim()

    if (!decodedSvg.startsWith('<svg')) {
      throw new Error('Decoded content does not appear to be valid SVG')
    }

    return decodedSvg
  } catch (error) {
    console.error('Error decoding SVG:', error)
    throw new Error('Invalid SVG format or malformed data URI')
  }
}
