import { Suspense } from 'react';
import SectionRow from '../../../../components/SectionRow';

export default function AdminPeoplePage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Admin People</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="admin-people" />
      </Suspense>
    </main>
  );
}
