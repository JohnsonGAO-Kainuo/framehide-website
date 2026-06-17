# 03 · 素材清点与用途映射

> 把现有素材分门别类，明确**哪些是产品图、哪些是氛围图、哪些只是情绪参考**，并规划上线时的目录结构。

---

## 1. `image/` —— 产品图（核心资产，必须用）

| 文件 | 内容 | 建议用途 |
|---|---|---|
| `产品图.png` | 棕色皮套·米色背景·主图 | **首页 Hero 主图 / 详情页主图** |
| `sku-Brown.jpg` | 咖啡棕单色 | 颜色选择器 Coffee / 图集 |
| `sku-Green.png` | 橄榄绿单色 | 颜色选择器 Green / 图集 |
| `sku-Black.png` | 黑色单色 | 颜色选择器 Black / 图集 |
| `3 color.png` | 三色并排 | “Color Options” 区块 |
| `features at a Glance.jpg` | 卖点示意图 | **参考重做**成网页版卖点区（不直接贴图） |
| `batch-1.jpg` | 绿色套上三脚架+咖啡的生活场景 | 生活方式 / Lookbook |
| `with triple.jpg` | 三色/组合场景 | 生活方式 / 列表页 |
| `产品详情图包括产品规格和细节.png` | 完整规格+细节信息图 | **规格数据的权威来源**；细节特写素材来源 |

> 处理建议：统一改成无空格/无中文的英文文件名（见下方目录规划），并**压缩**（PNG 多为 2MB+）。

---

## 2. `ref photo from open source/` —— 氛围/编辑配图（Unsplash 开源，可用）

⚠️ 这些**不是产品图**，是胶片氛围摄影图。主理人明确要求：**零散、自然地嵌在合适的位置，不要堆成一个画廊（gallery），也不要摆得很乱。**

**放置原则（开发时遵守）**：
- 每张氛围图都要**服务某个具体区块的叙事**，一次只出现 1 张，与周围文案/产品形成对话，而非“一面墙”。
- 建议位置（每处最多 1 张）：
  - 首页的**品牌句子**区：一张胶片街拍/光影图做半屏背景或侧图。
  - **About 页**：一张“拍照现场/暗房/胶片”图象配品牌故事。
  - **区块之间的过渡/分隔带**：一张全宽氛围图做“呼吸区”，连接上下两个产品区。
  - **Contact 页顶部**：一张安静的生活场景图作氛围。
- **明确不做**：不做“Lookbook 画廊页”、不做多图网格堃、不让氛围图与产品图混在同一个图集里（免得让人误以为是我们拍的产品）。
- 共 12 个文件，其中 `iziumlab-zdpyje8ys1M-unsplash.jpg` 与 `…(1).jpg` **重复**，上线前去重。
- 文件名即含**摄影师**（Unsplash 命名规则）：arturo-anez、bahar-ghiasi、dariusz-sankowski、
  eduardo-gorghetto、iziumlab、jakob-owens、nordwood-themes、oleg-bilyk、sergey-sokolov、yoann-siloine。
- **版权**：Unsplash 协议可免费商用、无需署名，但**建议在页脚统一署名摄影师**（尊重 + 更专业）。

---

## 3. `style referece/` —— 情绪板（只参考，**绝不上线**）

4 张复古胶片调截图（头盔猫/战机日落、“I'm up again”复古海报、3D 眼镜看电影的猫、Nikon 取景器冬景）。

- 作用：**只用来让我们理解品牌该是什么视觉风格**（复古胶片 + 幽默人味：颗粒、褐色暖调、粗壮复古字体）。
- ⚠️ 主理人已明确：这些是**别人有版权**的图，**不放进网站**，仅作设计参考（mood board）。
- 我们会用 `image-to-code` 技能，把这种“感觉”转成**自有的**配色、字体、颗粒质感，而非搬运原图。

---

## 4. 上线时的目录规划（开发阶段再落地）

```
public/assets/
├── products/
│   └── x100vi/
│       ├── hero.png            ← 产品图.png
│       ├── sku-coffee.jpg      ← sku-Brown.jpg
│       ├── sku-green.png       ← sku-Green.png
│       ├── sku-black.png       ← sku-Black.png
│       ├── three-colors.png    ← 3 color.png
│       ├── lifestyle-tripod.jpg← batch-1.jpg
│       └── spec-source.png     ← 产品详情图…（仅留存/参考，不一定上线原图）
└── lifestyle/                  ← ref/ 去重压缩后的开源摄影图
    ├── arturo-anez-1.jpg
    └── ...
```

> 原始素材保留在现有 `image/` `ref…/` `style referece/` 里不动；上线副本统一放 `public/assets/`，
> 用英文小写、连字符命名，并压缩。这样代码引用稳定、可维护。

---

## 5. 待办（开发阶段执行，现在不动原图）

- [ ] `ref/` 去重（删除重复的 iziumlab 副本）
- [ ] 全部图片压缩（产品图 PNG 尤其大）
- [ ] 重命名为英文 + 复制到 `public/assets/`
- [ ] 页脚加 Unsplash 摄影师署名清单
- [ ] 以 `产品详情图…` 为准，录入规格表数据到 `content/products/x100vi-half-case.json`
