#!/usr/bin/env python3
"""Validate an Excalidraw file for structural correctness.

Usage:
    python scripts/validate.py <path-to-file.excalidraw>

Checks:
    - Valid JSON with expected top-level structure
    - All element IDs are unique
    - All element indices are unique
    - No visible elements with isDeleted=True
    - Bound text ↔ shape cross-references are consistent
    - Arrow startBinding/endBinding ↔ shape boundElements are consistent
"""

import json
import sys


def validate(filepath: str) -> bool:
    with open(filepath) as f:
        data = json.load(f)

    elements = data.get("elements", [])
    els = {e["id"]: e for e in elements}
    errors = []

    # --- Summary ---
    types = set(e["type"] for e in elements)
    texts = [e for e in elements if e["type"] == "text"]
    bound_texts = [t for t in texts if t.get("containerId")]
    rects = [e for e in elements if e["type"] == "rectangle"]
    arrows = [e for e in elements if e["type"] == "arrow"]

    print(f"Elements: {len(elements)}")
    print(f"Types: {types}")
    print(f"Text: {len(texts)} (bound: {len(bound_texts)}, standalone: {len(texts) - len(bound_texts)})")
    print(f"Rectangles: {len(rects)}")
    print(f"Arrows: {len(arrows)}")
    print()

    # --- Unique IDs ---
    ids = [e["id"] for e in elements]
    if len(set(ids)) != len(ids):
        dupes = [i for i in ids if ids.count(i) > 1]
        errors.append(f"Duplicate IDs: {set(dupes)}")
    else:
        print(f"[OK] All {len(ids)} IDs are unique")

    # --- Unique indices ---
    indices = [e["index"] for e in elements]
    if len(set(indices)) != len(indices):
        dupes = [i for i in indices if indices.count(i) > 1]
        errors.append(f"Duplicate indices: {set(dupes)}")
    else:
        print(f"[OK] All {len(indices)} indices are unique ({indices[0]} .. {indices[-1]})")

    # --- isDeleted ---
    deleted = [e for e in elements if e.get("isDeleted", False)]
    if deleted:
        errors.append(f"{len(deleted)} elements have isDeleted=True: {[e['id'] for e in deleted]}")
    else:
        print("[OK] All elements have isDeleted=False")

    # --- Bound text cross-references ---
    for e in elements:
        if e["type"] == "text" and e.get("containerId"):
            cid = e["containerId"]
            if cid not in els:
                errors.append(f"Text '{e['id']}' containerId '{cid}' not found")
            else:
                parent = els[cid]
                parent_bound = parent.get("boundElements") or []
                if not any(b.get("id") == e["id"] and b.get("type") == "text" for b in parent_bound):
                    errors.append(f"Text '{e['id']}' not in parent '{cid}' boundElements")

    # --- Shape boundElements reference existing text ---
    shape_types = {"rectangle", "ellipse", "diamond"}
    for e in elements:
        if e["type"] in shape_types:
            for b in e.get("boundElements") or []:
                if b["id"] not in els:
                    errors.append(f"Shape '{e['id']}' boundElement '{b['id']}' not found")

    if not any("Text" in err or "not in parent" in err for err in errors):
        print(f"[OK] All bound text cross-references are consistent")

    # --- Arrow bindings ---
    arrow_errors = False
    for e in elements:
        if e["type"] == "arrow":
            for binding_key in ("startBinding", "endBinding"):
                binding = e.get(binding_key)
                if binding:
                    target_id = binding["elementId"]
                    if target_id not in els:
                        errors.append(f"Arrow '{e['id']}' {binding_key} target '{target_id}' not found")
                        arrow_errors = True
                    else:
                        target = els[target_id]
                        target_bound = target.get("boundElements") or []
                        if not any(b.get("id") == e["id"] for b in target_bound):
                            errors.append(f"Arrow '{e['id']}' not in {binding_key} target '{target_id}' boundElements")
                            arrow_errors = True

    if not arrow_errors:
        print(f"[OK] All arrow bindings are consistent")

    # --- Results ---
    print()
    if errors:
        print(f"FAILED — {len(errors)} error(s):")
        for err in errors:
            print(f"  - {err}")
        return False
    else:
        print("PASSED — All validations passed")
        return True


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <file.excalidraw>")
        sys.exit(1)

    success = validate(sys.argv[1])
    sys.exit(0 if success else 1)
