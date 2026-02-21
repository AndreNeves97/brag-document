# Excalidraw Element Templates

Complete JSON templates for each element type. Copy and modify as needed.

## Standalone Text

```json
{
  "id": "txt001",
  "type": "text",
  "x": 100,
  "y": 100,
  "width": 200,
  "height": 25,
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
  "seed": 100000001,
  "version": 1,
  "versionNonce": 200000001,
  "isDeleted": false,
  "boundElements": null,
  "updated": 1740000000000,
  "link": null,
  "locked": false,
  "text": "Hello World",
  "fontSize": 20,
  "fontFamily": 5,
  "textAlign": "left",
  "verticalAlign": "top",
  "containerId": null,
  "originalText": "Hello World",
  "autoResize": true,
  "lineHeight": 1.25
}
```

**Notes:**
- `width`: estimate `charCount * fontSize * 0.6`
- `height`: `numberOfLines * fontSize * lineHeight`
- For multi-line text, use `\n` in both `text` and `originalText`
- When text auto-wraps inside a container, `originalText` has the unwrapped version

## Rectangle

```json
{
  "id": "rect001",
  "type": "rectangle",
  "x": 100,
  "y": 100,
  "width": 200,
  "height": 70,
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
  "roundness": { "type": 3 },
  "seed": 100000002,
  "version": 1,
  "versionNonce": 200000002,
  "isDeleted": false,
  "boundElements": [],
  "updated": 1740000000000,
  "link": null,
  "locked": false
}
```

**Notes:**
- `roundness: { "type": 3 }` = rounded corners; `null` = sharp corners
- `backgroundColor`: set to a color hex for filled rectangles (e.g., `"#ffec99"`)
- `fillStyle`: `"solid"`, `"hachure"`, `"cross-hatch"`, `"dots"`
- Add text inside via `boundElements: [{ "type": "text", "id": "<text-id>" }]`

## Ellipse

```json
{
  "id": "ell001",
  "type": "ellipse",
  "x": 100,
  "y": 100,
  "width": 130,
  "height": 130,
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
  "roundness": { "type": 2 },
  "seed": 100000003,
  "version": 1,
  "versionNonce": 200000003,
  "isDeleted": false,
  "boundElements": [],
  "updated": 1740000000000,
  "link": null,
  "locked": false
}
```

**Notes:**
- Equal `width` and `height` = circle
- Text centering inside ellipse uses same formula as rectangle

## Diamond

```json
{
  "id": "dia001",
  "type": "diamond",
  "x": 100,
  "y": 100,
  "width": 200,
  "height": 160,
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
  "roundness": { "type": 2 },
  "seed": 100000004,
  "version": 1,
  "versionNonce": 200000004,
  "isDeleted": false,
  "boundElements": [],
  "updated": 1740000000000,
  "link": null,
  "locked": false
}
```

## Arrow

```json
{
  "id": "arr001",
  "type": "arrow",
  "x": 300,
  "y": 135,
  "width": 160,
  "height": 2,
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
  "roundness": { "type": 2 },
  "seed": 100000005,
  "version": 1,
  "versionNonce": 200000005,
  "isDeleted": false,
  "boundElements": [],
  "updated": 1740000000000,
  "link": null,
  "locked": false,
  "points": [
    [0, 0],
    [160, 0]
  ],
  "startBinding": {
    "elementId": "rect001",
    "mode": "orbit",
    "fixedPoint": [0.5, 0.5]
  },
  "endBinding": {
    "elementId": "rect002",
    "mode": "orbit",
    "fixedPoint": [0.5, 0.5]
  },
  "startArrowhead": null,
  "endArrowhead": "arrow",
  "elbowed": false,
  "moveMidPointsWithElement": false
}
```

**Notes:**
- `startArrowhead`: `null` (none) or `"arrow"`
- `endArrowhead`: `"arrow"` (default) or `null`
- Both `"arrow"` = bidirectional
- `points`: relative to element's (x, y). First point always `[0, 0]`
- Arrow with label: add text element with `containerId: "<arrow-id>"` and add `{ "type": "text", "id": "<text-id>" }` to arrow's `boundElements`
- `strokeStyle: "dashed"` for dashed arrows

## Line

```json
{
  "id": "line001",
  "type": "line",
  "x": 0,
  "y": 200,
  "width": 800,
  "height": 0,
  "angle": 0,
  "strokeColor": "#1e1e1e",
  "backgroundColor": "transparent",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 0,
  "opacity": 100,
  "groupIds": [],
  "frameId": null,
  "index": "a0",
  "roundness": null,
  "seed": 100000006,
  "version": 1,
  "versionNonce": 200000006,
  "isDeleted": false,
  "boundElements": [],
  "updated": 1740000000000,
  "link": null,
  "locked": false,
  "points": [
    [0, 0],
    [800, 0]
  ],
  "startBinding": null,
  "endBinding": null,
  "lastCommittedPoint": null,
  "startArrowhead": null,
  "endArrowhead": null
}
```

## Bound Text (inside a shape)

```json
{
  "id": "btxt001",
  "type": "text",
  "x": 135,
  "y": 122,
  "width": 130,
  "height": 25,
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
  "index": "a1",
  "roundness": null,
  "seed": 100000007,
  "version": 1,
  "versionNonce": 200000007,
  "isDeleted": false,
  "boundElements": null,
  "updated": 1740000000000,
  "link": null,
  "locked": false,
  "text": "Load Balancer",
  "fontSize": 20,
  "fontFamily": 5,
  "textAlign": "center",
  "verticalAlign": "middle",
  "containerId": "rect001",
  "originalText": "Load Balancer",
  "autoResize": true,
  "lineHeight": 1.25
}
```

**Critical:** The parent shape MUST have `"boundElements": [{ "type": "text", "id": "btxt001" }]`
