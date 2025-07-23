import { LayoutContent, SvgLoader } from '@/components';
import { useMatches } from 'react-router';

export default function HomeView() {
  const matches = useMatches(); //TODO get route meta data
  console.log('matches :', matches);
  return (
    <LayoutContent className="home">
      do some practice with react
      <SvgLoader name="react" />
    </LayoutContent>
  );
}
