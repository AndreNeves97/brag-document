#!/usr/bin/env python3
"""Reusable helper functions for generating Excalidraw files via Python.

Usage:
    Import this module in a diagram-specific script, use the helper functions
    to build elements, then call build_document() and write_file().

Example:
    from generator import (
        make_rect, make_ellipse, make_text, make_arrow,
        binding, build_document, write_file
    )

    elements = []
    elements.append(make_rect("my_rect", 0, 0, 200, 80, bg="#a5d8ff",
        bound_elements=[{"type": "text", "id": "my_text"}]))
    elements.append(make_text("my_text", 10, 27, 180, 25, "Hello",
        font_size=20, text_align="center", vertical_align="middle",
        container_id="my_rect"))

    doc = build_document(elements)
    write_file(doc, "output.excalidraw")
"""

import json
import random

random.seed(42)
TIMESTAMP = 1740000000000

_idx_counter = [0]
_BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


def gen_seed():
    """Generate a random seed integer for Excalidraw element properties."""
    return random.randint(100000000, 999999999)


def next_index():
    """Generate the next sequential index string (a0, a1, ..., a9, aA, ..., aZ, aa, ...)."""
    n = _idx_counter[0]
    prefix_idx = n // 62
    suffix_idx = n % 62
    prefix = chr(ord('a') + prefix_idx)
    suffix = _BASE62[suffix_idx]
    _idx_counter[0] += 1
    return f"{prefix}{suffix}"


def reset_index():
    """Reset the index counter (useful when generating multiple files)."""
    _idx_counter[0] = 0


def _base_props(eid, x, y, w, h, stroke_color="#1e1e1e", bg="transparent",
                fill_style="solid", stroke_width=2, roundness=None, bound_elements=None):
    """Shared properties for all element types."""
    return {
        "id": eid,
        "x": x, "y": y,
        "width": w, "height": h,
        "angle": 0,
        "strokeColor": stroke_color,
        "backgroundColor": bg,
        "fillStyle": fill_style,
        "strokeWidth": stroke_width,
        "strokeStyle": "solid",
        "roughness": 1,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "index": next_index(),
        "roundness": roundness,
        "seed": gen_seed(),
        "version": 1,
        "versionNonce": gen_seed(),
        "isDeleted": False,
        "boundElements": bound_elements if bound_elements is not None else [],
        "updated": TIMESTAMP,
        "link": None,
        "locked": False,
    }


def make_rect(eid, x, y, w, h, bg="transparent", bound_elements=None,
              stroke_color="#1e1e1e", stroke_width=2):
    """Create a rectangle element. Use roundness type 3 for rounded corners."""
    props = _base_props(eid, x, y, w, h, stroke_color=stroke_color, bg=bg,
                        stroke_width=stroke_width, roundness={"type": 3},
                        bound_elements=bound_elements)
    props["type"] = "rectangle"
    return props


def make_ellipse(eid, x, y, w, h, bg="transparent", bound_elements=None):
    """Create an ellipse element. Equal w/h = circle."""
    props = _base_props(eid, x, y, w, h, bg=bg, roundness={"type": 2},
                        bound_elements=bound_elements)
    props["type"] = "ellipse"
    return props


def make_diamond(eid, x, y, w, h, bg="transparent", bound_elements=None):
    """Create a diamond element."""
    props = _base_props(eid, x, y, w, h, bg=bg, roundness={"type": 2},
                        bound_elements=bound_elements)
    props["type"] = "diamond"
    return props


