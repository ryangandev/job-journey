'use client';

import { InterviewQuestionType } from '@prisma/client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tab, Tabs } from '@nextui-org/react';

import {
  interviewQuestionTypeMap,
  interviewQuestionTypeOptions,
} from '../../data/interview-questions';
import SearchBar from '../search-bar';

type SearchFilterProps = {
  setIsSearching: (isSearching: boolean) => void;
};

export default function SearchFilter({ setIsSearching }: SearchFilterProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [selectedType, setSelectedType] = useState<
    InterviewQuestionType | 'all'
  >('all');

  useEffect(() => {
    const type = searchParams.get('type') as InterviewQuestionType | 'all';

    if (interviewQuestionTypeOptions.includes(type) || type === 'all') {
      setSelectedType(type);
    }
  }, [searchParams]);

  const handleFilterChange = (filter: InterviewQuestionType | 'all') => {
    const params = new URLSearchParams(searchParams);

    params.set('type', filter);

    setIsSearching(true);
    replace(`${pathname}?${params.toString()}`);
    setSelectedType(filter);
  };

  return (
    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
      <SearchBar
        placeholder="Search questions by keyword"
        setIsSearching={setIsSearching}
      />
      <Tabs
        aria-label="Filter by type"
        variant="bordered"
        defaultSelectedKey={selectedType}
        onSelectionChange={(value) => {
          handleFilterChange(value as InterviewQuestionType | 'all');
        }}
      >
        <Tab key="all" title="All" />
        {interviewQuestionTypeOptions.map((questionType) => (
          <Tab
            key={questionType}
            title={
              interviewQuestionTypeMap[questionType as InterviewQuestionType]
            }
          />
        ))}
      </Tabs>
    </div>
  );
}
