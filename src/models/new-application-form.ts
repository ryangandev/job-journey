export type FormQuestionKey =
  | 'title'
  | 'company'
  | 'location'
  | 'setting'
  | 'type'
  | 'level'
  | 'salary'
  | 'jobPostingLink'
  | 'isFavorite';

export type FormQuestionType = 'input' | 'select' | 'checkbox';

export type NewApplicationFormQuestion = {
  key: FormQuestionKey;
  question: string;
  type: FormQuestionType;
  required: boolean;
  placeholder?: string;
  options?: string[];
};

export type InputQuestionKey =
  | 'title'
  | 'company'
  | 'location'
  | 'salary'
  | 'jobPostingLink';
export type SelectQuestionKey = 'setting' | 'type' | 'level';
export type CheckboxQuestionKey = 'isFavorite';
