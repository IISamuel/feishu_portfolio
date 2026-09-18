import { Link, useParams } from 'react-router-dom'
import Markdown from '../components/Markdown'
import NotFound from './NotFound'
import { getProjectBySlug } from '../lib/content'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project) return <NotFound />

  const { meta, body } = project

  return (
    <article className="detail container">
      <Link to="/" className="back">
        ← 返回全部项目
      </Link>
      <header className="detail-head">
        <h1>{meta.title}</h1>
        <div className="detail-meta">
          {meta.date && <span>{meta.date}</span>}
          {meta.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        {(meta.demo || meta.github) && (
          <div className="detail-actions">
            {meta.demo && (
              <a className="btn btn-primary" href={meta.demo} target="_blank" rel="noreferrer">
                在线体验
              </a>
            )}
            {meta.github && (
              <a className="btn" href={meta.github} target="_blank" rel="noreferrer">
                源码仓库
              </a>
            )}
          </div>
        )}
      </header>
      {meta.cover && <img className="detail-cover" src={meta.cover} alt={meta.title} />}
      <Markdown>{body}</Markdown>
    </article>
  )
}
