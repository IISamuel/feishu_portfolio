/**
 * ★ 站点全局配置 —— 改这里就能改整个网站的个人文案
 *
 * 每个字段的作用见注释。改完保存，开发服务器会自动刷新页面。
 */

export const site = {
  /** 你的名字（显示在导航栏和首屏大标题） */
  name: '你的名字',

  /** 一句话职位定位，显示在首屏名字下方 */
  role: '全栈开发 · AI 应用创作者',

  /** 首屏大标题（role 之下、简介之上的一句话） */
  headline: '我专注于打造飞书生态里的 AI 应用',

  /** 首屏个人简介，支持多行（模板字符串） */
  bio: `这里写一段 2~4 行的个人介绍：你是谁、擅长什么、
为什么对飞书和 AI 应用方向感兴趣。这段话会出现在首屏，
是访客（包括招聘方）看到的第一段文字，值得认真写。`,

  /** 联系方式与社交链接（留空字符串则不显示该按钮） */
  email: 'you@example.com',
  github: 'https://github.com/yourname',
  /** 飞书相关链接，如飞书主页、飞书文档等 */
  feishu: '',
  /** 简历 PDF 链接（可以把 PDF 放到 public/ 目录，填 /resume.pdf） */
  resume: '',

  /** “项目”板块标题与副标题 */
  projectsTitle: '项目作品',
  projectsSubtitle: '以下项目均基于飞书开放平台与 AI 能力构建，点击卡片查看详情。',
}

export type SiteConfig = typeof site
