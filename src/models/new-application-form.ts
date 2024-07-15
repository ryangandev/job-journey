type FormQuestionKey =
  | 'title'
  | 'company'
  | 'location'
  | 'setting'
  | 'type'
  | 'level'
  | 'salary'
  | 'jobPostingLink'
  | 'isFavorite';

type FormQuestionType = 'input' | 'select' | 'checkbox';

type NewApplicationFormQuestion = {
  key: FormQuestionKey;
  question: string;
  type: FormQuestionType;
  required: boolean;
  placeholder?: string;
  options?: string[];
};

type InputQuestionKey =
  | 'title'
  | 'company'
  | 'location'
  | 'salary'
  | 'jobPostingLink';
type SelectQuestionKey = 'setting' | 'type' | 'level';
type CheckboxQuestionKey = 'isFavorite';

export type {
  FormQuestionKey,
  FormQuestionType,
  NewApplicationFormQuestion,
  InputQuestionKey,
  SelectQuestionKey,
  CheckboxQuestionKey,
};
