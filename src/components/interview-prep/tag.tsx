import React from 'react';
import { Chip } from '@nextui-org/react';

type TagProps = {
  name: string;
};

export default function Tag({ name }: TagProps) {
  return (
    <Chip color="success" size="sm">
      {name}
    </Chip>
  );
}
