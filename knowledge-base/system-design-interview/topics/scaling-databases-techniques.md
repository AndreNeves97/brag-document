# Scaling databases gets a lot easier once you learn these 10 techniques

Source: [LinkedIn Post by Ashish Pratap Singh](https://www.linkedin.com/posts/ashishps1_scaling-databases-gets-a-lot-easier-once-activity-7419589569613901824-fukc?utm_source=share&utm_medium=member_desktop&rcm=ACoAABs0ul0BsB4K_c-c0vQJeGSfYIYIQt2QEi0)

1. **Indexing**: Speed up read queries by creating indexes on frequently accessed columns.
2. **Vertical Scaling**: Add more CPU, RAM, or storage to the database server to handle higher workloads.
3. **Caching**: Use in-memory stores like Redis to serve hot data faster and reduce DB load.
4. **Sharding**: Split the database into smaller, independent shards and distribute them across servers for horizontal scaling.
5. **Replication**: Create multiple copies (replicas) of the database across different servers to balance read traffic and improve availability.
6. **Query Optimization**: Fine-tune SQL queries, eliminate expensive operations, and leverage indexes effectively to improve execution speed.
7. **Connection Pooling**: Reduce the overhead of opening/closing database connections by reusing existing ones.
8. **Vertical Partitioning**: Split large tables into smaller, more manageable partitions, each containing a subset of the columns from the original table.
9. **Denormalization**: Store data in a redundant but structured format to minimize complex joins and speed up read-heavy workloads.
10. **Materialized Views**: Pre-compute and store results of complex queries as separate tables to avoid expensive recalculation.
