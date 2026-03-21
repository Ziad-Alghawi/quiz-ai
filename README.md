# Quiz AI

Quiz AI is a full-stack quiz generation platform built around a simple idea: upload a document, let AI turn it into a structured quiz, then track how well you perform over time.

The project started as an AI workflow experiment and gradually became a complete product with authentication, document parsing, quiz generation, submissions, analytics, and subscription billing. Instead of manually writing questions, the app takes uploaded PDF content, extracts the important text, sends it through an LLM pipeline, stores the generated quiz in PostgreSQL, and presents the result through a clean quiz-taking flow.

## What the app does

- Lets users sign in with Google.
- Accepts PDF uploads and turns them into quizzes with AI.
- Stores quizzes, questions, answers, and submissions in PostgreSQL.
- Shows quiz results immediately after submission.
- Tracks activity and learning progress in a dashboard.
- Uses Stripe subscriptions to control access to quiz generation.

## Project journey

This project grew in layers:

1. Start with the core quiz experience: upload a file, generate questions, and answer them.
2. Add persistence with Drizzle and PostgreSQL so generated quizzes and submissions are saved.
3. Introduce authentication with NextAuth to give each user a private workspace.
4. Add analytics so users can see quiz volume, question volume, submission count, average score, and activity over time.
5. Add Stripe billing to turn the quiz generator into a gated feature that can be deployed as a real product.
6. Prepare the app for deployment on Vercel with environment-based configuration.

The result is not just an AI demo. It is a full-stack SaaS-style project that combines product thinking, backend persistence, and external service integration.

## Tech stack

- Next.js 14 with App Router
- TypeScript
- NextAuth for authentication
- Shadcn UI and Tailwind CSS for the interface
- LangChain for the LLM workflow
- Google Gemini for quiz generation
- Drizzle ORM
- PostgreSQL
- Supabase for database hosting
- Stripe for subscriptions and billing portal flows
- TanStack Table for dashboard tables
- Zod for schema-oriented form and data validation support
- Vercel for deployment

## Core features

### 1. Authentication

Users can sign in with Google. Session data is persisted with NextAuth and Drizzle.

### 2. AI-powered quiz generation

Users upload a PDF, the server extracts text from the document, sends it to Gemini through LangChain, cleans the JSON response, and stores the generated quiz in the database.

### 3. Quiz experience

Generated quizzes are presented in a step-by-step interface with progress tracking, answer feedback, and a final score summary.

### 4. Dashboard analytics

Each user can review their generated quizzes and see metrics such as:

- Number of quizzes
- Number of questions
- Number of submissions
- Average score
- Submission activity heatmap

### 5. Subscription flow

Stripe checkout and billing portal flows are wired into the app so quiz generation can be offered as a paid feature.

## Architecture overview

### Frontend

- Next.js App Router pages and layouts
- Client components for upload, quiz interactions, and billing actions
- Shadcn UI components for reusable interface pieces

### Backend

- Route handlers for AI generation and Stripe integrations
- Server actions for submissions, metrics, and subscription state
- Drizzle schema for users, quizzes, questions, answers, and submissions

### External services

- Google OAuth for sign-in
- Gemini API for quiz generation
- Supabase-hosted PostgreSQL for storage
- Stripe for subscriptions and webhook-driven access updates

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your real values.

Required variables:

```env
GEMINI_API_KEY=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
AUTH_SECRET=""
DATABASE_URL=""
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_WEBHOOK_LOCAL_SECRET=""
```

### 3. Run the app

```bash
npm run dev
```

Open http://localhost:3000 in the browser.

### 4. Build before deploying

```bash
npm run build
```

## Stripe webhook notes

For local development, use your local Stripe webhook secret.

For production, set `STRIPE_WEBHOOK_SECRET` in Vercel.

The code currently accepts the older misspelled local variable name `STRIPE_WEBHOOK_LOCAL_SERCRET` as a fallback so existing local setups do not break immediately.

## Database model

The main entities are:

- `user`
- `account`
- `session`
- `verificationToken`
- `quizzes`
- `questions`
- `answers`
- `quizz_submissions`

Together, these tables support authentication, generated quiz content, and user performance tracking.

## Deployment

This project is ready to be deployed on Vercel.

Recommended production setup:

1. Create the project in Vercel.
2. Add all required environment variables.
3. Configure your production database URL.
4. Configure Google OAuth callback URLs.
5. Configure Stripe webhook and billing URLs.
6. Run a production deployment.

You can deploy either:

- Directly from your local machine with the Vercel CLI
- From a connected GitHub repository for automatic redeploys

## Why this project matters

Quiz AI demonstrates more than UI work. It shows how to combine:

- product-oriented thinking
- AI integration
- backend data modeling
- user authentication
- payment infrastructure
- deployable SaaS architecture

It is the kind of project that reflects both implementation skill and product ownership.
