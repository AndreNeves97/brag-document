# Distributed Concurrency Control

> **Scope:** Handling race conditions and contention in distributed systems (e.g., "Ticket Booking", "Inventory count", "Double Spending").

---

## 1. The Problem: "Double Booking"
Two users (A and B) try to book the last seat on a flight at the exact same millisecond.
1.  App A reads `seats_available = 1`
2.  App B reads `seats_available = 1`
3.  App A writes `seats_available = 0` (Success)
4.  App B writes `seats_available = 0` (Success - **BUG!**)

We sold 1 seat to 2 people.

---

## 2. Strategies

### A. Optimistic Locking (Versioning)
*   **Concept:** "Hope for the best, check before commit."
*   **Implementation:** Add a `version` column to the DB row.
    ```sql
    UPDATE seats SET available = 0, version = version + 1
    WHERE id = 123 AND version = 5;
    ```
*   **Outcome:** If User A updates first, version becomes 6. User B's query fails (updates 0 rows) because `version` is no longer 5.
*   **Use Case:** Low contention (editing profile, wiki edits).
*   **Pros:** No database locks held, high read throughput.
*   **Cons:** High failure rate under heavy load (lots of retries).

### B. Pessimistic Locking (Select for Update)
*   **Concept:** "Lock the door before entering."
*   **Implementation:** Database Row Lock.
    ```sql
    BEGIN;
    SELECT * FROM seats WHERE id = 123 FOR UPDATE;
    -- Application Logic --
    UPDATE seats ...;
    COMMIT;
    ```
*   **Use Case:** High contention, critical data (Money transfers).
*   **Pros:** Guarantees consistency, prevents conflicts.
*   **Cons:** Kills performance. Requests queue up waiting for locks. Deadlock risk.

### C. Distributed Locks (Redis/ZooKeeper)
*   **Concept:** Use an external system to hold a "mutex" before accessing the resource.
*   **Implementation:**
    1.  Worker asks Redis: `SET resource_123_lock true NX EX 10` (Only set if not exists, expire in 10s).
    2.  If Success: Do work, then `DEL resource_123_lock`.
    3.  If Fail: Retry later.
*   **Use Case:** Locking resources that aren't just a single DB row (e.g., "Process this file", "Cron job").
*   **Pros:** Works across different services/DBs.
*   **Cons:** Complexity (Lease management, what if worker dies?). `Redlock` algorithm handles this robustly.

---

## 3. Advanced: The "Reservation" Pattern
For inventory systems (Ticketing, E-commerce), locking the item for the whole checkout process (5 mins) is bad.

**Solution:**
1.  **Reserve:** User clicks "Checkout". Create a temporary `Reservation` record with `expires_at = now() + 5min`.
2.  **Deduct Inventory:** Decrement inventory *conditionally* (or validate against count of active reservations).
3.  **Confirm:** When payment succeeds, mark reservation as "Confirmed".
4.  **Expire:** Background job releases expired reservations back to inventory.

---

## 4. Interview Framework

*   **Low Contention?** -> **Optimistic Locking** (Version check).
*   **Strict Consistency (Money)?** -> **Pessimistic Locking** (Row lock).
*   **Distributed Resource / Long Task?** -> **Distributed Lock** (Redis).
*   **Inventory/Booking?** -> **Reservation Pattern**.

