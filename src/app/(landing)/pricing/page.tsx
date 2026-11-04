import type { Metadata } from 'next';

import ComingSoon from '@/components/landing/coming-soon';

export const metadata: Metadata = {
  title: 'Pricing',
};

export default function PricingPage() {
  return (
    <ComingSoon
      title="Pricing"
      description="Pricing details have not been published yet. This page will be updated once they are."
    />
  );
}
