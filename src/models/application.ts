import { Application } from '@prisma/client';

export type ApplicationPreview = Pick<
  Application,
  | 'id'
  | 'title'
  | 'company'
  | 'location'
  | 'setting'
  | 'type'
  | 'level'
  | 'status'
  | 'isFavorite'
  | 'replied'
  | 'interviewAquired'
  | 'appliedAt'
  | 'updatedAt'
>;
