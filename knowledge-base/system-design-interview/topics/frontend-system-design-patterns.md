# Frontend System Design Patterns

> **Scope:** Deep dive into architectural patterns specifically for Frontend applications, focusing on performance, UX, and scalability of the client-side.

---

## 1. List Virtualization (Virtual Scrolling)

**Problem:** Rendering thousands of items in the DOM (e.g., an infinite feed, a long list of comments) consumes massive amounts of memory and causes "jank" (dropped frames) during scrolling because the browser tries to layout and paint every single node.

**Solution:** Only render what is visible to the user (plus a small buffer).

### How it Works
1.  **Window Calculation:** Determine the height of the visible viewport (window).
2.  **Item Height:** Know (or estimate) the height of each item in the list.
3.  **Offset Calculation:** Calculate which items *should* be visible based on the current `scrollTop`.
4.  **Rendering:**
    *   Create a container div with the *total height* of all items (to maintain the scrollbar size).
    *   Position the visible items absolute/relative using `transform: translateY` to place them in the correct visual spot.
    *   Unmount everything else.

### Key Challenges & Trade-offs
*   **Dynamic Heights:** If items have variable heights (like tweets with text/images), you can't simple calculate `index * height`.
    *   *Solution:* Use a "Measurer" component that renders the item invisible first, measures it, and caches the height. Or use a "Best Guess" and adjust on the fly (janky).
*   **Search/Find (Cmd+F):** The browser cannot search text that isn't in the DOM. Virtualization breaks native browser search.
*   **Accessibility:** Screen readers might not see the "whole" list. (Use ARIA roles like `aria-setsize` and `aria-posinset` to mitigate).

### Tools
*   `react-window` (Lightweight)
*   `react-virtualized` (Feature rich, heavier)
*   `tanstack-virtual` (Framework agnostic)

---

## 2. Pagination Strategies: Offset vs. Cursor

**Context:** Loading data for feeds or tables.

### A. Offset Pagination
*   **Query:** `SELECT * FROM posts LIMIT 10 OFFSET 50;` (Get page 6).
*   **Pros:**
    *   Simple to implement.
    *   Easy to jump to specific pages ("Go to page 10").
*   **Cons (The "Twitter Problem"):**
    *   **Data Drift:** If a new post is added while the user is on page 1, the whole list shifts down by 1. When the user requests page 2 (OFFSET 10), they will see the last item of page 1 again (duplicate).
    *   **Performance:** High offsets (`OFFSET 1000000`) are slow in SQL because the DB must read and discard 1M rows.

### B. Cursor Pagination (Infinite Scroll Standard)
*   **Concept:** Use a unique pointer (cursor) from the last item of the current page to fetch the next set. Usually `ID` or `Timestamp`.
*   **Query:** `SELECT * FROM posts WHERE id < 'last_seen_id' ORDER BY id DESC LIMIT 10;`
*   **Pros:**
    *   **Stable:** New items added to the top don't shift the "next page" relative to the user's current position. No duplicates.
    *   **Performance:** extremely fast (O(1) / O(log N) with indexes) regardless of depth.
*   **Cons:**
    *   Cannot jump to "Page 50".
    *   Requires a unique, sequential/sortable field (Snowflake IDs are great for this).

---

## 3. Optimistic UI

**Problem:** Waiting for server response (200ms - 1s) makes the app feel sluggish for simple interactions like "Likes".

**Solution:** Update the UI *immediately* assuming the request will succeed. Revert if it fails.

### Implementation Pattern
1.  **User Action:** User clicks "Like".
2.  **Optimistic Update:** Client state updates (Heart turns red, counter +1).
3.  **Network Request:** Fire async API call.
4.  **Reconciliation:**
    *   **Success:** Do nothing (state is already correct) or sync with server response (canonical data).
    *   **Error:** **Rollback** the state (Heart turns grey, counter -1) and show a toast error.

### Strategies for State Management
*   **Ephemeral (React State):** Good for simple lists, but state is lost on navigation.
*   **Normalized Cache (React Query / Apollo):**
    *   Store data by ID: `Post:123: { liked: true }`.
    *   Optimistic updates modify this global cache entry.
    *   Automatically updates all components showing this post.
*   **Avoid:** IndexedDB (Overkill for this), LocalStorage (Sync issues).

---

## 4. Visibility Detection: IntersectionObserver

**Problem:** Detecting when an element enters the viewport (for Infinite Scroll triggers, Lazy Loading images, or Auto-playing videos).

### The "Old" Way (Bad)
*   Listener `window.addEventListener('scroll', handler)`
*   In handler: `el.getBoundingClientRect().top < window.innerHeight`
*   **Issue:** Runs on Main Thread on *every* pixel scrolled. Causes "Layout Thrashing" (forcing browser to recalculate layout).

### The "New" Way (IntersectionObserver API)
*   **Concept:** Asynchronous observer. The browser tells you when the intersection status changes. Moves the heavy lifting off the main thread.
*   **Usage:**
    ```javascript
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadMoreData();
        }
      });
    }, { rootMargin: '200px' }); // Pre-load 200px before reaching bottom
    observer.observe(loadingSpinnerRef.current);
    ```

---

## 5. Asset Delivery Strategy (Hashing & Caching)

**Problem:** How to cache JS/CSS forever but ensure users get new code immediately on deploy?

### The Pattern: Immutable Assets
1.  **Build Time:** Generate filenames based on **content hash**.
    *   `main.js` -> `main.a1b2c3d4.js`
    *   If content changes, hash changes.
2.  **Server Config (S3/CDN):**
    *   **Rule:** Files with hashes in names are **Immutable**.
    *   **Header:** `Cache-Control: public, max-age=31536000, immutable` (1 year).
    *   **Effect:** Browser downloads once and *never* asks server again for that specific file.
3.  **The Entry Point (index.html):**
    *   This file **never** has a hash.
    *   It points to the hashed assets: `<script src="main.a1b2c3d4.js"></script>`
    *   **Header:** `Cache-Control: no-cache` (Always check server) or `max-age=0, must-revalidate`.
    *   **Flow:** Browser asks for index.html (cheap) -> receives new file references -> downloads new chunks (cached ones are reused).

### Modern Bundlers
*   Webpack, Vite, Rollup handle this hashing automatically (`[name].[contenthash].js`).

