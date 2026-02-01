import TitleDetail from '../../../pages/TitleDetail';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  return <TitleDetail id={params?.id} />;
}