def make_text(eid, x, y, w, h, text, font_size=20, text_align="left",
              vertical_align="top", container_id=None, bound_elements=None,
              stroke_color="#1e1e1e", auto_resize=True):
    """Create a text element.

    For bound text (inside a shape), set container_id to the shape's ID
    and use text_align="center", vertical_align="middle".

    Width estimate: char_count * font_size * 0.6
    Height estimate: num_lines * font_size * 1.25
    """
    props = _base_props(eid, x, y, w, h, stroke_color=stroke_color,
                        bound_elements=bound_elements)
    props["type"] = "text"
    props["roundness"] = None
    props.update({
        "text": text,
        "fontSize": font_size,
        "fontFamily": 5,
        "textAlign": text_align,
        "verticalAlign": vertical_align,
        "containerId": container_id,
        "originalText": text,
        "autoResize": auto_resize,
        "lineHeight": 1.25,
    })
    return props


def make_arrow(eid, x, y, points, start_binding=None, end_binding=None,
               bound_elements=None, stroke_width=2, stroke_style="solid",
               start_arrowhead=None, end_arrowhead="arrow"):
    """Create an arrow element.

    points: list of [dx, dy] pairs relative to (x, y).
            First point is always [0, 0].
    """
    dx = points[-1][0]
    dy = points[-1][1]
    props = _base_props(eid, x, y, abs(dx) or 2, abs(dy) or 2,
                        stroke_width=stroke_width, roundness={"type": 2},
                        bound_elements=bound_elements)
    props["type"] = "arrow"
    props["strokeStyle"] = stroke_style
    props.update({
        "points": points,
        "startBinding": start_binding,
        "endBinding": end_binding,
        "startArrowhead": start_arrowhead,
        "endArrowhead": end_arrowhead,
        "elbowed": False,
        "moveMidPointsWithElement": False,
    })
    return props


def make_line(eid, x, y, points, stroke_width=2, stroke_style="solid"):
    """Create a line element (no arrowheads, no bindings)."""
    dx = points[-1][0]
    dy = points[-1][1]
    props = _base_props(eid, x, y, abs(dx) or 2, abs(dy) or 2,
                        stroke_width=stroke_width)
    props["type"] = "line"
    props["strokeStyle"] = stroke_style
    props.update({
        "points": points,
        "startBinding": None,
        "endBinding": None,
        "lastCommittedPoint": None,
        "startArrowhead": None,
        "endArrowhead": None,
    })
    return props


def binding(element_id, mode="orbit", fixed_point=None):
    """Create a binding reference for arrows."""
    return {
        "elementId": element_id,
        "mode": mode,
        "fixedPoint": fixed_point or [0.5, 0.5],
    }


def center_text_in_shape(shape_x, shape_y, shape_w, shape_h, text_w, text_h):
    """Calculate (x, y) to center text inside a shape."""
    return (
        shape_x + (shape_w - text_w) / 2,
        shape_y + (shape_h - text_h) / 2,
    )


def estimate_text_size(text, font_size):
    """Estimate (width, height) for a text element.

    Width: max_line_length * font_size * 0.6
    Height: num_lines * font_size * 1.25
    """
    lines = text.split("\n")
    max_len = max(len(line) for line in lines)
    return (
        max_len * font_size * 0.6,
        len(lines) * font_size * 1.25,
    )


def build_document(elements, bg_color="#ffffff"):
    """Build the top-level Excalidraw document structure."""
    return {
        "type": "excalidraw",
        "version": 2,
        "source": "https://excalidraw.com",
        "elements": elements,
        "appState": {
            "gridSize": 20,
            "gridStep": 5,
            "gridModeEnabled": False,
            "viewBackgroundColor": bg_color,
            "lockedMultiSelections": {},
        },
        "files": {},
    }


def write_file(doc, filepath):
    """Write the Excalidraw document to a file."""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(doc, f, indent=2, ensure_ascii=False)

    elements = doc["elements"]
    ids = [e["id"] for e in elements]
    indices = [e["index"] for e in elements]
    assert len(ids) == len(set(ids)), "Duplicate IDs found!"
    assert len(indices) == len(set(indices)), "Duplicate indices found!"

    print(f"Written {len(elements)} elements to: {filepath}")
    print(f"  IDs: {len(ids)} unique | Indices: {indices[0]} .. {indices[-1]}")
