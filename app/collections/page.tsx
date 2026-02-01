import CollectionsService from '../../services/collections.service';
import SectionRow from '../../components/SectionRow';
import { Suspense } from 'react';

export default function CollectionsPage() {
  // You may want to fetch and pass collections data here if needed
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Collections</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="collections" />
      </Suspense>
    </main>
  );
}
