import { Suspense } from 'react';
import SectionRow from '../../../components/SectionRow';

export default function EpisodeDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Episode Detail</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SectionRow sectionType="episode-detail" id={params.id} />
      </Suspense>
    </main>
  );
}
