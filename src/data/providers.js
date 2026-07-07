const modules = import.meta.glob('../../content/providers/*.json', { eager: true })

export const PROVIDERS = Object.values(modules).map((m) => m.default)
