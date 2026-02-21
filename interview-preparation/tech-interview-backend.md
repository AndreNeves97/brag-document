# Tech interview - Backend

## General questions

1. What's the difference between `req.params` and `req.query`
    - `params`: URL param (`booksapi.com/books/{id}`) - Path parameters that are part of the URL structure
    - `query`: Query string params (`booksapi.com/books?name=nodejs`) - Optional parameters after the `?` in the URL
    - **Example**: `/users/:id/posts?category=tech&limit=10` - `id` is a param, `category` and `limit` are query params

2. What's body-parser? What does it do?
    - Body parser is a middleware that parses the body of `POST` requests to `JSON` objects
    - It handles different content types: `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data`
    - **Modern Express**: Body parsing is now built-in with `express.json()` and `express.urlencoded()`
    - **Example**: 
      ```javascript
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      ```

3. Security mechanisms:
    1. **Helmet**:
        - Set `X-FRAME-OPTIONS` to prevent clickjacking
        - XSS protection headers
        - HTTPS enforcement
        - Content Security Policy (CSP)
        - Disable `X-Powered-By` header
    2. **CORS (Cross-Origin Resource Sharing)**:
        - Configure allowed origins, methods, headers
        - Handle preflight requests
    3. **Rate Limiting**:
        - Prevent brute force attacks
        - Use libraries like `express-rate-limit`
    4. **Input Validation**:
        - Sanitize user inputs
        - Use libraries like `joi`, `yup`, or `express-validator`
    5. **Authentication & Authorization**:
        - JWT tokens
        - Session management
        - Role-based access control (RBAC)
    6. **SQL Injection Prevention**:
        - Use parameterized queries
        - ORM with built-in protection
    7. **HTTPS/SSL**:
        - Force HTTPS in production
        - Secure cookies with `httpOnly` and `secure` flags

## What was your hardest challenge?

1. **Difference between abstract class and interface**:
    - **Abstract Class**:
        - Can have constructor, fields, and concrete methods
        - Can have access modifiers (public, private, protected)
        - Can implement interfaces
        - Can have static methods
        - A class can extend only one abstract class
    - **Interface**:
        - Can only have abstract methods (before Java 8)
        - Can have default and static methods (Java 8+)
        - Can have constants (public static final)
        - A class can implement multiple interfaces
        - Cannot have constructor or fields (except constants)

2. **What is the difference between a reference type and a value type?**
    - **Reference type**: Points to a memory reference. If I pass by a function parameter, the receiver function will have access to the same object created in another context.
        - Complex types, like arrays and objects
        - Stored in heap memory
        - Can be null
    - **Value type**: When I pass to the parameter, I make a copy of the value. The value in the receiver function is not the same created previously.
        - Primitives types, like string, boolean, numbers
        - Stored in stack memory
        - Cannot be null (unless nullable)
    - **A problem of reference type**: Side effects when the object is changed in a function that receives it.
    - **Solutions**: Immutable objects, defensive copying, read-only interfaces

3. **What is or do you know about reflection?**
    - Reflection allows examining and modifying the structure and behavior of objects at runtime
    - **Use cases**:
        - Dependency injection frameworks
        - Serialization/deserialization
        - Testing frameworks
        - Plugin architectures
    - **Pros**: Dynamic behavior, powerful introspection
    - **Cons**: Performance overhead, security risks, harder to debug

4. **What advantages have Microservices?**
    - **Scalability**: Scale individual services independently
    - **Technology Diversity**: Use different languages/frameworks per service
    - **Fault Isolation**: Failure in one service doesn't bring down the entire system
    - **Team Autonomy**: Teams can work independently
    - **Deployment Flexibility**: Deploy services independently
    - **Maintainability**: Smaller, focused codebases
    - **Challenges**: Distributed system complexity, network latency, data consistency

5. **What are design patterns?**
    - Reusable solutions to common software design problems
    - **Categories**:
        - **Creational**: Singleton, Factory, Builder, Abstract Factory
        - **Structural**: Adapter, Decorator, Facade, Proxy
        - **Behavioral**: Observer, Strategy, Command, State
    - **Benefits**: Proven solutions, improved code readability, easier maintenance

