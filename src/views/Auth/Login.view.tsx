import { CustomButton, CustomInput } from '@/components';
import { memo } from 'react';
import { Link } from 'react-router';
import { authRoutes } from '@/constants';
import { LoginFormData } from '@/types';
import { useForm, Controller } from 'react-hook-form';
import { authService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '@/schemas';

function LoginView() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(authSchema.loginSchema),
    defaultValues: {
      identifier: 'rasool',
      password: 'Pass1234',
      remember: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.loginUser,
    onSuccess: (data) => {
      console.log('data :', data);
      toast.success('You are logged in!');
      // TODO Store user/token if needed
      // Example: store.setUser(data.user);
      // Example: store.setToken(data.accessToken);
    },
    onError: (error: {
      response?: { data?: { message?: string } };
      message?: string;
    }) => {
      console.error('error :', error);
      toast.error(
        error?.response?.data?.message || error?.message || 'Login failed',
      );
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
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
                name="identifier"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    label="Email or Username"
                    autoComplete="username"
                    hasError={!!errors.identifier}
                    errorText={errors.identifier?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
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
                loading={isPending}
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
