# AGENTS.md · FrameHide 网站项目

一人跨境（外贸）相机周边品牌站。首发品类：富士 X100VI 真皮（PU）半套，后续扩展皮革背带 / 腕带 / 兔笼（白牌）/ 镜头盖等小件。
主市场：澳洲 + 新加坡/东南亚。

## 开发前必读
- `docs/00-vscode-skills-setup.md` — 技能安装与 VS Code 设置
- `docs/01-brand-direction.md` — 品牌与视觉基调（**调性来源**）
- `docs/02-website-prd.md` — 站点架构 / 数据模型 / 技术选型 / 分期
- `docs/03-assets-map.md` — 素材清点与用途映射
- `docs/04-outreach-logistics.md` — 开发信 / 货代验证 / 样品沟通计划
- `docs/05-forwarder-and-outreach-sop.md` — 货代筛选 / 开发信执行 SOP

## 必须使用的技能（位于 .github/skills/）
- **design-taste-frontend** — 所有前端页面的默认审美规则（反模板）
- **high-end-visual-design** — 需要“贵感/克制/留白”时
- **image-to-code** — 照参考图/风格图还原页面时

## 关键约束
- 视觉基调：**克制高级底子 + 极轻胶片颗粒 + 一点幽默人味**；暖米色背景，对应皮套三色（Coffee/Green/Black）为品牌色。
- **成交方式**：不做支付后端/购物车。网站只放“咨询/获取报价”（WhatsApp/邮件），成交走线下报价 + Stripe Link / 银行转账。**绝不加“立即购买”按钮**。
- **语言**：中英双语（`en` 默认 + `zh`），英文体验优先。
- 素材规则：`image/` = 产品图（可用）；`ref photo from open source/` = Unsplash 氛围图（可用，**零散嵌入、不聚成画廊**，页脚署名）；`style referece/` = 情绪板（**绝不上线**，别人版权）。
- 架构需**为多产品预留**：加新品=改 `content/products/*.json` + 加图，不重写页面。
- **技术栈（已定）**：**Next.js（App Router）+ Tailwind CSS + Vercel 部署**（主理人熟悉 Next.js）；i18n 用 next-intl。
- 图片务必压缩 + 懒加载（现有素材单张 2–5MB）。
- 当前阶段：**规划完成，准备进入 Phase 1**；待主理人最终拍板品牌名 / 颗粒强度后开始写业务代码。
