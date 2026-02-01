import PeopleDetail from '../../../pages/PeopleDetail';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  return <PeopleDetail id={params?.id} />;
}
