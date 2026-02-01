import { Suspense } from 'react';
import SectionRow from '../../../../components/SectionRow';

export default function AdminEpisodesPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Admin Episodes</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="admin-episodes" />
      </Suspense>
    </main>
  );
}
