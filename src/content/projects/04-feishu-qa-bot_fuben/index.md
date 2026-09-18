---
title: 飞书副本测试
slug: feishu-qa-bot
date: 2026-08
tags: [飞书机器人]
cover: /assets/projects/01-feishu-qa-bot/cover.svg
demo: https://example.com
github: https://github.com/yourname/example
highlight: true
order: 10
---

一个嵌入飞书群聊的智能问答机器人：基于公司知识库做 RAG 检索增强，群成员 @ 机器人即可用自然语言提问，几秒内得到带来源引用的回答。

> 这个项目模板演示了 Markdown 的全部用法：标题、表格、代码块、引用、图片。你可以直接照此格式改写自己的项目。

## 解决的问题

团队内部的知识分散在飞书文档、群聊天记录和 Wiki 中，新人上手和日常答疑成本高。这个机器人把「问同事」变成「问机器人」。

## 核心功能

| 功能 | 说明 |
| ---- | ---- |
| 知识库问答 | 基于飞书文档 / Wiki 构建向量索引，RAG 检索后由大模型生成回答 |
| 来源引用 | 每条回答附引用链接，可一键跳转到原文档对应位置 |
| 多轮对话 | 支持上下文追问，机器人记得同一会话中的前文 |
| 权限感知 | 只检索提问者有权限查看的文档，避免越权泄露 |

## 技术架构

整体采用「事件订阅 → 检索 → 生成 → 回复」的链路：

```python
@app.on_message
async def handle(event: MessageEvent):
    question = event.text
    docs = await retrieve(question, top_k=5)      # 向量检索知识库
    answer = await llm.generate(question, docs)   # 大模型生成回答
    await reply(event, answer, sources=docs.urls)
```

- **接入层**：飞书开放平台机器人 + 事件订阅（im.message.receive_v1）
- **检索层**：文档解析分块 → Embedding → 向量数据库
- **生成层**：大模型 + Prompt 工程，输出结构化回答与引用
- **部署**：Docker 一键部署，支持私有化大模型

## 效果截图

![机器人回答示例](\assets\projects\04-feishu-qa-bot_fuben\screenshot.svg)

## 我的职责与收获

- 独立完成从飞书开放平台接入、RAG 链路设计到部署上线的全过程
- 针对中文文档分块策略做了多轮调优，检索命中率从 62% 提升到 91%
- 深入理解了飞书开放平台的权限模型与事件机制
