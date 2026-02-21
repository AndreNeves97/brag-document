# Async Processing Patterns: Queue vs Event Sourcing

> **Scope:** Clarifying the architectural patterns for handling asynchronous write operations to avoid terminological confusion in interviews.

---

## 1. The Common Pattern: Write-Behind (Async Processing)

**Scenario:** User clicks "Like". We want high throughput and low latency.
**What it is often called:** Message Queueing, Task Queueing, Async Workers, Write-Behind Caching.

### How it Works
1.  **API Layer:** Receives request -> Pushes lightweight message `{userId: 1, postId: 99, action: 'LIKE'}` to a **Queue** (SQS, RabbitMQ, Redis List).
2.  **API Layer:** Returns HTTP 200 immediately (or 202 Accepted).
3.  **Worker:** Pulls message -> Validates -> Writes to Database (INSERT/UPDATE).
4.  **Worker:** Optionally updates Cache.

### Key Characteristics
*   **Intent:** Decouple the "Request" from the heavy "Work" (DB Write).
*   **State:** The Database is the source of truth. The queue is just a buffer.
*   **Destructive:** Once processed, the message is usually deleted from the queue.

---

## 2. The Advanced Pattern: Event Sourcing

**What it is:** A completely different way of storing state.
**Core Principle:** We do not store "Current State" (e.g., `Likes: 10`). We store "All Events that happened" (e.g., `LikeAdded`, `LikeRemoved`, `LikeAdded`).

### How it Works
1.  **Write:** App appends an event `LikeAdded(UserA, PostB)` to an append-only **Event Store**.
2.  **Read:** To know if UserA liked PostB, we replay (or reduce) all events related to that entity.
    *   *Optimisation:* We maintain "Snapshots" or "Read Models" (Projections) in a standard DB (SQL/NoSQL) that are updated by listening to the event stream.

### Key Characteristics
*   **Intent:** perfect auditability, ability to reconstruct state at any point in time, temporal queries.
*   **State:** The **Event Log** is the source of truth.
*   **Complexity:** High. Requires handling event schema evolution, snapshots, and eventual consistency for reads.

---

## 3. Interview Trap: "Event Sourcing" vs "Using Events"

**The Mistake:**
Saying "I'll use Event Sourcing" when you just mean "I'll use a queue to process likes asynchronously".

**Why it's bad:**
The interviewer will expect you to explain how you handle **Replays**, **Snapshots**, and **Event Schema Migration**. If you just meant "Queue", you will fail the depth questions.

**What to say instead:**
*   "I will use an **Asynchronous Processing** pattern using a Message Queue to handle high write throughput."
*   "I will use a **CQRS-light** approach where writes go to a Queue and reads come from a cache/read-replica."

