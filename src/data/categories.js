const modules = import.meta.glob('../../content/categories/*.json', { eager: true })

export const CATEGORIES = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.name.localeCompare(b.name, 'sk'))

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))