## Multithreading

1. **What is the difference between task, thread, and process?**
    - **Process**: Independent execution unit with its own memory space
        - Has its own virtual address space
        - Cannot directly access another process's memory
        - Higher overhead for creation and context switching
    - **Thread**: Lightweight execution unit within a process
        - Shares memory space with other threads in the same process
        - Lower overhead for creation and context switching
        - Can communicate through shared memory
    - **Task**: Higher-level abstraction for asynchronous work
        - Can run on thread pool
        - Supports cancellation, continuation, and exception handling
        - Better resource management

2. **How to solve or avoid a deadlock?**
    - **Prevention**:
        - Resource ordering (always acquire resources in the same order)
        - Resource timeout
        - Resource pre-allocation
    - **Detection**:
        - Resource allocation graphs
        - Banker's algorithm
    - **Recovery**:
        - Process termination
        - Resource preemption
    - **Best Practices**:
        - Use higher-level abstractions (locks, semaphores)
        - Keep critical sections small
        - Avoid nested locks when possible

3. **Which collection should you use to manage a multi-thread list?**
    - **ConcurrentBag**: Unordered collection optimized for scenarios where the same thread produces and consumes
    - **ConcurrentQueue**: FIFO thread-safe queue
    - **ConcurrentStack**: LIFO thread-safe stack
    - **ConcurrentDictionary**: Thread-safe dictionary
    - **Thread-safe data structures**
    - **Safe areas**

4. **Why use a concurrentBag vs a list with locks on his setters?**
    1. **ConcurrentBag** is a thread-safe bag implementation, optimized for scenarios where the same thread will be both producing and consuming data stored in the bag, so it works faster, but is unordered. List is ordered.
    2. If you Take from concurrentBag, it will take from your local thread then to other threads.
    3. **ConcurrentBag** is a linked list of linked lists, so has O(1) operations
    4. **Performance**: Less contention, better scalability
    5. **Memory**: Thread-local storage reduces cache misses

## Data Base Access

1. **Did you use ORMs before? If so, which one did you use?**
    1. **EF Core**: Microsoft's modern ORM for .NET
    2. **NHibernate**: Mature ORM with extensive features
    3. **Dapper**: Micro-ORM for high performance
    4. **Entity Framework**: Full-featured ORM with LINQ support

2. **What are the 2 forms of configuring EF?**
    - **Database First**: Generate models from existing database
        - Use `Scaffold-DbContext` command
        - Good for existing databases
    - **Code First**: Define models in code, generate database
        - Use migrations for schema changes
        - Better for new projects
    - **Model First**: Design in Entity Designer, generate both

3. **What is LINQ and for what is used?**
    - Language Integrated Query - allows querying data sources using C# syntax
    - **Providers**: LINQ to Objects, LINQ to SQL, LINQ to Entities
    - **Query Syntax**: SQL-like syntax
    - **Method Syntax**: Fluent API with extension methods
    - **Benefits**: Type safety, IntelliSense, compile-time checking

4. **From which interface belongs the instance returned by a LINQ "Where" clause?**
    1. **IQueryable**: For database queries (deferred execution)
    2. **IEnumerable**: For in-memory collections

5. **How do you materialize that object?**
    1. **ToList()**: Materializes to List<T>
    2. **ToArray()**: Materializes to array
    3. **First()/FirstOrDefault()**: Gets first element
    4. **Single()/SingleOrDefault()**: Gets single element
    5. **Count()**: Gets count

6. **Could you call a stored procedure from a function or a function from a stored procedure?**
    - **Yes**: Both are possible
    - **Stored Procedure calling Function**: Use `SELECT` with function call
    - **Function calling Stored Procedure**: Use `EXEC` or `EXECUTE`
    - **Limitations**: Functions cannot have side effects, stored procedures can

## Architecture

