# 02 · 网站需求文档（PRD）· FrameHide

> 状态：草案 v0.2（主理人已确认核心方向，**暂不写业务代码**）
> 配套：`00-vscode-skills-setup.md`（技能）、`01-brand-direction.md`（调性）、`03-assets-map.md`（素材）
>
> **v0.2 已确认**：①不做支付后端/购物车，走“社媒/WhatsApp/邮件询盘 → 报价 → 合同 → Stripe 支付链接或银行转账”；
> ②**中英双语**（英文为主，主市场澳洲 + 新加坡/东南亚）；③技术栈改为 **Next.js（App Router）+ Tailwind + Vercel**。

---

## 1. 目标与非目标

**目标（Phase 1）**
- 建立一个**好看、可信、加载快、对 SEO 友好**的品牌 + 产品图鉴站。
- 第一个产品（X100VI 皮套）有完整的展示页：图集、三色选择、卖点、规格、成交入口。
- 架构**为多产品/多品类预留**，加新品只改数据文件、不重写页面。
- 成交完全走**线下询盘**：引导用户通过 WhatsApp / 邮件 / 社媒联系 → 人工报价、签合同 → 用 **Stripe 支付链接**或**银行转账**收款。
- 支持**中英双语**（英文为主，可切中文）。

**非目标（明确不做）**
- ❌ 不做支付后端、购物车、结账流程、库存与订单系统、会员系统。
- ❌ 网站上**没有“立即购买/加入购物车”按钮**，只有“咨询/获取报价”这类联系入口。
- ❌ 不做复杂 CMS；产品用数据文件维护即可。

> 成交闭环在**网站之外**完成（人对人沟通 + Stripe Link / 转账），这对刚起步、订单量不大、且常涉及定制/批发报价的外贸场景最稳妥、最省心。

---

## 2. 信息架构 / 站点地图

```
/[locale]/                          首页（品牌 + 主推产品 + 卖点 + 氛围配图 + 社区 + CTA）
/[locale]/products                  产品列表（图鉴 grid，现仅 1 个，结构可扩展）
/[locale]/products/x100vi-half-case 产品详情（图集 / 三色 / 卖点 / 规格表 / 咨询 CTA）
/[locale]/about                     品牌故事（一个人认真做东西 + 工艺 + 胶片文化）
/[locale]/contact                   联系 / 批发询盘（表单 + WhatsApp + 邮件）
/  (footer)                         政策占位：物流、退换、隐私（外贸必备，先放占位）
```

**国际化（已确认做双语）**：`en`（默认）+ `zh`。
- 用 Next.js App Router 的 `app/[locale]/...` 路由 + `next-intl`（或同类）管理翻译。
- 默认 `en`，导航栏提供 EN / 中 切换；文案集中在 `messages/en.json`、`messages/zh.json`。
- 主市场澳洲/新加坡/东南亚 → 英文体验优先，中文服务华人客户与供应链沟通。

---

## 3. 首页区块（从上到下）

1. **Hero**：主推产品大图（`image/x100vi-pu-half-case/framehide-x100vi-half-case-hero-black-desk.png`）+ 一句强品牌标语 + 主 CTA。
   - 背景可叠**极轻**胶片颗粒；用暖米底色。
2. **品牌一句话**：我们是谁、为谁做（承接 About）。
3. **主推产品**：X100VI 皮套，三色快速切换（Coffee / Green / Black）。
4. **Features at a Glance**：电池快拆 / 磁吸底座 / 精准贴合 / 优质皮质 / 镂空底部 / 三脚架接口。
   - 参考 `image/x100vi-pu-half-case/framehide-x100vi-half-case-feature-overview.jpg` 重做成网页版（不要直接贴图，要可响应）。
5. **细节特写**：精细走线、皮料质感、精准开孔、贴合度（来自规格详情图）。
6. **生活方式氛围**：用 `ref/` 开源摄影图点缀胶片质感（**零散嵌入、不聚成画廊；详见 `03-assets-map.md`**）。
7. **社区 / 人味**：一人主理人的小故事 + 胶片文化态度（体现真实、可信）。
8. **CTA / 询盘**：引导到 contact（WhatsApp / 邮件）咨询 / 获取报价——**不是“立即购买”**。
9. **Footer**：导航、政策占位、社媒、邮件订阅（可选）、Unsplash 摄影师署名。

---

## 4. 产品详情页（模板，未来所有产品共用）

- 图集（主图 + 多角度 + 细节）
- **颜色选择器**：Coffee / Green / Black，切换主图
- 卖点列表（icon + 短句）
- **规格表**（来自 `image/x100vi-pu-half-case/framehide-x100vi-half-case-detail-specs.png`，作为权威数据源）：

  | 项 | 值 |
  |---|---|
  | Material | PU Leather |
  | Style | Half Case / Protective Base Cover |
  | Compatible Model | Fujifilm X100VI |
  | Function | Wear-resistant, Shock Protection |
  | Colors | Coffee, Green, Black |
  | Suitable For | Compact Camera |
  | Use Scenario | Home Storage / Daily Carry |
  | Mounting | 1/4" screw interface (Tripod compatible) |
  | Gender | Unisex |

