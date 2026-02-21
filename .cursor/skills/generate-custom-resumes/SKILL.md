---
name: generate-custom-resumes
description: Generate persona-based resume variations — create resume versions focused on specific perspectives like frontend, backend, mobile, or fullstack. Use when the user wants to create a resume focused on a particular area or perspective, NOT tied to a specific hiring process.
---

# Generate Custom Resume Personas

Create resume variations based on different professional perspectives (e.g., frontend-focused, backend-focused, mobile-focused, fullstack, tech lead) — independent of any specific hiring process.

For resumes tied to a specific hiring process, see the **manage-hiring-processes** skill.

## When to Use

- User wants a resume highlighting a specific area of expertise
- User asks to create a "frontend resume", "backend resume", "mobile resume", etc.
- User wants to generate a resume from a particular perspective or persona

## Workflow

### Step 1 — Create the resume directory

Create a directory at `resumes/{perspective}-{year}-{sequence}/` (e.g., `resumes/frontend-2026-01/`)

### Step 2 — Create the customization YAML

Create `resume.yaml` with overrides tailored to the chosen perspective. Only include fields that differ from the base resume (`resumes/resume-base.yaml`).

**Customization strategies by perspective:**

- **Frontend**: Emphasize UI/UX achievements, component architecture, performance optimizations, design systems, accessibility
- **Backend**: Emphasize API design, microservices, database optimizations, scalability, system reliability
- **Mobile**: Emphasize React Native/Flutter experience, mobile-specific challenges, app store metrics
- **Fullstack**: Balance both sides, emphasize end-to-end ownership and cross-stack contributions
- **Tech Lead**: Emphasize team leadership, mentoring, architecture decisions, process improvements

**YAML structure:**

```yaml
title: Senior Frontend Engineer

introduction: |
  Perspective-specific introduction emphasizing relevant strengths...

experiences:
  - id: company-id
    roles:
      - id: role-id
        bullets:
          - Rewritten bullet emphasizing perspective-relevant impact
        keySkills: Perspective, Relevant, Skills
```

Cross-reference `source-of-truth/work-experience.md` and `source-of-truth/relevant-experiences.md` to select the most impactful bullets for the chosen perspective.

### Step 3 — Generate the PDF

The resume generator lives at `.cursor/skills/generate-custom-resumes/resume-generator/`. See its [README](./resume-generator/README.md) for full documentation.

```bash
cd .cursor/skills/generate-custom-resumes/resume-generator && npm install
node src/index.js \
  --custom resumes/{perspective}-{year}-{sequence}/resume.yaml \
  --output resumes/{perspective}-{year}-{sequence}/resume.pdf
```

Add a comment at the top of the YAML with the generation command for future reference.

## Reference Files

| Purpose | Path |
|---------|------|
| Base resume YAML | `resumes/resume-base.yaml` |
| Resume generator (bundled) | `.cursor/skills/generate-custom-resumes/resume-generator/` |
| Resume generator docs | `.cursor/skills/generate-custom-resumes/resume-generator/README.md` |
| Work experience (source of truth) | `source-of-truth/work-experience.md` |
| Relevant experiences | `source-of-truth/relevant-experiences.md` |
| Resume writing tips | `guidelines/resume-tips.md` |
| Copywriting tips | `guidelines/copywriting-tips.md` |
| Existing hiring process resumes (examples) | `hiring-processes/in-progress/*/resume.yaml` |
