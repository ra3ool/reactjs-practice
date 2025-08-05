import { CustomButton, LayoutContent } from '@/components';
import { Link } from 'react-router';

const AccessDenied = () => {
  return (
    <LayoutContent>
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h1>403 - Access Denied</h1>
        <p>The page you are looking for is not accessible to you.</p>
        <Link to="/">
          <CustomButton>Go to Homepage</CustomButton>
        </Link>
      </div>
    </LayoutContent>
  );
};

export default AccessDenied;
