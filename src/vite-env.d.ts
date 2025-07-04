/// <reference types="vite/client" />

export interface SVGConversionResult {
  original: string
  formatted: string
  isValid: boolean
  error?: string
}

export type SVGFormatter = (svgContent: string) => string
