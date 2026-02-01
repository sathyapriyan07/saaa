import { Suspense } from 'react';
import SectionRow from '../../../components/SectionRow';

export default function AdminTitlesPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Admin Titles</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="admin-titles" />
      </Suspense>
    </main>
  );
}
