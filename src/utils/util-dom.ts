export function $<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector)
  if (!element) {
    throw new Error(`Element not found with selector: ${selector}`)
  }
  return element
}

// Versión opcional que no lanza error
export function $$<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector)
}
