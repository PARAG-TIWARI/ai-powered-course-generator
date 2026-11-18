# CourseHub AI — Course Generator

CourseHub AI is a full-stack learning application prototype that uses Google Gemini to generate course outlines and chapter content. It also lets users organise courses in a dashboard, attach learning videos from YouTube, and publish/share course pages.

The repository demonstrates a combination of Generative AI integration, Next.js application development, authentication, relational data modelling and third-party API use.

> **Project status:** This repository is a development/portfolio project. It does not include a verified live-demo URL. The current implementation still has an important server/client boundary issue documented in [Architecture and security review](docs/architecture-and-security-review.md). Do not describe the current code as production-secure until that remediation is completed and tested.

## Main functionality

- Generate a course outline from a topic, category, level, duration and requested chapter count.
- Generate chapter-level explanations and optional code examples.
- Search YouTube for relevant video resources for chapters.
- Save and manage course records and generated chapter content.
- Edit course titles, descriptions and chapter information.
- Upload course banner images through Firebase Storage.
- Sign in through Clerk and view a user dashboard.
- Publish and share course pages using a course-specific URL.

Generated learning material should be reviewed before being shared or relied on. The application does not currently demonstrate an independent factuality, citation or curriculum-quality evaluation process.

## Technology

| Area | Technology |
| --- | --- |
| Framework | Next.js 15 App Router |
| UI | React 18, Tailwind CSS, Radix UI / shadcn-style components |
| Generative AI | Google Gemini API through @google/generative-ai |
| Database | Neon serverless PostgreSQL |
| ORM / schema | Drizzle ORM |
| Authentication | Clerk |
| Video discovery | YouTube Data API |
| File storage | Firebase Storage |
| Other libraries | Axios, React Markdown, React Share |

## High-level feature flow

~~~mermaid
flowchart TD
    USER[User enters course preferences] --> LAYOUT[Gemini generates course outline]
    LAYOUT --> REVIEW[User reviews / edits outline]
    REVIEW --> SAVE[Course record stored in PostgreSQL]
    SAVE --> CHAPTER[Generate chapter content with Gemini]
    CHAPTER --> VIDEO[Optionally search YouTube resources]
    VIDEO --> STORE[Save chapter content and video IDs]
    STORE --> PUBLISH[Publish course]
    PUBLISH --> SHARE[Share course page]
~~~

This is the intended product workflow. The current source places several database and AI integrations in client-component dependency paths; see the security review before treating the flow as a production architecture.

## Repository structure

~~~text
app/
├── (auth)/                  # Clerk sign-in and sign-up pages
├── dashboard/               # User dashboard and course discovery
├── create-course/            # Course creation and chapter generation
├── course/                   # Published course pages and chapter reader
├── _components/              # Shared landing-page components
└── _context/                 # Client-side user input and course state

configs/
├── AiModel.jsx               # Gemini model configuration
├── db.jsx                    # Neon + Drizzle database client
├── schema.jsx                # Drizzle table definitions
├── service.jsx               # YouTube Data API helper
└── firebaseConfig.jsx        # Firebase web SDK configuration

drizzle/                      # SQL migrations and schema snapshots
components/ui/                 # Reusable UI components
hooks/                         # Client-side hooks
public/                        # Static assets
middleware.js                  # Clerk route protection
~~~

## Local development

### Prerequisites

- Node.js version compatible with the Next.js version in package.json.
- npm.
- A Clerk application.
- A Neon PostgreSQL database.
- Google Gemini API access.
- YouTube Data API access, if video discovery is enabled.
- Firebase Storage configuration, if banner uploads are used.

### Install dependencies

~~~bash
git clone https://github.com/PARAG-TIWARI/ai-powered-course-generator.git
cd ai-powered-course-generator
npm install
~~~

### Environment configuration

The current source reads the following environment variable names:

| Variable | Intended use |
| --- | --- |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk browser publishable key |
| CLERK_SECRET_KEY | Clerk server secret |
| DB_CONNECTION_STRING | Neon PostgreSQL connection string |
| GEMINI_API_KEY | Gemini API key |
| YOUTUBE_API_KEY | YouTube Data API key |
| NEXT_PUBLIC_FIREBASE_API_KEY | Firebase browser configuration |
| NEXT_PUBLIC_HOST_NAME | Base URL used to create share links |

**Security warning:** Do not change the database, Gemini or YouTube credentials to NEXT_PUBLIC_*. Next.js exposes variables with that prefix to browser code. The current app imports database and AI modules from client components, so simply copying private keys into environment variables is not a safe production configuration. Follow the server-side remediation described in [Architecture and security review](docs/architecture-and-security-review.md) before deploying with privileged credentials.

Firebase's browser API key is part of the web SDK configuration; access to stored files must be controlled by Firebase Storage Rules. A Firebase API key alone is not an authorization boundary.

### Database setup

The project includes Drizzle configuration and SQL migrations. Review the schema and target database before applying changes.

~~~bash
npm run db:generate
npm run db:push
~~~

Use a development database. Do not run schema changes against a production database without a backup and reviewed migration plan.

### Start the development server

~~~bash
npm run dev
~~~

Open http://localhost:3000.

## Scripts

| Command | Purpose |
| --- | --- |
| npm run dev | Start the Next.js development server |
| npm run build | Build the Next.js application |
| npm run start | Start the built application |
| npm run lint | Run the configured Next.js lint command |
| npm run db:generate | Generate Drizzle migrations |
| npm run db:push | Push the current schema to the configured database |
| npm run db:studio | Open Drizzle Studio |

## Current engineering priorities

1. Move Neon database access out of client components and into authenticated server actions or Route Handlers.
2. Move Gemini and YouTube API calls to server-only modules or Route Handlers.
3. Enforce course ownership on the server for reads, edits, publishing and deletion.
4. Enforce public-course rules on the server before returning course content.
5. Validate AI-generated JSON before storing it and handle malformed/blocked responses.
6. Add rate limits, usage limits and safe error responses around paid AI/API calls.
7. Add tests for authentication, ownership checks, course generation and chapter workflows.
8. Confirm Firebase Storage Rules restrict uploads and deletion to the correct authenticated user.

See [Architecture and security review](docs/architecture-and-security-review.md) for the repository-specific findings and a staged remediation plan.

## Author

**Parag Tiwari**  
B.Tech Computer Science and Engineering student, graduating 2027.

[GitHub profile](https://github.com/PARAG-TIWARI) · [CourseHub repository](https://github.com/PARAG-TIWARI/ai-powered-course-generator)
