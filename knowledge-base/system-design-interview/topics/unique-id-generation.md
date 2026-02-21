# Unique ID Generation Patterns

> **Scope:** How to generate unique identifiers in a distributed system without collisions or performance bottlenecks.

---

## 1. The Problem
In a monolithic system, `AUTO_INCREMENT` in SQL is enough. In a distributed system with sharded databases, we need a way to generate unique IDs that are:
1.  **Unique:** No collisions across shards/nodes.
2.  **Sortable (Time-ordered):** Useful for feeds and pagination.
3.  **Scalable:** Generation shouldn't be a single point of failure.

---

## 2. Common Strategies

### A. Database Auto-Increment (Centralized)
*   **How:** Use a central database (or a `ticket server`) just for IDs.
*   **Pros:** Simple, numeric (small size), naturally sortable.
*   **Cons:** Single Point of Failure (SPOF), network latency, hard to scale write throughput.
*   **Mitigation:** Flickr method (two servers, one odd, one even) - but still limited.

### B. UUID (Universally Unique Identifier)
*   **How:** Generate 128-bit random value in the app server (e.g., `550e8400-e29b-41d4-a716-446655440000`).
*   **Pros:** Decentralized (no coordination needed), zero latency, infinite scale.
*   **Cons:**
    *   **Size:** 128 bits is large (strings are 36 chars).
    *   **Not Sortable:** Random distribution.
    *   **DB Performance:** Random inserts kill B-Tree index performance (page fragmentation).

### C. Snowflake (Twitter) / Time-Based IDs
The "Gold Standard" for distributed IDs.

*   **Structure (64-bit integer):**
    *   **Sign bit:** 1 bit (unused).
    *   **Timestamp:** 41 bits (milliseconds since custom epoch). Gives ~69 years.
    *   **Machine ID:** 10 bits (1024 nodes).
    *   **Sequence:** 12 bits (4096 IDs per millisecond per node).

*   **Pros:**
    *   **Sortable:** Starts with timestamp, so higher ID = newer.
    *   **Performance:** Int64 fits in registers, efficient for DB indexing.
    *   **Distributed:** Generated locally on app servers (if assigned a Machine ID).
*   **Cons:** Requires Machine ID coordination (Zookeeper/Etcd) and synchronized clocks.

### D. Modern Alternatives
*   **ULID / KSUID:** Lexicographically sortable UUIDs (Timestamp + Randomness). Good for NoSQL keys where string is fine but you want sorting.

---

## 3. Interview Framework

1.  **Do we need sorting?**
    *   Yes (Feeds, Tweets, Chat Logs) -> **Snowflake** (or ULID if string is ok).
    *   No (Session IDs, Request IDs) -> **UUID** (v4).

2.  **What's the scale?**
    *   Low/Medium -> DB Auto-inc is fine.
    *   High (Facebook/Twitter scale) -> Snowflake.

3.  **Numeric vs String?**
    *   Numeric (64-bit) is better for storage and SQL joins.
    *   String is easier for web/URLs but larger storage footprint.

