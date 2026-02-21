# Scaling Writes Patterns

> **Scope:** How to handle high-volume write traffic (millions of inserts/updates per second) when a single database hits its limit.

---

## 1. The Bottleneck
Databases are usually optimized for Reads (Indices, Caching). Writes are expensive (ACID, Locks, Index updates).
When `INSERT` speed becomes the bottleneck, adding Read Replicas doesn't help (actually hurts, as replicas must replay writes).

---

## 2. Strategies

### A. Sharding (Partitioning)
*   **Concept:** Split the data across multiple physical database servers.
*   **How:** Choose a **Shard Key** (e.g., `user_id`).
    *   `user_id % 4 = 0` -> DB Node A
    *   `user_id % 4 = 1` -> DB Node B
    *   ...
*   **Pros:** Linear scaling of write throughput.
*   **Cons:** Operational nightmare. Joins across shards are impossible/hard. Resharding (adding nodes) is complex (Consistent Hashing helps).
*   **Use Case:** User Data (Facebook), Messages (Discord).

### B. Batching
*   **Concept:** Don't write every single event immediately. Group them.
*   **How:** App accumulates metrics in memory (or local file) for 1 second, then does **one** Bulk Insert of 1000 records.
*   **Pros:** Reduces Network RTT and DB Transaction overhead. Massive throughput gain.
*   **Cons:** Risk of data loss (if app crashes before flush). Added latency.
*   **Use Case:** Analytics, Logs, IoT Sensor Data.

### C. Async Processing (Queue-Based Load Leveling)
*   **Concept:** Decouple the "Request" from the "Write".
*   **How:** API accepts request -> Pushes to Kafka/SQS -> Worker pulls and writes to DB at a manageable pace.
*   **Pros:**
    *   **Shock Absorber:** Spikes in traffic don't crash the DB; the queue just grows.
    *   **Retries:** Easy to handle temporary DB failures.
*   **Cons:** Eventual consistency (User doesn't see data immediately).
*   **Use Case:** "Likes", "View Counts", "Order Processing".
*   *See [Async Processing Patterns](./async-processing-patterns.md) for deep dive on Write-Behind vs Event Sourcing.*

---

## 3. Interview Framework

1.  **Is the data relational/complex?**
    *   Yes -> Sharding is hard. Try to optimize DB or Vertical Scale first.
2.  **Is it high-volume simple data (Logs, Metrics)?**
    *   -> **Batching** + **NoSQL** (Cassandra/DynamoDB).
3.  **Is immediate consistency required?**
    *   No -> **Async Processing** (Queue).
    *   Yes -> **Sharding** (if vertical scaling fails).

