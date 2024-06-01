<h1 align="center">JobJourney</h1>

<p align="center">
  <img src="https://github.com/ryangandev/job-journey/blob/main/src/app/favicon.ico" alt="Logo" width="200px">
</p>

## 🚀 About

**JobJourney** is a comprehensive management application designed to streamline and organize the job search process for individuals actively seeking employment opportunities. Whether you're a seasoned professional or a fresh graduate, Job Journey provides the tools you need to efficiently manage your job applications from start to finish.

## 📌 Key Features

-   **Job Applications Dashboard**: Track all your job applications in one intuitive dashboard. View details such as job titles, company names, application statuses, and recent updates, enabling you to stay organized and informed throughout your job search.

-   **Digital Profile Management**: Easily manage and update your digital profiles and resumes. Store multiple versions of your resume and quickly access your social media links, making it simpler to submit applications and maintain your online presence.

-   **Interview Prep**: Enhance your interview readiness with a preparation module. Build and store a personalized library of interview questions and answers, categorize them for targeted study, and refine your responses to impress in any interview scenario.

-   **Goal Tracker & Analytics**: Set job application goals and monitor your progress with a comprehensive analytics suite. Track daily, weekly, or monthly application activities, analyze trends, and adjust strategies to optimize your job search efforts.

## 🛠️ Quick Start

1. **Clone the repository:**

    ```zsh
    git clone https://github.com/ryangandev/job-journey.git
    ```

2. **Navigate to the project directory:**

    ```zsh
    cd job-journey
    ```

3. **Set up the environment:**

    - Create a `.env` file in the root directory.
    - Copy the contents from `.env.example` into it.
    - Replace `YOUR_DATABASE_URL` with your actual PostgreSQL database URL.

    ```zsh
    DATABASE_URL=YOUR_DATABASE_URL
    ```

4. **Install the dependencies:**

    ```zsh
    yarn install
    ```

5. **Initialize Prisma and run migrations:**

    - Initialize your Prisma setup, which creates the necessary configuration files.

    ```zsh
    npx prisma init
    ```

    - Run the Prisma migrations to set up your database schema.

    ```
    npx prisma migrate dev
    ```

6. **Start the development server:**
    ```zsh
    yarn dev
    ```
    - Navigate to `http://localhost:3000` in your web browser to view the app.

## ⚙️ Technology Stack

-   **[Next.js 14](https://nextjs.org/)**: Modern framework for building fast and user-friendly server-rendered React applications.
-   **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces
-   **[Prisma ORM](https://www.prisma.io/)**: Simplifies database workflows with its object-relational mapping capabilities
-   **[PostgreSQL](https://www.postgresql.org/)**: Powerful relational database system for complex data storage and retrieva
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building modern applications
-   **[NextUI](https://nextui.org/)**: UI Library with high-quality React components built on top of Tailwind CSS and React Aria
-   **[Framer Motion](https://www.framer.com/motion/)**: A flexible library for animating React components
-   **[Zod](https://zod.dev/)**: TypeScript-first schema validation with static type inference

## 📝 License

This project is [MIT](https://github.com/ryangandev/job-journey/blob/main/LICENSE) licensed.