- 成交 CTA：**“Ask about this / Request a quote”** → 跳 contact（WhatsApp + 邮件）；不放“加入购物车/立即购买”。
- 信任要素：精准贴合、不挡操作、保护到位（外贸客户最关心）

---

## 5. 数据模型（让加新品很简单）

用一个 `content/products/*.json`（或 Markdown frontmatter）描述每个产品：

```jsonc
{
  "slug": "x100vi-half-case",
  "title": "Leather Half Case for Fujifilm X100VI",
  "tagline": "Premium protection with full camera access.",
  "category": "half-case",
  "colors": [
    { "name": "Coffee", "hex": "#6B4A2E", "image": "/assets/products/x100vi/sku-brown.jpg" },
    { "name": "Green",  "hex": "#6E7253", "image": "/assets/products/x100vi/sku-green.png" },
    { "name": "Black",  "hex": "#1E1B17", "image": "/assets/products/x100vi/sku-black.png" }
  ],
  "variants": [
    { "id": "case-only", "image": "/assets/products/x100vi/sku-coffee.jpg" },
    { "id": "strap-set", "image": "/assets/products/x100vi/strap-set-coffee.jpg" }
  ],
  "features": ["Quick Battery Access", "Magnetic Base Design", "Precision Fit",
               "Premium Leather Texture", "Hollow-out Bottom", "1/4\" Tripod Mount"],
  "gallery": ["...png", "...jpg"],
  "specs": { "Material": "PU Leather", "Compatible Model": "Fujifilm X100VI", "...": "..." }
}
```

> 同一产品下的不同销售组合（如半套单品 / 半套 + 肩带套装）放在 `variants`；真正新增品类（如皮革背带 / 兔笼 / 镜头盖）再新增一个 json + 几张图。

---

## 6. 技术选型（已确认）

> 主理人熟悉 Next.js、习惯 Vercel 部署 → 不引入新框架，用你已会的栈。

| 维度 | 选择 | 理由 |
|---|---|---|
| 框架 | **Next.js（App Router）** | 你已熟悉；对内容站用静态生成（SSG）即可做到快 + SEO 强；Vercel 原生支持 |
| 样式 | **Tailwind CSS** | 与 taste-skill 配合好，迭代快 |
| 国际化 | **next-intl**（或 next 内置 i18n） | `app/[locale]/...` 路由 + `messages/*.json` 双语 |
| 动效 | **GSAP**（克制使用） | taste-skill 内置 GSAP 规范；滚动揭示等轻动效 |
| 内容 | JSON / MDX 文件 | 无需后台，加产品=改文件 |
| 部署 | **Vercel** | 你已在用；自动 HTTPS + CDN + 预览部署 |
| 图片 | Next.js `<Image>` / sharp | 自动压缩 + 响应式（产品图都 2~5MB，必须优化） |
| 成交 | **Stripe Payment Link**（场外）+ 银行转账 | 人工报价后发链接/收款，**不集成到网站前端** |
| 分析（可选） | Plausible / Umami | 轻量、隐私友好 |

> **为什么不用 Astro？** Astro 是另一个同类建站框架（主打“默认零 JS、内容站极快”），
> 但它需要重新学。你已掌握 Next.js 且习惯 Vercel，用 Next.js 的静态导出同样能做出
> 又快又好看的站，一人维护更省心。taste-skill 是**框架无关**的，在 Next.js 上照样生效。

---

## 7. 性能 / SEO / 合规（外贸要点）

- **图片必须压缩 + 懒加载**（现有素材单张 2–5MB，直接上线会很慢）。
- 每页配 `title` / `description` / Open Graph 图，便于分享与搜索。
- 结构化数据（Product schema）利于 Google 展示。
- 速度目标：Lighthouse 性能 ≥ 90，移动端优先。
- 合规占位：隐私政策、物流与退换说明（外贸客户与平台都看重）。
- 图片版权：`ref/` 为 Unsplash 开源图，建议在页脚或图注**注明摄影师**（见 `03-assets-map.md`）。

---

## 8. 分期计划

**Phase 1（MVP，先做）**
- 首页 + X100VI 产品详情页 + About + Contact（询盘）
- 中英双语框架搭好（en 默认 + zh）
- 设计系统（颜色/字体/间距/胶片质感）定稿
- 素材整理、压缩、接入
- 部署上线（Vercel）

**Phase 2**
- 产品列表页支持多品类；加入背带/兔笼等新品
- 咨询转化优化（WhatsApp 浮标 / 报价表单）
- （可选）Journal / 编辑内容

**Phase 3**
- 视流量决定是否升级为完整电商（购物车/结账/订单）；现阶段成交走线下 + Stripe Link 即可

---

## 9. 开发前的“准备清单”（当前阶段）

- [x] 安装并启用 taste-skill 等技能（见 `00`）
- [x] 定下品牌调性与视觉基调（见 `01`）
- [x] 站点架构 / 数据模型 / 技术选型（本文件）
- [x] 素材清点与用途映射（见 `03`）
- [ ] 你确认：品牌名、语言、成交方式、颗粒强度（见 `01` 第 7 节）
- [ ] 确认技术选型（默认 Astro + Tailwind，可改）
- [ ] 然后再开始 Phase 1 开发
