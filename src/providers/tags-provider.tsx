'use client';

import { Tag } from '@prisma/client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type TagsProviderProps = {
  children: React.ReactNode;
};

type TagContextProps = {
  tags: Tag[];
  assignTagToQuestion: (questionId: string, tagName: string) => Promise<void>;
};

const TagsContext = createContext<TagContextProps | null>(null);

export const TagProvider = ({ children }: TagsProviderProps) => {
  const [tags, setTags] = useState([]);
  const [questions, setQuestions] = useState([]);

  return (
    <TagsContext.Provider
      value={{
        tags,
        assignTagToQuestion: async (questionId: string, tagName: string) => {},
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};
