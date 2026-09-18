import { motion } from 'framer-motion'
import { site } from '../content/site.config'

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="hero-role">{site.role}</p>
          <h1 className="hero-title">{site.name}</h1>
          <p className="hero-headline">{site.headline}</p>
          <p className="hero-bio">{site.bio}</p>
          <div className="hero-actions">
            {site.email && (
              <a className="btn btn-primary" href={`mailto:${site.email}`}>
                联系我
              </a>
            )}
            {site.github && (
              <a className="btn" href={site.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {site.feishu && (
              <a className="btn" href={site.feishu} target="_blank" rel="noreferrer">
                飞书主页
              </a>
            )}
            {site.resume && (
              <a className="btn" href={site.resume} target="_blank" rel="noreferrer">
                简历
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
