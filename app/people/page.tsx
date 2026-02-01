import { Suspense } from 'react';
import SectionRow from '../../../components/SectionRow';

export default function PeoplePage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">People</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="people" />
      </Suspense>
    </main>
  );
}
