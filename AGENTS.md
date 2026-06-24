# Vibe Coding Standards

## 1. Role & Process Rules

### The PIV Workflow Constraints
You must strictly follow the Plan-Implement-Validate (PIV) loop for every task:
- **PLAN FIRST**: Before modifying or creating any code, explain your plan in markdown bullet points. List the exact files you will touch. Wait for human approval.
- **IMPLEMENT INCREMENTALLY**: Write clean, modular code. Do not write placeholder comments like `// TODO: implement later`.
- **VALIDATE**: After writing code, output a summary of changes and ask the user to verify or run tests.

### Documentation Maintenance
- After completing a task, you must automatically update `TASKS.md` to check off the item.
- If you introduce a new architectural pattern, note it in `docs/DECISIONS.md`.

## 2. Project Task Board (`TASKS.md`)
This serves as the agent's Kanban board. See `TASKS.md` for the current backlog and active sprints.

## 3. Project Documentation Registry
All project documentation is located in the `/docs/` directory.

### Critical
- **PRD.md**: Product vision, user personas, and feature list
- **SYSTEM_DESIGN.md**: Colors, fonts, spacing, and component rules
- **ARCHITECTURE.md**: Page hierarchy, URL patterns, and directory structure
- **DATA_MODELS.md**: Database tables, fields, types, and relationships
- **API_SPEC.md**: Third-party integrations like Stripe, GIA, and Resend

### High Priority
- **USER_FLOWS.md**: Step-by-step journeys for each user persona
- **SEO_STRATEGY.md**: Keyword targets, meta formulas, and schema specs
- **REVENUE_LOGIC.md**: Monetization rules for claims, transfers, and NFC
- **COMPONENTS.md**: Reusable UI components with props and variants

### Operational
- **EMAILS.md**: Transactional email specs for claims and verification
- **AUTH.md**: Access control and role-based permissions
- **RUNBOOK.md**: Manual verification, disputes, and user management
- **ANALYTICS.md**: Event tracking, key metrics, and dashboard specs
- **NFC_SPEC.md**: Tag formats, encoding, and tap-page behavior

### Living
- **CHANGELOG.md**: Continuous log of features, bugs, and schema changes
- **BACKLOG.md**: Prioritized list of upcoming development tasks
- **DECISIONS.md**: Log of architectural choices and solved problems
