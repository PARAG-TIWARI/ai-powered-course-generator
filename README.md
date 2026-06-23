# 🚀 CourseHub AI - AI Powered Course Generator

CourseHub AI is a full-stack AI-powered learning platform that generates structured educational courses using Google Gemini AI.

Users can create personalized learning roadmaps, generate chapter-wise content, discover relevant video resources, and manage courses through an authenticated dashboard.

---

## ✨ Features

### 🤖 AI Course Generation

* Generate complete course structures using Gemini AI
* Automatic chapter creation
* Course descriptions and learning paths
* Multiple difficulty levels

### 📚 Dynamic Chapter Content

* AI-generated chapter explanations
* Structured learning content
* Markdown-supported content rendering
* Progressive learning experience

### 🎥 Video Resource Integration

* Automatic YouTube resource discovery
* Contextual learning videos for each chapter
* Embedded video support

### 🔐 Authentication & User Management

* Clerk Authentication
* Secure sign-up and sign-in
* User-specific course management
* Protected routes

### 📊 Dashboard

* Create and manage courses
* View generated courses
* Explore learning content
* Track created learning resources

### 🌐 Sharing & Publishing

* Publish generated courses
* Share via LinkedIn
* Share via WhatsApp
* Share via Email

---

# 🛠️ Tech Stack

## Frontend

* Next.js 15 (App Router)
* React.js
* Tailwind CSS
* Shadcn UI
* Radix UI

## Backend & APIs

* Google Gemini AI
* YouTube Data API
* Next.js API Routes

## Database

* PostgreSQL (Neon)
* Drizzle ORM

## Authentication

* Clerk Authentication

## Additional Services

* Firebase
* Axios
* React Markdown

---

# 🏗️ System Architecture

```text
User Input
    │
    ▼
Course Generation Request
    │
    ▼
Gemini AI
    │
    ▼
Course Structure Generation
    │
    ▼
PostgreSQL Storage (Drizzle ORM)
    │
    ▼
Dashboard Management
    │
    ▼
Chapter Content Generation
    │
    ▼
YouTube Resource Integration
    │
    ▼
Published Learning Experience
```

---

# 📂 Project Structure

```text
app/
├── dashboard/
├── create-course/
├── course/
├── (auth)/
├── _components/
├── _context/

configs/
├── AiModel.jsx
├── db.jsx
├── schema.jsx
├── service.jsx

components/
└── ui/
```

---

# 🎯 Key Learning Outcomes

Through this project, I gained hands-on experience in:

* Full Stack Application Development
* AI Integration using Gemini API
* Authentication and Authorization
* Database Design with PostgreSQL
* ORM Implementation using Drizzle ORM
* Dynamic Routing in Next.js
* External API Integration
* SaaS-style Application Architecture
* State Management and Component Design

---

# ⚡ Installation

## Clone Repository

```bash
git clone https://github.com/PARAG-TIWARI/ai-powered-course-generator.git
```

## Navigate to Project

```bash
cd ai-powered-course-generator
```

## Install Dependencies

```bash
npm install
```

## Create Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_DATABASE_URL=

NEXT_PUBLIC_GEMINI_API_KEY=

YOUTUBE_API_KEY=
```

## Run Development Server

```bash
npm run dev
```

---

# 🚀 Future Improvements

* Course Progress Tracking
* AI Generated Quizzes
* Learning Analytics Dashboard
* Certificates for Completed Courses
* Multi-language Support
* AI-powered Assessments
* Collaborative Learning Features

---

# 👨‍💻 Author

**Parag Tiwari**

B.Tech CSE Student | Full Stack Developer | AI Enthusiast

GitHub:
https://github.com/PARAG-TIWARI

LinkedIn:
https://www.linkedin.com/in/parag-tiwari

---

⭐ If you found this project useful, consider giving it a star.
