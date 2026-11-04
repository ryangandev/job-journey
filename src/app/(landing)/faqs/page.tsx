import type { Metadata } from 'next';

import ComingSoon from '@/components/landing/coming-soon';

export const metadata: Metadata = {
  title: 'FAQs',
};

export default function FaqsPage() {
  return (
    <ComingSoon
      title="Frequently asked questions"
      description="We are putting together answers to common questions about JobJourney. Check back soon."
    />
  );
}
