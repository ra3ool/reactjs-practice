import { CustomButton, LayoutContent } from '@/components';
import { baseRoutes } from '@/constants';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <LayoutContent>
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to={baseRoutes.home.path as string}>
          <CustomButton>Go to Homepage</CustomButton>
        </Link>
      </div>
    </LayoutContent>
  );
};

export default NotFound;
