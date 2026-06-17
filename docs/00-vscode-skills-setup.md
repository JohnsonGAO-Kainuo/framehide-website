# 00 · 在 VS Code 中启用 taste-skill（已为你装好）

> 目标：让 Copilot 在帮你写这个网站时，自动加载 “taste-skill / 高级视觉设计 / 图生码” 这三套技能，
> 从而做出**有审美、不模板化**的前端，而不是千篇一律的 AI 默认风格。

---

## 1. 我已经做了什么

我把 taste-skill 仓库里和我们最相关的 **3 套技能** 复制进了工作区，放在 VS Code 默认会读取的位置：

```
.github/skills/
├── design-taste-frontend/   SKILL.md   ← 主力：反模板的高级前端规则
├── high-end-visual-design/  SKILL.md   ← 高端/克制/留白的“贵感”视觉
└── image-to-code/           SKILL.md   ← 看参考图 → 分析 → 还原成代码
```

`.github/skills` 正是你截图里 **Chat: Agent Skills Locations** 已经勾选为 `true` 的目录之一，
所以**不需要再配置路径**，重启对话后即可被自动发现并按需加载。

> 来源：https://github.com/Leonxlnx/taste-skill （MIT 协议，可自由使用）

---

## 2. 你截图里的设置，建议怎么开

| 设置项 | 建议 | 说明 |
|---|---|---|
| **Chat: Use Agent Skills** | ✅ 开（必须） | 总开关。关掉则所有 SKILL.md 都不会生效。 |
| **Chat: Agent Skills Locations** | 保持默认 | 默认已包含 `.github/skills`、`.claude/skills`、`~/.claude/skills` 等。我们用的就是 `.github/skills`。 |
| **Chat › Experimental: Use Skill Adherence Prompt** | ✅ 开（推荐） | 让模型“真正去用”技能，而不是只嘴上提一句。对效果影响很大。 |
| **Chat: Use Nested Agents Md Files** | 🔵 可开可不开 | 允许读取项目里嵌套的 `AGENTS.md`。我们后面会放一个根目录 `AGENTS.md`，开了更方便。 |
| **Jsts-chat-features › Skills: Enabled** | 保持默认 | TS/JS 辅助技能，与我们不冲突，开着即可。 |
| **Amp › Skills: Path** | 留空 | 那是另一个插件 (Amp) 的设置，我们用不到。 |

**结论：你截图里的几项可以都保持开启**，唯一“必开”的是 *Use Agent Skills*，
“强烈建议开”的是 *Use Skill Adherence Prompt*。

---

## 3. 怎么验证技能真的生效了

1. 完全关闭并重开这个 VS Code 工作区（让它重新扫描 skills 目录）。
2. 新开一个 Copilot Chat（Agent 模式）。
3. 输入类似：「按照 design-taste-frontend 技能，帮我做首页 Hero 区」。
4. 如果生效，回复里会先给出一句 **“Design Read”**（设计判断），例如
   *“Reading this as: 面向摄影爱好者的高端消费品牌落地页……”*，然后才开始写代码。
   ——出现这句话，就说明技能被加载了。

---

## 4. （可选）用官方 CLI 全局安装

如果你想让这些技能在**所有项目**里都能用（而不只是本工作区），可以在终端跑：

```bash
# 安装全部技能到 ~/.claude/skills（VS Code 默认会读取该目录）
npx skills add https://github.com/Leonxlnx/taste-skill

# 或只装主力技能
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

> 工作区里这份是“项目内副本”，跟着仓库走、可提交到 Git，团队/多设备一致性更好。
> 两种方式二选一即可，不冲突。

---

## 5. 三套技能各自管什么（方便你按需点名）

- **design-taste-frontend** —— 默认主力。先读需求 → 推断设计语言 → 调三个“旋钮”
  （布局变化度 / 动效强度 / 信息密度），禁用 AI 套路（紫色渐变、三等分卡片等）。
- **high-end-visual-design** —— 当我们要“贵感、克制、留白、柔和高级”的页面时点它，
  和我们产品图（米色背景、原木、皮革质感）的调性最搭。
- **image-to-code** —— 当我们要“照着某张参考图/风格图还原成页面”时点它。
  我们 `style referece/` 的复古胶片调，就靠它来落地。
