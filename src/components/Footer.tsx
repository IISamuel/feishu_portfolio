import { site } from '../content/site.config'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} {site.name} · 由 React + Vite 构建
        </p>
      </div>
    </footer>
  )
}
