import { CustomInput, SvgLoader } from '@/components';
import { useState, memo } from 'react';
import { Link } from 'react-router';
import { authRoutes } from '@/constants';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterViewProps {
  className?: string;
}

function RegisterView({ className = '' }: RegisterViewProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`flex h-full items-center justify-center p-4 ${className}`}>
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-neutral-100 dark:bg-neutral-800 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join our community today
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <CustomInput
                type="text"
                label="Full name"
                value={formData.name}
                onChange={handleChange('name')}
                placeholder="John Doe"
                // autoComplete="name"
                required
                // icon="user"
                className="relative"
              />
              <CustomInput
                type="email"
                label="Email address"
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="your@email.com"
                // autoComplete="email"
                required
                // icon="email"
                className="relative"
              />
              <CustomInput
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange('password')}
                placeholder="••••••••"
                // autoComplete="new-password"
                required
                // icon="lock"
                className="relative"
              />
              <CustomInput
                type="password"
                label="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                placeholder="••••••••"
                // autoComplete="new-password"
                required
                // icon="lock"
                className="relative"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to the {/*TODO add right to left modal later on*/}
                <Link
                  to={authRoutes.terms}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
                  aria-label="View terms of service"
                >
                  Terms
                </Link>{' '}
                and {/*TODO add right to left modal later on*/}
                <Link
                  to={authRoutes.privacy}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
                  aria-label="View privacy policy"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                aria-label="Create a new account"
              >
                Create account
                <SvgLoader name="spinner" color="white" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to={authRoutes.login}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
              aria-label="Navigate to sign in page"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(RegisterView);
