import {
  ChartLine,
  IdCard,
  LayoutDashboard,
  MessagesSquare,
  type LucideIcon,
} from 'lucide-react';

export type FeatureStatus = 'available' | 'coming-soon';

export type Feature = {
  id: string;
  title: string;
  status: FeatureStatus;
  icon: LucideIcon;
  /** Short copy for the home page overview. */
  summary: string;
  /** Full copy for the features page (README "Key Features"). */
  description: string;
  /** What it covers today (available) or what is planned (coming soon). */
  highlights: string[];
};

/** The four Key Features from README.md. Keep in sync with the README. */
export const FEATURES: Feature[] = [
  {
    id: 'dashboard',
    title: 'Job Applications Dashboard',
    status: 'available',
    icon: LayoutDashboard,
    summary:
      'Track all your job applications in one dashboard, with job titles, companies, statuses and recent updates at a glance.',
    description:
      'Track all your job applications in one intuitive dashboard. View details such as job titles, company names, application statuses, and recent updates, enabling you to stay organized and informed throughout your job search.',
    highlights: [
      'Add, edit and delete applications',
      'Statuses from Wishlist to Offer',
      'Filter by status and search',
      'Keep the posting link, location, salary and notes',
    ],
  },
  {
    id: 'profiles',
    title: 'Digital Profile Management',
    status: 'coming-soon',
    icon: IdCard,
    summary:
      'Store multiple versions of your resume and keep your social media links close at hand.',
    description:
      'Easily manage and update your digital profiles and resumes. Store multiple versions of your resume and quickly access your social media links, making it simpler to submit applications and maintain your online presence.',
    highlights: [
      'Multiple versions of your resume',
      'Quick access to your social media links',
    ],
  },
  {
    id: 'interview-prep',
    title: 'Interview Prep',
    status: 'coming-soon',
    icon: MessagesSquare,
    summary:
      'Build a personal library of interview questions and answers, and refine your responses.',
    description:
      'Enhance your interview readiness with a preparation module. Build and store a personalized library of interview questions and answers, categorize them for targeted study, and refine your responses to impress in any interview scenario.',
    highlights: [
      'A personal library of questions and answers',
      'Categories for targeted study',
    ],
  },
  {
    id: 'goals',
    title: 'Goal Tracker & Analytics',
    status: 'coming-soon',
    icon: ChartLine,
    summary:
      'Set application goals and follow your daily, weekly or monthly progress.',
    description:
      'Set job application goals and monitor your progress with a comprehensive analytics suite. Track daily, weekly, or monthly application activities, analyze trends, and adjust strategies to optimize your job search efforts.',
    highlights: [
      'Daily, weekly or monthly goals',
      'Trends in your application activity',
    ],
  },
];
