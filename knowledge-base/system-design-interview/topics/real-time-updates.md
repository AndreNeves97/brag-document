# Real-Time Updates Strategies

> **Scope:** How to push data from Server to Client (Web/Mobile) without the user refreshing the page.

---

## 1. Strategies Comparison

### A. Short Polling
*   **How:** Client asks "Any new data?" every X seconds.
*   **Pros:** Simplest to implement. Standard HTTP.
*   **Cons:** Wasteful (Empty responses), delayed updates (up to X seconds lag).
*   **Use Case:** Dashboard metrics that update slowly, MVP.

### B. Long Polling
*   **How:** Client asks "Any new data?". Server **holds the request open** until data is available or timeout (e.g., 30s). Client immediately sends a new request upon response.
*   **Pros:** Better latency than short polling. Works over standard HTTP.
*   **Cons:** Server holds many open connections. Header overhead for every message.
*   **Use Case:** Simple notification systems where WebSockets are overkill.

### C. Server-Sent Events (SSE)
*   **How:** A persistent HTTP connection where Server pushes text data (streams) to Client. One-way (Server -> Client).
*   **Pros:** Native Browser API (`EventSource`). Auto-reconnect. Lighter than WebSockets. Works over HTTP/2.
*   **Cons:** One-way only (Client can't send back on same channel).
*   **Use Case:** Stock Tickers, News Feeds, "Processing..." status bars, Social Media Notifications.

### D. WebSockets
*   **How:** Upgrades HTTP to a persistent, bi-directional TCP connection.
*   **Pros:** Full-duplex (Chat, Gaming). Low overhead per message.
*   **Cons:** Stateful (Load Balancing is hard - sticky sessions required). Custom protocol (ws://). Firewalls sometimes block.
*   **Use Case:** Chat Apps, Multiplayer Games, Collaborative Editing (Google Docs).

---

## 2. Scaling Challenges

### Statefulness
WebSockets and SSE are **stateful**. The client is connected to *one specific server*.
If that server crashes, connection is lost.
If you have 100 servers, Server A doesn't know User X is connected to Server B.

### The Solution: Pub/Sub (Redis)
To send a message to User X (on Server B) from Server A:
1.  Server A publishes message to Redis Channel `user:X`.
2.  All Servers subscribe to Redis channels.
3.  Server B receives the message and pushes it down the WebSocket to User X.

---

## 3. Interview Framework

*   **Chat / Game / Collaborative?** -> **WebSockets**.
*   **News Feed / Notifications / Status Updates?** -> **SSE** (Simpler, works well on mobile battery).
*   **Legacy / MVP?** -> **Long Polling**.

