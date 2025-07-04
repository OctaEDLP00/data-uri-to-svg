import { SVGConverter } from './utils/index.ts'

new SVGConverter(
  '#dataUriSvg', // Selector del textarea de entrada
  '#preview', // Selector del iframe de preview
  '#transformBtn', // Selector del botón de conversión
  '#copyBtn', // Selector del botón de copiar
  '#downloadSvg',
  '#svgEditor',
)
