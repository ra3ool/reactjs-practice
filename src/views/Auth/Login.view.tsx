import { CustomButton, CustomInput } from '@/components';
import { memo } from 'react';
import { Link } from 'react-router';
import { authRoutes } from '@/constants';
import { LoginFormData as FormData } from '@/types';
import { useForm, Controller } from 'react-hook-form';

function LoginView() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: 'test@gmail.com', password: '123456' },
  });

  const onSubmit = (data: FormData) => {
    console.log('Login data:', data);
    // handle login logic here
  };

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-neutral-100 dark:bg-neutral-800 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    label="Email address"
                    autoComplete="email"
                    hasError={!!errors.email}
                    errorText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message:
                      'Password must contain uppercase, lowercase, and number',
                  },
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    hasError={!!errors.password}
                    errorText={errors.password?.message}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  {...register('remember')}
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
              <CustomButton
                type="submit"
                className="text-sm"
                aria-label="Sign in to your account"
              >
                Sign in
              </CustomButton>
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
