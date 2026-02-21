---
name: manage-hiring-processes
description: Manage hiring process lifecycle — register new processes, track progress, prepare interviews, generate customized resumes, and close/archive completed processes. Use when the user mentions a new job opportunity, wants to register a hiring process, prepare for interviews, generate a resume for a specific process, or complete/close a process.
---

# Manage Hiring Processes

Full lifecycle management of hiring processes: from initial registration through interview preparation to closure and archival.

## When to Use

- User shares a recruiter message or job posting and wants to start tracking it
- User asks to register, create, or start a new hiring process
- User wants to complete, close, or archive a hiring process
- User wants to generate a customized resume for a specific process

## Workflow: Registering a New Process

### Step 1 — Create the process directory and tracking file

1. Create a directory at `hiring-processes/in-progress/{company}-{role}/` (kebab-case)
2. Create `{company}-{role}.md` inside with the structure below

### Step 2 — Tracking file structure

Use completed processes as reference (e.g., `hiring-processes/completed/chargeblast-sr-software-engineer.md`, `hiring-processes/completed/plank-senior-fullstack-engineer.md`). The file should contain:

- **Header**: Company name, position, start date, status, last update
- **Process Summary**: Initial contact details, recruiter info, platform
- **Job Posting Details**: Location, company type, team size, requirements
- **Company Information**: About, business model, culture
- **Job Requirements**: Technical skills, soft skills, responsibilities
- **Profile Match Analysis**: How the user's experience aligns with requirements (cross-reference `source-of-truth/work-experience.md` and `source-of-truth/relevant-experiences.md`)
- **Interview Preparation**: Key talking points, potential questions, topics to review (cross-reference `interview-preparation/` and `knowledge-base/`)
- **Questions to Ask**: Thoughtful questions about the role, team, and company
- **Interview Process**: (left empty — filled as the process progresses)

### Step 3 — Generate a customized resume (when applicable)

If the process would benefit from a tailored resume, use the **Resume Generator** tool (bundled in the `generate-custom-resumes` skill):

1. Create `resume.yaml` inside the process directory with only the fields to override from the base resume (`resumes/resume-base.yaml`)
2. Use `id`-based matching to override specific companies/roles/bullets
3. Follow the instructions in `.cursor/skills/generate-custom-resumes/resume-generator/README.md` (section "Adding a New Hiring Process")
4. Generate the PDF:

```bash
cd .cursor/skills/generate-custom-resumes/resume-generator && npm install
node src/index.js \
  --custom hiring-processes/in-progress/{company}-{role}/resume.yaml \
  --output hiring-processes/in-progress/{company}-{role}/resume.pdf
```

**YAML customization reference:**

```yaml
title: Custom Title for This Opportunity

introduction: |
  Tailored introduction emphasizing relevant experience...

experiences:
  - id: company-id          # must match an id in resume-base.yaml
    roles:
      - id: role-id         # must match a role id under that company
        bullets:
          - Customized achievement bullet
        keySkills: Relevant, Skills, Here
```

Key points:
- Only include fields you want to override; everything else inherits from base
- Company IDs and role IDs are kebab-case and must match `resumes/resume-base.yaml`
- `keySkills` at company level and role level are independent
- Add a comment at the top of the YAML with the generation command for future reference

For standalone resume generation (not tied to a hiring process), see the **generate-custom-resumes** skill.

### Step 4 — Reply to the recruiter

If the user provides the initial recruiter message, generate a professional reply expressing interest and asking relevant follow-up questions.

## Workflow: Completing a Process

1. Move the process directory from `hiring-processes/in-progress/{process-name}/` to `hiring-processes/completed/{process-name}/`
2. Update the tracking file with:
   - **End date**
   - **Final status** (e.g., "Process completed", "Offer received", "Rejected", "Withdrawn")
   - **Outcome** details (offer terms, rejection reason, learnings, etc.)

## Reference Files

| Purpose | Path |
|---------|------|
| Work experience (source of truth) | `source-of-truth/work-experience.md` |
| Relevant experiences | `source-of-truth/relevant-experiences.md` |
| Storytellings (STAR format) | `source-of-truth/storytellings.md` |
| Interview preparation templates | `interview-preparation/` |
| Resume base YAML | `resumes/resume-base.yaml` |
| Resume generator docs | `.cursor/skills/generate-custom-resumes/resume-generator/README.md` |
| Resume writing tips | `guidelines/resume-tips.md` |
| Copywriting tips | `guidelines/copywriting-tips.md` |
| Completed processes (examples) | `hiring-processes/completed/` |
