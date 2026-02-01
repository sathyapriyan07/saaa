import { Suspense } from 'react';
import SectionRow from '../../../components/SectionRow';

export default function EpisodesPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Episodes</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="episodes" />
      </Suspense>
    </main>
  );
}
