type Column = {
  name: string;
  uid: string;
  width?: number;
  sortable?: boolean;
};

type SearchFilterOption = 'title' | 'company' | 'location';
// | "appliedAt"
// | "updatedAt";

export type { Column, SearchFilterOption };
