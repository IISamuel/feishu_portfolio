import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../lib/content'
import { site } from '../content/site.config'

export default function Home() {
  const { hash } = useLocation()

  // 处理从其他页面跳转过来的 /#projects 锚点
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  return (
    <>
      <Hero />
      <section className="projects" id="projects">
        <div className="container">
          <div className="section-head">
            <h2>{site.projectsTitle}</h2>
            <p>{site.projectsSubtitle}</p>
          </div>
          {projects.length === 0 ? (
            <p className="empty">还没有项目 —— 在 src/content/projects/ 下新建项目文件夹即可添加。</p>
          ) : (
            <div className="grid">
              {projects.map((p, i) => (
                <ProjectCard key={p.meta.slug} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
