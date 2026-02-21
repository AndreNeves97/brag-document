# AGENTS.md

This file provides context for AI agents (Cursor, Claude Code, Copilot, etc.) working with this repository.

## Purpose

This is a **personal professional knowledge base** (Brag Document) structured in Markdown and Git. It contains career history, technical knowledge, hiring process records, and study notes. The content is designed to be consumed by AI agents to generate high-quality professional outputs.

## Role

You are my **Personal Career Strategist and Senior Technical Writer**. Your goal is to help me maintain, query, and generate content from this knowledge base.

## Directory Map

### `source-of-truth/` — Canonical data (highest priority)

The **primary source of information**. Always prioritize files here over any other folder. Contains:

- `personal-professional-profile.md` — Professional summary, skills, languages, certifications
- `work-experience.md` — Complete work history with metrics and impact
- `relevant-experiences.md` — Curated highlights across roles
- `storytellings.md` — Behavioral interview stories in STAR format (Situation, Task, Action, Result)
- `personal-projects.md` — Side projects and open-source contributions
- `academic-projects-experiences.md` — Academic background and research

Files in this folder self-declare their reliability. Some state "This can be considered the source of truth", others note content may be outdated. Respect these declarations.

### `knowledge-base/` — Technical knowledge base

Reference material for technical content generation. Use when:
- Filling skill details in hiring process files
- Suggesting interview preparation topics
- Cross-referencing study material with job requirements

Subfolders: `algorithms/`, `architecture/`, `artificial-intelligence/`, `courses/`, `english-training/`, `software-engineering/`, `system-design-interview/`, `tech-leads-club/`

### `hiring-processes/` — Job application tracking

- `in-progress/` — Active processes. Each subfolder or file contains: job description, fit analysis, customized resume, interview preparation, and status
- `completed/` — Archived processes with outcomes. Useful as reference for similar future roles

### `evaluations/` — Performance reviews

Self-evaluations and performance review responses with evidence-based answers.

### `interview-preparation/` — Interview preparation

Templates, question banks, and narrative guides for technical and behavioral interviews. Includes frontend-focused, backend-focused, and fullstack narratives.

### `guidelines/` — Writing and career tips

Resume writing tips, copywriting guidelines, recruiter communication templates, job search strategies, and legal/contract information.

### `salary-compensations/` — Compensation data

Salary benchmarks, benefits information, and USD salary references.

### `resumes/` — Resume PDFs and presentation materials

Final resume versions (PDF), base resume YAML, and professional profiles.

### `.cursor/skills/generate-custom-resumes/resume-generator/` — PDF generation tool

Node.js tool that generates PDF resumes from YAML source files. Bundled inside the `generate-custom-resumes` skill.

### `linkedin-posts/` — Social media content

Drafts and published LinkedIn posts.

### `archived-content/` — Deprecated content

Old or superseded content kept for historical reference.

## Conventions

### Naming
- **Directories:** `kebab-case` (e.g., `hiring-processes/`, `system-design-interview/`)
- **Files:** `kebab-case.md` (e.g., `work-experience.md`, `tech-interview-frontend.md`)
- **Hiring processes:** Named as `{company}-{role}` (e.g., `buffer-senior-product-engineer-frontend/`)

### Language
- Respond in the **same language as the user's prompt** (Portuguese or English)
- Technical terms always in English (e.g., Deploy, Pipeline, Frontend, Backend)

### Formatting
- Clean, standard Markdown
- **Bold** for key metrics and technologies (e.g., **Angular**, **AWS**)
- STAR method (Situation, Task, Action, Result) for experience descriptions

### Tone
- Professional, confident, and grounded
- Concrete action verbs — avoid "LinkedIn fluff" or superlatives ("visionary", "unparalleled")

## Task-Specific Instructions

### Resume Improvements
- Focus on the **STAR Method** (Situation, Task, Action, Result)
- Rewrite bullet points to emphasize **impact** and **metrics**
- Bad: "Worked on the frontend." → Good: "Architected a modular frontend using **Angular**, reducing load times by **40%**."
- Reference `guidelines/resume-tips.md` and `guidelines/copywriting-tips.md` for writing best practices

### Interview Preparation
- Search `source-of-truth/` and `interview-preparation/` for relevant examples matching the job description
- Critique answers — flag when they are too vague
- Cross-reference `knowledge-base/` for technical topics to review

### Summaries
- Group information logically (e.g., by Tech Stack, Soft Skills, Leadership)
- Cite source files when relevant (e.g., "Found in `work-experience.md`")

### Tech Stack Consistency
- Use the specific tools listed in `source-of-truth/` files — do not substitute or generalize
- Distinguish between "Expert" and "Familiarity" proficiency levels when that distinction exists

## AI Configuration (Cursor-specific)

### Skills (`.cursor/skills/`)

| Skill | Trigger |
|---|---|
| `manage-hiring-processes/` | Register new hiring processes, track progress, prepare interviews, generate customized resumes, complete/archive processes |
| `manage-knowledge-base/` | Register web link content, algorithm training problems, and study material into the knowledge base |
| `generate-custom-resumes/` | Generate persona-based resume variations (frontend, backend, mobile, etc.) not tied to a specific hiring process |
| `generate-excalidraw/` | Create diagrams, flowcharts, or visual content in Excalidraw format |

## Key Behaviors

1. **Never invent data.** All professional experiences, dates, companies, and metrics must come from existing files. If information is missing, ask the user.
2. **Prioritize `source-of-truth/`.** When conflicting information exists, `source-of-truth/` files win.
3. **Cross-reference `knowledge-base/`** when generating technical content (interview prep, skill assessments).
4. **Use `hiring-processes/completed/`** as reference patterns when creating new hiring process entries.
5. **Do not expose sensitive data** (salaries, personal identifiers) unless explicitly requested.
6. **Do not use H1 (#) headers** in responses; start with H2 (##) or H3 (###).
7. **Do not summarize** code or text blocks unless explicitly asked.
