# CourseHub AI – AI Powered Course Generator

CourseHub AI is a full-stack AI-powered learning platform that generates structured educational courses using Google Gemini AI. Users can create personalized learning roadmaps, generate chapter-wise content, discover relevant video resources, and manage courses through an authenticated dashboard.

## Features

### AI Course Generation

* Generate complete course structures using Gemini AI
* Automatic chapter creation
* Course descriptions and learning paths
* Multiple difficulty levels

### Dynamic Chapter Content

* AI-generated chapter explanations
* Structured learning content
* Markdown-supported content rendering
* Progressive learning experience

### Video Resource Integration

* Automatic YouTube resource discovery
* Contextual learning videos for each chapter
* Embedded video support

### Authentication & User Management

* Clerk Authentication
* Secure sign-up and sign-in
* User-specific course management
* Protected routes

### Dashboard

* Create and manage courses
* View generated courses
* Explore learning content
* Track created learning resources

### Sharing & Publishing

* Publish generated courses
* Share via LinkedIn
* Share via WhatsApp
* Share via Email

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* React 18
* Tailwind CSS
* Shadcn UI
* Radix UI

### Backend & APIs

* Google Gemini AI
* YouTube Data API
* Next.js Server Components

### Database

* PostgreSQL (Neon)
* Drizzle ORM

### Authentication

* Clerk Authentication

### Additional Services

* Firebase
* Axios
* React Markdown

---

## Project Architecture

User Input

↓

Course Generation Request

↓

Gemini AI

↓

Course Structure Generation

↓

PostgreSQL Storage (Drizzle ORM)

↓

Dashboard Management

↓

Chapter Content Generation

↓

YouTube Resource Integration

↓

Published Learning Experience

---

## Folder Structure

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

---

## Key Learning Outcomes

* Full-stack application development
* AI integration with Gemini API
* Authentication and authorization
* Database design with PostgreSQL
* ORM implementation using Drizzle
* Dynamic routing in Next.js
* External API integration
* SaaS-style application architecture

---

## Future Improvements

* Course progress tracking
* Quiz generation
* Certificates for completed courses
* AI-powered assessments
* Multi-language support
* Course collaboration features

---

## Author

Parag Tiwari

GitHub:
https://github.com/PARAG-TIWARI

Built as part of a Full Stack Web Development Internship project.
