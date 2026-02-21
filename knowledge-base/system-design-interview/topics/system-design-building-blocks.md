# 15 Must-Know Building Blocks for System Design Interviews

1. 𝐋𝐨𝐚𝐝 𝐁𝐚𝐥𝐚𝐧𝐜𝐞𝐫: Distributes incoming traffic across multiple backend servers to ensure no single server is overwhelmed. Improves availability, fault tolerance, and response times.

2. 𝐀𝐏𝐈 𝐆𝐚𝐭𝐞𝐰𝐚𝐲: Acts as the single entry point for all client requests in microservices architecture. Handles routing, authentication, rate limiting, and request aggregation.

3. 𝐃𝐍𝐒 (𝐃𝐨𝐦𝐚𝐢𝐧 𝐍𝐚𝐦𝐞 𝐒𝐲𝐬𝐭𝐞𝐦): Translates human-readable domain names into IP addresses.

4. 𝐂𝐚𝐜𝐡𝐞: Stores frequently accessed data in memory. Drastically reduces latency and database load.

5. 𝐂𝐃𝐍 (𝐂𝐨𝐧𝐭𝐞𝐧𝐭 𝐃𝐞𝐥𝐢𝐯𝐞𝐫𝐲 𝐍𝐞𝐭𝐰𝐨𝐫𝐤): Delivers static content (images, CSS, JS, etc.) from edge servers closer to users. Reduces latency and bandwidth usage, especially at global scale.

6. 𝐃𝐚𝐭𝐚𝐛𝐚𝐬𝐞: The core data store. Can be SQL or NoSQL depending on needs. Supports structured queries, indexing, transactions, and durability.

7. 𝐀𝐏𝐈𝐬: Defines how services talk to each other, often over HTTP or gRPC. Enables modular design and clean separation of responsibilities.

8. 𝐌𝐢𝐜𝐫𝐨𝐬𝐞𝐫𝐯𝐢𝐜𝐞𝐬: Breaks a monolithic application into independently deployable services. Increases agility, fault isolation, and scalability.

9. 𝐑𝐚𝐭𝐞 𝐋𝐢𝐦𝐢𝐭𝐞𝐫: Controls the number of requests a user or service can make in a time window. Protects your APIs from abuse and ensures fair usage.

10. 𝐎𝐛𝐣𝐞𝐜𝐭 𝐒𝐭𝐨𝐫𝐚𝐠𝐞: Stores large blobs (images, videos, backups) with high availability and durability. Example - AWS S3, Google Cloud Storage, etc.

11. 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐐𝐮𝐞𝐮𝐞: Allows asynchronous communication between services via a queue (e.g., Kafka, RabbitMQ). Helps decouple systems and handle spikes in workload.

12. 𝐒𝐡𝐚𝐫𝐝𝐢𝐧𝐠: Partitions large datasets across multiple databases or tables. Helps scale out storage and improve query performance.

13. 𝐑𝐞𝐩𝐥𝐢𝐜𝐚𝐭𝐢𝐨𝐧: Copies data from one database node to another. Improves fault tolerance and read performance.

14. 𝐂𝐨𝐧𝐬𝐢𝐬𝐭𝐞𝐧𝐭 𝐇𝐚𝐬𝐡𝐢𝐧𝐠: A technique for distributing data across nodes with minimal disruption when scaling. Commonly used in caching and distributed storage systems.

15. 𝐌𝐨𝐧𝐢𝐭𝐨𝐫𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦: Tracks system health, collects logs/metrics, and sends alerts on failures or anomalies. Crucial for observability, debugging, and uptime.
