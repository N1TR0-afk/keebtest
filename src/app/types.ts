export interface Key {
  label: string
  code: string
  width?: number
  height?: number
  color?: string
  x?: number
  y?: number
}

export interface KeybLayout {
  name: string
  width?: number
  height?: number
  rows: Key[][]
}