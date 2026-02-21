# Resume PDF Generator

A Node.js application to generate customized PDF resumes from YAML source files. The generator merges a base resume with process-specific customizations and outputs professional PDFs.

## Features

- ✅ **YAML-based source files** - Easy to maintain and version control
- ✅ **Customizable per hiring process** - Override specific sections without duplicating content
- ✅ **ID-based matching** - Consistent merging using company and role IDs
- ✅ **Automatic PDF generation** - Professional styling matching your reference PDF
- ✅ **Batch processing** - Generate all resumes at once

## Location

This tool lives at `.cursor/skills/generate-custom-resumes/resume-generator/` inside the project. All relative paths passed as CLI arguments are resolved from the **project root**, not from the tool directory.

## Installation

```bash
cd .cursor/skills/generate-custom-resumes/resume-generator
npm install
```

## Usage

### Generate a single resume

```bash
# With customization
node src/index.js \
  --custom hiring-processes/in-progress/beyond-ai/resume.yaml \
  --output hiring-processes/in-progress/beyond-ai/resume.pdf

# Base resume only
node src/index.js \
  --output resumes/resume-2025.pdf
```

### Generate all resumes

```bash
# Generate PDFs for all processes in hiring-processes/in-progress/ that have resume.yaml
node src/index.js --all
```

### Command-line options

- `-b, --base <path>` - Path to base resume YAML (default: `resumes/resume-base.yaml`)
- `-c, --custom <path>` - Path to customization YAML (optional)
- `-o, --output <path>` - Path to output PDF file
- `-a, --all` - Generate PDFs for all processes in `hiring-processes/in-progress/`
- `-h, --help` - Show help message

## YAML Structure

### Base Resume (`resume-base.yaml`)

The base resume contains all your standard information:

```yaml
title: Senior Software Engineer

introduction: |
  Your introduction text here...

links:
  linkedin: https://www.linkedin.com/in/your-profile/
  github: https://github.com/your-username

experiences:
  - id: company-id
    company: Company Name
    keySkills: Skill1, Skill2, Skill3
    roles:
      - id: role-id
        title: Role Title
        period: Jan 2020 - Present
        bullets:
          - Achievement 1
          - Achievement 2

education:
  - degree: Your Degree
    institution: Institution Name
    details: Additional details...

skills:
  languages: JavaScript, TypeScript
  # ... other skill categories
```

### Customization File (`resume.yaml`)

Customization files only contain what you want to override:

```yaml
# Override title
title: Full Stack AI Engineer

# Override introduction
introduction: |
  Custom introduction for this opportunity...

# Override specific experiences using IDs
experiences:
  - id: company-id
    company: Company Name
    roles:
      - id: role-id
        bullets:
          - Customized bullet 1
          - Customized bullet 2
        keySkills: Custom, Skills, Here
```

**Key points:**
- Only include fields you want to override
- Use `id` fields to match companies and roles
- If a field is not specified, it uses the base value
- `keySkills` can be set at company level or role level, but they are independent (company-level doesn't propagate to roles)

## ID Naming Convention

- **Company IDs**: Use kebab-case, e.g., `banco-bs2`, `qualifica`, `yanlili-gold`
- **Role IDs**: Use kebab-case, e.g., `coe-web-member`, `senior-frontend-engineer`

## Merging Logic

1. **Top-level fields** (title, introduction, links): Custom overrides base if present
2. **Experiences**: Match by company `id`, then match roles by role `id`
3. **KeySkills**: 
   - Company-level and role-level are independent
   - Company-level `keySkills` are displayed at company level only
   - Role-level `keySkills` are displayed for that specific role only
4. **Other sections**: Custom overrides base if present

## Project Structure

```
professional-career-notebook/
├── .cursor/skills/generate-custom-resumes/
│   └── resume-generator/         # ← this tool
│       ├── src/
│       │   ├── index.js          # CLI entry point
│       │   ├── parser.js         # YAML loading & merging
│       │   ├── generator.js      # PDF generation
│       │   └── templates/
│       │       ├── resume.hbs    # Handlebars template
│       │       └── styles.css    # CSS styling
│       └── package.json
├── resumes/
│   └── resume-base.yaml          # Base resume
└── hiring-processes/
    └── in-progress/
        └── [process-name]/
            ├── resume.yaml       # Customizations
            └── resume.pdf        # Generated PDF
```

## Adding a New Hiring Process

1. Create a directory in `hiring-processes/in-progress/[process-name]/`
2. Create `resume.yaml` with your customizations:

```yaml
title: Custom Title

introduction: |
  Custom introduction...

experiences:
  - id: banco-bs2
    roles:
      - id: coe-web-member
        bullets:
          - Custom bullet
```

3. Generate the PDF:

```bash
node src/index.js \
  --custom hiring-processes/in-progress/[process-name]/resume.yaml \
  --output hiring-processes/in-progress/[process-name]/resume.pdf
```

Or use `--all` to generate all at once.

Write a comment in the YAML file with the command to generate the PDF.

## Dependencies

- `js-yaml` - YAML parsing
- `handlebars` - HTML templating
- `puppeteer` - PDF generation from HTML
- `fs-extra` - File system operations

## Troubleshooting

**PDF not generating:**
- Check that all YAML files are valid (no syntax errors)
- Ensure all referenced IDs exist in the base resume
- Verify output directory exists and is writable

**Styling issues:**
- Check `src/templates/styles.css` for styling adjustments
- PDF rendering may differ slightly from browser rendering

**Merge not working:**
- Verify company and role IDs match exactly (case-sensitive)
- Check that YAML structure matches expected format

## License

ISC

