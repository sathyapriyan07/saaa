import { Suspense } from 'react';
import SectionRow from '../../../components/SectionRow';

export default function SeasonsPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Seasons</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="seasons" />
      </Suspense>
    </main>
  );
}
