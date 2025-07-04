import { CustomButton, CustomInput } from '@/components';
import { memo } from 'react';
import { Link } from 'react-router';
import { authRoutes } from '@/constants';
import { RegisterFormData as FormData } from '@/types';
import { useForm, Controller, useWatch } from 'react-hook-form';

function RegisterView() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>();
  const password = useWatch({ control, name: 'password' });

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
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join our community today
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Minimum length is 3',
                  },
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    label="Full name"
                    autoComplete="name"
                    hasError={!!errors.name}
                    errorText={errors.name?.message}
                  />
                )}
              />
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
                    autoComplete="new-password"
                    hasError={!!errors.password}
                    errorText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: 'Password confirmation is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    type="password"
                    label="Password confirmation"
                    autoComplete="new-password"
                    hasError={!!errors.confirmPassword}
                    errorText={errors.confirmPassword?.message}
                  />
                )}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  {...register('terms', {
                    required: 'You must accept the terms',
                  })}
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
              {errors.terms && (
                <small className="text-red-500 dark:text-red-400">
                  {errors.terms?.message}
                </small>
              )}
            </div>

            <div>
              <CustomButton
                type="submit"
                className="text-sm"
                aria-label="Create a new account"
              >
                Create account
              </CustomButton>
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
