# Architecture and security review

This document records an implementation review of the current default branch. It is intended to guide a safe refactor; it is not a penetration test or a formal security assessment.

## Executive summary

The application has useful prototype functionality: Clerk sign-in, course-outline generation with Gemini, chapter-content generation, YouTube resource lookup, Neon/PostgreSQL persistence, dashboard management and Firebase Storage for course banners.

The main architectural concern is that privileged integrations are imported directly into files marked as Client Components. The code currently has no Next.js Route Handlers or server-action layer for these operations. This makes the client/server boundary unclear and prevents reliable server-side enforcement of database ownership and paid API usage.

**Recommendation:** treat the current repository as a development prototype until database reads/writes and Gemini/YouTube calls are moved behind authenticated server-side operations and tested.

## Findings from the current source

### 1. Database client is imported by Client Components

The following files contain the "use client" directive and import the Drizzle database client or database schema:

- app/create-course/page.jsx
- app/create-course/[courseId]/page.jsx
- app/course/[courseId]/page.jsx
- app/course/[courseId]/start/page.jsx
- app/dashboard/_components/UserCourseList.jsx
- app/dashboard/explore/page.jsx
- app/dashboard/_components/CourseCard.jsx
- app/create-course/[courseId]/_components/EditChapters.jsx
- app/create-course/[courseId]/_components/EditCourseBasicInfo.jsx
- app/create-course/[courseId]/_components/CourseBasicInfo.jsx
- app/create-course/[courseId]/finish/page.jsx

The database connection is created in configs/db.jsx using the Neon serverless driver and DB_CONNECTION_STRING. Database queries are then called from browser interaction handlers or React effects.

This is not a safe place for a privileged database connection. Unprefixed environment variables are not intended to be exposed to browser bundles; changing the database variable to a NEXT_PUBLIC_ name would expose the connection string and is not an acceptable fix. The client should call a server-side endpoint or Server Action instead.

### 2. Gemini client is imported into Client Components

- app/create-course/page.jsx imports GenerateCourseLayout_AI from configs/AiModel.jsx.
- app/create-course/[courseId]/page.jsx imports GenerateChapterContent_AI from configs/AiModel.jsx.
- configs/AiModel.jsx constructs GoogleGenerativeAI using GEMINI_API_KEY.

The API key must remain server-side. The browser should submit validated course preferences or a chapter request to a server-side operation; the server should call Gemini and return only the generated result required by the UI.

Do not rename GEMINI_API_KEY to NEXT_PUBLIC_GEMINI_API_KEY to make this import work. That would expose a paid API credential to users.

### 3. YouTube Data API helper is used from a client page

configs/service.jsx reads YOUTUBE_API_KEY and makes the YouTube Data API request. It is imported into app/create-course/[courseId]/page.jsx, which is a Client Component.

Move YouTube searches to a server-side endpoint. Apply quota-aware error handling and avoid returning the API key to the browser.

### 4. Ownership checks are not enforced at a server boundary

Some UI queries filter by the email currently available from Clerk's client hook. Other operations update or delete records using a course ID or database row ID from the client.

Examples include:
- Creating a course with createdBy populated from the client-side Clerk user object.
- Editing course information or chapter titles by updating a row selected by course/database ID.
- Deleting a course and its chapter records from the client component.
- Fetching course content directly from the client.

Client-side filtering and hidden buttons are not authorization controls. A user can modify browser requests. Each server-side read or mutation should authenticate the Clerk session and independently check that the user owns the course. Public course access should be limited to courses whose publish flag is true.

### 5. Published-course checks happen in client code

The public course page fetches the record and checks the publish property in the client component. A server-side route or page should only return a public course when the database query itself requires publish = true. Draft content should never be returned to the browser and then hidden by client logic.

### 6. Firebase Storage authorization needs review

The frontend uses the Firebase web SDK to upload and delete course banner images. The repository should include or link to the applicable Firebase Storage Rules and demonstrate that users can only write/delete files they own.

