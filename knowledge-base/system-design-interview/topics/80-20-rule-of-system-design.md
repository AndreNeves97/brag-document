# The 80/20 Rule of System Design: The 7 Core Patterns

The **80/20 rule** states that 80% of results come from 20% of actions. In System Design interviews, this is the single most important principle. Knowing just **7 core patterns** (the 20%) will allow you to solve 80% of system design questions.

Most candidates memorize specific solutions (e.g., "How to design Uber"). Successful candidates recognize **patterns** (e.g., "This is a real-time location tracking problem, so I need Geohashing + WebSockets").

---

## 1. The 7 Core Patterns (The "20%")

Almost every system design problem can be decomposed into a combination of these 7 patterns.

### 1. Scaling Reads (1000:1 Read/Write Ratio)
*   **Problem:** Database is overwhelmed by `SELECT` queries (e.g., Twitter Feed, News Site).
*   **Solution:** **CDN** (Static) → **Cache** (Hot Data) → **Read Replicas** (Persistence).
*   **Deep Dive:** [Scaling Reads & Caching Strategies](./caching-deep-dive.md)

### 2. Scaling Writes (High Throughput)
*   **Problem:** Too many `INSERT/UPDATE` requests; DB locks up (e.g., Analytics, "Likes", IoT).
*   **Solution:** **Async Processing** (Queues) → **Batching** → **Sharding** (Partitioning).
*   **Deep Dive:** [Scaling Writes Patterns](./scaling-writes.md)

### 3. Real-Time Updates
*   **Problem:** User needs to see data without refreshing the page (e.g., Chat, Notifications, Stock Ticker).
*   **Solution:** **WebSockets** (Bi-directional/Chat) or **SSE** (One-way/Feeds). Avoid Polling.
*   **Deep Dive:** [Real-Time Updates](./real-time-updates.md)

### 4. Complex Flows (Distributed Transactions)
*   **Problem:** A transaction spans multiple services (e.g., Payment + Inventory + Email).
*   **Solution:** **Saga Pattern** (Orchestration/Choreography) or **Workflow Engines** (Temporal).
*   **Deep Dive:** [Multi-Step Workflows](./multi-step-workflows.md)

### 5. Concurrency Control
*   **Problem:** Two users try to modify the same data at once (e.g., Booking the last seat, Double spending).
*   **Solution:** **Optimistic Locking** (Versioning) for low contention, **Distributed Locks** (Redis) or **Reservations** for high contention.
*   **Deep Dive:** [Distributed Concurrency Control](./distributed-concurrency-control.md)

### 6. Large File Handling
*   **Problem:** Uploading/Downloading videos or large docs blocks the API servers.
*   **Solution:** **Presigned URLs** (Direct to S3) + **Multipart Upload** + **CDN** (for read).
*   **Deep Dive:** [Secure File Serving Patterns](./secure-file-serving-patterns.md)

### 7. Unique ID Generation
*   **Problem:** Generating sortable primary keys in a distributed database (No centralized auto-increment).
*   **Solution:** **Snowflake ID** (Time-sorted, distributed) or **UUID** (Random, unsorted).
*   **Deep Dive:** [Unique ID Generation](./unique-id-generation.md)

---

## 2. Extended Heuristics (The Cheat Sheet)

Beyond the 7 patterns, use these heuristics for specific domain problems:

| Problem Trigger | Architectural Solution |
| :--- | :--- |
| **API Protection / Abuse** | **Rate Limiting** (Token Bucket / Leaky Bucket) |
| **Retry Logic / Duplicates** | **Idempotency Keys** (prevent double-charge) |
| **Text Search / Autocomplete** | **Inverted Index** (Elasticsearch / Lucene) |
| **Location / Proximity Search** | **Geohashing** (QuadTrees / Google S2) |
| **Untrusted Code** | **Sandboxing / Containerization** |
| **Data History / Audit** | **Event Sourcing** (Store events, not just state) |
| **High Availability** | **Load Balancers** + **Multi-AZ Replication** |

| **High Latency + Global Users** | **Content Delivery Network (CDN)** |
| **Write Heavy + Traffic Spikes** | **Message Queues** (Asynchronous Processing) |
| **Load Increase + Growth** | **Horizontal Scaling** (Scale Out) |
| **Read Heavy + DB Bottleneck** | **Caching** (Redis/Memcached) |
| **High Request Volume + API Protection** | **Rate Limiting / Throttling** |
| **Retry Logic + Data Integrity** | **Idempotency Keys** |
| **Single Point of Failure + Availability** | **Redundancy** (Replication) |
| **Massive Dataset + Growth** | **Database Sharding** |
| **Text Search + Keywords** | **Inverted Index** (Elasticsearch/Solr) |
| **Large File Uploads** | **Chunking / Multipart Upload** |
| **Real-time Broadcast** | **Pub/Sub Pattern** |
| **Location / Proximity Search** | **Geohashing** (QuadTrees/S2) |
| **Write Conflicts + Concurrency** | **Optimistic Locking** |
| **Untrusted Code** | **Containerization / Sandboxing** |
| **Real-time Updates + Bidirectional** | **WebSockets** |
| **Traffic Distribution + Reliability** | **Load Balancers** |
| **Distributed Transactions** | **Saga Pattern** |
| **Concurrency + Data Integrity** | **Row Locking** |
| **Data History / Audit** | **Event Sourcing** |

---

## 3. Applying Patterns to Interview Questions

Don't memorize designs. Match the problem to the patterns above.

| Interview Question | Core Patterns to Apply |
| :--- | :--- |
| **Design Instagram** | **Scaling Reads** (Feed) + **Scaling Writes** (Likes) + **Large Files** (Images) |
| **Design Uber/Yelp** | **Real-Time** (Location) + **Concurrency** (Booking) + **Geo** (Matching) |
| **Design WhatsApp/Messenger** | **Real-Time** (WebSockets) + **Scaling Writes** (Message History) + **NoSQL** (Wide-column) |
| **Design TicketMaster/Airbnb** | **Concurrency** (Locking/Reservations) + **Complex Flows** (Payment) + **Idempotency** |
| **Design Google Drive/Dropbox** | **Large Files** (Chunking/Sync) + **Scaling Reads** (Metadata) + **Global Replication** |
| **Design URL Shortener** | **Scaling Reads** (Redirects) + **Unique IDs** (Base62) |
| **Design Social Media Feed** | **Fan-out** (Pub/Sub) + **Caching** + **CDN** |
| **Design Search System (Google)** | **Inverted Index** + **Sharding** + **Crawlers** |

> **Remember:** The interviewer assesses *how* you select these patterns, not just that you know their names. Explain the "Why" (Trade-offs).

---

## References

*   [Os 7 Padrões de System Design que Aparecem em Toda Entrevista](https://newsletter.nagringa.dev/p/padroes-system-design-entrevistas) - Source article by Lucas Faria (Na Gringa).
