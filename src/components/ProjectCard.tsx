import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Project } from '../lib/content'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { meta, excerpt } = project
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
    >
      <Link to={`/project/${meta.slug}`} className="card">
        {meta.cover && (
          <div className="card-cover">
            <img src={meta.cover} alt={meta.title} loading="lazy" />
          </div>
        )}
        <div className="card-body">
          <div className="card-meta">
            {meta.date && <span className="card-date">{meta.date}</span>}
            {meta.highlight && <span className="card-badge">精选</span>}
          </div>
          <h3 className="card-title">{meta.title}</h3>
          <p className="card-excerpt">{excerpt}</p>
          {meta.tags.length > 0 && (
            <div className="card-tags">
              {meta.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
