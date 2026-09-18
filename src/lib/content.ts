/**
 * 内容加载层：构建时自动读取 src/content/projects/ 下各项目的 index.md，
 * 解析 frontmatter（--- 包裹的 YAML 元数据）+ Markdown 正文。
 *
 * 你不需要修改这个文件 —— 新增/修改项目只需要增删项目文件夹和 index.md。
 */
import { parse as parseYaml } from 'yaml'

/** 项目 frontmatter 中可配置的全部字段（见各项目 index.md 顶部的示例注释） */
export interface ProjectMeta {
  title: string
  slug: string
  date: string
  tags: string[]
  cover?: string
  demo?: string
  github?: string
  /** 设为 true 的项目排在最前 */
  highlight?: boolean
  /** 同优先级下的排序权重，越大越靠前（默认 0） */
  order?: number
}

export interface Project {
  meta: ProjectMeta
  body: string
  /** 从正文提取的一段摘要，用于项目卡片 */
  excerpt: string
}

const modules = import.meta.glob<string>('../content/projects/*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** 解析 `---\nyaml\n---\n正文` 格式 */
function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  if (!raw.startsWith('---')) return { meta: {}, body: raw }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { meta: {}, body: raw }
  const yamlText = raw.slice(3, end).trim()
  const body = raw.slice(end + 4).replace(/^\r?\n/, '')
  const meta = (parseYaml(yamlText) as Record<string, unknown> | null) ?? {}
  return { meta, body }
}

/** 取正文中第一段纯文本作为摘要 */
function makeExcerpt(markdown: string, max = 120): string {
  const text = markdown
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('---'))
    .join(' ')
    .replace(/[*_`>\[\]()#]/g, '')
    .trim()
  return text.length > max ? text.slice(0, max) + '…' : text
}

export const projects: Project[] = Object.entries(modules)
  .map(([path, raw]) => {
    const folder = path.split('/').slice(-2, -1)[0]
    const { meta, body } = parseFrontmatter(raw)
    const m = meta as Partial<ProjectMeta>
    return {
      meta: {
        title: m.title ?? folder,
        slug: m.slug ?? folder,
        date: String(m.date ?? ''),
        tags: Array.isArray(m.tags) ? m.tags.map(String) : [],
        cover: m.cover ? String(m.cover) : undefined,
        demo: m.demo ? String(m.demo) : undefined,
        github: m.github ? String(m.github) : undefined,
        highlight: Boolean(m.highlight),
        order: typeof m.order === 'number' ? m.order : 0,
      },
      body,
      excerpt: makeExcerpt(body),
    }
  })
  .sort((a, b) => {
    if (Boolean(a.meta.highlight) !== Boolean(b.meta.highlight)) {
      return a.meta.highlight ? -1 : 1
    }
    if ((b.meta.order ?? 0) !== (a.meta.order ?? 0)) {
      return (b.meta.order ?? 0) - (a.meta.order ?? 0)
    }
    return b.meta.date.localeCompare(a.meta.date)
  })

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.meta.slug === slug)
}
