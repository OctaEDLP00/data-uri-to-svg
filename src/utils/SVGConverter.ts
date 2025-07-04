import { extractSvgFromDataUri, formatSvgCode, isValidSvgDataUri, $ } from './index'
import { EditorSVG } from '../modules/EditorSVG'

export class SVGConverter {
  private inputElement: HTMLTextAreaElement
  private previewIframe: HTMLIFrameElement
  private transformBtn: HTMLButtonElement
  private copyBtn: HTMLButtonElement
  private downloadBtn: HTMLButtonElement
  private editor: EditorSVG

  constructor(
    inputSelector: string,
    previewSelector: string,
    transformBtnSelector: string,
    copyBtnSelector: string,
    downloadBtnSelector: string,
    editorContainerSelector: string,
  ) {
    this.inputElement = $(inputSelector)
    this.previewIframe = $(previewSelector)
    this.transformBtn = $(transformBtnSelector)
    this.copyBtn = $(copyBtnSelector)
    this.downloadBtn = $(downloadBtnSelector)
    const container = $(editorContainerSelector)

    this.editor = new EditorSVG(container)
    this.transformBtn.addEventListener('click', () => this.convert())
    this.copyBtn.addEventListener('click', () => this.copyToClipboard())
    this.downloadBtn.addEventListener('click', () => this.downloadSvg())
  }

  async convert(): Promise<void> {
    try {
      const input = this.inputElement.value
      if (!isValidSvgDataUri(input)) {
        throw new Error('Invalid SVG data URI format')
      }

      const svgContent = extractSvgFromDataUri(input)
      const formatted = formatSvgCode(svgContent)

      this.displayPreview(svgContent)
      this.displayCode(formatted)
    } catch (error) {
      console.error('Conversion error:', error)
      this.showError(error instanceof Error ? error.message : 'Conversion failed')
    }
  }

  private displayPreview(svgContent: string): void {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    this.previewIframe.src = URL.createObjectURL(blob)
  }

  private displayCode(formattedSvg: string): void {
    this.editor.value = formattedSvg
  }

  private copyToClipboard(): void {
    navigator.clipboard
      .writeText(this.editor.value)
      .then(() => this.showFeedback('✓ Copied'))
      .catch(err => console.error('Copy failed:', err))
  }

  private downloadSvg(): void {
    try {
      if (!this.editor) {
        throw new Error('Editor not initialized')
      }

      const svgContent = this.editor.value
      if (!svgContent) {
        throw new Error('No SVG content to download')
      }

      // Crear blob
      const blob = new Blob([svgContent], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)

      // Crear elemento <a> temporal
      const a = document.createElement('a')
      a.href = url
      a.download = this.generateDownloadName()
      document.body.appendChild(a)
      a.click()

      // Limpieza
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)
    } catch (error) {
      console.error('Download failed:', error)
      this.showError('Failed to download SVG')
    }
  }

  private generateDownloadName(): string {
    const now = new Date()
    const datePart = [
      now.getFullYear(),
      (now.getMonth() + 1).toString().padStart(2, '0'),
      now.getDate().toString().padStart(2, '0'),
    ].join('-')

    return `svg-${datePart}.svg`
  }

  private showError(message: string): void {
    // Implementar lógica de visualización de errores
    console.error(message)
    alert(message)
  }

  private showFeedback(message: string): void {
    const originalText = this.copyBtn.innerHTML
    this.copyBtn.innerHTML = message
    setTimeout(() => {
      this.copyBtn.innerHTML = originalText
    }, 2000)
  }
}
