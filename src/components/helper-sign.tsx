import React from 'react';
import { Tooltip, Button } from '@nextui-org/react';
import { IoHelp } from 'react-icons/io5';

import { OverlayPlacement } from '../models/nextui-component';

type HelperSignProps = {
  helperContent: string | React.ReactNode;
  placement?: OverlayPlacement;
  tooltipDisabled?: boolean;
};

export default function HelperSign({
  helperContent,
  placement = 'right',
  tooltipDisabled,
}: HelperSignProps) {
  return (
    <Tooltip
      content={helperContent}
      placement={placement}
      isDisabled={tooltipDisabled}
    >
      <Button
        isIconOnly
        variant="faded"
        radius="md"
        color="warning"
        endContent={<IoHelp size={25} />}
        disableAnimation={true}
        className="fixed bottom-6 left-6 bg-opacity-80 sm:bottom-10 sm:left-10"
      />
    </Tooltip>
  );
}
