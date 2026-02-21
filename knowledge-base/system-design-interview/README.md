# Tech interview - System design

## The 7 Core System Design Interview Patterns

Most interviews boil down to identifying which of these 7 patterns applies to the problem:

1.  **Scaling Reads:** "Too many people reading?" -> [Cache](./topics/caching-deep-dive.md) + [Replicas](./topics/caching-deep-dive.md) + [CDN](./topics/caching-deep-dive.md).
2.  **Scaling Writes:** "Too many people posting?" -> [Sharding/Batching/Async](./topics/scaling-writes.md).
3.  **Unique IDs:** "Need a primary key?" -> [Snowflake vs UUID](./topics/unique-id-generation.md).
4.  **Real-time Updates:** "Chat or Notifications?" -> [WebSockets vs SSE](./topics/real-time-updates.md).
5.  **Large Files:** "Video/Images?" -> [Presigned URLs + Multipart](./topics/secure-file-serving-patterns.md).
6.  **Concurrency:** "Double booking?" -> [Distributed Locks/Optimistic Locking](./topics/distributed-concurrency-control.md).
7.  **Complex Flows:** "Payment processing?" -> [Sagas/Workflow Engines](./topics/multi-step-workflows.md).

## Internal Deep Dives & Study Guides

### Core Principles
*   [**The 80/20 Rule of System Design**](./topics/80-20-rule-of-system-design.md) (7 Core Patterns)
*   [**System Design Concepts**](./topics/system-design-concepts.md) (30 Key Concepts)
*   [**System Design Building Blocks**](./topics/system-design-building-blocks.md) (15 Must-Know Blocks)

### Scalability & Performance
*   [**Scaling Reads (Caching)**](./topics/caching-deep-dive.md) (Strategies, Redis, Eviction, Replicas)
*   [**Scaling Writes Patterns**](./topics/scaling-writes.md) (Sharding, Batching, Async)
*   [**Scaling Databases Techniques**](./topics/scaling-databases-techniques.md) (10 Techniques)
*   [**Async Processing Patterns**](./topics/async-processing-patterns.md) (Write-Behind vs Event Sourcing Deep Dive)

### Data & Storage
*   [**Unique ID Generation**](./topics/unique-id-generation.md) (UUID, Snowflake, Auto-inc)
*   [**Secure File Serving Patterns**](./topics/secure-file-serving-patterns.md) (S3, CDN, Signed Cookies)
*   [**Redis: Pub/Sub vs Streams**](./topics/redis-pubsub-vs-streams.md)

### Communication & Real-time
*   [**Real-Time Updates**](./topics/real-time-updates.md) (Polling, WebSockets, SSE)
*   [**Distributed Concurrency**](./topics/distributed-concurrency-control.md) (Locks, Optimistic Locking, Reservations)
*   [**Multi-Step Workflows**](./topics/multi-step-workflows.md) (Sagas, Temporal)

### Infrastructure & Orchestration
*   [**Kubernetes**](./topics/kubernetes.md) (KEDA)

### Frontend
*   [**Frontend System Design Patterns**](./topics/frontend-system-design-patterns.md) (Virtualization, Pagination, Optimistic UI, Visibility, Assets)

**Additional Resources**: 
- [Awesome System Design Resources by Ashish Pratap Singh](https://github.com/ashishps1/awesome-system-design-resources)
- [System Design Primer by Donne Martin](https://github.com/donnemartin/system-design-primer)
- [Awesome Low Level Design by Ashish Pratap Singh](https://github.com/ashishps1/awesome-low-level-design)
