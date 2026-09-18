import { Link, useLocation } from 'react-router-dom'
import { site } from '../content/site.config'

export default function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          {site.name}
        </Link>
        <nav className="nav-links">
          <a href={isHome ? '#projects' : '/#projects'}>项目</a>
          <a href={isHome ? '#about' : '/#about'}>关于</a>
          {site.email && <a href={`mailto:${site.email}`}>联系我</a>}
        </nav>
      </div>
    </header>
  )
}
