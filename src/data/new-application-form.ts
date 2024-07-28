import { NewApplicationFormQuestion } from '@/models/new-application-form';
import { submissionSites } from './dashboard';

export const newApplicationFormQuestions: NewApplicationFormQuestion[] = [
  {
    key: 'title',
    question: 'What is the job title you are applying for?',
    type: 'input',
    required: true,
    placeholder: 'Eg. Frontend Developer',
  },
  {
    key: 'company',
    question: 'What is the company name?',
    type: 'input',
    required: true,
    placeholder: 'Eg. Apple Inc.',
  },
  {
    key: 'jobPostingLink',
    question: 'What is the job posting link?',
    type: 'input',
    required: false,
    placeholder: 'Eg. https://www.apple.com/jobs/...',
  },
  {
    key: 'submittedThrough',
    question: 'Where did you submit this application?',
    type: 'select',
    required: false,
    options: submissionSites,
  },
];
