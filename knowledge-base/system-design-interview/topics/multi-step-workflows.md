# Multi-Step Workflows & Sagas

> **Scope:** Managing transactions that span multiple services (Microservices), where a simple ACID DB transaction isn't possible.

---

## 1. The Problem: Distributed Transactions
In a Monolith, you use `BEGIN TRANSACTION ... COMMIT`.
In Microservices, "Checkout" involves:
1.  **Order Service:** Create Order.
2.  **Payment Service:** Charge Card.
3.  **Inventory Service:** Reserve Item.
4.  **Email Service:** Send Confirmation.

If Step 2 succeeds but Step 3 fails, we have a problem. We can't "rollback" the payment service easily with a DB command.

---

## 2. Strategies

### A. Two-Phase Commit (2PC) / XA
*   **Concept:** A Coordinator tells everyone to "Prepare", then if all say yes, "Commit".
*   **Verdict:** **Avoid in Modern Systems.** It's blocking, slow, and holds locks across services. SPoF.

### B. Saga Pattern
*   **Concept:** Break the transaction into a sequence of local transactions. If one fails, execute **Compensating Transactions** (undo steps) in reverse order.
*   **Flow (Success):** Order(Created) -> Payment(Charged) -> Inventory(Reserved).
*   **Flow (Failure at Inventory):** Order(Created) -> Payment(Charged) -> Inventory(Fail!) -> **Payment(Refund)** -> **Order(Cancel)**.

#### Choreography (Events)
*   **How:** Services talk via Event Bus. Order Service publishes `OrderCreated`. Payment Service listens, does work, publishes `PaymentProcessed`.
*   **Pros:** Decoupled, simple for few steps.
*   **Cons:** "Distributed Spaghetti". Hard to track global state. Cyclic dependencies.

#### Orchestration (Command)
*   **How:** A central **Orchestrator** (Service) tells others what to do.
*   **Pros:** Centralized logic, easy to track state.
*   **Cons:** Orchestrator becomes a complex dependency.

### C. Workflow Engines (The "Staff/Principal" Answer)
Implementing Sagas manually (handling retries, state, timeouts) is hard.
Use tools like **Temporal.io**, **AWS Step Functions**, or **Cadence**.

*   **Code-as-Infrastructure:** You write code that looks synchronous, but the engine handles persistence and retries.
    ```javascript
    async function checkoutWorkflow(order) {
        await activities.createOrder(order);
        try {
            await activities.chargePayment(order);
            await activities.reserveInventory(order);
        } catch (err) {
            await activities.refundPayment(order); // Compensation
            await activities.cancelOrder(order);
            throw err;
        }
    }
    ```
*   **Benefits:**
    *   **Durability:** If server crashes on step 2, it resumes step 2 on restart.
    *   **Retries:** Auto-retry transient failures (network blips).
    *   **Timeouts:** "Wait for user approval for 3 days".

---

## 3. Interview Framework

*   **Simple/Fast Flow (2-3 steps)?** -> **Choreography** (Events).
*   **Complex/Critical Flow (Payment/Booking)?** -> **Orchestration** (Saga).
*   **Long Running (Human in the loop)?** -> **Workflow Engine** (Temporal).

