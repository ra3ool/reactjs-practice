import { CustomInput, SvgLoader } from '@/components';
import { useState, memo } from 'react';
import { Link } from 'react-router';
import { authRoutes } from '@/constants';

interface FormData {
  email: string;
  password: string;
}

interface LoginViewProps {
  className?: string;
}

function LoginView({ className = '' }: LoginViewProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className={`flex h-full items-center justify-center p-4 ${className}`}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-neutral-100 dark:bg-neutral-800 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
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
                // autoComplete="current-password"
                required
                // icon="lock"
                className="relative"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <Link
                to={authRoutes.forgotPassword}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                aria-label="Forgot your password?"
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                aria-label="Sign in to your account"
              >
                Sign in
                <SvgLoader name="spinner" color="white" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              to={authRoutes.register}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
              aria-label="Navigate to sign up page"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LoginView);