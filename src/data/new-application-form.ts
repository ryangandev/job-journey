import { NewApplicationFormQuestion } from '../models/new-application-form';
import { levelOptions, settingOptions, typeOptions } from './application';

const newApplicationFormQuestions: NewApplicationFormQuestion[] = [
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
    key: 'location',
    question: 'What is the job location?',
    type: 'input',
    required: true,
    placeholder: 'Eg. San Francisco, CA',
  },
  {
    key: 'setting',
    question: 'What is the work setting?',
    type: 'select',
    required: false,
    options: settingOptions,
  },
  {
    key: 'type',
    question: 'What is the job type?',
    type: 'select',
    required: false,
    options: typeOptions,
  },
  {
    key: 'level',
    question: 'What is the job level?',
    type: 'select',
    required: false,
    options: levelOptions,
  },
  {
    key: 'salary',
    question: 'What is the salary range?',
    type: 'input',
    required: false,
    placeholder: 'Eg. $100,000 - $120,000 per year',
  },
  {
    key: 'jobPostingLink',
    question: 'What is the job posting link?',
    type: 'input',
    required: false,
    placeholder: 'Eg. https://www.apple.com/jobs/...',
  },
  {
    key: 'isFavorite',
    question: 'Add to favorite?',
    type: 'checkbox',
    required: false,
    placeholder: 'Add to favorite',
  },
];

export { newApplicationFormQuestions };
