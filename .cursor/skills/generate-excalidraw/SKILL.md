---
name: generate-excalidraw
description: Generate Excalidraw diagram files (.excalidraw) programmatically as JSON. Use when the user asks to create diagrams, flowcharts, presentations, or visual content in Excalidraw format.
---

# Generate Excalidraw Files

## File Structure

Excalidraw files are JSON with this top-level structure:

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [],
  "appState": {
    "gridSize": 20,
    "gridStep": 5,
    "gridModeEnabled": false,
    "viewBackgroundColor": "#ffffff",
    "lockedMultiSelections": {}
  },
  "files": {}
}
```

## Element ID Generation

- `id`: Use a random 21-char alphanumeric string (e.g., `"B2OeD2lNYfR9LjBwM3EVs"`)
- `seed` and `versionNonce`: Use random integers (e.g., `702847408`)
- `index`: Incremental base-36 string starting at `"a0"`, then `"a1"`, ..., `"a9"`, `"aA"`, `"aB"`, ..., `"aZ"`, `"aa"`, etc.
- `updated`: Use a timestamp in milliseconds (e.g., `1740000000000`)

## Common Element Properties

Every element shares these base properties:

```json
{
  "id": "<random-id>",
  "type": "<element-type>",
  "x": 0,
  "y": 0,
  "width": 200,
  "height": 50,
  "angle": 0,
  "strokeColor": "#1e1e1e",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 1,
  "opacity": 100,
  "groupIds": [],
  "frameId": null,
  "index": "a0",
  "roundness": null,
  "seed": 123456789,
  "version": 1,
  "versionNonce": 987654321,
  "isDeleted": false,
  "boundElements": null,
  "updated": 1740000000000,
  "link": null,
  "locked": false
}
```

## Element Types

For detailed templates of each element type with all required fields, see [element-templates.md](element-templates.md).

### Quick Reference

| Type | Purpose | Key extras |
|------|---------|------------|
| `text` | Standalone or bound text | `text`, `fontSize`, `fontFamily`, `textAlign`, `verticalAlign`, `containerId`, `originalText`, `autoResize`, `lineHeight` |
| `rectangle` | Boxes, containers | `roundness: { "type": 3 }` for rounded corners |
| `ellipse` | Circles, ovals | `roundness: { "type": 2 }` |
| `diamond` | Decision shapes | `roundness: { "type": 2 }` |
| `arrow` | Connectors with optional labels | `points`, `startBinding`, `endBinding`, `startArrowhead`, `endArrowhead` |
| `line` | Lines without arrowheads | Same as arrow but typically no bindings |

## Binding Text to Shapes

To place text inside a shape (centered):

1. Create the shape with `boundElements` referencing the text:
   ```json
   "boundElements": [{ "type": "text", "id": "<text-element-id>" }]
   ```

2. Create the text element with:
   - `containerId`: set to the shape's `id`
   - `textAlign`: `"center"`
   - `verticalAlign`: `"middle"`
   - Position (x, y) centered within the shape

### Centering formula

```
text.x = shape.x + (shape.width - text.width) / 2
text.y = shape.y + (shape.height - text.height) / 2
```

For `text.height`, use: `numberOfLines * fontSize * lineHeight` (default lineHeight = 1.25).

For `text.width`, estimate: `characterCount * fontSize * 0.6` (approximate, varies by font).

## Connecting Shapes with Arrows

Arrows connect shapes via `startBinding` and `endBinding`:

```json
{
  "startBinding": {
    "elementId": "<source-shape-id>",
    "mode": "orbit",
    "fixedPoint": [0.5, 0.5]
  },
  "endBinding": {
    "elementId": "<target-shape-id>",
    "mode": "orbit",
    "fixedPoint": [0.5, 0.5]
  }
}
```

The referenced shapes must include the arrow in their `boundElements`:
```json
"boundElements": [{ "id": "<arrow-id>", "type": "arrow" }]
```

### Arrow points

`points` is relative to (x, y). First point is always `[0, 0]`. Second point is offset:
```json
"points": [[0, 0], [deltaX, deltaY]]
```

Where `deltaX = target.x - arrow.x` and `deltaY = target.y - arrow.y`.

## Layout Guidelines for Presentations

When creating presentation-style diagrams:

- Use **distinct spatial regions** for each "slide" or section (e.g., spaced 1500-2000px apart horizontally)
- Use large text (`fontSize: 36-48`) for titles, `fontSize: 20-24` for body text
- Group related elements using `groupIds` (same group ID string for all elements in a group)
- Use colored backgrounds for emphasis: `"#ffec99"` (yellow), `"#a5d8ff"` (blue), `"#b2f2bb"` (green), `"#ffc9c9"` (red)
- Standard spacing: 20-40px padding inside shapes, 60-100px between elements

## Colors Reference

| Color | Hex | Use |
|-------|-----|-----|
| Black | `#1e1e1e` | Default stroke |
| Blue | `#1971c2` | Highlights, links |
| Red | `#e03131` | Warnings, critical |
| Green | `#2f9e44` | Success, positive |
| Orange | `#f08c00` | Attention |
| Light yellow bg | `#ffec99` | Highlight background |
| Light blue bg | `#a5d8ff` | Info background |
| Light green bg | `#b2f2bb` | Success background |
| Light red bg | `#ffc9c9` | Warning background |

