import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/** Markdown 正文渲染器（支持 GFM：表格、任务列表、删除线等） */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  )
}
