<h1 align="center">JobJourney</h1>

<p align="center">
  <img src="https://github.com/ryangandev/job-journey/blob/main/src/app/favicon.ico" alt="Logo" width="200px">
</p>

## 🚀 About

**JobJourney** is a comprehensive management application designed to streamline and organize the job search process for individuals actively seeking employment opportunities. Whether you're a seasoned professional or a fresh graduate, Job Journey provides the tools you need to efficiently manage your job applications from start to finish.

## 📌 Key Features

> **Status:** account management (email/password sign-up with email verification and password reset, GitHub and Google sign-in), the signed-in app shell and the job applications dashboard are in place. The other features below are on the roadmap.

- **Job Applications Dashboard** _(available)_: Track all your job applications in one intuitive dashboard. View details such as job titles, company names, application statuses, and recent updates, enabling you to stay organized and informed throughout your job search.

- **Digital Profile Management**: Easily manage and update your digital profiles and resumes. Store multiple versions of your resume and quickly access your social media links, making it simpler to submit applications and maintain your online presence.

- **Interview Prep**: Enhance your interview readiness with a preparation module. Build and store a personalized library of interview questions and answers, categorize them for targeted study, and refine your responses to impress in any interview scenario.

- **Goal Tracker & Analytics**: Set job application goals and monitor your progress with a comprehensive analytics suite. Track daily, weekly, or monthly application activities, analyze trends, and adjust strategies to optimize your job search efforts.

## 🛠️ Quick Start

**Prerequisites:** Node.js 20.19+ (or 22.12+), [pnpm](https://pnpm.io/) 10, and a [Neon](https://neon.tech/) (or Vercel Postgres) database. The app talks to the database through Prisma's Neon driver adapter, so a plain local PostgreSQL server will not work.

1. **Clone the repository:**

   ```zsh
   git clone https://github.com/ryangandev/job-journey.git
   cd job-journey
   ```

2. **Set up the environment:**

   ```zsh
   cp .env.example .env
   ```

   Fill in the values in `.env` (use `.env`, not `.env.local`: the Prisma CLI only reads `.env`). See [Environment variables](#-environment-variables) below.

3. **Install the dependencies** (this also generates the Prisma client into `src/generated/prisma`):

   ```zsh
   pnpm install
   ```

4. **Create (or update) the database schema:**

   ```zsh
   pnpm prisma db push
   ```

   The project has no migration history yet, so the schema is applied with `db push`. Run it again whenever `prisma/schema.prisma` changes (for example after pulling a new feature).

5. **Start the development server:**

   ```zsh
   pnpm dev
   ```

   Then open `http://localhost:3000` in your browser.

## 🔑 Environment Variables

| Variable                                    | Description                                                                                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POSTGRES_PRISMA_URL`                       | Pooled connection string, used by the app at runtime                                                                                                          |
| `POSTGRES_URL_NON_POOLING`                  | Direct connection string, used by the Prisma CLI and migrations                                                                                               |
| `AUTH_SECRET`                               | Auth.js secret, generate one with `npx auth secret`                                                                                                           |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth app (callback URL: `<APP_URL>/api/auth/callback/github`)                                                                                         |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth client (callback URL: `<APP_URL>/api/auth/callback/google`)                                                                                      |
| `RESEND_API_KEY`                            | [Resend](https://resend.com/) API key for verification and password reset emails                                                                              |
| `APP_URL`                                   | Public site URL without a trailing slash, used to build links in emails. Defaults to `http://localhost:3000` in development and **must be set in production** |

## 📜 Scripts

| Command       | Description                      |
| ------------- | -------------------------------- |
| `pnpm dev`    | Start the development server     |
| `pnpm build`  | Create a production build        |
| `pnpm start`  | Serve the production build       |
| `pnpm lint`   | Lint the project with ESLint     |
| `pnpm format` | Format the project with Prettier |

## ⚙️ Technology Stack

- **[Next.js 16](https://nextjs.org/)** and **[React 19](https://react.dev/)**: App Router, server actions and the `proxy` (formerly middleware) for route protection
- **[Auth.js (NextAuth v5)](https://authjs.dev/)**: credentials, GitHub and Google sign-in
- **[Prisma ORM 7](https://www.prisma.io/)** with the Neon driver adapter, on **[PostgreSQL](https://www.postgresql.org/)** ([Neon](https://neon.tech/))
- **[Tailwind CSS 4](https://tailwindcss.com/)** and **[shadcn/ui](https://ui.shadcn.com/)**
- **[Resend](https://resend.com/)**: transactional email
- **[Motion (Framer Motion)](https://motion.dev/)**: animations
- **[Zod 4](https://zod.dev/)** and **[React Hook Form](https://react-hook-form.com/)**: schema validation and forms

## 📝 License

This project is [MIT](https://github.com/ryangandev/job-journey/blob/main/LICENSE) licensed.
