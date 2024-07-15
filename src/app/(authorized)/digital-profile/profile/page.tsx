import React from 'react';
import { SocialProfile } from '@prisma/client';
import { Button, Card, CardBody, Divider } from '@nextui-org/react';
import { GoPlusCircle, GoPencil } from 'react-icons/go';

import SocialProfiles from '../../../../components/digital-profile/social-profiles';
import { getSocialProfilesByUserId } from '../../../../data/digital-profile';

export default async function Page() {
  const socialProfiles = await getSocialProfilesByUserId('1');

  return (
    <Card className="space-y-4 rounded p-4" shadow="sm">
      <CardBody className="flex flex-row space-x-4">
        <div className="w-2/5 space-y-4">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-sm text-light-300 dark:text-dark-300">
            Basic Information
          </p>
        </div>
        <div className="w-3/5">
          <p>name</p>
        </div>
      </CardBody>

      <div className="px-3">
        <Divider orientation="horizontal" />
      </div>

      <CardBody className="flex flex-row space-x-4">
        <div className="w-2/5 space-y-4">
          <h3 className="text-lg font-semibold">Social Profiles</h3>
          <p className="text-sm text-light-300 dark:text-dark-300">
            Where can people find you online?
          </p>
          <div>
            <Button
              className="rounded text-sm"
              size="sm"
              radius="sm"
              variant="bordered"
              color="primary"
              startContent={<GoPlusCircle size={16} />}
            >
              Add New Profile
            </Button>
          </div>
          <div>
            <Button
              className="rounded text-sm"
              size="sm"
              radius="sm"
              variant="bordered"
              color="warning"
              startContent={<GoPencil size={16} />}
            >
              Edit
            </Button>
          </div>
        </div>
        <div className="w-3/5">{/* <SocialProfiles profiles={} /> */}</div>
      </CardBody>
    </Card>
  );
}
