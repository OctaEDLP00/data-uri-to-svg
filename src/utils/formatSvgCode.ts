import { isElement } from './isElement'

export function formatSvgCode(svgContent: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgContent, 'image/svg+xml')

  const parserError = doc.querySelector('parsererror')
  if (parserError) {
    console.warn('SVG parsing error:', parserError.textContent)
    return svgContent
  }

  function formatNode(node: Node, indent = ''): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent?.trim() ? `${indent}${node.textContent.trim()}\n` : ''
    }

    if (node.nodeType === Node.COMMENT_NODE) {
      return `${indent}<!--${node.nodeValue}-->\n`
    }

    if (!isElement(node)) return ''

    let result = `${indent}<${node.nodeName.toLowerCase()}`

    if (node.hasAttributes()) {
      Array.from(node.attributes).forEach(attr => {
        result += `\n${indent}  ${attr.name}="${attr.value}"`
      })
    }

    if (node.hasChildNodes()) {
      const hasElementChildren = Array.from(node.childNodes).some(
        child => child.nodeType === Node.ELEMENT_NODE,
      )

      if (hasElementChildren) {
        const closingBracket =
          node.nodeName.toLowerCase() === 'svg' ? `\n${indent}>` : `\n${indent}>`

        result += closingBracket

        Array.from(node.childNodes).forEach(child => {
          result += formatNode(child, `${indent}  `)
        })
        result += `${indent}</${node.nodeName.toLowerCase()}>\n`
      } else {
        const textContent = Array.from(node.childNodes)
          .map(child => child.textContent?.trim() || '')
          .join('')
          .trim()
        result +=
          textContent ?
            `\n${indent}  >${textContent}</${node.nodeName.toLowerCase()}>\n`
          : `\n${indent}/>\n`
      }
    } else {
      result += `\n${indent}/>\n`
    }

    return result
  }

  let formatted = Array.from(doc.childNodes)
    .map(node => formatNode(node))
    .join('')
    .trim()

  formatted = formatted.replace(/(<svg[^>]*>)\s*<path/, '$1\n  <path')

  return formatted
}
