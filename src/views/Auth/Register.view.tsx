import { CustomButton, CustomInput } from '@/components';
import { memo } from 'react';
import { Link } from 'react-router';
import { authRoutes } from '@/constants';
import { RegisterFormData as FormData } from '@/types';
import { useForm } from 'react-hook-form';

function RegisterView() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
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
              <CustomInput
                inputStyle="floatingLabel"
                type="text"
                name="name"
                label="Full name"
                placeholder="John Doe"
                autoComplete="name"
                hasError={errors.name}
                register={register}
                required
              />
              <CustomInput
                inputStyle="floatingLabel"
                type="email"
                name="email"
                label="Email address"
                placeholder="your@email.com"
                autoComplete="email"
                hasError={errors.email}
                register={register}
                required
              />
              <CustomInput
                inputStyle="floatingLabel"
                type="password"
                name="password"
                label="Password"
                placeholder="••••••••"
                autoComplete="new-password"
                hasError={errors.password}
                register={register}
                required
              />
              <CustomInput
                inputStyle="floatingLabel"
                type="password"
                name="confirmPassword"
                label="Confirm password"
                placeholder="••••••••"
                autoComplete="new-password"
                hasError={errors.confirmPassword}
                register={register}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  {...register('terms', { required: true })}
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
                <small className="text-red-500 dark:text-red-400">eano bezan</small>
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