The Firebase web API key is normally part of browser configuration; it is not a substitute for Storage Rules. Do not put service-account credentials in browser code.

### 7. AI output and cost controls

The Gemini responses are parsed with JSON.parse and stored. Malformed or unexpected responses can fail the workflow. Add schema validation before database writes, handle blocked/empty responses, and avoid returning raw provider errors to users.

Course generation and chapter generation can incur API charges. Add authenticated usage limits, per-user quotas, sensible request-size limits and server-side rate limiting before enabling public access.

## Recommended target architecture

\`\`\`mermaid
flowchart TD
    UI[Next.js Client Components] -->|Authenticated request| ROUTE[Route Handler or Server Action]
    ROUTE --> AUTH[Clerk server-side session check]
    AUTH --> OWNER[Course ownership / published-state check]
    OWNER --> VALIDATE[Validate request with schema]
    VALIDATE --> AI[Gemini server-only service]
    VALIDATE --> YT[YouTube server-only service]
    OWNER --> DB[Neon + Drizzle server-only database]
    AI --> DB
    YT --> DB
    DB --> RESPONSE[Return only required response data]
    RESPONSE --> UI
\`\`\`

## Staged remediation plan

### Phase 1 — Establish the server boundary

1. Add a server-only database module. Import the server-only guard so accidental Client Component imports fail at build time.
2. Add server-side Gemini and YouTube service modules.
3. Add Route Handlers or Server Actions for course creation and chapter generation.
4. Remove direct imports of configs/db.jsx and configs/AiModel.jsx from Client Components.
5. Keep all private credentials in server-only environment variables.

### Phase 2 — Enforce identity and ownership

1. Use Clerk server-side authentication in each protected operation.
2. Resolve the authenticated user on the server; do not trust createdBy, email or owner IDs submitted by the browser.
3. Add owner predicates to edit, delete, publish and draft-read queries.
4. Permit unauthenticated access only to published course pages.
5. Add cross-user tests: one account must not read, edit, delete or publish another account's draft.

### Phase 3 — Validate integrations and costs

1. Validate Gemini output against a schema before storing it.
2. Handle provider errors, safety blocks, timeouts and malformed JSON.
3. Add Gemini and YouTube quota/rate controls.
4. Configure and verify Firebase Storage Rules for per-user uploads and deletion.
5. Ensure logs do not contain API keys, full database connection strings or private course content.

### Phase 4 — Verify before deployment

- Run the Next.js production build.
- Test sign-in/sign-out and protected routes.
- Test course creation, chapter generation, editing, deletion and publishing.
- Test owner and non-owner access separately.
- Test published and unpublished course reads.
- Check browser bundles and network requests to confirm no Gemini, Neon or YouTube secret is present.
- Verify Firebase Storage Rules with authenticated and unauthenticated test cases.
- Review provider usage limits and error behaviour.

## Credential handling

The current source reads these names:

| Variable | Handling |
| --- | --- |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Browser-visible Clerk publishable key |
| CLERK_SECRET_KEY | Server-only |
| DB_CONNECTION_STRING | Server-only |
| GEMINI_API_KEY | Server-only |
| YOUTUBE_API_KEY | Server-only |
| NEXT_PUBLIC_FIREBASE_API_KEY | Browser Firebase configuration; restrict by project settings and enforce Storage Rules |
| NEXT_PUBLIC_HOST_NAME | Public application base URL |

Never place DB_CONNECTION_STRING, GEMINI_API_KEY, YOUTUBE_API_KEY, Clerk secret keys or Firebase service-account credentials in NEXT_PUBLIC_ variables or source files.

## Review scope

This review was based on the repository's source tree, README, package configuration, database helper, AI helper, YouTube helper, Clerk middleware and client pages/components that import these services. It did not include access to live provider dashboards, secret stores, Firebase Storage Rules in a deployed project, production logs or a running hosted application.
