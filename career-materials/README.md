# Career Materials Workspace

This directory is reserved for Johnson's job search. It is intentionally separate from the FrameHide website, product, outreach and logistics documents.

## Tracked Career Documents

- `cv-rewrite-notes.md` — bilingual CV source, positioning decisions and evidence rules.
- `cv-master-draft.md` — copy-ready general English CV content based on the previous one-page template, with a Chinese reference version.
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
