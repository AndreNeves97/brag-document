# Storytellings (STAR Method)

Behavioral stories for interviews.

## The "Slow API" Situation
**Situation:** At WebSolutions, a critical report generation endpoint was taking over 30 seconds to execute, causing timeouts for users.
**Task:** I was assigned to investigate and fix the performance bottleneck.
**Action:** I profiled the **Node.js** application and identified an N+1 query issue in the database access layer. I refactored the query to use aggregations in **MongoDB** and implemented a caching layer using Redis for frequently accessed data.
**Result:** The endpoint response time dropped to under 200ms, significantly improving user satisfaction.

## Mentoring a Junior Dev
**Situation:** At TechCorp, a new junior developer was struggling with **RxJS** concepts in our Angular codebase.
**Task:** Help the developer become proficient and confident in using reactive programming patterns.
**Action:** I set up weekly pair programming sessions focused specifically on RxJS. I created a small set of practice exercises and code-walkthroughs explaining the "why" behind the operators we were using, not just the "how".
**Result:** Within two months, the developer was able to refactor a complex async flow independently and started helping other team members with RxJS questions.

## Disagreement on Architecture
**Situation:** During the migration at TechCorp, there was a disagreement about whether to use a monorepo (Nx) or separate repositories.
**Task:** Decide on the repository strategy for the new microservices architecture.
**Action:** I facilitated a meeting where we listed the pros and cons of each approach relevant to our team size and CI/CD capabilities. I prepared a proof of concept using **Nx** to demonstrate the code sharing benefits.
**Result:** The team agreed to adopt the monorepo approach, which later simplified our dependency management and shared library updates.
