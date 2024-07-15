'use client';

import React, { useState } from 'react';
import { SocialProfile } from '@prisma/client';
import { Button, Input } from '@nextui-org/react';
import { GoCopy } from 'react-icons/go';
import toast from 'react-hot-toast';

import { socialProfileMap } from '../../data/digital-profile';

type SocialProfilesProps = {
  profiles: SocialProfile[];
};

export default function SocialProfiles({ profiles }: SocialProfilesProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success('Copied to clipboard');
      })
      .catch((error) => {
        toast.error('Error copying to clipboard', error);
      });
  };

  return (
    <ul className="flex flex-col space-y-5">
      {profiles.map((profile) => (
        <li key={profile.id} className="flex flex-col space-y-1">
          <div className="flex flex-row items-center space-x-2 text-base">
            {socialProfileMap[profile.platform].icon}
            <span className="font-semibold">
              {socialProfileMap[profile.platform].name}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Input
              classNames={{
                inputWrapper: 'rounded',
              }}
              radius="sm"
              variant="bordered"
              value={profile.url}
              isReadOnly={!isEditing}
            />
            <Button
              size="sm"
              radius="sm"
              variant="light"
              isIconOnly
              startContent={<GoCopy size={18} />}
              onPress={() => handleCopy(profile.url)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
