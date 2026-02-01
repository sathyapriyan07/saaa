import { Suspense } from 'react';
import SectionRow from '../../components/SectionRow';

export default function HomePage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="home" />
      </Suspense>
    </main>
  );
}
