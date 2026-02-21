---
name: manage-knowledge-base
description: Register and organize content in the knowledge base — save web link content, register algorithm training problems, and maintain topic indexes. Use when the user shares a link to register, mentions a LeetCode problem, wants to save study material, or asks to add content to the knowledge base.
---

# Manage Knowledge Base

Register external content (articles, tutorials, documentation) and algorithm training problems into the structured `knowledge-base/` directory.

## When to Use

- User shares a web link and asks to register/save its content
- User wants to register an algorithm training problem (LeetCode, etc.)
- User asks to add study material or technical content to the knowledge base

---

## Workflow: Registering Web Link Content

All content goes into `knowledge-base/{section-name}/`.

### Steps

1. **Fetch the content** — Use the browser to open the link and read it
2. **Evaluate content length and decide format:**
   - **Short content** → dump the entire document into a new Markdown file
   - **Long content** → identify relevant sections, create a summary file, and enrich existing files with references to it. If it makes sense, create a dedicated file (full dump or summary)
3. **Handle images:**
   - Single image (e.g., infographic) → save alongside the Markdown file in the section folder
   - Multiple images → save in a subfolder named after the file
4. **Place in the correct section** — identify the most matching `knowledge-base/` subfolder
5. **Update the section index** — add an entry to the section's `README.md` (create one if it doesn't exist; reference `knowledge-base/algorithms/README.md` as the pattern)

### Section folders

| Folder | Content type |
|--------|-------------|
| `algorithms/` | Algorithm problems, DSA patterns, competitive programming |
| `architecture/` | Software architecture patterns, design decisions |
| `artificial-intelligence/` | AI/ML concepts, tools, frameworks |
| `courses/` | Course notes and materials |
| `english-training/` | English practice and language learning |
| `software-engineering/` | General SWE practices, testing, DevOps |
| `system-design-interview/` | System design concepts and interview prep |
| `tech-leads-club/` | Leadership and tech lead resources |

If no existing section fits, create a new one following kebab-case naming.

---

## Workflow: Registering Algorithm Training

Problems are stored at `knowledge-base/algorithms/solutions/{source-name}/{problem-name}/problem.md`.

### Naming

- `{source-name}`: lowercase source (e.g., `leet-code`, `hackerrank`)
- `{problem-name}`: `{number}-{name-in-kebab-case}` (e.g., `209-minimum-size-subarray-sum`)

### Steps

1. **Get the problem** — the user may provide the problem statement directly or a link to the source
2. **Create `problem.md`** with the following structure:

```markdown
# {Number} - {Problem Name}

**Source:** {Platform}
**Difficulty:** {Easy/Medium/Hard}
**Link:** {URL}

## Problem Statement

{Full problem description}

## Analysis

### Problem Analysis
{Requirements, constraints, math rules, edge cases}

### Possible Solutions
{Approaches with time/space complexity — do NOT write code, just describe the algorithm}

## Topics

{List: Array, Binary Search, Sliding Window, etc.}
```

3. **Do NOT write solution code** — only analysis and proposed approaches

### Maintaining the Topics Index

After creating `problem.md`, **update `knowledge-base/algorithms/README.md`**:

1. Add the problem to **all relevant topics** listed in its Topics section
2. Mark the **most relevant topic** (primary technique in optimal solution) with ⭐
3. Maintain **alphabetical order** of topics
4. Use consistent link format: `[{Number} - {Problem Name}](./solutions/{source-name}/{problem-name}/problem.md)`

## Reference Files

| Purpose | Path |
|---------|------|
| Algorithms index | `knowledge-base/algorithms/README.md` |
| Example problem | `knowledge-base/algorithms/solutions/leet-code/209-minimum-size-subarray-sum/problem.md` |
