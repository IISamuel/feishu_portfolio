@echo off
REM 一键启动作品集网站本地预览（自动使用 Node 22）
set PATH=C:\Users\Samuel\dev-tools\node22;%PATH%
cd /d C:\Users\Samuel\feishu-portfolio
title 作品集网站 - http://localhost:5173
npm run dev
pause