## Font Families

| Value | Font |
|-------|------|
| 5 | Default (Excalifont) |
| 1 | Virgil (hand-drawn) |
| 2 | Helvetica |
| 3 | Cascadia Code (monospace) |

## Workflow — Python Generator (Recommended)

**Prefer generating Excalidraw files via Python script** instead of writing JSON directly.
This approach avoids manual coordinate errors, guarantees unique IDs/indices, and makes diagrams easy to modify.

### Generator library

Use the reusable helper at `scripts/generator.py`. It provides:

| Function | Purpose |
|----------|---------|
| `make_rect(eid, x, y, w, h, bg, bound_elements)` | Rectangle with rounded corners |
| `make_ellipse(eid, x, y, w, h, bg, bound_elements)` | Ellipse/circle |
| `make_diamond(eid, x, y, w, h, bg, bound_elements)` | Diamond shape |
| `make_text(eid, x, y, w, h, text, font_size, ...)` | Text (standalone or bound) |
| `make_arrow(eid, x, y, points, start_binding, end_binding)` | Arrow connector |
| `make_line(eid, x, y, points)` | Line (no arrowheads) |
| `binding(element_id)` | Create arrow binding reference |
| `center_text_in_shape(sx, sy, sw, sh, tw, th)` | Calculate centered text position |
| `estimate_text_size(text, font_size)` | Estimate (width, height) for text |
| `build_document(elements)` | Build top-level Excalidraw JSON |
| `write_file(doc, filepath)` | Write file + assert unique IDs |

### Step-by-step

1. Create a Python script next to the target `.excalidraw` file
2. Import helpers from `generator.py`
3. Build elements list: shapes first, then bound text, then arrows
4. For bound text: set `container_id` on text AND `bound_elements` on shape
5. For arrows: set `start_binding`/`end_binding` AND add arrow to shapes' `bound_elements`
6. Call `build_document(elements)` and `write_file(doc, path)`
7. Run validation
8. **Keep the .py file** alongside the .excalidraw for future edits

### Example

```python
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../.cursor/skills/generate-excalidraw/scripts'))
from generator import *

elements = []

# Shape with bound text
elements.append(make_rect("box1", 0, 0, 200, 80, bg="#a5d8ff",
    bound_elements=[{"type": "text", "id": "box1_text"}]))
tx, ty = center_text_in_shape(0, 0, 200, 80, 120, 25)
elements.append(make_text("box1_text", tx, ty, 120, 25, "Hello World",
    font_size=20, text_align="center", vertical_align="middle",
    container_id="box1"))

doc = build_document(elements)
write_file(doc, "output.excalidraw")
```

## Workflow — Direct JSON (Fallback)

For very small diagrams (< 10 elements), writing JSON directly is acceptable:

1. Plan the layout on a coordinate grid (origin at 0,0)
2. Create shapes first, noting their IDs
3. Create text elements bound to shapes
4. Create arrows connecting shapes
5. Set all `isDeleted: false` for visible elements

Use the templates in [element-templates.md](element-templates.md) as reference.

## Validation

After generating an `.excalidraw` file (either method), run:

```bash
python3 .cursor/skills/generate-excalidraw/scripts/validate.py <path-to-file.excalidraw>
```

The script checks:
- Valid JSON structure
- Unique IDs and indices
- No `isDeleted: true` on visible elements
- Bound text ↔ shape cross-references are consistent
- Arrow binding ↔ shape boundElements are consistent

**Always run validation after generating a file.** Fix any errors before delivering.

## Scripts Reference

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/generator.py` | Reusable helpers for building diagrams | `from generator import *` |
| `scripts/validate.py` | Structural validation of generated files | `python3 validate.py <file>` |
