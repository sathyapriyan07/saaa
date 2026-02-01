import SectionRow from '../../components/SectionRow';
import { Suspense } from 'react';

export default function SeriesPage() {
  // You may want to fetch and pass series data here if needed
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Series</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="series" />
      </Suspense>
    </main>
  );
}
