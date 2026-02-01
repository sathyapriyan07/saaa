import { Suspense } from 'react';
import SectionRow from '../../../components/SectionRow';

export default function TitlesPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Titles</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="titles" />
      </Suspense>
    </main>
  );
}
