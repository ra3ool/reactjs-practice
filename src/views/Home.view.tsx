import { SvgLoader } from '@/components';
import { baseRoutes } from '@/constants';
import { Link } from 'react-router';

export default function HomeView() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden text-center py-12 px-6 sm:px-10">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Welcome to Our Application!
        </h1>
        <p className="text-xl mb-8">
          Explore the powerful features and seamless experience built with React
          and Vite.
        </p>
        <div className="flex justify-center mb-8">
          <SvgLoader name="react" className="h-24 w-24 animate-spin-slow" />
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            This platform is designed to provide a robust and efficient
            development environment. Dive into various sections to see different
            components and functionalities in action.
          </p>
          <p className="text-lg">
            We are constantly working to improve and add new features. Stay
            tuned for updates!
          </p>
        </div>
        <div className="mt-10">
          <Link
            to={baseRoutes?.about?.path as string}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm transition-colors duration-300"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
