import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="notfound container">
      <h1>404</h1>
      <p>页面不存在或项目已被移除。</p>
      <Link to="/" className="btn btn-primary">
        返回首页
      </Link>
    </section>
  )
}
