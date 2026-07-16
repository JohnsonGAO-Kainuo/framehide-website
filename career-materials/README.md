# Career Materials Workspace

This directory is reserved for Johnson's job search. It is intentionally separate from the FrameHide website, product, outreach and logistics documents.

## Tracked Career Documents

- `cv-rewrite-notes.md` — bilingual CV source, positioning decisions and evidence rules.
- `cv-master-draft.md` — copy-ready general English CV content based on the previous one-page template, with a Chinese reference version.
- `interview-prep/general-interview-qa.md` — reusable bilingual self-introduction, interview answers and evidence boundaries.
- `interview-prep/hong-kong-market-notes-2026-07.md` — dated notes on Hong Kong interview formats, hiring conditions and candidate positioning.
- Future final CVs, interview notes and role-specific writing can remain directly under `career-materials/` or in clearly named subdirectories.

## Local Career-Ops Workspace

Career-Ops is installed locally at:

```text
career-materials/career-ops/
```

Installed version:

```text
career-ops-v1.19.0
```

The complete Career-Ops directory is excluded from the FrameHide Git repository because it is a separate third-party system with its own source files, dependencies and personal application data. This prevents website code and job-search records from being mixed together.

The Codex skill entrypoint is installed separately at:

```text
~/.codex/skills/career-ops/
```

It becomes discoverable by Codex from the next conversation turn.

## Installation Status

- Core workspace deployed.
- Node dependencies installed with `npm install --ignore-scripts`.
- Dependency audit: 0 known vulnerabilities at installation time.
- Playwright Chromium intentionally not installed yet; install it only when PDF generation or browser-driven workflows are required.
- Career-Ops onboarding is still pending for `cv.md`, `config/profile.yml` and `portals.yml`.

## How We Will Use It

Open a terminal in the Career-Ops directory or ask Codex from this workspace to work inside it.

Useful requests:

```text
Run career-ops onboarding using my existing CV notes.
Evaluate this JD with career-ops auto-pipeline: [job URL or pasted description]
Run the career-ops tracker mode and summarize my applications.
Run the career-ops scan mode for my configured company portals.
```

Career-Ops directly scans supported ATS and company career pages such as Greenhouse, Ashby and Lever. JobsDB, LinkedIn and Glassdoor can remain discovery channels: paste the job URL or job description into Career-Ops for structured evaluation, CV tailoring and tracking.

Career-Ops does not submit applications automatically. Final review and submission remain manual.

## 中文说明

这个文件夹专门保存 Johnson 的求职材料，与 FrameHide 网站、产品、开发信和物流文件分开管理。

- `cv-master-draft.md`：通用英文简历母版，并附完整中文对照。
- `cv-rewrite-notes.md`：简历定位、经历措辞、证据边界及中英文备选写法。
- `interview-prep/general-interview-qa.md`：英文面试回答、中文参考回答和表达边界。
- `interview-prep/hong-kong-market-notes-2026-07.md`：香港求职市场、职级、薪资及投递策略的时效性记录，并附中文速查版。
- `career-ops/`：本地求职工具工作区，不纳入 FrameHide Git 仓库，也不会自动代替本人提交职位申请。

使用原则：先用一份通用简历完成第一批投递；遇到匹配度高的职位，再根据职位描述调整重点。所有面试回答均用于理解和练习，不建议逐字背诵。
