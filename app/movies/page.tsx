import SectionRow from '../../components/SectionRow';
import { Suspense } from 'react';

export default function MoviesPage() {
  // You may want to fetch and pass movie data here if needed
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="movies" />
      </Suspense>
    </main>
  );
}