1. **Which lifespans are common on dependency injection?**
    - **Singleton**: One instance for the entire application lifetime
    - **Scoped**: One instance per request/scope
    - **Transient**: New instance every time requested
    - **Per Request**: One instance per HTTP request (ASP.NET Core)

2. **Difference between .NET Core and .NET Framework.**
    - **.NET Core**:
        - Cross-platform (Windows, Linux, macOS)
        - Open source
        - Modular architecture
        - Better performance
        - Cloud-optimized
        - Unified .NET 5+ (now just .NET)
    - **.NET Framework**:
        - Windows-only
        - Legacy applications
        - Larger runtime
        - More mature ecosystem

3. **Unit testing**
    1. **Any tools or any library to mention?**
        - **xUnit**: Popular testing framework
        - **NUnit**: Alternative testing framework
        - **Moq**: Mocking framework
        - **FluentAssertions**: Readable assertions
        - **AutoFixture**: Test data generation
    2. **What is an integration testing architecture?**
        - Tests that verify multiple components work together
        - Uses real dependencies (database, external services)
        - Slower than unit tests
        - More complex setup/teardown
    3. **What general structure has?**
        - **Arrange**: Set up test data and dependencies
        - **Act**: Execute the method under test
        - **Assert**: Verify the expected outcome

4. **What is clean architecture?**
    - **Layers**:
        - **Entities**: Core business objects
        - **Use Cases**: Application business rules
        - **Interface Adapters**: Controllers, presenters, gateways
        - **Frameworks & Drivers**: UI, database, external interfaces
    - **Principles**:
        - Dependency Rule: Dependencies point inward
        - Independence of frameworks
        - Testability
        - Independence of UI
        - Independence of database
        - Independence of external agencies

## Additional Important Topics

### API Design
1. **RESTful API principles**
    - Stateless
    - Resource-based URLs
    - HTTP methods (GET, POST, PUT, DELETE, PATCH)
    - Proper status codes
    - HATEOAS (Hypermedia as the Engine of Application State)

2. **API Versioning strategies**
    - URL versioning: `/api/v1/users`
    - Header versioning: `Accept: application/vnd.api+json;version=1`
    - Query parameter: `/api/users?version=1`

### Performance & Scalability
1. **Caching strategies**
    - **Application Cache**: In-memory caching
    - **Distributed Cache**: Redis, Memcached
    - **CDN**: Content Delivery Networks
    - **Database Caching**: Query result caching

2. **Load balancing**
    - Round-robin
    - Least connections
    - IP hash
    - Health checks

3. **Database optimization**
    - Indexing strategies
    - Query optimization
    - Connection pooling
    - Read replicas

### Message Queues
1. **When to use message queues**
    - Asynchronous processing
    - Decoupling services
    - Load leveling
    - Fault tolerance

2. **Popular message queue systems**
    - RabbitMQ
    - Apache Kafka
    - Azure Service Bus
    - Amazon SQS

### Monitoring & Observability
1. **Logging strategies**
    - Structured logging
    - Log levels (DEBUG, INFO, WARN, ERROR)
    - Centralized logging (ELK stack)

2. **Metrics and monitoring**
    - Application metrics
    - Infrastructure metrics
    - Business metrics
    - Alerting strategies

3. **Distributed tracing**
    - Request correlation
    - Performance analysis
    - Debugging microservices

### Security Best Practices
1. **Authentication methods**
    - JWT tokens
    - OAuth 2.0 / OpenID Connect
    - API keys
    - Certificate-based authentication

2. **Data protection**
    - Encryption at rest
    - Encryption in transit (TLS/SSL)
    - Data masking
    - GDPR compliance

### Cloud & DevOps
1. **Containerization**
    - Docker basics
    - Container orchestration (Kubernetes)
    - Microservices deployment

2. **CI/CD pipelines**
    - Automated testing
    - Code quality gates
    - Deployment strategies (Blue/Green, Canary)

3. **Infrastructure as Code**
    - Terraform
    - CloudFormation
    - ARM templates
