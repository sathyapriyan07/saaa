import SearchField from '../../components/SearchField';
import SectionRow from '../../components/SectionRow';
import { Suspense } from 'react';

export default function SearchPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <SearchField />
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="search" />
      </Suspense>
    </main>
  );
}
